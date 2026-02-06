#!/bin/bash

set -e

echo "Starting deployment..."

if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
    echo "Environment variables loaded"
fi

if ! command -v docker compose &> /dev/null; then
    echo "Error: docker compose is not installed"
    exit 1
fi

if ! docker network inspect edge &> /dev/null; then
    echo "Creating edge network..."
    docker network create edge
fi

echo "Stopping existing containers..."
docker compose -f docker-compose.prod.yml down || true

echo "Building images..."
docker compose -f docker-compose.prod.yml build --no-cache

echo "Starting services..."
docker compose -f docker-compose.prod.yml up -d

echo "Waiting for PostgreSQL to be ready..."
sleep 10

echo "Running database migrations..."
docker compose -f docker-compose.prod.yml exec -T backend npx prisma migrate deploy || \
docker compose -f docker-compose.prod.yml run --rm backend npx prisma migrate deploy

echo "Cleaning up old images..."
docker image prune -f

echo "Container status:"
docker compose -f docker-compose.prod.yml ps

echo "Deployment completed!"
echo ""
echo "View logs: docker compose -f docker-compose.prod.yml logs -f"
echo "View service logs: docker compose -f docker-compose.prod.yml logs -f [service]"
