-- Dance Website PostgreSQL Indexes and Performance Optimizations - ERD v2
-- Author: Generated from ERD v2 specification
-- Created: 2025-08-28

-- ============================================
-- SINGLE COLUMN INDEXES
-- ============================================

-- Users table indexes
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_is_verified ON users(is_verified);

-- Instructors table indexes  
CREATE INDEX idx_instructors_user_id ON instructors(user_id);
CREATE INDEX idx_instructors_is_active ON instructors(is_active);
CREATE INDEX idx_instructors_rating ON instructors(rating);

-- Classes table indexes
CREATE INDEX idx_classes_created_at ON classes(created_at);
CREATE INDEX idx_classes_is_active ON classes(is_active);
CREATE INDEX idx_classes_deleted_at ON classes(deleted_at);
CREATE INDEX idx_classes_level ON classes(level);

-- Events table indexes
CREATE INDEX idx_events_venue_id ON events(venue_id);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_organizer_user_id ON events(organizer_user_id);
CREATE INDEX idx_events_start_datetime ON events(start_datetime);
CREATE INDEX idx_events_deleted_at ON events(deleted_at);
CREATE INDEX idx_events_is_featured ON events(is_featured);

-- Venues table indexes
CREATE INDEX idx_venues_name ON venues(name);
CREATE INDEX idx_venues_city ON venues(city);
CREATE INDEX idx_venues_country ON venues(country);

-- Bookings table indexes
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_class_id ON bookings(class_id);
CREATE INDEX idx_bookings_event_id ON bookings(event_id);
CREATE INDEX idx_bookings_class_session_id ON bookings(class_session_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
CREATE INDEX idx_bookings_booking_datetime ON bookings(booking_datetime);
CREATE INDEX idx_bookings_deleted_at ON bookings(deleted_at);

-- Transactions table indexes
CREATE INDEX idx_transactions_booking_id ON transactions(booking_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_provider ON transactions(provider);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);

-- Class sessions indexes
CREATE INDEX idx_class_sessions_class_id ON class_sessions(class_id);
CREATE INDEX idx_class_sessions_venue_id ON class_sessions(venue_id);
CREATE INDEX idx_class_sessions_instructor_id ON class_sessions(instructor_id);
CREATE INDEX idx_class_sessions_session_date ON class_sessions(session_date);
CREATE INDEX idx_class_sessions_status ON class_sessions(status);
CREATE INDEX idx_class_sessions_deleted_at ON class_sessions(deleted_at);

-- Forum table indexes
CREATE INDEX idx_forum_posts_user_id ON forum_posts(user_id);
CREATE INDEX idx_forum_posts_category ON forum_posts(category);
CREATE INDEX idx_forum_posts_created_at ON forum_posts(created_at);

CREATE INDEX idx_forum_replies_post_id ON forum_replies(post_id);
CREATE INDEX idx_forum_replies_user_id ON forum_replies(user_id);
CREATE INDEX idx_forum_replies_parent_id ON forum_replies(parent_id);
CREATE INDEX idx_forum_replies_created_at ON forum_replies(created_at);

-- Style mapping indexes
CREATE INDEX idx_user_styles_user_id ON user_styles(user_id);
CREATE INDEX idx_user_styles_style_id ON user_styles(style_id);

CREATE INDEX idx_class_styles_class_id ON class_styles(class_id);
CREATE INDEX idx_class_styles_style_id ON class_styles(style_id);

CREATE INDEX idx_event_styles_event_id ON event_styles(event_id);
CREATE INDEX idx_event_styles_style_id ON event_styles(style_id);

-- Favorites indexes
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_entity_type ON favorites(entity_type);
CREATE INDEX idx_favorites_created_at ON favorites(created_at);

-- ============================================
-- COMPOSITE INDEXES FOR QUERY PERFORMANCE
-- ============================================

-- Event location & time queries
CREATE INDEX idx_events_venue_datetime ON events (venue_id, start_datetime);
CREATE INDEX idx_events_venue_status_datetime ON events (venue_id, status, start_datetime);
CREATE INDEX idx_events_status_datetime ON events (status, start_datetime);
CREATE INDEX idx_events_featured_datetime ON events (is_featured, start_datetime) WHERE is_featured = TRUE;

-- City-based venue and event searches
CREATE INDEX idx_venues_city_country ON venues (city, country);
CREATE INDEX idx_venues_city_created_at ON venues (city, created_at);

-- User activity & booking patterns
CREATE INDEX idx_bookings_user_datetime ON bookings (user_id, booking_datetime);
CREATE INDEX idx_bookings_user_status ON bookings (user_id, status);
CREATE INDEX idx_bookings_status_datetime ON bookings (status, created_at);

-- Transaction queries
CREATE INDEX idx_transactions_user_datetime ON transactions (user_id, created_at);
CREATE INDEX idx_transactions_status_datetime ON transactions (status, created_at);
CREATE INDEX idx_transactions_provider_status ON transactions (provider, status);

-- Style-based searches
CREATE INDEX idx_user_styles_style_proficiency ON user_styles (style_id, proficiency);
CREATE INDEX idx_class_styles_style_class ON class_styles (style_id, class_id);
CREATE INDEX idx_event_styles_style_event ON event_styles (style_id, event_id);

-- Forum & content queries
CREATE INDEX idx_forum_posts_category_datetime ON forum_posts (category, created_at);
CREATE INDEX idx_forum_posts_user_datetime ON forum_posts (user_id, created_at);
CREATE INDEX idx_forum_replies_post_datetime ON forum_replies (post_id, created_at);

-- Favorites & user preferences
CREATE INDEX idx_favorites_user_entity ON favorites (user_id, entity_type);
CREATE INDEX idx_favorites_entity_type_id ON favorites (entity_type, entity_id);
CREATE INDEX idx_favorites_user_created ON favorites (user_id, created_at);

-- Class sessions & scheduling
CREATE INDEX idx_class_sessions_class_date ON class_sessions (class_id, session_date);
CREATE INDEX idx_class_sessions_date_status ON class_sessions (session_date, status);
CREATE INDEX idx_class_sessions_venue_date ON class_sessions (venue_id, session_date) WHERE venue_id IS NOT NULL;
CREATE INDEX idx_class_sessions_instructor_date ON class_sessions (instructor_id, session_date) WHERE instructor_id IS NOT NULL;

-- ============================================
-- UNIQUE CONSTRAINTS FOR PAYMENT PROVIDERS
-- ============================================

-- Unique payment IDs per provider (when not null)
CREATE UNIQUE INDEX unique_provider_payment_id 
    ON transactions (provider, provider_payment_id) 
    WHERE provider_payment_id IS NOT NULL;

CREATE UNIQUE INDEX unique_provider_refund_id 
    ON transactions (provider, provider_refund_id) 
    WHERE provider_refund_id IS NOT NULL;

-- ============================================
-- PARTIAL INDEXES FOR SOFT DELETE
-- ============================================

-- Active (non-deleted) record indexes for better performance
CREATE INDEX idx_classes_active ON classes (id, created_at) WHERE deleted_at IS NULL;
CREATE INDEX idx_events_active ON events (id, start_datetime) WHERE deleted_at IS NULL;
CREATE INDEX idx_class_sessions_active ON class_sessions (class_id, session_date) WHERE deleted_at IS NULL;
CREATE INDEX idx_bookings_active ON bookings (user_id, created_at) WHERE deleted_at IS NULL;

-- ============================================
-- COVERING INDEXES FOR FREQUENT QUERIES
-- ============================================

-- Event list with venue information (covers common SELECT fields)
CREATE INDEX idx_events_list_covering ON events (start_datetime, status) 
    INCLUDE (id, title, venue_id, price, max_attendees, is_featured) 
    WHERE deleted_at IS NULL;

-- User booking history with essential info
CREATE INDEX idx_bookings_user_history ON bookings (user_id, booking_datetime DESC) 
    INCLUDE (id, status, amount_paid, class_id, event_id, class_session_id) 
    WHERE deleted_at IS NULL;

-- Class sessions with details for scheduling views
CREATE INDEX idx_class_sessions_schedule ON class_sessions (session_date, start_time) 
    INCLUDE (id, class_id, venue_id, instructor_id, status, max_capacity) 
    WHERE deleted_at IS NULL AND status IN ('scheduled', 'rescheduled');

-- ============================================
-- FULL-TEXT SEARCH INDEXES (Optional)
-- ============================================

-- Full-text search for events and classes
CREATE INDEX idx_events_fulltext ON events USING GIN(to_tsvector('english', title || ' ' || COALESCE(description, '')));
CREATE INDEX idx_classes_fulltext ON classes USING GIN(to_tsvector('english', title || ' ' || COALESCE(description, '')));
CREATE INDEX idx_forum_posts_fulltext ON forum_posts USING GIN(to_tsvector('english', title || ' ' || content));

-- ============================================
-- STATISTICS AND MAINTENANCE
-- ============================================

-- Update statistics for better query planning
ANALYZE users;
ANALYZE instructors;
ANALYZE venues;
ANALYZE dance_styles;
ANALYZE classes;
ANALYZE class_sessions;
ANALYZE events;
ANALYZE bookings;
ANALYZE transactions;

-- ============================================
-- PERFORMANCE NOTES
-- ============================================

/*
INDEX USAGE PATTERNS:
- Leading column optimization: Indexes work best when queries filter on leftmost columns first
- Range queries: Composite indexes with datetime as rightmost column optimize date range filters
- Covering indexes: Include additional columns to avoid table lookups for common queries
- Partial indexes: Filter WHERE clauses improve performance for common query patterns

MAINTENANCE RECOMMENDATIONS:
- Monitor query performance using EXPLAIN ANALYZE
- Use pg_stat_user_indexes to track index usage
- Consider dropping unused indexes to improve write performance
- Run REINDEX periodically on heavily updated tables
- Update table statistics regularly with ANALYZE

SOFT DELETE CONSIDERATIONS:
- All queries on tables with deleted_at should include WHERE deleted_at IS NULL
- Consider creating views for active records to simplify application queries
- Partial indexes on deleted_at IS NULL improve performance for active records

TIMEZONE HANDLING:
- All timestamps stored in UTC using TIMESTAMP WITH TIME ZONE
- Application layer handles timezone conversion based on users.timezone
- Use AT TIME ZONE for timezone conversion in queries when needed
*/
