# Render Deployment - Quick Start Checklist

## ✅ What's Ready

Your portfolio application has been fully configured for Render deployment:

- ✅ **render.yaml** - Infrastructure as Code configuration
- ✅ **application-render.properties** - Render-specific Spring Boot config
- ✅ **pom.xml** - Added Spring Boot Actuator for health checks
- ✅ **Dockerfiles** - Already compatible with Render
- ✅ **Health endpoint** - Configured at `/actuator/health`
- ✅ **All documentation** - See `RENDER_DEPLOYMENT_GUIDE.md`

## 🎯 What You Need to Do

### 1. Get Postmark Server Token (5 minutes)

1. Sign up at [postmarkapp.com](https://postmarkapp.com)
2. Verify your sender email: `bduggirala2@huskers.unl.edu`
3. Copy your **Server Token** from the dashboard
4. Save it somewhere safe (you'll need it in step 3)

### 2. Generate JWT Secret (1 minute)

Run this command to generate a secure JWT secret:

**Mac/Linux:**
```bash
openssl rand -base64 64
```

**Windows PowerShell:**
```powershell
[Convert]::ToBase64String((1..64 | ForEach-Object { Get-Random -Maximum 256 }))
```

Copy the output and save it (you'll need it in step 3).

### 3. Commit and Push to GitHub (2 minutes)

```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### 4. Deploy to Render (20 minutes)

1. **Sign up** at [render.com](https://render.com) (it's free)

2. **Connect GitHub**:
   - Click **"New +"** → **"Blueprint"**
   - Connect your GitHub account
   - Select this repository
   - Click **"Connect"**

3. **Render will automatically create**:
   - PostgreSQL database
   - Backend service
   - Frontend service

4. **Set environment variables** (Important!):
   - Go to **portfolio-backend** service
   - Click **"Environment"** tab
   - Add these **two** secret variables:

   | Variable Name | Value |
   |---------------|-------|
   | `JWT_SECRET` | Paste the value you generated in step 2 |
   | `POSTMARK_SERVER_TOKEN` | Paste the value from step 1 |

5. **Click "Save Changes"** - Render will start deploying

6. **Wait for deployment** (10-15 minutes):
   - Watch the logs in Render dashboard
   - All services should show "Live" status

7. **Test your application**:
   - Click on **portfolio-frontend** → Copy the URL
   - Open it in your browser
   - Try the contact form

## 🔧 If Something Goes Wrong

See the troubleshooting section in `RENDER_DEPLOYMENT_GUIDE.md`.

Common issues:
- **Backend won't start**: Check if database is ready (wait 2 minutes, then redeploy)
- **Contact form fails**: Verify Postmark sender email is verified
- **CORS errors**: These should auto-resolve once all services are deployed

## 📊 Your URLs

After deployment, your app will be at:
- **Frontend**: `https://portfolio-frontend.onrender.com`
- **Backend**: `https://portfolio-backend.onrender.com`
- **Health Check**: `https://portfolio-backend.onrender.com/actuator/health`

## 💰 Cost

**$0/month** on free tier

**Note**: Services spin down after 15 minutes of inactivity (first request takes 30-60 seconds to wake up).

## 📚 Need More Details?

See `RENDER_DEPLOYMENT_GUIDE.md` for comprehensive documentation including:
- Detailed troubleshooting
- Environment variables reference
- Custom domain setup
- Database backups
- Upgrading from free tier

## 🚀 Time Estimate

- Postmark setup: 5 minutes
- Generate JWT: 1 minute
- Commit & push: 2 minutes
- Render deployment: 20 minutes
- Testing: 5 minutes

**Total: ~30 minutes**

---

**Ready?** Start with step 1 above! 🎉
