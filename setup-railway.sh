#!/bin/bash

echo "🚀 Setting up Railway deployment files..."

# Backend setup
echo "📦 Setting up Backend environment..."
cd Gestion-Chantier-Backend

if [ ! -f .env ]; then
    echo "📝 Creating .env file from example..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your Railway MySQL credentials!"
else
    echo "✅ .env file already exists"
fi

cd ..

# Frontend setup
echo "📦 Setting up Frontend environment..."
cd frontend

if [ ! -f .env ]; then
    echo "📝 Creating .env file from example..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your Railway backend URL!"
else
    echo "✅ .env file already exists"
fi

cd ..

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Push this repository to GitHub"
echo "2. Follow the RAILWAY_DEPLOYMENT_GUIDE.md for deployment instructions"
echo "3. Update environment variables in Railway dashboard"
echo ""
