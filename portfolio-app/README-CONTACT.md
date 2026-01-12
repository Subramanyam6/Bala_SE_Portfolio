# Contact Form Setup Instructions

This document provides instructions to set up the contact form functionality with Postmark email integration.

## Prerequisites

1. A Postmark account (sign up at [postmarkapp.com](https://postmarkapp.com))
2. Server token from Postmark
3. A verified sender email in Postmark

## Backend Setup

### 1. Environment Configuration

Set these environment variables before starting the backend:

```
# Postmark Configuration
POSTMARK_SERVER_TOKEN=your_postmark_server_token_here
POSTMARK_FROM_EMAIL=your_verified_sender_email@example.com
```

Replace the placeholders with your actual Postmark server token and verified sender email.

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

1. **Email not sending**: Check that your Postmark server token is valid and the sender email is verified
2. **CORS errors**: Make sure the backend CORS configuration includes your frontend URL
3. **Network errors**: Check that both frontend and backend are running and the proxy is configured correctly

### Logging

Check the backend logs for any errors related to the email sending process. The application logs at DEBUG level for the `com.bala.portfolio` package.

## Security Considerations

1. The Postmark server token should be kept secret and not committed to version control
2. Consider implementing rate limiting to prevent form spam
3. Add CAPTCHA or other anti-spam measures for production use
