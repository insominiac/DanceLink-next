# Vercel Deployment Plan for Dance Website Admin Panel

## 🎯 Deployment Options

### Option 1: Convert to Next.js (RECOMMENDED)
✅ **Pros:**
- Perfect Vercel integration
- API Routes for backend logic
- React components for UI
- Built-in authentication support
- Edge functions support
- Automatic optimizations

❌ **Cons:**
- Requires rewriting UI components
- More complex than current setup

### Option 2: Keep Express + Serverless Functions
✅ **Pros:**
- Minimal changes to existing code
- Can use existing EJS templates
- Quick deployment

❌ **Cons:**
- Not optimized for Vercel
- Potential timeout issues
- Less scalable

### Option 3: Static Export + API Routes
✅ **Pros:**
- Fastest loading
- Best for Vercel
- Can keep most logic

❌ **Cons:**
- Limited real-time features
- More complex state management

## 🏗️ Recommended Architecture (Next.js)

### Directory Structure
```
admin-nextjs/
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login.js
│   │   │   └── logout.js
│   │   ├── users/
│   │   │   ├── index.js
│   │   │   └── [id].js
│   │   └── venues/
│   │       ├── index.js
│   │       └── [id].js
│   ├── dashboard/
│   │   └── index.js
│   ├── users/
│   │   ├── index.js
│   │   ├── [id].js
│   │   └── new.js
│   └── venues/
│       ├── index.js
│       ├── [id].js
│       └── new.js
├── components/
│   ├── Layout.js
│   ├── Sidebar.js
│   ├── Dashboard/
│   ├── Users/
│   └── Venues/
├── lib/
│   ├── db.js
│   ├── auth.js
│   └── utils.js
├── styles/
│   └── globals.css
├── next.config.js
├── package.json
└── vercel.json
```

### Key Features to Implement
1. **Authentication**: NextAuth.js with JWT
2. **Database**: PostgreSQL with connection pooling
3. **UI Components**: React with Tailwind CSS or Chakra UI
4. **API Routes**: RESTful endpoints
5. **Real-time Updates**: SWR for data fetching
6. **Forms**: React Hook Form for user/venue management

## 🚀 Quick Migration Steps

1. **Create Next.js app**
2. **Convert EJS templates to React components**
3. **Move Express routes to Next.js API routes**
4. **Add authentication with NextAuth.js**
5. **Configure database connection**
6. **Deploy to Vercel**

## 💾 Database Options

### Option A: Keep PostgreSQL (Recommended)
- Use Vercel Postgres or external provider
- Connection pooling via Prisma or similar
- Environment variables for connection

### Option B: Serverless Database
- PlanetScale (MySQL)
- Supabase (PostgreSQL)
- MongoDB Atlas

## 🔧 Environment Variables for Vercel
```env
# Database
DATABASE_URL=postgresql://user:pass@host:port/db
DB_USER=dance_app
DB_PASSWORD=password123
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=dance_website

# Authentication
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-admin.vercel.app

# JWT
JWT_SECRET=your-jwt-secret
```

## 📦 Required Dependencies
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "next-auth": "^4.24.0",
    "pg": "^8.11.0",
    "bcrypt": "^5.1.0",
    "jsonwebtoken": "^9.0.0",
    "@tanstack/react-query": "^5.0.0",
    "react-hook-form": "^7.47.0",
    "tailwindcss": "^3.3.0",
    "@headlessui/react": "^1.7.0",
    "@heroicons/react": "^2.0.0"
  }
}
```

## 🎨 UI Framework Options
1. **Tailwind CSS + Headless UI** (Lightweight)
2. **Chakra UI** (Component library)
3. **Ant Design** (Enterprise-ready)
4. **Material-UI** (Google Material Design)

## 🔒 Authentication Strategy
```javascript
// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { verifyPassword } from '../../../lib/auth'
import { getUserByEmail } from '../../../lib/users'

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const user = await getUserByEmail(credentials.email)
        if (user && await verifyPassword(credentials.password, user.password_hash)) {
          if (user.role === 'admin' || user.role === 'instructor') {
            return {
              id: user.id,
              email: user.email,
              name: user.full_name,
              role: user.role
            }
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session: ({ session, token }) => {
      session.user.role = token.role
      return session
    }
  }
})
```

## 📊 API Route Example
```javascript
// pages/api/users/index.js
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { getUsers, createUser } from '../../../lib/users'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  
  if (!session || (session.user.role !== 'admin' && session.user.role !== 'instructor')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    const users = await getUsers(req.query)
    res.json(users)
  } else if (req.method === 'POST') {
    const user = await createUser(req.body)
    res.json(user)
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
```

## 🚀 Deployment Configuration
```json
// vercel.json
{
  "functions": {
    "pages/api/**/*.js": {
      "maxDuration": 30
    }
  },
  "env": {
    "DATABASE_URL": "@database_url",
    "NEXTAUTH_SECRET": "@nextauth_secret",
    "JWT_SECRET": "@jwt_secret"
  }
}
```

## ⏱️ Migration Timeline
- **Week 1**: Setup Next.js structure + Authentication
- **Week 2**: Convert Dashboard + User Management
- **Week 3**: Convert Venue Management + API routes
- **Week 4**: Testing + Deployment + Polish

## 🎯 MVP Features for First Deploy
1. Authentication (login/logout)
2. Dashboard with stats
3. User listing and details
4. Venue listing and details
5. Basic CRUD operations

## 💡 Alternative: Keep Current & Deploy to Railway/Render
If you prefer to keep the current Express.js setup:
- **Railway**: Best for Express.js apps
- **Render**: Good PostgreSQL integration  
- **DigitalOcean App Platform**: Traditional hosting
- **Heroku**: Classic choice (paid)

These platforms support long-running Node.js servers better than Vercel.
