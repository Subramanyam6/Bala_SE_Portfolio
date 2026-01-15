#!/bin/bash

# Set Spring profile to local
export SPRING_PROFILES_ACTIVE=local

# Load local overrides if present
ENV_FILE="$(cd "$(dirname "$0")" && pwd)/.env"
if [ -f "$ENV_FILE" ]; then
  set -a
  . "$ENV_FILE"
  set +a
fi

# Local database password (for Docker SQL Server)
export LOCAL_DB_PASSWORD="${LOCAL_DB_PASSWORD:-MEMPShanmukh6!((}"

# Postmark configuration
export POSTMARK_SERVER_TOKEN="${POSTMARK_SERVER_TOKEN:-dummy-key-for-development}"
export POSTMARK_FROM_EMAIL="${POSTMARK_FROM_EMAIL:-bduggirala2@huskers.unl.edu}"

# JWT configuration
export JWT_SECRET="${JWT_SECRET:-local-development-jwt-secret}"

echo "Environment variables set for local development" 
