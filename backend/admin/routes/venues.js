// Admin Panel - Venue Management Routes
// CRUD operations for venues with location management and relationships
// Author: Generated from ERD v2 database schema
// Created: 2025-08-28

const express = require('express');
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
// VENUE LIST AND SEARCH
// ============================================

// GET /admin/venues - List all venues with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    const city = req.query.city || '';
    const country = req.query.country || '';

    // Build WHERE clause
    let whereConditions = [];
    let queryParams = [];
    let paramIndex = 1;

    if (search) {
      whereConditions.push(`(v.name ILIKE $${paramIndex} OR v.address_line1 ILIKE $${paramIndex})`);
      queryParams.push(`%${search}%`);
      paramIndex++;
    }

    if (city) {
      whereConditions.push(`v.city ILIKE $${paramIndex}`);
      queryParams.push(`%${city}%`);
      paramIndex++;
    }

    if (country) {
      whereConditions.push(`v.country ILIKE $${paramIndex}`);
      queryParams.push(`%${country}%`);
      paramIndex++;
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get venues with usage statistics
    const venuesQuery = `
      SELECT 
        v.*,
        -- Count relationships
        (SELECT COUNT(*) FROM events e WHERE e.venue_id = v.id AND e.deleted_at IS NULL) as total_events,
        (SELECT COUNT(*) FROM class_sessions cs WHERE cs.venue_id = v.id AND cs.deleted_at IS NULL) as total_class_sessions,
        (SELECT COUNT(*) FROM events e WHERE e.venue_id = v.id AND e.start_datetime > NOW() AND e.deleted_at IS NULL) as upcoming_events,
        -- Recent usage
        (SELECT MAX(e.start_datetime) FROM events e WHERE e.venue_id = v.id) as last_event_date
      FROM venues v
      ${whereClause}
      ORDER BY v.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    // Get total count for pagination
    const countQuery = `
      SELECT COUNT(*) as total
      FROM venues v
      ${whereClause}
    `;

    queryParams.push(limit, offset);

    const [venuesResult, countResult] = await Promise.all([
      pool.query(venuesQuery, queryParams.slice(0, -2).concat([limit, offset])),
      pool.query(countQuery, queryParams.slice(0, -2))
    ]);

    const totalVenues = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(totalVenues / limit);

    // Get unique cities and countries for filters
    const filtersResult = await pool.query(`
      SELECT 
        array_agg(DISTINCT city ORDER BY city) as cities,
        array_agg(DISTINCT country ORDER BY country) as countries
      FROM venues
      WHERE city IS NOT NULL AND country IS NOT NULL
    `);

    // If API request, return JSON
    if (req.headers.accept?.includes('application/json')) {
      return res.json({
        venues: venuesResult.rows,
        pagination: {
          currentPage: page,
          totalPages,
          totalVenues,
          limit,
          hasNext: page < totalPages,
          hasPrev: page > 1
        },
        filters: {
          cities: filtersResult.rows[0]?.cities || [],
          countries: filtersResult.rows[0]?.countries || []
        }
      });
    }

    // Otherwise render the view
    res.render('venues/index', {
      title: 'Venue Management',
      venues: venuesResult.rows,
      pagination: {
        currentPage: page,
        totalPages,
        totalVenues,
        limit
      },
      filters: { 
        search, 
        city, 
        country,
        cities: filtersResult.rows[0]?.cities || [],
        countries: filtersResult.rows[0]?.countries || []
      }
    });

  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({ error: 'Failed to fetch venues' });
  }
});

// ============================================
// VENUE DETAILS AND RELATIONSHIPS
// ============================================

// GET /admin/venues/:id - View venue details with all relationships
router.get('/:id', async (req, res) => {
  try {
    const venueId = req.params.id;

    const [venueResult, eventsResult, classSessionsResult, upcomingResult] = await Promise.all([
      // Get venue details
      pool.query('SELECT * FROM venues WHERE id = $1', [venueId]),

      // Get venue's events (recent 10)
      pool.query(`
        SELECT 
          e.id,
          e.title,
          e.event_type,
          e.start_datetime,
          e.end_datetime,
          e.status,
          e.max_attendees,
          e.price,
          u.full_name as organizer_name,
          (SELECT COUNT(*) FROM bookings b WHERE b.event_id = e.id AND b.deleted_at IS NULL) as booking_count
        FROM events e
        LEFT JOIN users u ON e.organizer_user_id = u.id
        WHERE e.venue_id = $1 AND e.deleted_at IS NULL
        ORDER BY e.start_datetime DESC
        LIMIT 10
      `, [venueId]),

      // Get venue's class sessions (recent 10)
      pool.query(`
        SELECT 
          cs.id,
          cs.session_date,
          cs.start_time,
          cs.end_time,
          cs.status,
          c.title as class_title,
          u.full_name as instructor_name,
          (SELECT COUNT(*) FROM bookings b WHERE b.class_session_id = cs.id AND b.deleted_at IS NULL) as booking_count
        FROM class_sessions cs
        JOIN classes c ON cs.class_id = c.id
        LEFT JOIN instructors i ON cs.instructor_id = i.id
        LEFT JOIN users u ON i.user_id = u.id
        WHERE cs.venue_id = $1 AND cs.deleted_at IS NULL
        ORDER BY cs.session_date DESC, cs.start_time DESC
        LIMIT 10
      `, [venueId]),

      // Get upcoming events and sessions for scheduling
      pool.query(`
        SELECT 
          'event' as type,
          e.id,
          e.title as name,
          e.start_datetime as start_time,
          e.end_datetime as end_time,
          e.status
        FROM events e
        WHERE e.venue_id = $1 AND e.start_datetime > NOW() AND e.deleted_at IS NULL
        
        UNION ALL
        
        SELECT 
          'session' as type,
          cs.id,
          c.title as name,
          (cs.session_date + cs.start_time)::timestamp as start_time,
          (cs.session_date + cs.end_time)::timestamp as end_time,
          cs.status
        FROM class_sessions cs
        JOIN classes c ON cs.class_id = c.id
        WHERE cs.venue_id = $1 AND cs.session_date >= CURRENT_DATE AND cs.deleted_at IS NULL
        
        ORDER BY start_time
        LIMIT 20
      `, [venueId])
    ]);

    if (venueResult.rows.length === 0) {
      return res.status(404).json({ error: 'Venue not found' });
    }

    const venue = venueResult.rows[0];

    // If API request, return JSON
    if (req.headers.accept?.includes('application/json')) {
      return res.json({
        venue,
        events: eventsResult.rows,
        classSessions: classSessionsResult.rows,
        upcomingSchedule: upcomingResult.rows
      });
    }

    res.render('venues/detail', {
      title: `Venue: ${venue.name}`,
      venue,
      events: eventsResult.rows,
      classSessions: classSessionsResult.rows,
      upcomingSchedule: upcomingResult.rows
    });

  } catch (error) {
    console.error('Error fetching venue details:', error);
    res.status(500).json({ error: 'Failed to fetch venue details' });
  }
});

// ============================================
// VENUE CREATION AND EDITING
// ============================================

// GET /admin/venues/new - Show create venue form
router.get('/new', (req, res) => {
  res.render('venues/form', {
    title: 'Create New Venue',
    venue: {},
    isEditing: false
  });
});

// POST /admin/venues - Create new venue
router.post('/', async (req, res) => {
  try {
    const {
      name, address_line1, address_line2, city, state, country, postal_code,
      latitude, longitude, phone, website_url
    } = req.body;

    // Validate coordinates if provided
    if (latitude && (latitude < -90 || latitude > 90)) {
      return res.status(400).json({ error: 'Latitude must be between -90 and 90' });
    }
    if (longitude && (longitude < -180 || longitude > 180)) {
      return res.status(400).json({ error: 'Longitude must be between -180 and 180' });
    }

    const result = await pool.query(`
      INSERT INTO venues (
        name, address_line1, address_line2, city, state, country, postal_code,
        latitude, longitude, phone, website_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id
    `, [
      name, address_line1, address_line2, city, state, country, postal_code,
      latitude ? parseFloat(latitude) : null,
      longitude ? parseFloat(longitude) : null,
      phone, website_url
    ]);

    const venueId = result.rows[0].id;

    if (req.headers.accept?.includes('application/json')) {
      res.json({ success: true, venueId, message: 'Venue created successfully' });
    } else {
      res.redirect('/admin/venues/' + venueId + '?created=true');
    }

  } catch (error) {
    console.error('Error creating venue:', error);
    res.status(500).json({ error: 'Failed to create venue' });
  }
});

// GET /admin/venues/:id/edit - Show edit venue form
router.get('/:id/edit', async (req, res) => {
  try {
    const venueId = req.params.id;

    const result = await pool.query('SELECT * FROM venues WHERE id = $1', [venueId]);

    if (result.rows.length === 0) {
      return res.status(404).send('Venue not found');
    }

    res.render('venues/form', {
      title: 'Edit Venue',
      venue: result.rows[0],
      isEditing: true
    });

  } catch (error) {
    console.error('Error loading venue edit form:', error);
    res.status(500).send('Error loading form');
  }
});

// PUT /admin/venues/:id - Update venue
router.put('/:id', async (req, res) => {
  try {
    const venueId = req.params.id;
    const {
      name, address_line1, address_line2, city, state, country, postal_code,
      latitude, longitude, phone, website_url
    } = req.body;

    // Validate coordinates if provided
    if (latitude && (latitude < -90 || latitude > 90)) {
      return res.status(400).json({ error: 'Latitude must be between -90 and 90' });
    }
    if (longitude && (longitude < -180 || longitude > 180)) {
      return res.status(400).json({ error: 'Longitude must be between -180 and 180' });
    }

    const result = await pool.query(`
      UPDATE venues SET
        name = $1, address_line1 = $2, address_line2 = $3, city = $4, state = $5, 
        country = $6, postal_code = $7, latitude = $8, longitude = $9, 
        phone = $10, website_url = $11, updated_at = NOW()
      WHERE id = $12
      RETURNING id
    `, [
      name, address_line1, address_line2, city, state, country, postal_code,
      latitude ? parseFloat(latitude) : null,
      longitude ? parseFloat(longitude) : null,
      phone, website_url, venueId
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Venue not found' });
    }

    if (req.headers.accept?.includes('application/json')) {
      res.json({ success: true, message: 'Venue updated successfully' });
    } else {
      res.redirect('/admin/venues/' + venueId + '?updated=true');
    }

  } catch (error) {
    console.error('Error updating venue:', error);
    res.status(500).json({ error: 'Failed to update venue' });
  }
});

// ============================================
// VENUE DELETION
// ============================================

// DELETE /admin/venues/:id - Delete venue (with safety checks)
router.delete('/:id', async (req, res) => {
  try {
    const venueId = req.params.id;

    // Check if venue exists
    const venueResult = await pool.query('SELECT name FROM venues WHERE id = $1', [venueId]);
    if (venueResult.rows.length === 0) {
      return res.status(404).json({ error: 'Venue not found' });
    }

    // Check if venue has active events or sessions
    const usageResult = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM events WHERE venue_id = $1 AND start_datetime > NOW() AND deleted_at IS NULL) as future_events,
        (SELECT COUNT(*) FROM class_sessions WHERE venue_id = $1 AND session_date >= CURRENT_DATE AND deleted_at IS NULL) as future_sessions
    `, [venueId]);

    const { future_events, future_sessions } = usageResult.rows[0];

    if (parseInt(future_events) > 0 || parseInt(future_sessions) > 0) {
      return res.status(400).json({ 
        error: `Cannot delete venue: ${future_events} future events and ${future_sessions} future sessions are scheduled`,
        futureEvents: future_events,
        futureSessions: future_sessions
      });
    }

    // Delete venue (ON DELETE RESTRICT will prevent deletion if constraints fail)
    await pool.query('DELETE FROM venues WHERE id = $1', [venueId]);

    res.json({ 
      success: true, 
      message: `Venue "${venueResult.rows[0].name}" deleted successfully` 
    });

  } catch (error) {
    console.error('Error deleting venue:', error);
    
    if (error.constraint) {
      return res.status(400).json({ 
        error: 'Cannot delete venue: it is referenced by existing events or class sessions' 
      });
    }
    
    res.status(500).json({ error: 'Failed to delete venue' });
  }
});

// ============================================
// VENUE AVAILABILITY AND SCHEDULING
// ============================================

// GET /admin/venues/:id/availability - Check venue availability for a date range
router.get('/:id/availability', async (req, res) => {
  try {
    const venueId = req.params.id;
    const { start_date, end_date } = req.query;

    if (!start_date || !end_date) {
      return res.status(400).json({ error: 'start_date and end_date are required' });
    }

    // Get all bookings (events and class sessions) for the venue in the date range
    const bookingsResult = await pool.query(`
      SELECT 
        'event' as type,
        e.id,
        e.title as name,
        e.start_datetime as start_time,
        e.end_datetime as end_time,
        e.status,
        u.full_name as organizer
      FROM events e
      LEFT JOIN users u ON e.organizer_user_id = u.id
      WHERE e.venue_id = $1 
        AND e.start_datetime::date <= $3::date 
        AND e.end_datetime::date >= $2::date
        AND e.deleted_at IS NULL
      
      UNION ALL
      
      SELECT 
        'session' as type,
        cs.id,
        c.title as name,
        (cs.session_date + cs.start_time)::timestamp as start_time,
        (cs.session_date + cs.end_time)::timestamp as end_time,
        cs.status,
        u.full_name as organizer
      FROM class_sessions cs
      JOIN classes c ON cs.class_id = c.id
      LEFT JOIN instructors i ON cs.instructor_id = i.id
      LEFT JOIN users u ON i.user_id = u.id
      WHERE cs.venue_id = $1 
        AND cs.session_date <= $3::date 
        AND cs.session_date >= $2::date
        AND cs.deleted_at IS NULL
      
      ORDER BY start_time
    `, [venueId, start_date, end_date]);

    res.json({
      venueId,
      dateRange: { start_date, end_date },
      bookings: bookingsResult.rows,
      totalBookings: bookingsResult.rows.length
    });

  } catch (error) {
    console.error('Error checking venue availability:', error);
    res.status(500).json({ error: 'Failed to check availability' });
  }
});

// ============================================
// VENUE STATISTICS AND ANALYTICS
// ============================================

// GET /admin/venues/stats - Get venue statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total_venues,
        COUNT(DISTINCT city) as cities_count,
        COUNT(DISTINCT country) as countries_count,
        COUNT(*) FILTER (WHERE latitude IS NOT NULL AND longitude IS NOT NULL) as venues_with_coordinates,
        COUNT(*) FILTER (WHERE phone IS NOT NULL) as venues_with_phone,
        COUNT(*) FILTER (WHERE website_url IS NOT NULL) as venues_with_website,
        
        -- Usage statistics
        (SELECT COUNT(*) FROM events e JOIN venues v ON e.venue_id = v.id WHERE e.deleted_at IS NULL) as total_events,
        (SELECT COUNT(*) FROM class_sessions cs JOIN venues v ON cs.venue_id = v.id WHERE cs.deleted_at IS NULL) as total_sessions,
        
        -- Recent activity
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as new_venues_30d
      FROM venues
    `);

    // Get top venues by usage
    const topVenues = await pool.query(`
      SELECT 
        v.id,
        v.name,
        v.city,
        v.state,
        COALESCE(event_count, 0) as event_count,
        COALESCE(session_count, 0) as session_count,
        (COALESCE(event_count, 0) + COALESCE(session_count, 0)) as total_usage
      FROM venues v
      LEFT JOIN (
        SELECT venue_id, COUNT(*) as event_count 
        FROM events 
        WHERE deleted_at IS NULL 
        GROUP BY venue_id
      ) e ON v.id = e.venue_id
      LEFT JOIN (
        SELECT venue_id, COUNT(*) as session_count 
        FROM class_sessions 
        WHERE deleted_at IS NULL 
        GROUP BY venue_id
      ) cs ON v.id = cs.venue_id
      ORDER BY total_usage DESC
      LIMIT 10
    `);

    res.json({
      overview: stats.rows[0],
      topVenues: topVenues.rows
    });

  } catch (error) {
    console.error('Error fetching venue stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// ============================================
// BULK OPERATIONS
// ============================================

// POST /admin/venues/bulk-action - Bulk operations on venues
router.post('/bulk-action', async (req, res) => {
  try {
    const { action, venueIds } = req.body;

    if (!Array.isArray(venueIds) || venueIds.length === 0) {
      return res.status(400).json({ error: 'No venues selected' });
    }

    let result;
    switch (action) {
      case 'delete':
        // Check for active bookings first
        const activeBookings = await pool.query(`
          SELECT v.name, COUNT(*) as active_bookings
          FROM venues v
          LEFT JOIN events e ON v.id = e.venue_id
          LEFT JOIN class_sessions cs ON v.id = cs.venue_id
          WHERE v.id = ANY($1) 
            AND ((e.start_datetime > NOW() AND e.deleted_at IS NULL) 
                 OR (cs.session_date >= CURRENT_DATE AND cs.deleted_at IS NULL))
          GROUP BY v.id, v.name
        `, [venueIds]);

        if (activeBookings.rows.length > 0) {
          return res.status(400).json({ 
            error: 'Cannot delete venues with future bookings',
            conflictingVenues: activeBookings.rows
          });
        }

        result = await pool.query(
          'DELETE FROM venues WHERE id = ANY($1) RETURNING name',
          [venueIds]
        );
        break;

      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    res.json({
      success: true,
      message: `${action} applied to ${result.rowCount} venue(s)`,
      affected: result.rows
    });

  } catch (error) {
    console.error('Error in bulk action:', error);
    res.status(500).json({ error: 'Bulk operation failed' });
  }
});

// ============================================
// GEOCODING HELPERS
// ============================================

// POST /admin/venues/:id/geocode - Geocode venue address
router.post('/:id/geocode', async (req, res) => {
  try {
    const venueId = req.params.id;

    // Get venue address
    const venueResult = await pool.query(`
      SELECT address_line1, address_line2, city, state, country, postal_code
      FROM venues 
      WHERE id = $1
    `, [venueId]);

    if (venueResult.rows.length === 0) {
      return res.status(404).json({ error: 'Venue not found' });
    }

    const venue = venueResult.rows[0];
    const fullAddress = [
      venue.address_line1,
      venue.address_line2,
      venue.city,
      venue.state,
      venue.country,
      venue.postal_code
    ].filter(Boolean).join(', ');

    // Here you would integrate with a geocoding service like Google Maps API
    // For now, return a placeholder response
    res.json({
      success: false,
      message: 'Geocoding service not configured',
      address: fullAddress,
      suggestion: 'Please manually enter latitude and longitude coordinates'
    });

    // Example integration with Google Maps Geocoding API:
    /*
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      
      // Update venue with coordinates
      await pool.query(
        'UPDATE venues SET latitude = $1, longitude = $2 WHERE id = $3',
        [location.lat, location.lng, venueId]
      );
      
      res.json({
        success: true,
        latitude: location.lat,
        longitude: location.lng,
        formatted_address: data.results[0].formatted_address
      });
    } else {
      res.status(400).json({ error: 'Address not found' });
    }
    */

  } catch (error) {
    console.error('Error geocoding venue:', error);
    res.status(500).json({ error: 'Geocoding failed' });
  }
});

module.exports = router;
