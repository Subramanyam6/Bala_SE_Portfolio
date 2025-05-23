# Azure Deployment Setup Guide

This guide covers the required environment variables and configuration for deploying the portfolio application to Azure.

## Required Azure Environment Variables

### Backend App Service Environment Variables

Set these environment variables in your Azure App Service (portfolio-api-app):

#### Database Configuration
```
AZURE_SQL_SERVER=sql-mini-equip.database.windows.net
AZURE_SQL_DATABASE=portfolio_data
AZURE_SQL_USERNAME=azuredb_admin
AZURE_SQL_PASSWORD=<your-sql-password>
```

#### SendGrid Email Configuration
```
SENDGRID_API_KEY=<your-sendgrid-api-key>
SENDGRID_FROM_EMAIL=subramanyam.duggirala@outlook.com
```

#### CORS Configuration
```
CORS_ALLOWED_ORIGINS=https://bala-portfolio.azurewebsites.net
```

#### Security Configuration
```
JWT_SECRET=<your-secure-jwt-secret-key>
ADMIN_USERNAME=<admin-username>
ADMIN_PASSWORD=<admin-password>
```

## SendGrid Setup Instructions

### 1. Create SendGrid Account
1. Sign up for a SendGrid account at https://sendgrid.com/
2. Verify your sender identity (email address)
3. Create an API key with "Mail Send" permissions

### 2. Configure SendGrid API Key
1. Go to Azure Portal → App Services → portfolio-api-app
2. Navigate to Configuration → Application settings
3. Add new application setting:
   - Name: `SENDGRID_API_KEY`
   - Value: Your SendGrid API key

### 3. Configure From Email
1. Add application setting:
   - Name: `SENDGRID_FROM_EMAIL`
   - Value: `subramanyam.duggirala@outlook.com` (or your verified sender)

## Testing Email Functionality

### Local Testing
```bash
# Set environment variables locally
export SENDGRID_API_KEY="your-api-key"
export SENDGRID_FROM_EMAIL="subramanyam.duggirala@outlook.com"

# Run the application
cd portfolio-app/backend
mvn spring-boot:run
```

### Production Testing
1. Deploy to Azure with all environment variables set
2. Test the contact form on your live website
3. Check Azure App Service logs for any email-related errors

## Environment Variable Verification

The application includes logging to help verify configuration:

- Check logs for "SendGrid API key present: true/false"
- Development mode uses dummy key and logs email content
- Production mode sends actual emails via SendGrid

## Security Notes

- Never commit actual API keys to version control
- Use Azure Key Vault for sensitive configuration in production
- Rotate API keys regularly
- Monitor SendGrid usage and billing

## Troubleshooting

### Common Issues

1. **Email not sending in production**
   - Verify SENDGRID_API_KEY is set correctly
   - Check SendGrid account status and billing
   - Review Azure App Service logs

2. **CORS errors**
   - Ensure CORS_ALLOWED_ORIGINS matches your frontend URL
   - Check that both backend and frontend are deployed

3. **Database connection issues**
   - Verify Azure SQL credentials and firewall rules
   - Check connection strings in application properties

### Log Locations
- Azure Portal → App Services → portfolio-api-app → Log stream
- Azure Portal → App Services → portfolio-api-app → Advanced Tools → Kudu → LogFiles

## Production Checklist

- [ ] SendGrid API key configured
- [ ] From email verified in SendGrid
- [ ] CORS origins set to production frontend URL
- [ ] JWT secret configured securely
- [ ] Database credentials working
- [ ] Admin credentials set
- [ ] Test email functionality end-to-end 