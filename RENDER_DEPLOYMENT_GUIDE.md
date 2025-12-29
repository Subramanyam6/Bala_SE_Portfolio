# Portfolio Application - Render Deployment Guide

## Overview

This guide will walk you through deploying your full-stack portfolio application (Spring Boot backend + React frontend + PostgreSQL database) on Render's free tier.

## Prerequisites

1. **GitHub Account** - Your code must be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com) (free)
3. **Postmark Account** - For sending emails via contact form
   - Sign up at [postmarkapp.com](https://postmarkapp.com)
   - Verify your sender email address
   - Get your Server Token from the dashboard

## Important Notes

- **Free Tier Limitations**:
  - Backend and frontend services spin down after 15 minutes of inactivity
  - First request after inactivity takes 30-60 seconds (cold start)
  - PostgreSQL database is deleted after 90 days of inactivity
  - 750 hours/month of runtime (shared across all services)

- **Cost**: Completely free if you stay within limits

## Deployment Steps

### Step 1: Prepare Your Repository

1. **Commit all changes** to your GitHub repository:
   ```bash
   git add .
   git commit -m "Add Render configuration for deployment"
   git push origin main
   ```

2. **Verify these files exist** in your repository root:
   - `render.yaml` (Infrastructure as Code configuration)
   - `portfolio-app/backend/src/main/resources/application-render.properties`

### Step 2: Create Render Account and Connect GitHub

1. Go to [render.com](https://render.com) and sign up
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub account when prompted
4. Select your portfolio repository
5. Click **"Connect"**

### Step 3: Configure Environment Variables

Render will automatically read your `render.yaml` file and create all services. However, you need to manually set some secret environment variables:

#### For Backend Service (`portfolio-backend`):

1. Go to your Render Dashboard
2. Click on **"portfolio-backend"** service
3. Go to **"Environment"** tab
4. Add the following environment variables:

| Variable Name | Value | Description |
|---------------|-------|-------------|
| `JWT_SECRET` | Generate a secure random string | Used for JWT token signing. Generate using: `openssl rand -base64 64` |
| `POSTMARK_SERVER_TOKEN` | Your Postmark Server Token | Get from Postmark dashboard after signup |
| `POSTMARK_FROM_EMAIL` | `bduggirala2@huskers.unl.edu` | Your verified sender email in Postmark |

**To generate JWT_SECRET** (on Mac/Linux):
```bash
openssl rand -base64 64
```

**To generate JWT_SECRET** (on Windows):
- Use an online tool like [randomkeygen.com](https://randomkeygen.com)
- Or use this command in PowerShell:
```powershell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 }))
```

#### Environment Variables Automatically Set by Render:

These are automatically configured via `render.yaml` - **you don't need to set these**:
- `SPRING_PROFILES_ACTIVE=render`
- `DATABASE_URL` (from PostgreSQL database)
- `DB_USER` (from PostgreSQL database)
- `DB_PASS` (from PostgreSQL database)
- `DB_HOST` (from PostgreSQL database)
- `DB_PORT` (from PostgreSQL database)
- `DB_NAME` (from PostgreSQL database)
- `CORS_ALLOWED_ORIGINS` (from frontend URL)

#### For Frontend Service (`portfolio-frontend`):

Automatically configured via `render.yaml`:
- `BACKEND_URL` (from backend service URL)
- `PORT=10000`

### Step 4: Deploy with Blueprint

1. After adding the secret environment variables to backend service, click **"Apply"** or **"Save Changes"**
2. Render will automatically:
   - Create PostgreSQL database (`portfolio-database`)
   - Build and deploy backend service (`portfolio-backend`)
   - Build and deploy frontend service (`portfolio-frontend`)
   - Configure all networking and environment variables

3. **Monitor the deployment**:
   - Click on each service to see build logs
   - Backend build takes ~5-10 minutes (Maven build + Docker)
   - Frontend build takes ~3-5 minutes (npm build + Docker)
   - Database is created instantly

### Step 5: Verify Deployment

Once all services show **"Live"** status:

1. **Get your URLs**:
   - Frontend: `https://portfolio-frontend.onrender.com`
   - Backend: `https://portfolio-backend.onrender.com`
   - (Exact URLs will be shown in Render dashboard)

2. **Test the application**:
   - Open the frontend URL in your browser
   - Navigate around the site
   - **Test contact form**: Fill out and submit (check if email arrives)
   - Check browser console for any errors

3. **Verify backend health**:
   - Visit: `https://portfolio-backend.onrender.com/actuator/health`
   - Should return: `{"status":"UP"}`

### Step 6: Test Email Functionality

1. **Verify Postmark sender**:
   - Go to Postmark dashboard → Senders
   - Make sure `bduggirala2@huskers.unl.edu` is verified
   - If not, verify it by clicking the verification email

2. **Test contact form**:
   - Go to your portfolio's contact page
   - Fill out the form with test data
   - Submit
   - Check the email inbox of the recipient

### Step 7: Custom Domain (Optional)

To use a custom domain instead of `*.onrender.com`:

1. **For Frontend**:
   - Go to portfolio-frontend service → Settings
   - Scroll to "Custom Domain"
   - Add your domain (e.g., `portfolio.yourname.com`)
   - Follow DNS configuration instructions

2. **Update CORS**:
   - After adding custom domain, update backend environment:
   - Add your custom domain to `CORS_ALLOWED_ORIGINS`
   - Example: `https://portfolio.yourname.com,https://portfolio-frontend.onrender.com`

## Troubleshooting

### Backend Won't Start

**Check logs**: Render Dashboard → portfolio-backend → Logs

**Common issues**:

1. **Database connection failed**:
   - Verify database is created and running
   - Check if `DB_*` environment variables are set
   - Solution: Wait for database to be fully created, then redeploy backend

2. **Missing JWT_SECRET**:
   - Error: "JWT secret is required"
   - Solution: Add `JWT_SECRET` environment variable to backend service

3. **Port binding error**:
   - Ensure `application-render.properties` has `server.port=10000`
   - Render expects services to listen on port 10000

### Frontend Shows "Failed to fetch"

**Possible causes**:

1. **Backend not running**:
   - Check if backend service is "Live"
   - Visit backend health endpoint: `https://portfolio-backend.onrender.com/actuator/health`

2. **CORS error**:
   - Check browser console for CORS errors
   - Verify `CORS_ALLOWED_ORIGINS` includes frontend URL
   - Solution: Update backend environment variable and redeploy

3. **Wrong backend URL**:
   - Check if `BACKEND_URL` is correctly set in frontend environment
   - Should be: `https://portfolio-backend.onrender.com` (your exact backend URL)

### Contact Form Not Sending Emails

1. **Check Postmark token**:
   - Verify `POSTMARK_SERVER_TOKEN` is set correctly in backend environment
   - No quotes, just the token string

2. **Check sender verification**:
   - Postmark requires sender email to be verified
   - Go to Postmark dashboard and verify `bduggirala2@huskers.unl.edu`

3. **Check backend logs**:
   - Look for errors related to email sending
   - Postmark returns detailed error messages

### Database Connection Issues

1. **Database not ready**:
   - If backend starts before database is ready, it may fail
   - Solution: Wait 1-2 minutes, then click "Manual Deploy" on backend

2. **Connection pool exhausted**:
   - Free tier has connection limits
   - `application-render.properties` already configures pool size (max 5)
   - If you see this error, database may be overloaded

### Cold Starts (Slow First Request)

**This is normal on free tier**:
- Services spin down after 15 minutes of inactivity
- First request wakes them up (30-60 seconds)
- Subsequent requests are fast
- **No solution** on free tier (upgrade to paid plan for always-on)

## Maintenance

### Updating Your Application

1. **Make changes locally** and test
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
3. **Auto-deploy**: Render automatically detects changes and redeploys
4. **Monitor**: Check Render dashboard for deployment status

### Manual Redeploy

If auto-deploy doesn't trigger:
1. Go to service in Render dashboard
2. Click **"Manual Deploy"** → **"Deploy latest commit"**

### Viewing Logs

1. Go to Render dashboard
2. Click on service name
3. Click **"Logs"** tab
4. View real-time logs (helps with debugging)

### Database Backups

**Important**: Free tier databases are deleted after 90 days of inactivity.

**To backup**:
1. Use Render's built-in backup (manual)
2. Or use `pg_dump`:
   ```bash
   # Get database URL from Render dashboard
   pg_dump <DATABASE_URL> > backup.sql
   ```

**To restore**:
```bash
psql <DATABASE_URL> < backup.sql
```

## Environment Variables Reference

### Backend (`portfolio-backend`)

| Variable | Source | Required | Description |
|----------|--------|----------|-------------|
| `SPRING_PROFILES_ACTIVE` | Manual | Yes | Set to `render` |
| `DATABASE_URL` | Auto (from DB) | Yes | PostgreSQL connection string |
| `DB_USER` | Auto (from DB) | Yes | Database username |
| `DB_PASS` | Auto (from DB) | Yes | Database password |
| `DB_HOST` | Auto (from DB) | Yes | Database host |
| `DB_PORT` | Auto (from DB) | Yes | Database port (5432) |
| `DB_NAME` | Auto (from DB) | Yes | Database name |
| `JWT_SECRET` | Manual | Yes | JWT signing secret (64+ chars) |
| `POSTMARK_SERVER_TOKEN` | Manual | Yes | Postmark API token |
| `POSTMARK_FROM_EMAIL` | Auto | Yes | Sender email (verified in Postmark) |
| `CORS_ALLOWED_ORIGINS` | Auto (from frontend) | Yes | Frontend URL for CORS |

### Frontend (`portfolio-frontend`)

| Variable | Source | Required | Description |
|----------|--------|----------|-------------|
| `BACKEND_URL` | Auto (from backend) | Yes | Backend API URL |
| `PORT` | Manual | Yes | Port nginx listens on (10000) |

## Cost Breakdown (Free Tier)

- **PostgreSQL Database**: Free (with 90-day inactivity limit)
- **Backend Service**: Free (750 hours/month)
- **Frontend Service**: Free (750 hours/month)
- **Bandwidth**: 100 GB/month free
- **Build Minutes**: Unlimited

**Total**: $0/month

## Upgrading from Free Tier

If you need:
- No cold starts (always-on)
- More than 90 days database retention
- More resources

**Recommended plans**:
- **Database**: $7/month (no expiration)
- **Web Services**: $7/month each (always-on, more resources)

## Getting Help

1. **Render Documentation**: [render.com/docs](https://render.com/docs)
2. **Render Community**: [community.render.com](https://community.render.com)
3. **Postmark Support**: [postmarkapp.com/support](https://postmarkapp.com/support)

## Quick Reference Commands

### Generate JWT Secret
```bash
# Mac/Linux
openssl rand -base64 64

# Windows PowerShell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 }))
```

### Check Backend Health
```bash
curl https://portfolio-backend.onrender.com/actuator/health
```

### View Database Connection Info
```bash
# In Render dashboard → Database → Connection Info
# Internal URL (use this): postgres://user:pass@host:5432/db
```

## What You Need to Do

### Required Actions Before Deployment:

1. ✅ **Commit and push** all changes to GitHub
2. ✅ **Create Render account** at render.com
3. ✅ **Get Postmark Server Token**:
   - Sign up at postmarkapp.com
   - Verify sender email: `bduggirala2@huskers.unl.edu`
   - Copy Server Token from dashboard
4. ✅ **Generate JWT Secret** (see command above)
5. ✅ **Deploy using Blueprint** (connect GitHub repo)
6. ✅ **Add environment variables**:
   - `JWT_SECRET` (generated above)
   - `POSTMARK_SERVER_TOKEN` (from Postmark)
7. ✅ **Test the application** (frontend, backend, contact form)

### Time Estimate:
- Setup: 15-20 minutes
- First deployment: 10-15 minutes
- Testing: 5-10 minutes
- **Total**: ~30-45 minutes

## Summary

Your portfolio will be accessible at:
- **Frontend**: `https://portfolio-frontend.onrender.com`
- **Backend**: `https://portfolio-backend.onrender.com`
- **Database**: Internal PostgreSQL (managed by Render)

After deployment, your app will:
- ✅ Auto-deploy on every git push
- ✅ Auto-scale based on traffic
- ✅ Auto-manage SSL certificates
- ✅ Have health checks and monitoring
- ✅ Send emails via Postmark

**Cost**: $0/month 🎉

---

**Need help?** Check Troubleshooting section above or contact Render support.
