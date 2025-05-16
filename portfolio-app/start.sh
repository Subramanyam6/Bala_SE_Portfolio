#!/bin/bash

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker and Docker Compose."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose."
    exit 1
fi

# Start the application using Docker Compose
echo "Starting Portfolio Application..."
docker-compose up -d

# Wait for services to be ready
echo "Waiting for services to start..."
sleep 5

# Show service status
echo "Service status:"
docker-compose ps

echo ""
echo "Portfolio Application is running!"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:8080/api"
echo ""
echo "To stop the application, run: docker-compose down" 