# Dance Website PostgreSQL Database Setup

This directory contains the complete PostgreSQL database implementation based on ERD v2 for the Dance Website project.

## 📁 Files Overview

### Core Database Files
- **`schema.sql`** - Complete database schema with tables, constraints, and relationships
- **`indexes.sql`** - Performance-optimized indexes and query optimizations  
- **`init_database.sql`** - Database initialization and setup script
- **`sample_data.sql`** - Sample data for testing and development

### Supporting Files
- **`README.md`** - This setup documentation
- **`run_setup.sh`** - Automated setup script (to be created)

## 🚀 Quick Setup

### Prerequisites
- PostgreSQL 14+ installed and running
- PostgreSQL user with database creation privileges
- `psql` command-line tool available

### Option 1: Automated Setup (Recommended)

```bash
# Make sure you're in the database directory
cd /Users/hemantd/dance-website-nextjs/backend/database

# Run the automated setup script
chmod +x run_setup.sh
./run_setup.sh
```

### Option 2: Manual Setup

Follow these steps in order:

```bash
# 1. Connect to PostgreSQL as superuser
psql -U postgres

# 2. Create database and user
CREATE DATABASE dance_website 
    WITH 
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TEMPLATE = template0;

CREATE USER dance_app WITH PASSWORD 'your_secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE dance_website TO dance_app;

# 3. Connect to the new database
\c dance_website;

# 4. Run initialization script
\i init_database.sql

# 5. Create schema (tables, constraints, relationships)
\i schema.sql

# 6. Create indexes for performance
\i indexes.sql

# 7. Insert sample data (optional)
\i sample_data.sql

# 8. Verify setup
SELECT COUNT(*) FROM users;
```

## 🔧 Database Configuration

### Connection Details
```
Host: localhost (or your PostgreSQL server)
Port: 5432 (default)
Database: dance_website
Username: dance_app
Password: [your_secure_password]
```

### Environment Variables
Add these to your application's `.env` file:

```env
# PostgreSQL Database Configuration
DATABASE_URL="postgresql://dance_app:your_password@localhost:5432/dance_website"
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dance_website
DB_USER=dance_app
DB_PASSWORD=your_secure_password
DB_SSL=false

# For development
NODE_ENV=development
```

### Connection Pool Settings (Node.js)
```javascript
// Example pg pool configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20,          // Maximum number of connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

## 📊 Database Schema Overview

### Core Tables
- **`users`** - Unified users with RBAC (user/instructor/admin)
- **`instructors`** - Instructor profiles linked to users
- **`venues`** - Normalized venue information
- **`dance_styles`** - Master list of dance styles
- **`classes`** - Recurring dance classes
- **`class_sessions`** - Individual class sessions with scheduling
- **`events`** - One-time dance events
- **`bookings`** - Unified booking system
- **`transactions`** - Payment and refund logs

### Key Features
✅ **RBAC System** - Role-based access control  
✅ **Soft Delete** - `deleted_at` fields for data recovery  
✅ **Timezone Support** - UTC timestamps with user timezones  
✅ **Performance Optimized** - Strategic indexes and constraints  
✅ **Payment Integration** - Transaction logging for Stripe/PayPal  
✅ **Community Features** - Forum, favorites, testimonials  

## 🧪 Testing the Database

### Verify Setup
```sql
-- Check table creation
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check sample data
SELECT 
    'users' as table_name, COUNT(*) as records FROM users
UNION ALL
SELECT 'classes', COUNT(*) FROM classes
UNION ALL  
SELECT 'events', COUNT(*) FROM events
UNION ALL
SELECT 'bookings', COUNT(*) FROM bookings;

-- Test relationships
SELECT u.full_name, i.specialty, i.rating
FROM users u 
JOIN instructors i ON u.id = i.user_id
WHERE u.role = 'instructor';
```

### Sample Queries
```sql
-- Find upcoming events in New York
SELECT e.title, e.start_datetime, v.name as venue_name
FROM events e
JOIN venues v ON e.venue_id = v.id
WHERE v.city = 'New York' 
  AND e.start_datetime > NOW()
  AND e.status = 'published'
  AND e.deleted_at IS NULL
ORDER BY e.start_datetime;

-- Get user's booking history
SELECT 
    COALESCE(c.title, e.title) as booking_title,
    b.booking_datetime,
    b.status,
    b.amount_paid
FROM bookings b
LEFT JOIN classes c ON b.class_id = c.id
LEFT JOIN events e ON b.event_id = e.id
WHERE b.user_id = 1 
  AND b.deleted_at IS NULL
ORDER BY b.booking_datetime DESC;

-- Find classes by dance style
SELECT c.title, c.level, ds.name as dance_style
FROM classes c
JOIN class_styles cs ON c.id = cs.class_id
JOIN dance_styles ds ON cs.style_id = ds.id
WHERE ds.name = 'Salsa'
  AND c.is_active = true
  AND c.deleted_at IS NULL;
```

## 🔍 Performance Monitoring

### Index Usage
```sql
-- Check index usage statistics
SELECT * FROM get_index_usage_stats() 
ORDER BY index_scans DESC 
LIMIT 10;

-- Monitor slow queries (PostgreSQL 13+)
SELECT query, mean_exec_time, calls
FROM pg_stat_statements 
ORDER BY mean_exec_time DESC 
LIMIT 10;
```

### Database Maintenance
```sql
-- Update table statistics (run regularly)
SELECT analyze_all_tables();

-- Check database size
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## 🛠️ Migration Strategy

### From Existing Database
If migrating from an existing database:

1. **Backup current data**
   ```bash
   pg_dump existing_db > backup.sql
   ```

2. **Create mapping script** for data transformation

3. **Run migrations in transaction**
   ```sql
   BEGIN;
   -- Migration queries here
   COMMIT;
   ```

4. **Verify data integrity** using validation queries

### Schema Updates
For future schema changes:

1. Create migration files: `001_add_new_table.sql`
2. Test migrations on copy of production data
3. Run during maintenance window
4. Update application code accordingly

## 🔐 Security Considerations

### Database User Permissions
```sql
-- Limit dance_app user to necessary permissions only
REVOKE ALL ON DATABASE dance_website FROM PUBLIC;
GRANT CONNECT ON DATABASE dance_website TO dance_app;
GRANT USAGE ON SCHEMA public TO dance_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO dance_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO dance_app;
```

### Data Protection
- **Passwords**: Always hash with bcrypt (strength 12+)
- **PII**: Consider encryption for sensitive fields
- **Soft Delete**: Implement proper data retention policies
- **Backups**: Regular encrypted backups with rotation

### Connection Security
```env
# Use SSL in production
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=true
```

## 🚦 Production Deployment

### PostgreSQL Configuration (`postgresql.conf`)
```ini
# Memory settings (adjust for your server)
shared_buffers = 256MB
effective_cache_size = 1GB
work_mem = 4MB
maintenance_work_mem = 64MB

# Connection settings
max_connections = 100
superuser_reserved_connections = 3

# Query planning
random_page_cost = 1.1        # For SSD storage
effective_io_concurrency = 200

# Write-ahead logging
wal_level = replica
max_wal_size = 1GB
min_wal_size = 80MB

# Autovacuum (crucial for this schema)
autovacuum = on
autovacuum_max_workers = 3
autovacuum_naptime = 1min

# Logging
log_statement = 'mod'         # Log all modifications
log_min_duration_statement = 250ms
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '
```

### Backup Strategy
```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -h localhost -U dance_app dance_website | \
gzip > "/backups/dance_website_${DATE}.sql.gz"

# Keep last 30 days
find /backups -name "dance_website_*.sql.gz" -mtime +30 -delete
```

## 📞 Support

### Troubleshooting

**Connection Issues:**
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Test connection
psql -h localhost -U dance_app -d dance_website -c "SELECT version();"
```

**Performance Issues:**
```sql
-- Check for table bloat
SELECT schemaname, tablename, n_tup_upd, n_tup_del
FROM pg_stat_user_tables 
WHERE n_tup_upd + n_tup_del > 1000
ORDER BY n_tup_upd + n_tup_del DESC;

-- Manual vacuum if needed
VACUUM ANALYZE;
```

### Getting Help
- Check PostgreSQL logs: `/var/log/postgresql/`
- Monitor query performance with `EXPLAIN ANALYZE`
- Use pgAdmin or similar tools for visual database management

## 🎯 Next Steps

After database setup:

1. **Test connection** from your Node.js application
2. **Set up database migrations** for schema versioning  
3. **Configure monitoring** and alerting
4. **Set up automated backups**
5. **Implement connection pooling** in application
6. **Add database seeding** for production data

---

🎉 **Database setup complete!** Your PostgreSQL database is ready for the Dance Website application with ERD v2 implementation.
