-- Railway Database Migration Script
-- This script sets up the complete database schema for the Dance Website Admin Panel

-- Drop existing schema if it exists (be careful in production!)
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin', 'venue_owner');
CREATE TYPE user_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE venue_status AS ENUM ('active', 'inactive', 'maintenance');
CREATE TYPE class_status AS ENUM ('active', 'cancelled', 'full', 'draft');
CREATE TYPE event_status AS ENUM ('upcoming', 'ongoing', 'completed', 'cancelled');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed', 'refunded');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE payment_method AS ENUM ('credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash');
CREATE TYPE transaction_type AS ENUM ('booking', 'refund', 'membership', 'merchandise');
CREATE TYPE review_type AS ENUM ('class', 'event', 'venue', 'instructor');

-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    profile_image_url TEXT,
    bio TEXT,
    address JSONB,
    user_role user_role DEFAULT 'student',
    user_status user_status DEFAULT 'active',
    email_verified BOOLEAN DEFAULT false,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP WITH TIME ZONE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Venues table
CREATE TABLE venues (
    venue_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address JSONB NOT NULL,
    contact_info JSONB,
    capacity INTEGER DEFAULT 50,
    amenities JSONB,
    images JSONB,
    venue_status venue_status DEFAULT 'active',
    owner_id INTEGER REFERENCES users(user_id),
    rating DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Dance styles table
CREATE TABLE dance_styles (
    style_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    difficulty_level VARCHAR(20) DEFAULT 'beginner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Classes table
CREATE TABLE classes (
    class_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    instructor_id INTEGER NOT NULL REFERENCES users(user_id),
    venue_id INTEGER NOT NULL REFERENCES venues(venue_id),
    dance_style_id INTEGER REFERENCES dance_styles(style_id),
    duration INTEGER NOT NULL DEFAULT 60,
    capacity INTEGER NOT NULL DEFAULT 20,
    price DECIMAL(10,2) NOT NULL,
    difficulty_level VARCHAR(20) DEFAULT 'beginner',
    class_status class_status DEFAULT 'active',
    schedule JSONB,
    requirements TEXT,
    images JSONB,
    rating DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    event_type VARCHAR(50) NOT NULL,
    venue_id INTEGER REFERENCES venues(venue_id),
    organizer_id INTEGER NOT NULL REFERENCES users(user_id),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    price DECIMAL(10,2),
    capacity INTEGER DEFAULT 100,
    event_status event_status DEFAULT 'upcoming',
    requirements TEXT,
    images JSONB,
    additional_info JSONB,
    rating DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    class_id INTEGER REFERENCES classes(class_id),
    event_id INTEGER REFERENCES events(event_id),
    booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
    participants INTEGER DEFAULT 1,
    total_amount DECIMAL(10,2) NOT NULL,
    booking_status booking_status DEFAULT 'pending',
    special_requirements TEXT,
    confirmation_code VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_booking_type CHECK ((class_id IS NOT NULL AND event_id IS NULL) OR (class_id IS NULL AND event_id IS NOT NULL))
);

-- Transactions table
CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(booking_id),
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    amount DECIMAL(10,2) NOT NULL,
    transaction_type transaction_type NOT NULL,
    payment_method payment_method NOT NULL,
    payment_status payment_status DEFAULT 'pending',
    payment_reference VARCHAR(255),
    payment_gateway_response JSONB,
    refund_amount DECIMAL(10,2) DEFAULT 0.00,
    refund_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    class_id INTEGER REFERENCES classes(class_id),
    event_id INTEGER REFERENCES events(event_id),
    venue_id INTEGER REFERENCES venues(venue_id),
    instructor_id INTEGER REFERENCES users(user_id),
    review_type review_type NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    helpful_votes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Forum categories table
CREATE TABLE forum_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(7) DEFAULT '#007bff',
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Forum posts table
CREATE TABLE forum_posts (
    post_id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES forum_categories(category_id),
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT false,
    is_locked BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Forum replies table  
CREATE TABLE forum_replies (
    reply_id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES forum_posts(post_id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(user_id),
    parent_reply_id INTEGER REFERENCES forum_replies(reply_id),
    content TEXT NOT NULL,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(user_role);
CREATE INDEX idx_users_status ON users(user_status);
CREATE INDEX idx_venues_status ON venues(venue_status);
CREATE INDEX idx_venues_owner ON venues(owner_id);
CREATE INDEX idx_classes_instructor ON classes(instructor_id);
CREATE INDEX idx_classes_venue ON classes(venue_id);
CREATE INDEX idx_classes_status ON classes(class_status);
CREATE INDEX idx_classes_style ON classes(dance_style_id);
CREATE INDEX idx_events_venue ON events(venue_id);
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_events_status ON events(event_status);
CREATE INDEX idx_events_dates ON events(start_date, end_date);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_class ON bookings(class_id);
CREATE INDEX idx_bookings_event ON bookings(event_id);
CREATE INDEX idx_bookings_status ON bookings(booking_status);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_transactions_booking ON transactions(booking_id);
CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_status ON transactions(payment_status);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_reviews_class ON reviews(class_id);
CREATE INDEX idx_reviews_event ON reviews(event_id);
CREATE INDEX idx_reviews_venue ON reviews(venue_id);
CREATE INDEX idx_reviews_instructor ON reviews(instructor_id);
CREATE INDEX idx_forum_posts_category ON forum_posts(category_id);
CREATE INDEX idx_forum_posts_user ON forum_posts(user_id);
CREATE INDEX idx_forum_replies_post ON forum_replies(post_id);
CREATE INDEX idx_forum_replies_user ON forum_replies(user_id);

-- Insert sample data

-- Sample dance styles
INSERT INTO dance_styles (name, description, difficulty_level) VALUES
('Ballet', 'Classical ballet with focus on technique and grace', 'beginner'),
('Hip Hop', 'Urban dance style with energetic movements', 'intermediate'),
('Salsa', 'Latin dance with passionate and rhythmic movements', 'beginner'),
('Contemporary', 'Modern dance combining classical and modern elements', 'intermediate'),
('Tango', 'Argentine tango with dramatic and intimate movements', 'advanced'),
('Jazz', 'High-energy dance with sharp movements', 'beginner');

-- Sample admin user (password: admin123)
INSERT INTO users (email, password_hash, first_name, last_name, phone, user_role, user_status, email_verified) VALUES
('admin@dancewebsite.com', '$2b$10$rOvHFZPKJm8YYfVKGLmxSudVvA5tF8jHUEQfgUgOhKWnGVVRmHJGu', 'Admin', 'User', '+1234567890', 'admin', 'active', true);

-- Sample users (password: password123)
INSERT INTO users (email, password_hash, first_name, last_name, phone, date_of_birth, user_role, user_status, email_verified) VALUES
('john.doe@email.com', '$2b$10$YQGnB5a.98CwsKCrwVwNL.H8PQD8l3dUyOWUOMPDlDWzUJmJwrpGq', 'John', 'Doe', '+1987654321', '1990-05-15', 'student', 'active', true),
('jane.smith@email.com', '$2b$10$YQGnB5a.98CwsKCrwVwNL.H8PQD8l3dUyOWUOMPDlDWzUJmJwrpGq', 'Jane', 'Smith', '+1123456789', '1985-08-22', 'teacher', 'active', true),
('mike.wilson@email.com', '$2b$10$YQGnB5a.98CwsKCrwVwNL.H8PQD8l3dUyOWUOMPDlDWzUJmJwrpGq', 'Mike', 'Wilson', '+1555666777', '1992-03-10', 'venue_owner', 'active', true);

-- Sample venues
INSERT INTO venues (name, description, address, contact_info, capacity, amenities, venue_status, owner_id, rating) VALUES
('Downtown Dance Studio', 'Modern dance studio in the heart of the city', 
 '{"street": "123 Main St", "city": "New York", "state": "NY", "zip": "10001", "country": "USA"}',
 '{"phone": "+1234567890", "email": "info@downtownstudio.com"}',
 50, '["mirrors", "sound system", "air conditioning", "changing rooms"]', 'active', 4, 4.5),
 
('Riverside Community Center', 'Community center with large hall for events',
 '{"street": "456 River Rd", "city": "New York", "state": "NY", "zip": "10002", "country": "USA"}',
 '{"phone": "+1987654321", "email": "events@riverside.com"}',
 200, '["parking", "kitchen", "sound system", "stage"]', 'active', 4, 4.2);

-- Sample classes
INSERT INTO classes (name, description, instructor_id, venue_id, dance_style_id, duration, capacity, price, difficulty_level, class_status) VALUES
('Beginner Ballet', 'Perfect for those new to ballet', 3, 1, 1, 60, 15, 25.00, 'beginner', 'active'),
('Hip Hop Fundamentals', 'Learn the basics of hip hop dance', 3, 1, 2, 90, 20, 30.00, 'intermediate', 'active'),
('Salsa Night', 'Evening salsa classes for all levels', 3, 2, 3, 75, 25, 20.00, 'beginner', 'active');

-- Sample events
INSERT INTO events (name, description, event_type, venue_id, organizer_id, start_date, end_date, price, capacity, event_status) VALUES
('Annual Dance Competition', 'City-wide dance competition with multiple categories', 'competition', 2, 3, '2024-06-15 18:00:00+00', '2024-06-15 23:00:00+00', 15.00, 150, 'upcoming'),
('Summer Dance Workshop', 'Intensive workshop with guest instructors', 'workshop', 1, 3, '2024-07-20 10:00:00+00', '2024-07-21 17:00:00+00', 75.00, 40, 'upcoming');

-- Sample forum categories
INSERT INTO forum_categories (name, description, color, sort_order) VALUES
('General Discussion', 'General talk about dance and community', '#007bff', 1),
('Class Reviews', 'Share your experiences with different classes', '#28a745', 2),
('Event Announcements', 'Announcements about upcoming events', '#ffc107', 3),
('Beginner Questions', 'Questions from beginners - everyone welcome!', '#17a2b8', 4);

-- Sample forum posts
INSERT INTO forum_posts (category_id, user_id, title, content, view_count, like_count, reply_count) VALUES
(1, 2, 'Welcome to our dance community!', 'Hi everyone! Welcome to our online dance community. Feel free to introduce yourself and let us know what dance styles you''re interested in!', 45, 12, 3),
(2, 2, 'Amazing Hip Hop class experience', 'Just wanted to share my experience with the Hip Hop Fundamentals class. The instructor was fantastic and really helped me understand the basics.', 23, 8, 1),
(4, 4, 'Complete beginner - where to start?', 'Hi all! I''m completely new to dance and feeling a bit overwhelmed by all the options. Can anyone recommend good classes for absolute beginners?', 67, 15, 5);

-- Verification query
SELECT 'Database migration completed successfully!' as status;
SELECT 'Users' as table_name, count(*) as count FROM users
UNION ALL
SELECT 'Venues', count(*) FROM venues  
UNION ALL
SELECT 'Classes', count(*) FROM classes
UNION ALL
SELECT 'Events', count(*) FROM events
UNION ALL
SELECT 'Dance Styles', count(*) FROM dance_styles
UNION ALL
SELECT 'Forum Categories', count(*) FROM forum_categories
UNION ALL
SELECT 'Forum Posts', count(*) FROM forum_posts;
