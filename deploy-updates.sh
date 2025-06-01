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