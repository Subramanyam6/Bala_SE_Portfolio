#!/bin/bash

# Portfolio App Migration Script for New GCP Account
# This script helps migrate the portfolio app from the old GCP account to a new one


set -euo pipefail  # Exit on any error, undefined var, or failed pipeline

# Rollback function for cleanup on error
rollback() {
    echo "⚠️ Migration failed. Rolling back created resources..."
    # Try to disable deletion protection before deleting
    gcloud sql instances patch portfolio-db --no-deletion-protection --quiet --project=$NEW_PROJECT_ID || true
    gcloud sql instances delete portfolio-db --quiet --project=$NEW_PROJECT_ID || true
    gcloud run services delete portfolio-backend --quiet --region=us-central1 --project=$NEW_PROJECT_ID || true
    gcloud run services delete portfolio-frontend --quiet --region=us-central1 --project=$NEW_PROJECT_ID || true
    echo "Rollback complete."
}
trap rollback ERR

echo "🚀 Portfolio App Migration Script"
echo "=================================="

# Resolve target project id (allow default if not passed)
if [ -z "${1:-}" ]; then
    NEW_PROJECT_ID="resounding-node-468020-e8"
    echo "ℹ️ No NEW_PROJECT_ID argument provided. Using default: $NEW_PROJECT_ID"
else
    NEW_PROJECT_ID="$1"
fi
OLD_PROJECT_ID="portfolio-app-461419"

echo "📋 Migration Details:"
echo "   Old Project ID: $OLD_PROJECT_ID"
echo "   New Project ID: $NEW_PROJECT_ID"
echo ""

# Non-interactive mode support
CONFIRM=${CONFIRM:-yes}
if [[ ! $CONFIRM =~ ^(y|Y|yes|YES)$ ]]; then
  read -p "🤔 Are you sure you want to proceed with the migration? (y/N): " -n 1 -r || true
  echo
  if [[ ! ${REPLY:-N} =~ ^[Yy]$ ]]; then
      echo "❌ Migration cancelled"
      exit 1
  fi
fi

echo ""
echo "🔧 Step 1: Setting up new GCP project..."

# Ensure correct gcloud account is active
gcloud config set account "balasubramanyam.duggirala2@gmail.com"

# Set the new project
gcloud config set project "$NEW_PROJECT_ID"

# Verify project exists
if ! gcloud projects describe "$NEW_PROJECT_ID" >/dev/null 2>&1; then
  echo "❌ Project $NEW_PROJECT_ID not found. Please create and link billing, then re-run."
  exit 1
fi

# Enable required APIs
echo "   → Enabling required APIs..."
gcloud services enable run.googleapis.com sqladmin.googleapis.com containerregistry.googleapis.com secretmanager.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com || true

echo "   ✅ APIs enabled successfully"

echo ""
echo "🗄️  Step 2: Creating Cloud SQL instance..."

# Create Cloud SQL instance if it doesn't exist
if ! gcloud sql instances describe portfolio-db --project="$NEW_PROJECT_ID" >/dev/null 2>&1; then
  gcloud sql instances create portfolio-db \
      --database-version=POSTGRES_16 \
      --edition=ENTERPRISE \
      --tier=db-custom-1-3840 \
      --region=us-central1 \
      --storage-type=SSD \
      --storage-size=10 \
      --backup-start-time=21:00 \
      --maintenance-window-day=SUN \
      --maintenance-window-hour=0 \
      --availability-type=ZONAL \
      --deletion-protection
else
  echo "   → Cloud SQL instance already exists, skipping creation"
fi

echo "   ✅ Cloud SQL instance created"

# Create database and user
echo "   → Creating database and user..."
gcloud sql databases describe portfolio --instance=portfolio-db >/dev/null 2>&1 || gcloud sql databases create portfolio --instance=portfolio-db

# Database credentials (env override or prompt)
DB_PASSWORD=${DB_PASSWORD:-}
if [ -z "$DB_PASSWORD" ]; then
  read -s -p "   Enter database password: " DB_PASSWORD
  echo
fi

# Create or update user with provided password
if gcloud sql users list --instance=portfolio-db --format="value(name)" | grep -q '^portfolio-user$'; then
  gcloud sql users set-password portfolio-user --instance=portfolio-db --password="$DB_PASSWORD"
else
  gcloud sql users create portfolio-user --instance=portfolio-db --password="$DB_PASSWORD"
fi

echo "   ✅ Database and user created"

echo ""
echo "🔐 Step 3: Setting up secrets..."

# Create secrets (support idempotency)
echo "   → Creating secrets (idempotent)..."

create_or_add_secret() {
  local name="$1"
  local value="$2"
  if gcloud secrets describe "$name" >/dev/null 2>&1; then
    printf "%s" "$value" | gcloud secrets versions add "$name" --data-file=- >/dev/null
  else
    printf "%s" "$value" | gcloud secrets create "$name" --data-file=- >/dev/null
  fi
}

JWT_SECRET=${JWT_SECRET:-$(openssl rand -base64 48)}
POSTMARK_SERVER_TOKEN=${POSTMARK_SERVER_TOKEN:-dummy-key-for-development}

create_or_add_secret db-pass "$DB_PASSWORD"
create_or_add_secret db-user "portfolio-user"
create_or_add_secret jwt-secret "$JWT_SECRET"
create_or_add_secret postmark-server-token "$POSTMARK_SERVER_TOKEN"

echo "   ✅ Secrets created successfully"

echo ""
echo "🐳 Step 4: Building and pushing Docker images..."

# Build and push backend image with Cloud Build
echo "   → Building backend image with Cloud Build..."
gcloud builds submit portfolio-app/backend \
  --tag gcr.io/$NEW_PROJECT_ID/portfolio-backend:latest \
  --project $NEW_PROJECT_ID

# Build and push frontend image with Cloud Build
echo "   → Building frontend image with Cloud Build..."
gcloud builds submit portfolio-app/frontend \
  --tag gcr.io/$NEW_PROJECT_ID/portfolio-frontend:latest \
  --project $NEW_PROJECT_ID

echo "   ✅ Docker images pushed successfully"

echo ""
echo "🚀 Step 5: Deploying Cloud Run services..."

# Determine service account and grant required roles
PROJECT_NUMBER=$(gcloud projects describe "$NEW_PROJECT_ID" --format='value(projectNumber)')
RUN_SA="$PROJECT_NUMBER-compute@developer.gserviceaccount.com"
echo "   → Granting IAM roles to service account: $RUN_SA"
gcloud projects add-iam-policy-binding "$NEW_PROJECT_ID" \
  --member="serviceAccount:$RUN_SA" \
  --role="roles/cloudsql.client" --quiet >/dev/null
gcloud projects add-iam-policy-binding "$NEW_PROJECT_ID" \
  --member="serviceAccount:$RUN_SA" \
  --role="roles/secretmanager.secretAccessor" --quiet >/dev/null

# Deploy backend
echo "   → Deploying backend service..."
gcloud run deploy portfolio-backend \
    --image gcr.io/$NEW_PROJECT_ID/portfolio-backend:latest \
    --platform managed \
    --region us-central1 \
    --service-account "$RUN_SA" \
    --add-cloudsql-instances=$NEW_PROJECT_ID:us-central1:portfolio-db \
    --set-secrets=DB_USER=db-user:latest,DB_PASS=db-pass:latest,POSTMARK_SERVER_TOKEN=postmark-server-token:latest,JWT_SECRET=jwt-secret:latest \
    --set-env-vars=POSTMARK_FROM_EMAIL=bduggirala2@huskers.unl.edu,SPRING_PROFILES_ACTIVE=gcp,CLOUD_SQL_CONNECTION_NAME=$NEW_PROJECT_ID:us-central1:portfolio-db \
    --allow-unauthenticated

# Deploy frontend
echo "   → Deploying frontend service..."
BACKEND_URL=$(gcloud run services describe portfolio-backend --region=us-central1 --format="value(status.url)")
gcloud run deploy portfolio-frontend \
    --image gcr.io/$NEW_PROJECT_ID/portfolio-frontend:latest \
    --platform managed \
    --region us-central1 \
    --service-account "$RUN_SA" \
    --set-env-vars=BACKEND_URL=$BACKEND_URL \
    --allow-unauthenticated

echo "   ✅ Cloud Run services deployed"

echo ""
echo "🔧 Step 6: Updating deployment scripts..."

# Update deploy.sh
sed -i.bak "s/$OLD_PROJECT_ID/$NEW_PROJECT_ID/g" deploy.sh
sed -i.bak "s|gcr.io/$OLD_PROJECT_ID|gcr.io/$NEW_PROJECT_ID|g" deploy.sh

# Update deploy-updates.sh
sed -i.bak "s/$OLD_PROJECT_ID/$NEW_PROJECT_ID/g" deploy-updates.sh

echo "   ✅ Deployment scripts updated"

echo ""
echo "📝 Step 7: Updating application configuration..."

# Update CORS origins in application-gcp.properties
BACKEND_URL=$(gcloud run services describe portfolio-backend --region=us-central1 --format="value(status.url)")
FRONTEND_URL=$(gcloud run services describe portfolio-frontend --region=us-central1 --format="value(status.url)")

# Update the application-gcp.properties file
sed -i.bak "s|https://portfolio-frontend-93780733243.us-central1.run.app|$FRONTEND_URL|g" portfolio-app/backend/src/main/resources/application-gcp.properties

echo "   ✅ Application configuration updated"

echo ""
echo "✅ Migration completed successfully!"
echo ""
echo "🌐 Your new application URLs:"
echo "   Frontend: $FRONTEND_URL"
echo "   Backend: $BACKEND_URL"
echo ""
echo "🔧 Next steps:"
echo "   1. Test the application functionality"
echo "   2. Update any hardcoded URLs in your code"
echo "   3. Configure custom domain (if needed)"
echo "   4. Update any external references to the old URLs"
echo ""
echo "📋 Useful commands:"
echo "   - View services: gcloud run services list --region=us-central1"
echo "   - View logs: gcloud run services logs read portfolio-backend --region=us-central1"
echo "   - Update deployment: ./deploy-updates.sh" 