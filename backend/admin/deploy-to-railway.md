# 🚂 Deploy Admin Panel to Railway

## Why Railway?
Railway is perfect for your Express.js admin panel because it provides:
- ✅ **Native Node.js support** (no serverless limitations)
- ✅ **Built-in PostgreSQL** database hosting
- ✅ **Persistent connections** (better for admin panels)
- ✅ **Simple deployment** from Git repositories
- ✅ **Free tier** with $5/month credits
- ✅ **Automatic SSL certificates**

## 🚀 Deployment Steps

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub account (recommended)
3. Verify your account

### Step 2: Create New Project
1. Click **"New Project"**
2. Choose **"Deploy from GitHub repo"**
3. Connect your GitHub account if needed
4. Select your dance-website repository
5. Choose the `/backend/admin` folder as root directory

### Step 3: Add PostgreSQL Database
1. In your project dashboard, click **"+ New"**
2. Select **"Database"**
3. Choose **"PostgreSQL"**
4. Railway will create a database and provide connection details

### Step 4: Configure Environment Variables
In your Railway project dashboard:

1. Go to **"Variables"** tab
2. Add these environment variables:

```env
# Database Configuration (Railway will auto-generate DATABASE_URL)
# But you can also set individual vars:
DB_USER=postgres
DB_HOST=your-railway-db-host
DB_PORT=5432
DB_NAME=railway
# DB_PASSWORD will be auto-generated

# Application Configuration
JWT_SECRET=dance_website_admin_jwt_secret_key_2025_production
NODE_ENV=production
PORT=3001

# Optional: For custom domain
ADMIN_BASE_URL=https://your-app-name.up.railway.app
```

### Step 5: Deploy Your Database Schema

#### Option A: Using Railway CLI (Recommended)
```bash
# Login to Railway
railway login

# Link to your project
railway link

# Connect to database
railway run psql

# Run your SQL files
\i /Users/hemantd/dance-website-nextjs/database/schema.sql
\i /Users/hemantd/dance-website-nextjs/database/indexes.sql
\i /Users/hemantd/dance-website-nextjs/database/sample_data.sql
```

#### Option B: Using PostgreSQL Client
1. Get database connection string from Railway dashboard
2. Connect using psql or pgAdmin:
```bash
psql "postgresql://postgres:password@host:port/database"
```
3. Import your schema files

### Step 6: Deploy Application
1. Push your code to GitHub (if not already)
2. Railway will automatically detect changes and deploy
3. Monitor deployment in Railway dashboard
4. Your app will be available at: `https://your-app-name.up.railway.app`

## 🔧 Configuration Files Added

### `railway.json`
- Configures Railway-specific deployment settings
- Sets health check path and restart policies
- Uses Nixpacks builder

### `nixpacks.toml`
- Specifies Node.js 18 runtime
- Production environment configuration
- Automatic build process

## 📊 Database Migration Script

Save this as `migrate-to-railway.sql`:

```sql
-- Create the database schema
\i /Users/hemantd/dance-website-nextjs/database/schema.sql

-- Create indexes for better performance
\i /Users/hemantd/dance-website-nextjs/database/indexes.sql

-- Insert sample data
\i /Users/hemantd/dance-website-nextjs/database/sample_data.sql

-- Verify data
SELECT 'Users' as table_name, count(*) as count FROM users
UNION ALL
SELECT 'Venues', count(*) FROM venues
UNION ALL
SELECT 'Classes', count(*) FROM classes
UNION ALL
SELECT 'Events', count(*) FROM events;
```

## 🌐 Custom Domain Setup (Optional)

1. In Railway dashboard, go to **"Settings"**
2. Click **"Domains"**
3. Add your custom domain: `admin.yourdancewebsite.com`
4. Update DNS records as shown in Railway
5. SSL certificate will be automatically provisioned

## 🔒 Production Security Checklist

- [ ] Strong JWT secret in production
- [ ] Database password is secure (Railway auto-generates)
- [ ] Environment variables are set correctly
- [ ] SSL certificate is active
- [ ] Rate limiting is enabled (already configured in your app)
- [ ] CORS is properly configured
- [ ] Helmet security headers are active

## 📈 Monitoring & Maintenance

### Railway Dashboard Features:
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, and request analytics  
- **Deployments**: History and rollback options
- **Database**: Query runner and connection info

### Health Checks:
- Railway automatically monitors your `/` endpoint
- Restarts application if health check fails
- Configure custom health check in `railway.json`

## 💰 Pricing

### Railway Free Tier:
- **$5/month in credits** (use what you need)
- **512MB RAM** per service
- **1GB disk** storage
- **100GB network** usage
- **No time limits**

### Typical Usage:
- **Admin Panel**: ~$2-3/month
- **PostgreSQL**: ~$1-2/month  
- **Total**: ~$3-5/month

## 🚀 Quick Deploy Commands

```bash
# Make sure you're using Node 18
nvm use 18.20.8

# Login to Railway (opens browser)
railway login

# Link to existing project OR create new one
railway link
# OR
railway init

# Add PostgreSQL to project
railway add --database postgresql

# Deploy immediately
railway up

# View logs
railway logs

# Open deployed app
railway open
```

## 🎯 Alternative: GitHub Integration (Recommended)

### Automatic Deployment from GitHub:
1. **Push code to GitHub repository**
2. **Connect Railway to GitHub repo**  
3. **Select `/backend/admin` as root directory**
4. **Enable auto-deployments on git push**
5. **Railway deploys automatically on every push**

This is the easiest method and provides continuous deployment.

## 🔧 Troubleshooting

### Common Issues:

#### 1. **Database Connection Failed**
```bash
# Check environment variables
railway vars

# Test database connection  
railway run node -e "console.log(process.env.DATABASE_URL)"
```

#### 2. **Build Failed**
```bash
# Check build logs
railway logs --tail

# Rebuild manually
railway up --detach
```

#### 3. **Port Issues**
- Railway automatically assigns PORT environment variable
- Your app should use `process.env.PORT || 3001`
- Check `index.js` for proper port binding

### Database Issues:
```bash
# Connect to database directly
railway connect postgresql

# Run database commands
railway run psql
```

## 🎉 Success Checklist

After deployment, verify these work:
- [ ] **Homepage loads**: `https://your-app.up.railway.app`
- [ ] **Login page accessible**: `/admin/login`
- [ ] **Database connection working**: Check dashboard for data
- [ ] **Authentication works**: Login with admin credentials  
- [ ] **All CRUD operations**: Test user, venue, class management
- [ ] **Logs show no errors**: Check Railway logs
- [ ] **Performance is acceptable**: Response times under 2s

## 🚀 Next Steps

1. **Deploy now**: Follow the steps above
2. **Set up monitoring**: Configure alerts in Railway
3. **Backup strategy**: Railway handles backups, but consider additional options
4. **Team access**: Invite team members to Railway project
5. **Documentation**: Document your production URLs and credentials

Your admin panel is ready for production! Railway provides excellent hosting for Express.js applications with built-in PostgreSQL support.
