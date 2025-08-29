// Admin Panel - User Management Routes
// CRUD operations for users with RBAC and instructor relationships
// Author: Generated from ERD v2 database schema
// Created: 2025-08-28

const express = require('express');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'dance_app',
  host: process.env.DB_HOST || 'localhost', 
  database: process.env.DB_NAME || 'dance_website',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

const router = express.Router();

// ============================================
// USER LIST AND SEARCH
// ============================================

// GET /admin/users - List all users with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const verified = req.query.verified || '';

    // Build WHERE clause
    let whereConditions = [];
    let queryParams = [];
    let paramIndex = 1;

    if (search) {
      whereConditions.push(`(u.full_name ILIKE $${paramIndex} OR u.email ILIKE $${paramIndex})`);
      queryParams.push(`%${search}%`);
      paramIndex++;
    }

    if (role) {
      whereConditions.push(`u.role = $${paramIndex}`);
      queryParams.push(role);
      paramIndex++;
    }

    if (verified !== '') {
      whereConditions.push(`u.is_verified = $${paramIndex}`);
      queryParams.push(verified === 'true');
      paramIndex++;
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get users with instructor information if applicable
    const usersQuery = `
      SELECT 
        u.id,
        u.email,
        u.full_name,
        u.phone,
        u.role,
        u.bio,
        u.is_verified,
        u.website_url,
        u.instagram_handle,
        u.timezone,
        u.created_at,
        u.updated_at,
        i.id as instructor_id,
        i.specialty,
        i.experience_years,
        i.rating,
        i.is_active as instructor_active,
        -- Count relationships
        (SELECT COUNT(*) FROM bookings b WHERE b.user_id = u.id AND b.deleted_at IS NULL) as total_bookings,
        (SELECT COUNT(*) FROM user_styles us WHERE us.user_id = u.id) as dance_styles_count,
        (SELECT COUNT(*) FROM forum_posts fp WHERE fp.user_id = u.id) as forum_posts_count
      FROM users u
      LEFT JOIN instructors i ON u.id = i.user_id
      ${whereClause}
      ORDER BY u.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM users u
      ${whereClause}
    `;

    queryParams.push(limit, offset);

    const [usersResult, countResult] = await Promise.all([
      pool.query(usersQuery, queryParams.slice(0, -2).concat([limit, offset])),
      pool.query(countQuery, queryParams.slice(0, -2))
    ]);

    const totalUsers = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(totalUsers / limit);

    // If API request, return JSON
    if (req.headers.accept?.includes('application/json')) {
      return res.json({
        users: usersResult.rows,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers,
          limit,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      });
    }

    // Otherwise render the view
    res.render('users/index', {
      title: 'User Management',
      users: usersResult.rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        limit
      },
      filters: { search, role, verified }
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ============================================
// USER DETAILS AND RELATIONSHIPS
// ============================================

// GET /admin/users/:id - View user details with all relationships
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const [userResult, stylesResult, bookingsResult, forumResult] = await Promise.all([
      // Get user with instructor info
      pool.query(`
        SELECT 
          u.*,
          i.id as instructor_id,
          i.specialty,
          i.experience_years,
          i.rating,
          i.is_active as instructor_active,
          i.created_at as instructor_created_at
        FROM users u
        LEFT JOIN instructors i ON u.id = i.user_id
        WHERE u.id = $1
      `, [userId]),

      // Get user's dance styles
      pool.query(`
        SELECT 
          us.proficiency,
          ds.id as style_id,
          ds.name as style_name,
          ds.category
        FROM user_styles us
        JOIN dance_styles ds ON us.style_id = ds.id
        WHERE us.user_id = $1
        ORDER BY ds.name
      `, [userId]),

      // Get user's bookings
      pool.query(`
        SELECT 
          b.id,
          b.booking_datetime,
          b.status,
          b.amount_paid,
          b.payment_method,
          c.title as class_title,
          e.title as event_title,
          cs.session_date,
          v.name as venue_name
        FROM bookings b
        LEFT JOIN classes c ON b.class_id = c.id
        LEFT JOIN events e ON b.event_id = e.id
        LEFT JOIN class_sessions cs ON b.class_session_id = cs.id
        LEFT JOIN venues v ON (e.venue_id = v.id OR cs.venue_id = v.id)
        WHERE b.user_id = $1 AND b.deleted_at IS NULL
        ORDER BY b.booking_datetime DESC
        LIMIT 10
      `, [userId]),

      // Get user's forum activity
      pool.query(`
        SELECT 
          fp.id,
          fp.title,
          fp.category,
          fp.created_at,
          fp.views_count,
          fp.likes_count,
          fp.replies_count
        FROM forum_posts fp
        WHERE fp.user_id = $1
        ORDER BY fp.created_at DESC
        LIMIT 5
      `, [userId])
    ]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userResult.rows[0];

    // If API request, return JSON
    if (req.headers.accept?.includes('application/json')) {
      return res.json({
        user,
        danceStyles: stylesResult.rows,
        recentBookings: bookingsResult.rows,
        forumPosts: forumResult.rows
      });
    }

    res.render('users/detail', {
      title: `User: ${user.full_name}`,
      user,
      danceStyles: stylesResult.rows,
      recentBookings: bookingsResult.rows,
      forumPosts: forumResult.rows
    });

  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
});

// ============================================
// USER CREATION AND EDITING
// ============================================

// GET /admin/users/new - Show create user form
router.get('/new', async (req, res) => {
  try {
    // Get dance styles for the form
    const stylesResult = await pool.query(
      'SELECT id, name, category FROM dance_styles WHERE is_active = true ORDER BY category, name'
    );

    res.render('users/form', {
      title: 'Create New User',
      user: {},
      danceStyles: stylesResult.rows,
      isEditing: false
    });
  } catch (error) {
    console.error('Error loading user form:', error);
    res.status(500).send('Error loading form');
  }
});

// POST /admin/users - Create new user
router.post('/', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const {
      email, password, full_name, phone, role, bio, 
      is_verified, website_url, instagram_handle, timezone,
      // Instructor fields
      specialty, experience_years,
      // Dance styles
      dance_styles // Array of {style_id, proficiency}
    } = req.body;

    // Hash password
    const password_hash = await bcrypt.hash(password, 12);

    // Create user
    const userResult = await client.query(`
      INSERT INTO users (
        email, password_hash, full_name, phone, role, bio, 
        is_verified, website_url, instagram_handle, timezone
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
    `, [
      email, password_hash, full_name, phone, role, bio,
      is_verified === 'true', website_url, instagram_handle, timezone
    ]);

    const userId = userResult.rows[0].id;

    // Create instructor profile if role is instructor
    if (role === 'instructor') {
      await client.query(`
        INSERT INTO instructors (user_id, specialty, experience_years, rating, is_active)
        VALUES ($1, $2, $3, 0.00, true)
      `, [userId, specialty, parseInt(experience_years) || 0]);
    }

    // Add dance styles if provided
    if (dance_styles && Array.isArray(dance_styles)) {
      for (const style of dance_styles) {
        if (style.style_id && style.proficiency) {
          await client.query(`
            INSERT INTO user_styles (user_id, style_id, proficiency)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, style_id) DO UPDATE SET proficiency = $3
          `, [userId, style.style_id, style.proficiency]);
        }
      }
    }

    await client.query('COMMIT');

    if (req.headers.accept?.includes('application/json')) {
      res.json({ success: true, userId, message: 'User created successfully' });
    } else {
      res.redirect('/admin/users/' + userId + '?created=true');
    }

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating user:', error);
    
    if (error.constraint === 'users_email_key') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    res.status(500).json({ error: 'Failed to create user' });
  } finally {
    client.release();
  }
});

// GET /admin/users/:id/edit - Show edit user form
router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.params.id;

    const [userResult, stylesResult, userStylesResult] = await Promise.all([
      // Get user with instructor info
      pool.query(`
        SELECT 
          u.*,
          i.specialty,
          i.experience_years,
          i.rating,
          i.is_active as instructor_active
        FROM users u
        LEFT JOIN instructors i ON u.id = i.user_id
        WHERE u.id = $1
      `, [userId]),

      // Get all dance styles
      pool.query(
        'SELECT id, name, category FROM dance_styles WHERE is_active = true ORDER BY category, name'
      ),

      // Get user's current dance styles
      pool.query(`
        SELECT style_id, proficiency
        FROM user_styles
        WHERE user_id = $1
      `, [userId])
    ]);

    if (userResult.rows.length === 0) {
      return res.status(404).send('User not found');
    }

    res.render('users/form', {
      title: 'Edit User',
      user: userResult.rows[0],
      danceStyles: stylesResult.rows,
      userStyles: userStylesResult.rows,
      isEditing: true
    });

  } catch (error) {
    console.error('Error loading user edit form:', error);
    res.status(500).send('Error loading form');
  }
});

// PUT /admin/users/:id - Update user
router.put('/:id', async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const userId = req.params.id;
    const {
      email, password, full_name, phone, role, bio, 
      is_verified, website_url, instagram_handle, timezone,
      // Instructor fields
      specialty, experience_years,
      // Dance styles
      dance_styles
    } = req.body;

    // Update user
    let updateQuery = `
      UPDATE users SET
        email = $1, full_name = $2, phone = $3, role = $4, bio = $5,
        is_verified = $6, website_url = $7, instagram_handle = $8, 
        timezone = $9, updated_at = NOW()
    `;
    let queryParams = [
      email, full_name, phone, role, bio,
      is_verified === 'true', website_url, instagram_handle, timezone
    ];

    // Update password if provided
    if (password) {
      const password_hash = await bcrypt.hash(password, 12);
      updateQuery += `, password_hash = $${queryParams.length + 1}`;
      queryParams.push(password_hash);
    }

    updateQuery += ` WHERE id = $${queryParams.length + 1}`;
    queryParams.push(userId);

    await client.query(updateQuery, queryParams);

    // Handle instructor profile
    if (role === 'instructor') {
      // Check if instructor profile exists
      const existingInstructor = await client.query(
        'SELECT id FROM instructors WHERE user_id = $1',
        [userId]
      );

      if (existingInstructor.rows.length > 0) {
        // Update existing instructor
        await client.query(`
          UPDATE instructors SET
            specialty = $1, experience_years = $2, updated_at = NOW()
          WHERE user_id = $3
        `, [specialty, parseInt(experience_years) || 0, userId]);
      } else {
        // Create new instructor profile
        await client.query(`
          INSERT INTO instructors (user_id, specialty, experience_years, rating, is_active)
          VALUES ($1, $2, $3, 0.00, true)
        `, [userId, specialty, parseInt(experience_years) || 0]);
      }
    } else {
      // Remove instructor profile if role changed from instructor
      await client.query('DELETE FROM instructors WHERE user_id = $1', [userId]);
    }

    // Update dance styles
    if (dance_styles) {
      // Remove existing styles
      await client.query('DELETE FROM user_styles WHERE user_id = $1', [userId]);
      
      // Add new styles
      if (Array.isArray(dance_styles)) {
        for (const style of dance_styles) {
          if (style.style_id && style.proficiency) {
            await client.query(`
              INSERT INTO user_styles (user_id, style_id, proficiency)
              VALUES ($1, $2, $3)
            `, [userId, style.style_id, style.proficiency]);
          }
        }
      }
    }

    await client.query('COMMIT');

    if (req.headers.accept?.includes('application/json')) {
      res.json({ success: true, message: 'User updated successfully' });
    } else {
      res.redirect('/admin/users/' + userId + '?updated=true');
    }

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error updating user:', error);
    
    if (error.constraint === 'users_email_key') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    res.status(500).json({ error: 'Failed to update user' });
  } finally {
    client.release();
  }
});

// ============================================
// USER DELETION
// ============================================

// DELETE /admin/users/:id - Delete user (cascading delete handled by DB)
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const userResult = await pool.query('SELECT full_name FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete user (cascade will handle related records)
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);

    res.json({ 
      success: true, 
      message: `User "${userResult.rows[0].full_name}" deleted successfully` 
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// ============================================
// BULK OPERATIONS
// ============================================

// POST /admin/users/bulk-action - Bulk operations on users
router.post('/bulk-action', async (req, res) => {
  try {
    const { action, userIds } = req.body;

    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ error: 'No users selected' });
    }

    let result;
    switch (action) {
      case 'verify':
        result = await pool.query(
          'UPDATE users SET is_verified = true WHERE id = ANY($1) RETURNING full_name',
          [userIds]
        );
        break;

      case 'unverify':
        result = await pool.query(
          'UPDATE users SET is_verified = false WHERE id = ANY($1) RETURNING full_name',
          [userIds]
        );
        break;

      case 'delete':
        result = await pool.query(
          'DELETE FROM users WHERE id = ANY($1) RETURNING full_name',
          [userIds]
        );
        break;

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    res.json({
      success: true,
      message: `${action} applied to ${result.rowCount} user(s)`,
      affected: result.rows
    });

  } catch (error) {
    console.error('Error in bulk action:', error);
    res.status(500).json({ error: 'Bulk operation failed' });
  }
});

// ============================================
// USER STATISTICS
// ============================================

// GET /admin/users/stats - Get user statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total_users,
        COUNT(*) FILTER (WHERE role = 'user') as regular_users,
        COUNT(*) FILTER (WHERE role = 'instructor') as instructors,
        COUNT(*) FILTER (WHERE role = 'admin') as admins,
        COUNT(*) FILTER (WHERE is_verified = true) as verified_users,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as new_users_30d,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as new_users_7d,
        COUNT(*) FILTER (WHERE updated_at >= CURRENT_DATE - INTERVAL '24 hours') as active_24h
      FROM users
    `);

    res.json(stats.rows[0]);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;
