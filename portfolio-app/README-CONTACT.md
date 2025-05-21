# Contact Form Setup Instructions

This document provides instructions to set up the contact form functionality with SendGrid email integration.

## Prerequisites

1. A SendGrid account (sign up at [sendgrid.com](https://sendgrid.com))
2. API key from SendGrid
3. A verified sender email in SendGrid

## Backend Setup

### 1. Environment Configuration

Create a `.env` file in the `backend` directory with the following content:

```
# SendGrid Configuration
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=your_verified_sender_email@example.com
```

Replace the placeholders with your actual SendGrid API key and verified sender email.

### 2. Starting the Backend

Navigate to the backend directory and run:

```bash
mvn spring-boot:run
```

This will start the Spring Boot application on port 8080.

## Frontend Setup

The frontend is already configured to use the contact form. It proxies API requests to the backend using the `http-proxy-middleware` package.

## Testing the Contact Form

1. Start both the backend and frontend applications
2. Navigate to the contact page in the browser
3. Fill out the form and submit
4. Verify that the email is sent to the configured recipient email (bduggirala2@huskers.unl.edu)

## Troubleshooting

### Common Issues

1. **Email not sending**: Check that your SendGrid API key is valid and the sender email is verified
2. **CORS errors**: Make sure the backend CORS configuration includes your frontend URL
3. **Network errors**: Check that both frontend and backend are running and the proxy is configured correctly

### Logging

Check the backend logs for any errors related to the email sending process. The application logs at DEBUG level for the `com.bala.portfolio` package.

## Security Considerations

1. The SendGrid API key should be kept secret and not committed to version control
2. Consider implementing rate limiting to prevent form spam
3. Add CAPTCHA or other anti-spam measures for production use 