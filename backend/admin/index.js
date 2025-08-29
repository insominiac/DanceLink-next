// Dance Website Admin Panel - Main Entry Point
// Role-based admin interface for database management
// Author: Generated from ERD v2 database schema
// Created: 2025-08-28

const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Initialize Express app for admin panel
const adminApp = express();

// Middleware
adminApp.use(cors());
adminApp.use(express.json());
adminApp.use(express.urlencoded({ extended: true }));
adminApp.use(cookieParser());
adminApp.use(express.static(path.join(__dirname, 'public')));

// Set view engine for server-side rendering
adminApp.set('view engine', 'ejs');
adminApp.set('views', path.join(__dirname, 'views'));

// Database connection with Railway support
let dbConfig;
if (process.env.DATABASE_URL) {
  // Railway provides DATABASE_URL, use it directly
  dbConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  };
} else {
  // Fallback to individual environment variables
  dbConfig = {
    user: process.env.DB_USER || 'dance_app',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'dance_website',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  };
}

const pool = new Pool(dbConfig);

// ============================================
// AUTHENTICATION MIDDLEWARE
// ============================================

// Admin authentication middleware
const requireAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.adminToken;
    
    if (!token) {
      return res.status(401).json({ error: 'Admin access required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const userResult = await pool.query(
      'SELECT user_id as id, email, first_name || \'\' || last_name as full_name, user_role as role FROM users WHERE user_id = $1 AND user_role IN ($2, $3)',
      [decoded.userId, 'admin', 'teacher']
    );

    if (userResult.rows.length === 0) {
      return res.status(403).json({ error: 'Admin privileges required' });
    }

    req.user = userResult.rows[0];
    next();
  } catch (error) {
    console.error('Auth error:', error);
    return res.status(401).json({ error: 'Invalid admin token' });
  }
};

// Super admin only (admin role, not instructor)
const requireSuperAdmin = async (req, res, next) => {
  await requireAdmin(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Super admin access required' });
    }
    next();
  });
};

// ============================================
// ADMIN ROUTES
// ============================================

// Admin login page
adminApp.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Admin Login' });
});

// Admin login API
adminApp.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Get user with admin or teacher role
    const result = await pool.query(
      'SELECT user_id as id, email, password_hash, first_name || \' \' || last_name as full_name, user_role as role FROM users WHERE email = $1 AND user_role IN ($2, $3)',
      [email, 'admin', 'teacher']
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials or insufficient privileges' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '8h' }
    );

    // Set cookie for web interface
    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 8 * 60 * 60 * 1000 // 8 hours
    });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Admin logout
adminApp.post('/api/auth/logout', (req, res) => {
  res.clearCookie('adminToken');
  res.json({ success: true });
});

// Admin dashboard - main entry point
adminApp.get('/', requireAdmin, async (req, res) => {
  try {
    // Get dashboard statistics
    const stats = await getDashboardStats();
    res.render('dashboard/index', { 
      title: 'Admin Dashboard', 
      user: req.user,
      stats 
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).send('Dashboard error');
  }
});

// ============================================
// ENTITY MANAGEMENT ROUTES
// ============================================

// Users management
try {
  adminApp.use('/users', requireAdmin, require('./routes/users'));
} catch (err) {
  console.log('Users route not available yet');
}

// Venues management
try {
  adminApp.use('/venues', requireAdmin, require('./routes/venues'));
} catch (err) {
  console.log('Venues route not available yet');
}

// Other routes will be added as they are implemented
// adminApp.use('/classes', requireAdmin, require('./routes/classes'));
// adminApp.use('/events', requireAdmin, require('./routes/events'));
// adminApp.use('/bookings', requireAdmin, require('./routes/bookings'));
// adminApp.use('/transactions', requireAdmin, require('./routes/transactions'));
// adminApp.use('/forum', requireAdmin, require('./routes/forum'));
// adminApp.use('/reports', requireAdmin, require('./routes/reports'));

// ============================================
// DASHBOARD STATISTICS
// ============================================

async function getDashboardStats() {
  try {
    const [
      userStats,
      bookingStats,
      revenueStats,
      contentStats
    ] = await Promise.all([
      // User statistics
      pool.query(`
        SELECT 
          COUNT(*) as total_users,
          COUNT(*) FILTER (WHERE user_role = 'user') as regular_users,
          COUNT(*) FILTER (WHERE user_role = 'teacher') as instructors,
          COUNT(*) FILTER (WHERE user_role = 'admin') as admins,
          COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as new_users_30d
        FROM users
      `),

      // Booking statistics
      pool.query(`
        SELECT 
          COUNT(*) as total_bookings,
          COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed_bookings,
          COUNT(*) FILTER (WHERE status = 'pending') as pending_bookings,
          COUNT(*) FILTER (WHERE booking_datetime >= CURRENT_DATE - INTERVAL '7 days') as bookings_7d,
          COUNT(*) FILTER (WHERE booking_datetime >= CURRENT_DATE - INTERVAL '30 days') as bookings_30d
        FROM bookings
        WHERE deleted_at IS NULL
      `),

      // Revenue statistics
      pool.query(`
        SELECT 
          COALESCE(SUM(amount), 0) as total_revenue,
          COALESCE(SUM(amount) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'), 0) as revenue_30d,
          COALESCE(SUM(amount) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'), 0) as revenue_7d,
          COUNT(*) FILTER (WHERE status = 'succeeded') as successful_transactions
        FROM transactions
        WHERE type = 'payment'
      `),

      // Content statistics
      pool.query(`
        SELECT 
          (SELECT COUNT(*) FROM classes WHERE deleted_at IS NULL) as active_classes,
          (SELECT COUNT(*) FROM events WHERE deleted_at IS NULL AND start_datetime > NOW()) as upcoming_events,
          (SELECT COUNT(*) FROM venues) as total_venues,
          (SELECT COUNT(*) FROM forum_posts) as forum_posts,
          (SELECT COUNT(*) FROM contact_messages WHERE is_read = false) as unread_messages
      `)
    ]);

    return {
      users: userStats.rows[0],
      bookings: bookingStats.rows[0],
      revenue: revenueStats.rows[0],
      content: contentStats.rows[0]
    };

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      users: {},
      bookings: {},
      revenue: {},
      content: {}
    };
  }
}

// ============================================
// API ENDPOINTS FOR RELATIONSHIP DATA
// ============================================

// Get all dance styles (for dropdowns)
adminApp.get('/api/dance-styles', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, category FROM dance_styles WHERE is_active = true ORDER BY name'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dance styles' });
  }
});

// Get all venues (for dropdowns)
adminApp.get('/api/venues', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, city, state FROM venues ORDER BY name'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch venues' });
  }
});

// Get all instructors (for dropdowns)
adminApp.get('/api/instructors', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT i.id, u.full_name, i.specialty, i.rating
      FROM instructors i
      JOIN users u ON i.user_id = u.id
      WHERE i.is_active = true
      ORDER BY u.full_name
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch instructors' });
  }
});

// Get all users (for dropdowns, excluding passwords)
adminApp.get('/api/users', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, full_name, role FROM users ORDER BY full_name'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
adminApp.use((req, res) => {
  res.status(404).render('error/404', { title: '404 - Not Found' });
});

// Error handler
adminApp.use((error, req, res, next) => {
  console.error('Admin panel error:', error);
  res.status(500).render('error/500', { 
    title: '500 - Server Error',
    error: process.env.NODE_ENV === 'development' ? error : {}
  });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format currency for display
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Format date for display
function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
}

// Export app and utilities
module.exports = {
  adminApp,
  pool,
  requireAdmin,
  requireSuperAdmin,
  formatCurrency,
  formatDate
};

// Start server if running directly
if (require.main === module) {
  const PORT = process.env.ADMIN_PORT || 3001;
  adminApp.listen(PORT, () => {
    console.log(`🚀 Admin panel running on port ${PORT}`);
    console.log(`📊 Dashboard: http://localhost:${PORT}`);
    console.log(`🔐 Login: http://localhost:${PORT}/login`);
  });
}
