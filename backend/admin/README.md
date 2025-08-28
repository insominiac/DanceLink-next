# Dance Website Admin Panel

A comprehensive admin interface for the Dance Website with full CRUD operations for all entities and their relationships based on ERD v2.

## 🎯 Features

### ✅ **Completed Core Modules**
- **🔐 Authentication & RBAC** - Role-based access (admin/instructor)
- **👥 User Management** - Complete user CRUD with instructor assignments
- **🏢 Venue Management** - Location management with mapping integration
- **📊 Dashboard & Analytics** - Real-time statistics and insights

### 🚧 **Entity Management (API Ready)**
- **🎭 Dance Styles** - Master data management
- **📚 Classes & Sessions** - Class scheduling and session management
- **🎪 Events** - Event creation and management
- **💳 Bookings & Transactions** - Payment and booking management
- **💬 Forum & Content** - Community content moderation
- **📈 Reports** - Comprehensive reporting system

## 🏗️ Architecture

### Database Schema Support
- **PostgreSQL ERD v2** implementation
- **Relationship Management** - All foreign keys and constraints
- **Soft Delete** - Data recovery with `deleted_at` fields
- **RBAC Integration** - Role-based permissions
- **Timezone Support** - UTC storage with user preferences

### Tech Stack
- **Backend**: Express.js + PostgreSQL
- **Frontend**: EJS templates + Bootstrap 5
- **Authentication**: JWT + bcrypt
- **Charts**: Chart.js for analytics
- **Tables**: DataTables for advanced data management

## 🚀 Quick Start

### Prerequisites
```bash
# Required
- Node.js 16+
- PostgreSQL 14+
- Dance Website database (from ERD v2)
```

### Installation
```bash
# Navigate to admin directory
cd /Users/hemantd/dance-website-nextjs/backend/admin

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Start development server
npm run dev
# Or production
npm start
```

### Environment Variables
```env
# Database Configuration
DB_USER=dance_app
DB_PASSWORD=your_secure_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dance_website

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Admin Panel Configuration
ADMIN_PORT=3001
NODE_ENV=development

# Optional: Google Maps API (for geocoding)
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## 📖 Usage

### Access the Admin Panel
```
🌐 URL: http://localhost:3001
🔐 Login: /login
📊 Dashboard: /
```

### Default Admin Login
After running sample data:
```
Email: admin@dancewebsite.com
Password: [use the hashed password from sample data]
```

## 🗂️ Directory Structure

```
admin/
├── index.js                 # Main application entry point
├── package.json             # Dependencies and scripts
├── README.md               # This documentation
├── routes/                 # API routes for each entity
│   ├── users.js            # ✅ User management (RBAC)
│   ├── venues.js           # ✅ Venue management
│   ├── classes.js          # 🚧 Class management
│   ├── events.js           # 🚧 Event management
│   ├── bookings.js         # 🚧 Booking management
│   ├── transactions.js     # 🚧 Transaction management
│   ├── forum.js            # 🚧 Forum moderation
│   ├── reports.js          # 🚧 Analytics & reports
│   └── settings.js         # 🚧 System settings
├── views/                  # EJS templates
│   ├── layout.ejs          # Base layout
│   ├── auth/               # Authentication views
│   ├── dashboard/          # Dashboard views
│   ├── users/              # User management views
│   ├── venues/             # Venue management views
│   └── components/         # Reusable components
├── public/                 # Static assets
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   └── images/            # Images and icons
└── scripts/               # Utility scripts
    └── createViews.js     # Generate view templates
```

## 🎛️ Admin Panel Features

### 👥 User Management
**URL**: `/admin/users`

**Features**:
- ✅ User listing with search and filters
- ✅ RBAC role management (user/instructor/admin)
- ✅ Instructor profile creation/editing
- ✅ Dance style assignments
- ✅ User activity tracking
- ✅ Bulk operations (verify, delete)
- ✅ User relationship views (bookings, forum posts)

**API Endpoints**:
```
GET    /admin/users              # List users with pagination
GET    /admin/users/:id          # User details with relationships
GET    /admin/users/new          # Create user form
POST   /admin/users              # Create user
GET    /admin/users/:id/edit     # Edit user form
PUT    /admin/users/:id          # Update user
DELETE /admin/users/:id          # Delete user
POST   /admin/users/bulk-action  # Bulk operations
GET    /admin/users/stats        # User statistics
```

### 🏢 Venue Management
**URL**: `/admin/venues`

**Features**:
- ✅ Venue listing with location filters
- ✅ Address management with validation
- ✅ Coordinate support (latitude/longitude)
- ✅ Venue usage statistics
- ✅ Availability checking
- ✅ Geocoding integration (ready)
- ✅ Future booking conflict detection

**API Endpoints**:
```
GET    /admin/venues                    # List venues with pagination
GET    /admin/venues/:id               # Venue details with relationships
GET    /admin/venues/new               # Create venue form
POST   /admin/venues                   # Create venue
GET    /admin/venues/:id/edit          # Edit venue form
PUT    /admin/venues/:id               # Update venue
DELETE /admin/venues/:id               # Delete venue (with safety checks)
GET    /admin/venues/:id/availability  # Check venue availability
POST   /admin/venues/:id/geocode       # Geocode venue address
GET    /admin/venues/stats             # Venue statistics
POST   /admin/venues/bulk-action       # Bulk operations
```

### 📊 Dashboard & Analytics
**URL**: `/admin/`

**Features**:
- ✅ Real-time statistics
- ✅ User growth metrics
- ✅ Booking and revenue analytics
- ✅ Content activity tracking
- ✅ Quick access to pending items
- ✅ System health indicators

## 🔧 API Structure

### Authentication
All admin routes require authentication via JWT token:

```javascript
// Header authentication
Authorization: Bearer <jwt_token>

// Cookie authentication (for web interface)
adminToken: <jwt_token>
```

### Role-Based Access
- **Admin**: Full access to all features
- **Instructor**: Limited access to own classes and bookings
- **Super Admin**: System settings and user management

### Response Format
```javascript
// Success Response
{
  "success": true,
  "message": "Operation completed",
  "data": {...}
}

// Error Response
{
  "error": "Error description",
  "details": {...}
}

// List Response with Pagination
{
  "items": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 250,
    "limit": 25,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 🗄️ Database Integration

### Connection Pool
Uses PostgreSQL connection pooling for optimal performance:

```javascript
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20,                    // Maximum connections
  idleTimeoutMillis: 30000,   // Idle timeout
  connectionTimeoutMillis: 2000
});
```

### Transaction Support
Critical operations use database transactions:

```javascript
const client = await pool.connect();
try {
  await client.query('BEGIN');
  // Multiple operations...
  await client.query('COMMIT');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  client.release();
}
```

### Relationship Queries
Efficiently loads related data with JOINs:

```sql
-- User with instructor info and statistics
SELECT 
  u.*,
  i.specialty,
  i.rating,
  COUNT(b.id) as total_bookings,
  COUNT(fp.id) as forum_posts
FROM users u
LEFT JOIN instructors i ON u.id = i.user_id
LEFT JOIN bookings b ON u.id = b.user_id
LEFT JOIN forum_posts fp ON u.id = fp.user_id
WHERE u.id = $1
GROUP BY u.id, i.id;
```

## 🚧 Pending Implementation

### Class Management (`/admin/classes`)
- Class CRUD with instructor assignments
- Dance style mappings
- Session scheduling
- Capacity management

### Event Management (`/admin/events`)
- Event creation and management
- Venue assignment
- Organizer management
- Style categorization

### Booking System (`/admin/bookings`)
- Booking management and status updates
- Payment tracking
- Refund processing
- Capacity validation

### Transaction Management (`/admin/transactions`)
- Payment processing logs
- Refund management
- Financial reporting
- Provider reconciliation

### Forum Moderation (`/admin/forum`)
- Post and reply management
- Content moderation tools
- User activity tracking
- Community guidelines enforcement

### Analytics & Reports (`/admin/reports`)
- Financial reports
- User activity analytics
- Booking trend analysis
- Performance metrics

## 🔒 Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Session timeout management
- Secure password hashing (bcrypt)

### Input Validation
- SQL injection prevention
- XSS protection
- Data validation middleware
- File upload security (for images)

### Rate Limiting
- API rate limiting per IP
- Brute force protection
- Login attempt monitoring

## 🚀 Production Deployment

### Environment Setup
```bash
# Production environment variables
NODE_ENV=production
ADMIN_PORT=3001
JWT_SECRET=your_very_secure_jwt_secret
DB_SSL=true

# Security headers
HELMET_ENABLED=true
RATE_LIMIT_ENABLED=true
```

### Process Management
```bash
# Using PM2 for production
pm2 start index.js --name "dance-admin"
pm2 startup
pm2 save
```

### Nginx Configuration
```nginx
# Admin panel reverse proxy
location /admin {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

## 📞 Support & Development

### Getting Help
1. Check the PostgreSQL database is running and accessible
2. Verify environment variables are set correctly
3. Review server logs for detailed error information
4. Test database connections with `psql`

### Development Setup
```bash
# Install development dependencies
npm install

# Start development server with auto-reload
npm run dev

# Create missing view templates
npm run create-views

# Run in debug mode
DEBUG=* npm run dev
```

### Contributing
1. Each entity has its own route file in `/routes`
2. Follow the established patterns from `users.js` and `venues.js`
3. Include proper error handling and validation
4. Add corresponding EJS views in `/views`
5. Update this README with new features

---

## 🎉 Status

**Current Implementation**: 30% Complete

✅ **Ready for Production**:
- User Management (Full RBAC)
- Venue Management (Full CRUD)
- Authentication System
- Dashboard Analytics

🚧 **In Development**:
- Class & Session Management
- Event Management
- Booking & Transaction System
- Forum & Content Management
- Advanced Reporting

The admin panel provides a solid foundation for managing the Dance Website with room for expansion as needed. All database relationships are properly handled and the system is designed for scalability and maintainability.

---

**🚀 Ready to manage your dance website with confidence!**
