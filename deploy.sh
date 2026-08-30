#!/bin/bash

# oguzatalay.work - Automated VPS Deployment Script

echo "🚀 Starting Deployment Process..."

# Pull latest changes (if git repo)
if [ -d ".git" ]; then
  echo "📥 Pulling latest git updates..."
  git pull origin main || git pull
fi

# Install dependencies & Build
echo "📦 Installing npm dependencies..."
npm ci

echo "🛠️ Building production bundle..."
npm run build

echo "✅ Production build completed successfully!"

# Check if Docker is installed and running docker-compose
if command -v docker-compose &> /dev/null || docker compose version &> /dev/null; then
  echo "🐳 Deploying via Docker Compose..."
  docker compose down 2>/dev/null || docker-compose down 2>/dev/null
  docker compose up -d --build || docker-compose up -d --build
  echo "🎉 Docker deployment complete!"
elif command -v pm2 &> /dev/null; then
  echo "⚡ Deploying via PM2..."
  pm2 restart ecosystem.config.cjs || pm2 start ecosystem.config.cjs
  pm2 save
  echo "🎉 PM2 deployment complete!"
else
  echo "ℹ️ Statik build hazırdır (dist/ klasörü). Nginx / Web sunucunuzu dist/ klasörüne yönlendirebilirsiniz."
fi

echo "✨ Website deployment finished!"
