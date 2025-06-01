# SendGrid Email Setup for Portfolio App

## 🚀 Quick Setup Guide

### Step 1: SendGrid Account Setup

1. **Go to [SendGrid](https://sendgrid.com/)** and log into your account
2. **Verify Sender Email:**
   - Go to Settings → Sender Authentication
   - Verify the email: `subramanyam.duggirala@outlook.com`
   - Follow the email verification process

3. **Create API Key with Proper Permissions:**
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Name it: `Portfolio-App-Email`
   - Select "Restricted Access"
   - Grant these permissions:
     - **Mail Send**: Full Access
     - **Mail Settings**: Read Access
   - Copy the API key (starts with `SG.`)

### Step 2: Update Secret in GCP

Once you have a properly configured API key, run this command:

```bash
# Delete old secret and create new one
gcloud secrets delete sendgrid-api-key --quiet
echo "YOUR_NEW_SENDGRID_API_KEY" | gcloud secrets create sendgrid-api-key --data-file=-

# Redeploy backend with updated secret
gcloud run services update portfolio-backend \
  --region=us-central1 \
  --set-secrets="SENDGRID_API_KEY=sendgrid-api-key:latest,JWT_SECRET=jwt-secret:latest"
```

### Step 3: Test Email Functionality

```bash
# Test the email endpoint
curl -X POST https://portfolio-backend-93780733243.us-central1.run.app/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-email@domain.com",
    "subject": "Test from Portfolio",
    "message": "Testing the SendGrid integration!",
    "wantsReply": true
  }'
```

### Step 4: Automated Deployment Script

Save this as `deploy-updates.sh`:

```bash
#!/bin/bash

# Portfolio App Deployment Script
set -e

echo "🚀 Starting Portfolio App Deployment..."

# Set correct GCP project
gcloud config set project portfolio-app-461419

# Build and deploy backend
echo "📦 Building and deploying backend..."
cd portfolio-app
gcloud builds submit . --config=cloudbuild.yaml

# Update environment variables
echo "⚙️  Updating environment variables..."
gcloud run services update portfolio-backend \
  --region=us-central1 \
  --set-env-vars="SPRING_PROFILES_ACTIVE=gcp,SENDGRID_FROM_EMAIL=subramanyam.duggirala@outlook.com,CORS_ALLOWED_ORIGINS=https://portfolio-frontend-93780733243.us-central1.run.app/" \
  --set-secrets="SENDGRID_API_KEY=sendgrid-api-key:latest,JWT_SECRET=jwt-secret:latest"

echo "✅ Deployment complete!"
echo "🌐 Frontend: https://portfolio-frontend-93780733243.us-central1.run.app/"
echo "🔧 Backend: https://portfolio-backend-93780733243.us-central1.run.app/"

# Test email functionality
echo "📧 Testing email functionality..."
curl -X POST https://portfolio-backend-93780733243.us-central1.run.app/api/contact/send \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Deployment Test",
    "email": "subramanyam.duggirala@outlook.com",
    "subject": "Portfolio Deployment Success",
    "message": "Email functionality is working correctly!",
    "wantsReply": false
  }'

echo "📧 Email test sent!"
```

## 🔧 Troubleshooting

### If you get 401 Unauthorized:
1. Check SendGrid API key permissions
2. Verify sender email is authenticated in SendGrid
3. Ensure API key has "Mail Send" full access

### If you get 403 Forbidden:
1. Check if sender email is verified in SendGrid
2. Verify domain authentication if using custom domain

### If emails don't arrive:
1. Check spam folder
2. Verify recipient email is valid
3. Check SendGrid activity logs

## 🚀 Current Setup Status

✅ **Secrets Created:**
- `sendgrid-api-key` - SendGrid API key
- `jwt-secret` - JWT authentication secret

✅ **Environment Variables Set:**
- `SPRING_PROFILES_ACTIVE=gcp`
- `SENDGRID_FROM_EMAIL=subramanyam.duggirala@outlook.com`
- `CORS_ALLOWED_ORIGINS=https://portfolio-frontend-93780733243.us-central1.run.app/`

✅ **Services Deployed:**
- Frontend: https://portfolio-frontend-93780733243.us-central1.run.app/
- Backend: https://portfolio-backend-93780733243.us-central1.run.app/

## 📝 Next Steps

1. **Fix SendGrid API Key** (follow Step 1-2 above)
2. **Test Email** (follow Step 3)
3. **Robot Loading Issue** ✅ FIXED - Robot now loads properly on first visit
4. **Azure Redirect** ✅ WORKING - Old Azure site redirects to new GCP site

---

**Note:** The robot loading issue has been fixed with the latest deployment. The email functionality just needs a properly configured SendGrid API key with the right permissions. 