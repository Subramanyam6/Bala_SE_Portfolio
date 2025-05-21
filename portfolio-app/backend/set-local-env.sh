#!/bin/bash

# Set Spring profile to local
export SPRING_PROFILES_ACTIVE=local

# Local database password (for Docker SQL Server)
export LOCAL_DB_PASSWORD="MEMPShanmukh6!(("

# SendGrid configuration (using Azure environment variables)
export SENDGRID_API_KEY="$SENDGRID_API_KEY"
export SENDGRID_FROM_EMAIL="subramanyam.duggirala@outlook.com"

# JWT configuration
export JWT_SECRET="local-development-jwt-secret"

echo "Environment variables set for local development" 