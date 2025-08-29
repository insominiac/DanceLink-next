-- Dance Website PostgreSQL Database Schema - ERD v2
-- RBAC, Venues, Styles, Unified Bookings, Transactions
-- Author: Generated from ERD v2 specification
-- Created: 2025-08-28

-- ============================================
-- ENUM TYPES
-- ============================================

-- User roles for RBAC system
CREATE TYPE user_role_enum AS ENUM ('user', 'instructor', 'admin');

-- Event status types
CREATE TYPE event_status_enum AS ENUM ('draft', 'published', 'cancelled');

-- Booking status types
CREATE TYPE booking_status_enum AS ENUM ('pending', 'confirmed', 'cancelled', 'completed', 'refunded');

-- Transaction types and status
CREATE TYPE transaction_type_enum AS ENUM ('payment', 'refund', 'adjustment');
CREATE TYPE transaction_status_enum AS ENUM ('created', 'succeeded', 'failed', 'refunded', 'cancelled');
CREATE TYPE payment_provider_enum AS ENUM ('stripe', 'paypal', 'other');

-- Class session status
CREATE TYPE session_status_enum AS ENUM ('scheduled', 'cancelled', 'completed', 'rescheduled');

-- User style proficiency levels
CREATE TYPE proficiency_enum AS ENUM ('beginner', 'intermediate', 'advanced');

-- Favorites entity types (polymorphic)
CREATE TYPE entity_type_enum AS ENUM ('event', 'class', 'instructor', 'venue', 'user');

-- ============================================
-- CORE TABLES
-- ============================================

-- Users table with RBAC (replaces separate ADMINS table)
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role user_role_enum DEFAULT 'user' NOT NULL,
    bio TEXT,
    profile_image VARCHAR(500),
    is_verified BOOLEAN DEFAULT FALSE,
    website_url VARCHAR(500),
    instagram_handle VARCHAR(100),
    timezone VARCHAR(50) DEFAULT 'UTC',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_timezone CHECK (timezone ~ '^[A-Za-z_/]+$'),
    CONSTRAINT valid_email CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Instructors linked to users (1:1 relationship)
CREATE TABLE instructors (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    specialty VARCHAR(255),
    experience_years INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00 CHECK (rating >= 0.00 AND rating <= 5.00),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Venues table for location normalization
CREATE TABLE venues (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    country VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    phone VARCHAR(20),
    website_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Dance styles for normalization
CREATE TABLE dance_styles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes table
CREATE TABLE classes (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    level VARCHAR(50),
    duration_mins INTEGER,
    max_capacity INTEGER CHECK (max_capacity > 0),
    price DECIMAL(10,2) CHECK (price >= 0),
    schedule_days VARCHAR(100), -- e.g., "Monday,Wednesday,Friday"
    schedule_time TIME,
    requirements TEXT,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    deleted_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Class sessions for detailed scheduling
CREATE TABLE class_sessions (
    id BIGSERIAL PRIMARY KEY,
    class_id BIGINT NOT NULL REFERENCES classes(id) ON DELETE CASCADE ON UPDATE CASCADE,
    session_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    venue_id BIGINT REFERENCES venues(id) ON DELETE SET NULL ON UPDATE CASCADE,
    instructor_id BIGINT REFERENCES instructors(id) ON DELETE SET NULL ON UPDATE CASCADE,
    max_capacity INTEGER CHECK (max_capacity > 0),
    status session_status_enum DEFAULT 'scheduled',
    cancellation_reason TEXT,
    notes TEXT,
    price_override DECIMAL(10,2) CHECK (price_override >= 0),
    deleted_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT logical_time_order CHECK (end_time > start_time),
    CONSTRAINT unique_class_session UNIQUE (class_id, session_date, start_time)
);

-- Events table
CREATE TABLE events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_type VARCHAR(100),
    start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    venue_id BIGINT REFERENCES venues(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    price DECIMAL(10,2) CHECK (price >= 0),
    max_attendees INTEGER CHECK (max_attendees > 0),
    image_url VARCHAR(500),
    organizer_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    status event_status_enum DEFAULT 'draft' NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT logical_datetime_order CHECK (end_datetime > start_datetime),
    CONSTRAINT future_event CHECK (start_datetime > NOW() - INTERVAL '1 day')
);

-- Class-instructor mapping (M:N relationship)
CREATE TABLE class_instructors (
    id BIGSERIAL PRIMARY KEY,
    class_id BIGINT NOT NULL REFERENCES classes(id) ON DELETE CASCADE ON UPDATE CASCADE,
    instructor_id BIGINT NOT NULL REFERENCES instructors(id) ON DELETE CASCADE ON UPDATE CASCADE,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_class_instructor UNIQUE (class_id, instructor_id)
);

-- ============================================
-- STYLE MAPPING TABLES
-- ============================================

-- User styles (skills/interests)
CREATE TABLE user_styles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    style_id BIGINT NOT NULL REFERENCES dance_styles(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    proficiency proficiency_enum DEFAULT 'beginner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_user_style UNIQUE (user_id, style_id)
);

-- Class styles mapping
CREATE TABLE class_styles (
    id BIGSERIAL PRIMARY KEY,
    class_id BIGINT NOT NULL REFERENCES classes(id) ON DELETE CASCADE ON UPDATE CASCADE,
    style_id BIGINT NOT NULL REFERENCES dance_styles(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_class_style UNIQUE (class_id, style_id)
);

-- Event styles mapping
CREATE TABLE event_styles (
    id BIGSERIAL PRIMARY KEY,
    event_id BIGINT NOT NULL REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE,
    style_id BIGINT NOT NULL REFERENCES dance_styles(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_event_style UNIQUE (event_id, style_id)
);

-- ============================================
-- BOOKING AND PAYMENT TABLES
-- ============================================

-- Unified bookings table
CREATE TABLE bookings (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    class_id BIGINT REFERENCES classes(id) ON DELETE CASCADE ON UPDATE CASCADE,
    event_id BIGINT REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE,
    class_session_id BIGINT REFERENCES class_sessions(id) ON DELETE CASCADE ON UPDATE CASCADE,
    booking_datetime TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status booking_status_enum DEFAULT 'pending' NOT NULL,
    amount_paid DECIMAL(10,2) CHECK (amount_paid >= 0),
    payment_method VARCHAR(50),
    notes TEXT,
    deleted_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure exactly one booking type is set
    CONSTRAINT one_booking_type CHECK (
        (class_id IS NOT NULL)::int + 
        (event_id IS NOT NULL)::int + 
        (class_session_id IS NOT NULL)::int = 1
    )
);

-- Partial unique indexes for bookings (prevent duplicates)
CREATE UNIQUE INDEX unique_user_class_booking 
    ON bookings (user_id, class_id) 
    WHERE class_id IS NOT NULL AND deleted_at IS NULL;

CREATE UNIQUE INDEX unique_user_event_booking 
    ON bookings (user_id, event_id) 
    WHERE event_id IS NOT NULL AND deleted_at IS NULL;

CREATE UNIQUE INDEX unique_user_session_booking 
    ON bookings (user_id, class_session_id) 
    WHERE class_session_id IS NOT NULL AND deleted_at IS NULL;

-- Transactions for payment/refund logging
CREATE TABLE transactions (
    id BIGSERIAL PRIMARY KEY,
    booking_id BIGINT REFERENCES bookings(id) ON DELETE SET NULL ON UPDATE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    provider payment_provider_enum NOT NULL,
    provider_payment_id VARCHAR(255),
    provider_refund_id VARCHAR(255),
    type transaction_type_enum NOT NULL,
    status transaction_status_enum DEFAULT 'created' NOT NULL,
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    currency VARCHAR(3) DEFAULT 'USD',
    payload TEXT, -- Raw provider response
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- COMMUNITY AND CONTENT TABLES
-- ============================================

-- Forum posts
CREATE TABLE forum_posts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    category VARCHAR(100),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Forum replies
CREATE TABLE forum_replies (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
    parent_id BIGINT REFERENCES forum_replies(id) ON DELETE CASCADE ON UPDATE CASCADE,
    content TEXT NOT NULL,
    likes_count INTEGER DEFAULT 0,
    is_solution BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    priority VARCHAR(20) DEFAULT 'normal',
    action_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logs (replaces admin_id with user_id)
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100),
    record_id BIGINT,
    old_values TEXT,
    new_values TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages
CREATE TABLE contact_messages (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    admin_response TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials
CREATE TABLE testimonials (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partner requests
CREATE TABLE partner_requests (
    id BIGSERIAL PRIMARY KEY,
    requester_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    skill_level VARCHAR(50),
    location_city VARCHAR(100),
    availability_text TEXT,
    message TEXT,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partner matches
CREATE TABLE partner_matches (
    id BIGSERIAL PRIMARY KEY,
    user1_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    user2_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    match_score DECIMAL(3,2),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT different_users CHECK (user1_id != user2_id)
);

-- Favorites (polymorphic system)
CREATE TABLE favorites (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    entity_type entity_type_enum NOT NULL,
    entity_id BIGINT NOT NULL CHECK (entity_id > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT unique_favorite UNIQUE (user_id, entity_type, entity_id)
);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_instructors_updated_at BEFORE UPDATE ON instructors 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_venues_updated_at BEFORE UPDATE ON venues 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dance_styles_updated_at BEFORE UPDATE ON dance_styles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_class_sessions_updated_at BEFORE UPDATE ON class_sessions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_class_instructors_updated_at BEFORE UPDATE ON class_instructors 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_styles_updated_at BEFORE UPDATE ON user_styles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_class_styles_updated_at BEFORE UPDATE ON class_styles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_styles_updated_at BEFORE UPDATE ON event_styles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forum_posts_updated_at BEFORE UPDATE ON forum_posts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_forum_replies_updated_at BEFORE UPDATE ON forum_replies 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_audit_logs_updated_at BEFORE UPDATE ON audit_logs 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partner_requests_updated_at BEFORE UPDATE ON partner_requests 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partner_matches_updated_at BEFORE UPDATE ON partner_matches 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_favorites_updated_at BEFORE UPDATE ON favorites 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE users IS 'Unified users table with RBAC (user/instructor/admin)';
COMMENT ON TABLE instructors IS 'Instructor profiles linked to users (1:1)';
COMMENT ON TABLE venues IS 'Normalized venue information for events and classes';
COMMENT ON TABLE dance_styles IS 'Master list of dance styles';
COMMENT ON TABLE classes IS 'Recurring dance classes';
COMMENT ON TABLE class_sessions IS 'Individual class sessions with scheduling flexibility';
COMMENT ON TABLE events IS 'One-time dance events';
COMMENT ON TABLE bookings IS 'Unified booking system for classes, events, and sessions';
COMMENT ON TABLE transactions IS 'Payment and refund transaction logs';
COMMENT ON TABLE favorites IS 'Polymorphic favorites system for users';

COMMENT ON COLUMN users.role IS 'RBAC role: user, instructor, or admin';
COMMENT ON COLUMN users.timezone IS 'User timezone for datetime display';
COMMENT ON COLUMN events.start_datetime IS 'Event start time in UTC';
COMMENT ON COLUMN events.end_datetime IS 'Event end time in UTC';
COMMENT ON COLUMN bookings.class_id IS 'For class bookings (mutually exclusive)';
COMMENT ON COLUMN bookings.event_id IS 'For event bookings (mutually exclusive)';
COMMENT ON COLUMN bookings.class_session_id IS 'For specific session bookings (mutually exclusive)';
COMMENT ON COLUMN favorites.entity_type IS 'Type of favorited entity';
COMMENT ON COLUMN favorites.entity_id IS 'ID of favorited entity';
