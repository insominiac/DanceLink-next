// Demo Admin Panel - Run without database for UI testing
// This allows you to see the admin interface even without DB setup

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Demo user
const demoUser = {
  id: 1,
  email: 'admin@dancewebsite.com',
  full_name: 'Demo Admin',
  role: 'admin'
};

// Demo stats
const demoStats = {
  users: {
    total_users: 150,
    regular_users: 120,
    instructors: 25,
    admins: 5,
    new_users_30d: 12
  },
  bookings: {
    total_bookings: 89,
    confirmed_bookings: 75,
    pending_bookings: 14,
    bookings_7d: 8,
    bookings_30d: 23
  },
  revenue: {
    total_revenue: 12450.50,
    revenue_30d: 2340.75,
    revenue_7d: 580.25,
    successful_transactions: 75
  },
  content: {
    active_classes: 15,
    upcoming_events: 6,
    total_venues: 8,
    forum_posts: 45,
    unread_messages: 3
  }
};

// Routes
app.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Admin Login' });
});

app.post('/api/auth/login', (req, res) => {
  // Demo login - accept any email/password
  res.cookie('adminToken', 'demo_token', { httpOnly: true });
  res.json({
    success: true,
    user: demoUser
  });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('adminToken');
  res.json({ success: true });
});

app.get('/', (req, res) => {
  res.render('dashboard/index', {
    title: 'Admin Dashboard',
    user: demoUser,
    stats: demoStats
  });
});

// Demo API endpoints
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, email: 'user1@example.com', full_name: 'John Doe', role: 'user' },
    { id: 2, email: 'instructor1@example.com', full_name: 'Jane Smith', role: 'instructor' },
    { id: 3, email: 'admin@example.com', full_name: 'Admin User', role: 'admin' }
  ]);
});

app.get('/api/venues', (req, res) => {
  res.json([
    { id: 1, name: 'Downtown Studio', city: 'New York', state: 'NY' },
    { id: 2, name: 'Arts Center', city: 'Brooklyn', state: 'NY' },
    { id: 3, name: 'Dance Hall', city: 'San Francisco', state: 'CA' }
  ]);
});

app.get('/users', (req, res) => {
  res.send(`
    <h1>Users Management</h1>
    <p>This is a demo page. In the full version, you would see:</p>
    <ul>
      <li>User listing with search and filters</li>
      <li>RBAC role management</li>
      <li>Instructor profile creation</li>
      <li>Bulk operations</li>
    </ul>
    <a href="/">← Back to Dashboard</a>
  `);
});

app.get('/venues', (req, res) => {
  res.send(`
    <h1>Venue Management</h1>
    <p>This is a demo page. In the full version, you would see:</p>
    <ul>
      <li>Venue listing with location filters</li>
      <li>Address management with maps</li>
      <li>Availability checking</li>
      <li>Usage statistics</li>
    </ul>
    <a href="/">← Back to Dashboard</a>
  `);
});

// Catch all for missing routes
app.use((req, res) => {
  res.status(404).send(`
    <h1>404 - Page Not Found</h1>
    <p>Route: ${req.path}</p>
    <p>This is demo mode. The full admin panel has all routes implemented.</p>
    <a href="/">← Back to Dashboard</a>
  `);
});

const PORT = process.env.ADMIN_PORT || 3001;
app.listen(PORT, () => {
  console.log('🎭 DEMO MODE - Dance Website Admin Panel');
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
  console.log(`🔐 Login: http://localhost:${PORT}/login`);
  console.log('');
  console.log('💡 This is running in DEMO MODE without database');
  console.log('💡 Use any email/password to login');
  console.log('💡 Set up PostgreSQL and run index.js for full functionality');
  console.log('');
});
