# Vercel Deployment Guide

## Overview
Both frontend and backend (serverless API) deployed on Vercel.

## Architecture
- Frontend: React/Vite static site
- Backend: Vercel Serverless Functions (Node.js)
- API Endpoint: `/api/contact/send`

## Prerequisites
1. Vercel account ([vercel.com](https://vercel.com))
2. GitHub repository
3. Email credentials (Gmail/SendGrid/Postmark)

## Deployment Steps

### 1. Configure Email Service

Choose one option:

**Option A: Gmail**
1. Enable 2FA on your Gmail account
2. Generate App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Save credentials for step 3

**Option B: SendGrid**
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Create API key
3. Verify sender email

### 2. Deploy to Vercel

**Via Dashboard:**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Root directory: Leave as `.` (root)
4. Framework: Vite (auto-detected)
5. Click "Deploy"

**Via CLI:**
```bash
npm i -g vercel
vercel
```

### 3. Set Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables:

| Variable | Value | Example |
|----------|-------|---------|
| `SMTP_HOST` | SMTP server | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | Email username | `your-email@gmail.com` |
| `SMTP_PASSWORD` | Email password | `your-app-password` |
| `FROM_EMAIL` | Sender email | `noreply@yourdomain.com` |
| `TO_EMAIL` | Recipient email | `bduggirala2@huskers.unl.edu` |

**For Gmail:**
- SMTP_HOST: `smtp.gmail.com`
- SMTP_PORT: `587`
- SMTP_USER: Your Gmail address
- SMTP_PASSWORD: App Password (not regular password)

### 4. Redeploy

After setting environment variables:
1. Go to Deployments tab
2. Click "Redeploy" on latest deployment

### 5. Test

Visit your Vercel URL → Contact page → Submit form

## Project Structure

```
/
├── api/
│   ├── contact.js          # Serverless function
│   └── package.json        # API dependencies
├── portfolio-app/
│   └── frontend/           # React app
├── vercel.json             # Vercel config
└── .vercelignore           # Ignored files
```

## API Endpoints

- `POST /api/contact/send` - Send contact form email

## Troubleshooting

**Email not sending:**
- Check environment variables are set
- Verify email credentials
- Check Vercel function logs

**CORS errors:**
- Already configured in `vercel.json`
- Should work out of the box

**Build fails:**
- Check `portfolio-app/frontend` has valid build
- Ensure all dependencies in `package.json`

## Custom Domain

1. Vercel Dashboard → Domains
2. Add your domain
3. Configure DNS records

## Files Modified for Vercel

- ✅ `/api/contact.js` - Serverless contact endpoint
- ✅ `/api/package.json` - API dependencies
- ✅ `/vercel.json` - Vercel configuration
- ✅ `/.vercelignore` - Ignore unnecessary files
- ✅ `/portfolio-app/frontend/package.json` - Added vercel-build script

## Notes

- Spring Boot backend not included (Vercel doesn't support Java)
- Only contact form endpoint implemented
- For full backend, use Render/Railway + Vercel frontend
