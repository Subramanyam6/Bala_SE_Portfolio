#!/bin/bash

# Set Spring profile to local
export SPRING_PROFILES_ACTIVE=local

# Load local secrets if present (ignored by git)
if [ -f .env.local ]; then
  set -a
  . ./.env.local
  set +a
elif [ -f .env ]; then
  set -a
  . ./.env
  set +a
fi

# Local database password (for Docker SQL Server)
export LOCAL_DB_PASSWORD="${LOCAL_DB_PASSWORD:-MEMPShanmukh6!((}"

# Postmark configuration
export POSTMARK_SERVER_TOKEN="${POSTMARK_SERVER_TOKEN}"
export POSTMARK_API_KEY="${POSTMARK_API_KEY}"
export POSTMARK_FROM_EMAIL="${POSTMARK_FROM_EMAIL:-subramanyam.duggirala@outlook.com}"
export POSTMARK_MESSAGE_STREAM="${POSTMARK_MESSAGE_STREAM:-outbound}"

# JWT configuration
export JWT_SECRET="${JWT_SECRET:-local-development-jwt-secret}"

echo "Environment variables set for local development"
