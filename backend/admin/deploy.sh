#!/bin/bash

# 🚂 Railway Deployment Script for Dance Website Admin Panel
# This script automates the deployment process to Railway

set -e  # Exit on any error

echo "🚂 Starting Railway deployment for Dance Website Admin Panel..."
echo "=================================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
    echo "✅ Railway CLI installed successfully"
else
    echo "✅ Railway CLI found"
fi

# Check if logged in to Railway
echo "🔐 Checking Railway authentication..."
if ! railway whoami &> /dev/null; then
    echo "🔑 Please login to Railway..."
    railway login
    echo "✅ Successfully logged in to Railway"
else
    echo "✅ Already authenticated with Railway"
fi

# Initialize or link project
echo "🔗 Setting up Railway project..."
if [ ! -f ".railway" ]; then
    echo "📋 Choose an option:"
    echo "1. Create new Railway project"
    echo "2. Link to existing Railway project"
    read -p "Enter choice (1 or 2): " choice
    
    case $choice in
        1)
            echo "🆕 Creating new Railway project..."
            railway init
            ;;
        2)
            echo "🔗 Linking to existing project..."
            railway link
            ;;
        *)
            echo "❌ Invalid choice. Exiting..."
            exit 1
            ;;
    esac
else
    echo "✅ Railway project already linked"
fi

# Add PostgreSQL database if needed
echo "🗄️  Setting up PostgreSQL database..."
read -p "Do you need to add a PostgreSQL database? (y/n): " add_db
if [[ $add_db =~ ^[Yy]$ ]]; then
    railway add --database postgresql
    echo "✅ PostgreSQL database added"
fi

# Set environment variables
echo "⚙️  Setting up environment variables..."
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=dance_website_admin_jwt_secret_key_2025_production
railway variables set PORT=3001

echo "✅ Environment variables configured"

# Deploy the application
echo "🚀 Deploying application to Railway..."
railway up --detach

echo "📝 Getting deployment information..."
sleep 5
railway status
railway info

echo "=================================================="
echo "🎉 Deployment initiated successfully!"
echo ""
echo "📊 Next steps:"
echo "1. Wait for deployment to complete (check Railway dashboard)"
echo "2. Set up your database schema:"
echo "   railway connect postgresql"
echo "   Then run your SQL schema files"
echo ""
echo "3. Monitor deployment:"
echo "   railway logs --tail"
echo ""
echo "4. Open your deployed app:"
echo "   railway open"
echo ""
echo "🌐 Your admin panel will be available at:"
railway domain

echo "=================================================="
echo "✅ Deployment script completed!"
