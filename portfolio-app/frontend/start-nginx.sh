#!/bin/sh
# Substitute PORT environment variable in nginx config (default to 8080 if not set)
export PORT=${PORT:-8080}
envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
