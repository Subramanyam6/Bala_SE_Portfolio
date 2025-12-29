# GCP Portfolio App Deployment Details

## 📋 Project Information

**Project ID:** `portfolio-app-461419`  
**Project Number:** `93780733243`  
**Project Name:** `portfolio-app`  
**Created:** `2025-05-30T19:31:14.611792Z`  
**Status:** `ACTIVE` (but billing disabled - free credits expired)

## 🚀 Cloud Run Services

### Backend Service (`portfolio-backend`)
- **URL:** https://portfolio-backend-93780733243.us-central1.run.app
- **Region:** us-central1
- **Image:** gcr.io/portfolio-app-461419/portfolio-backend
- **Port:** 8080
- **Memory:** 512Mi
- **CPU:** 1000m
- **Max Instances:** 3
- **Concurrency:** 80
- **Timeout:** 300s
- **Last Updated:** 2025-06-09T22:08:34.036531Z

#### Environment Variables:
- `SENDGRID_FROM_EMAIL`: subramanyam.duggirala@outlook.com
- `SPRING_PROFILES_ACTIVE`: gcp

#### Secrets:
- `DB_PASS`: db-pass:latest
- `DB_USER`: db-user:latest
- `JWT_SECRET`: jwt-secret:latest
- `SENDGRID_API_KEY`: sendgrid-api-key:latest

#### Cloud SQL Connection:
- **Instance:** portfolio-app-461419:us-central1:portfolio-db

### Frontend Service (`portfolio-frontend`)
- **URL:** https://portfolio-frontend-93780733243.us-central1.run.app
- **Region:** us-central1
- **Image:** gcr.io/portfolio-app-461419/portfolio-frontend
- **Port:** 80
- **Memory:** 512Mi
- **CPU:** 1000m
- **Max Instances:** 3
- **Concurrency:** 80
- **Timeout:** 300s
- **Last Updated:** 2025-06-09T22:09:12.875791Z

## 🗄️ Cloud SQL Database

### Instance Details (`portfolio-db`)
- **Connection Name:** portfolio-app-461419:us-central1:portfolio-db
- **Database Version:** POSTGRES_17
- **Region:** us-central1
- **Zone:** us-central1-c
- **Tier:** db-custom-2-8192 (2 vCPU, 8GB RAM)
- **Storage:** 10GB PD_SSD (auto-resize enabled)
- **Backup:** Enabled (7 days retention)
- **Maintenance Window:** Sunday 00:00
- **IP Addresses:**
  - Primary: 34.9.202.3
  - Outgoing: 34.66.73.172

## 🔐 Secrets (Billing Required to Access)
The following secrets are configured but require billing to be enabled to access:
- `db-pass` - Database password
- `db-user` - Database username
- `jwt-secret` - JWT authentication secret
- `sendgrid-api-key` - SendGrid API key

## 🏗️ Infrastructure Components

### Container Registry
- **Repository:** gcr.io/portfolio-app-461419
- **Images:**
  - `portfolio-backend`
  - `portfolio-frontend`

### Service Accounts
- **Compute Service Account:** 93780733243-compute@developer.gserviceaccount.com
- **Cloud SQL Service Account:** p93780733243-zqx3hx@gcp-sa-cloud-sql.iam.gserviceaccount.com

### IAM Roles
- **Owner:** balasubramanyam.duggirala@gmail.com
- **Editor:** 93780733243-compute@developer.gserviceaccount.com, 93780733243@cloudservices.gserviceaccount.com
- **Secret Accessor:** 93780733243-compute@developer.gserviceaccount.com

## 📁 Application Structure

### Backend (Spring Boot)
- **Framework:** Spring Boot with Java 17
- **Database:** PostgreSQL 17
- **Authentication:** JWT
- **Email:** SendGrid integration
- **CORS:** Configured for frontend domain
- **Profile:** gcp (for production)

### Frontend (React + Vite)
- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Deployment:** Nginx container
- **Port:** 80 (internal), 3000 (external)

## 🔧 Deployment Scripts

### Main Deployment Script (`deploy.sh`)
- Sets project: `portfolio-app-461419`
- Builds and pushes Docker images to Container Registry
- Deploys to Cloud Run with proper configuration
- Sets up secrets and environment variables

### Update Deployment Script (`deploy-updates.sh`)
- Uses Cloud Build for deployment
- Updates environment variables
- Tests email functionality

## 📧 Email Configuration
- **Provider:** SendGrid
- **From Email:** subramanyam.duggirala@outlook.com
- **API Key:** Stored in Secret Manager
- **Verified Sender:** subramanyam.duggirala@outlook.com

## 🌐 Domain Configuration
- **Frontend URL:** https://portfolio-frontend-93780733243.us-central1.run.app
- **Backend URL:** https://portfolio-backend-93780733243.us-central1.run.app
- **CORS Origins:** Configured for frontend domain

## ⚠️ Current Status
- **Billing:** DISABLED (free credits expired)
- **Services:** Still running but may be stopped soon
- **Access:** Limited due to billing restrictions

## 📋 Migration Checklist for New GCP Account

### 1. Project Setup
- [ ] Create new GCP project
- [ ] Enable billing
- [ ] Enable required APIs:
  - Cloud Run API
  - Cloud SQL Admin API
  - Container Registry API
  - Secret Manager API
  - Cloud Build API

### 2. Database Setup
- [ ] Create Cloud SQL PostgreSQL instance
- [ ] Configure database settings (same as current)
- [ ] Create database and user
- [ ] Import data (if needed)

### 3. Secrets Setup
- [ ] Create Secret Manager secrets:
  - `db-pass`
  - `db-user`
  - `jwt-secret`
  - `sendgrid-api-key`

### 4. Container Registry
- [ ] Build and push images to new project's registry
- [ ] Update image references in deployment scripts

### 5. Cloud Run Services
- [ ] Deploy backend service with same configuration
- [ ] Deploy frontend service with same configuration
- [ ] Configure environment variables and secrets

### 6. Domain and DNS
- [ ] Update CORS configuration for new URLs
- [ ] Configure custom domain (if needed)
- [ ] Update redirector configuration

### 7. Testing
- [ ] Test backend API endpoints
- [ ] Test frontend functionality
- [ ] Test email functionality
- [ ] Test database connections

## 🔄 Migration Commands

### Update deployment scripts for new project:
```bash
# Update project ID in deploy.sh
sed -i 's/portfolio-app-461419/NEW_PROJECT_ID/g' deploy.sh

# Update project ID in deploy-updates.sh
sed -i 's/portfolio-app-461419/NEW_PROJECT_ID/g' deploy-updates.sh

# Update image references
sed -i 's/gcr.io\/portfolio-app-461419/gcr.io\/NEW_PROJECT_ID/g' deploy.sh
```

### Update application properties:
```bash
# Update CORS origins in application-gcp.properties
# Update any hardcoded URLs
```

This documentation provides a complete blueprint for recreating your portfolio app in a new GCP account with the same configuration and functionality. 