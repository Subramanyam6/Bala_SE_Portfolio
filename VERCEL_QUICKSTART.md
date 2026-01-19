# Deploy Frontend to Vercel (with Render Backend)

## Quick Deploy Steps

### 1. Update Backend URL

Edit `vercel.json` in the repo root:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://YOUR-ACTUAL-BACKEND.onrender.com/api/:path*"
    }
  ]
}
```

Replace `YOUR-ACTUAL-BACKEND` with your Render backend URL.

### 2. Deploy on Vercel

**Option A: Import from GitHub (Recommended)**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your GitHub repository
4. Choose branch: `Vercel-Version`
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `.` (leave as root)
   - **Build Command**: (leave empty - uses vercel.json)
   - **Output Directory**: (leave empty - uses vercel.json)
6. Click "Deploy"

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /path/to/your/repo
git checkout Vercel-Version
vercel --prod
```

### 3. Update Backend CORS

After Vercel gives you a URL (e.g., `https://your-app.vercel.app`):

1. Go to your Render backend dashboard
2. Go to Environment Variables
3. Update `CORS_ALLOWED_ORIGINS` to include:
   ```
   https://your-app.vercel.app
   ```
4. Save and redeploy backend

### 4. Test

Visit `https://your-app.vercel.app` and test the contact form.

## Troubleshooting

**Build fails?**
- Check `vercel.json` has correct paths
- Ensure `portfolio-app/frontend` has all dependencies

**CORS errors?**
- Verify backend CORS includes your Vercel URL
- Check `vercel.json` rewrite destination is correct

**API calls fail?**
- Test backend URL directly: `curl https://your-backend.onrender.com/api/actuator/health`
- Check Network tab in browser devtools

## Architecture

```
Vercel (Frontend CDN) → Render (Spring Boot Backend)
```

Frontend on Vercel, Backend on Render. API calls proxied through Vercel.
