#!/bin/bash

# Set Spring profile to local
export SPRING_PROFILES_ACTIVE=local

# Local database password (for Docker SQL Server)
export LOCAL_DB_PASSWORD="MEMPShanmukh6!(("

# Postmark configuration
export POSTMARK_SERVER_TOKEN="${POSTMARK_SERVER_TOKEN:-dummy-key-for-development}"
export POSTMARK_FROM_EMAIL="${POSTMARK_FROM_EMAIL:-bduggirala2@huskers.unl.edu}"

# JWT configuration
export JWT_SECRET="local-development-jwt-secret"

echo "Environment variables set for local development" 
