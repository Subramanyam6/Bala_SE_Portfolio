#!/bin/sh

# Set default port if not provided
PORT=${PORT:-8080}
BACKEND_URL=${BACKEND_URL:-http://localhost:8080}

# Replace the port in nginx config
sed -i "s/listen 8080;/listen $PORT;/" /etc/nginx/conf.d/default.conf
# Inject backend URL into nginx config
sed -i "s#\${BACKEND_URL}#$BACKEND_URL#" /etc/nginx/conf.d/default.conf

# Start nginx
nginx -g "daemon off;" 