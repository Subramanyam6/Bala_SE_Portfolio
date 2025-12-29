# 🚀 Quick Start: Migrate Portfolio App to New GCP Account

## 📋 Prerequisites

1. **New GCP Account** with billing enabled
2. **gcloud CLI** installed and authenticated
3. **Docker** installed and running
4. **SendGrid API Key** ready
5. **Database backup** (if you want to migrate existing data)

## 🔧 Step-by-Step Migration

### 1. Create New GCP Project
```bash
# Create new project (replace with your desired project ID)
gcloud projects create your-new-portfolio-project

# Set as active project
gcloud config set project your-new-portfolio-project
```

### 2. Run Migration Script
```bash
# Make script executable (if not already)
chmod +x migrate-to-new-gcp.sh

# Run migration script
./migrate-to-new-gcp.sh your-new-portfolio-project
```

The script will:
- ✅ Enable required APIs
- ✅ Create Cloud SQL PostgreSQL instance
- ✅ Set up secrets (you'll provide values)
- ✅ Build and push Docker images
- ✅ Deploy Cloud Run services
- ✅ Update configuration files

### 3. Provide Required Values
When prompted, provide:
- **Database password** (will be auto-generated if you don't have one)
- **JWT secret** (generate a secure random string)
- **SendGrid API key** (from your SendGrid account)

### 4. Test the Migration
```bash
# Get your new service URLs
gcloud run services list --region=us-central1

# Test backend health
curl https://your-backend-url/actuator/health

# Test frontend
open https://your-frontend-url
```

## 🔄 Manual Migration (Alternative)

If you prefer to do it manually, follow the checklist in `GCP_DEPLOYMENT_DETAILS.md`.

## 📊 Current Deployment Summary

### Old Project (`portfolio-app-461419`)
- **Status:** Billing disabled (free credits expired)
- **Services:** Still running but may be stopped soon
- **Frontend:** https://portfolio-frontend-93780733243.us-central1.run.app
- **Backend:** https://portfolio-backend-93780733243.us-central1.run.app

### New Project (After Migration)
- **Status:** Active with billing enabled
- **Services:** Fresh deployment with same configuration
- **Database:** New PostgreSQL instance with same specs
- **Secrets:** Recreated with your provided values

## 🔐 Important Notes

### Secrets You Need to Provide:
1. **Database Password** - For PostgreSQL connection
2. **JWT Secret** - For authentication (generate a secure random string)
3. **SendGrid API Key** - For email functionality

### URLs to Update:
- CORS origins in `application-gcp.properties`
- Any hardcoded URLs in your code
- External references to your portfolio

### Data Migration:
- If you have existing data, you'll need to export from old database and import to new one
- Use `pg_dump` and `pg_restore` for PostgreSQL data migration

## 🆘 Troubleshooting

### Common Issues:
1. **Permission denied** - Ensure you have Owner role on new project
2. **Billing not enabled** - Enable billing before running migration
3. **Docker build fails** - Ensure Docker is running and you have sufficient disk space
4. **Database connection fails** - Check secrets are properly configured

### Useful Commands:
```bash
# Check project status
gcloud config get-value project

# View service logs
gcloud run services logs read portfolio-backend --region=us-central1

# Update deployment
./deploy-updates.sh

# Check billing status
gcloud billing accounts list
```

## ✅ Success Checklist

After migration, verify:
- [ ] Frontend loads correctly
- [ ] Backend API responds
- [ ] Database connection works
- [ ] Email functionality works
- [ ] Authentication works
- [ ] All features function as expected

## 📞 Support

If you encounter issues:
1. Check the logs: `gcloud run services logs read portfolio-backend --region=us-central1`
2. Verify all secrets are set correctly
3. Ensure billing is enabled on the new project
4. Check that all required APIs are enabled

---

**Note:** The migration script automates most of the process, but you'll still need to provide the secret values and test the functionality after deployment. 