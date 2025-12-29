#!/bin/bash

# Portfolio App GCP Deployment Script
# This script deploys both backend and frontend to Google Cloud Run

set -e  # Exit on any error

echo "🚀 Starting Portfolio App Deployment to GCP..."

# Set GCP project (adjust if needed)
echo "📋 Setting GCP project..."
gcloud config set project resounding-node-468020-e8

# Deploy Backend
echo ""
echo "🔨 Building and deploying backend..."
cd portfolio-app/backend

echo "  → Building JAR..."
mvn clean package -DskipTests

echo "  → Building and pushing Docker image..."
docker buildx build --platform linux/amd64 \
  -t gcr.io/resounding-node-468020-e8/portfolio-backend \
  --push .

echo "  → Deploying to Cloud Run..."
gcloud run deploy portfolio-backend \
  --image gcr.io/resounding-node-468020-e8/portfolio-backend \
  --platform managed \
  --region us-central1 \
  --add-cloudsql-instances=resounding-node-468020-e8:us-central1:portfolio-db \
  --set-secrets=DB_USER=db-user:latest,DB_PASS=db-pass:latest,POSTMARK_SERVER_TOKEN=postmark-server-token:latest,JWT_SECRET=jwt-secret:latest \
  --set-env-vars=POSTMARK_FROM_EMAIL=bduggirala2@huskers.unl.edu,SPRING_PROFILES_ACTIVE=gcp \
  --allow-unauthenticated

cd ../..

# Deploy Frontend
echo ""
echo "🎨 Building and deploying frontend..."
cd portfolio-app/frontend

echo "  → Building React app..."
npx vite build

echo "  → Building and pushing Docker image..."
docker buildx build --platform linux/amd64 \
  -t gcr.io/resounding-node-468020-e8/portfolio-frontend \
  --push .

echo "  → Deploying to Cloud Run..."
gcloud run deploy portfolio-frontend \
  --image gcr.io/resounding-node-468020-e8/portfolio-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

cd ../..

echo ""
echo "✅ Deployment completed successfully!"
echo "📱 Your applications are now live at:"
echo "   Backend: https://portfolio-backend-93780733243.us-central1.run.app"
echo "   Frontend: https://portfolio-frontend-93780733243.us-central1.run.app"
echo ""
echo "🔍 Check deployment status:"
echo "   gcloud run services list --region=us-central1" 