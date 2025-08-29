-- Dance Website PostgreSQL Sample Data - ERD v2
-- Sample data to test the database structure and relationships
-- Author: Generated from ERD v2 specification
-- Created: 2025-08-28

-- ============================================
-- SAMPLE DANCE STYLES
-- ============================================

INSERT INTO dance_styles (name, category) VALUES
('Ballet', 'Classical'),
('Hip Hop', 'Street'),
('Jazz', 'Contemporary'),
('Salsa', 'Latin'),
('Bachata', 'Latin'),
('Tango', 'Ballroom'),
('Waltz', 'Ballroom'),
('Contemporary', 'Modern'),
('Breaking', 'Street'),
('House', 'Street'),
('Swing', 'Social'),
('Foxtrot', 'Ballroom');

-- ============================================
-- SAMPLE VENUES
-- ============================================

INSERT INTO venues (name, address_line1, city, state, country, postal_code, latitude, longitude, phone, website_url) VALUES
('Downtown Dance Studio', '123 Main Street', 'New York', 'NY', 'USA', '10001', 40.7589, -73.9851, '+1-212-555-0123', 'https://downtowndance.com'),
('Riverside Arts Center', '456 River Road', 'Brooklyn', 'NY', 'USA', '11201', 40.7061, -73.9969, '+1-718-555-0456', 'https://riversidearts.org'),
('The Grand Ballroom', '789 Broadway', 'New York', 'NY', 'USA', '10003', 40.7505, -73.9934, '+1-212-555-0789', 'https://grandballroom.nyc'),
('Mission District Studio', '321 Valencia Street', 'San Francisco', 'CA', 'USA', '94110', 37.7611, -122.4208, '+1-415-555-0321', 'https://missiondance.com'),
('Venice Beach Dance Hall', '654 Ocean Front Walk', 'Venice', 'CA', 'USA', '90291', 34.0195, -118.4912, '+1-310-555-0654', null);

-- ============================================
-- SAMPLE USERS (INCLUDING ADMINS AND INSTRUCTORS)
-- ============================================

-- Regular users
INSERT INTO users (email, password_hash, full_name, phone, role, bio, is_verified, timezone) VALUES
('john.doe@email.com', '$2b$12$example_hash_1', 'John Doe', '+1-555-0101', 'user', 'Love dancing salsa and bachata!', true, 'America/New_York'),
('sarah.wilson@email.com', '$2b$12$example_hash_2', 'Sarah Wilson', '+1-555-0102', 'user', 'Ballet enthusiast since childhood', true, 'America/New_York'),
('mike.johnson@email.com', '$2b$12$example_hash_3', 'Mike Johnson', '+1-555-0103', 'user', 'Hip hop and street dance lover', true, 'America/Los_Angeles'),
('emma.davis@email.com', '$2b$12$example_hash_4', 'Emma Davis', '+1-555-0104', 'user', 'Contemporary and modern dance', true, 'America/Chicago');

-- Instructor users
INSERT INTO users (email, password_hash, full_name, phone, role, bio, is_verified, website_url, instagram_handle, timezone) VALUES
('maria.garcia@email.com', '$2b$12$example_hash_5', 'Maria Garcia', '+1-555-0201', 'instructor', 'Professional salsa and bachata instructor with 15 years of experience', true, 'https://mariadance.com', '@maria_salsa_nyc', 'America/New_York'),
('david.chen@email.com', '$2b$12$example_hash_6', 'David Chen', '+1-555-0202', 'instructor', 'Hip hop choreographer and breaking specialist', true, 'https://davidhiphop.com', '@david_breaks', 'America/Los_Angeles'),
('anna.petrov@email.com', '$2b$12$example_hash_7', 'Anna Petrov', '+1-555-0203', 'instructor', 'Former principal dancer, now teaching ballet and contemporary', true, 'https://annapetrov.dance', '@anna_ballet', 'America/New_York'),
('carlos.rodriguez@email.com', '$2b$12$example_hash_8', 'Carlos Rodriguez', '+1-555-0204', 'instructor', 'Ballroom dance champion and certified instructor', true, null, '@carlos_ballroom', 'America/Los_Angeles');

-- Admin users
INSERT INTO users (email, password_hash, full_name, phone, role, bio, is_verified, timezone) VALUES
('admin@dancewebsite.com', '$2b$12$example_hash_9', 'Admin User', '+1-555-0301', 'admin', 'Dance website administrator', true, 'America/New_York'),
('manager@dancewebsite.com', '$2b$12$example_hash_10', 'Site Manager', '+1-555-0302', 'admin', 'Site operations manager', true, 'America/New_York');

-- ============================================
-- SAMPLE INSTRUCTORS
-- ============================================

INSERT INTO instructors (user_id, specialty, experience_years, rating, is_active) VALUES
((SELECT id FROM users WHERE email = 'maria.garcia@email.com'), 'Salsa, Bachata, Latin Dance', 15, 4.85, true),
((SELECT id FROM users WHERE email = 'david.chen@email.com'), 'Hip Hop, Breaking, Street Dance', 12, 4.72, true),
((SELECT id FROM users WHERE email = 'anna.petrov@email.com'), 'Ballet, Contemporary, Modern', 20, 4.95, true),
((SELECT id FROM users WHERE email = 'carlos.rodriguez@email.com'), 'Ballroom, Tango, Foxtrot', 18, 4.88, true);

-- ============================================
-- SAMPLE USER STYLES
-- ============================================

INSERT INTO user_styles (user_id, style_id, proficiency) VALUES
-- John Doe's styles
((SELECT id FROM users WHERE email = 'john.doe@email.com'), (SELECT id FROM dance_styles WHERE name = 'Salsa'), 'intermediate'),
((SELECT id FROM users WHERE email = 'john.doe@email.com'), (SELECT id FROM dance_styles WHERE name = 'Bachata'), 'beginner'),

-- Sarah Wilson's styles  
((SELECT id FROM users WHERE email = 'sarah.wilson@email.com'), (SELECT id FROM dance_styles WHERE name = 'Ballet'), 'advanced'),
((SELECT id FROM users WHERE email = 'sarah.wilson@email.com'), (SELECT id FROM dance_styles WHERE name = 'Contemporary'), 'intermediate'),

-- Mike Johnson's styles
((SELECT id FROM users WHERE email = 'mike.johnson@email.com'), (SELECT id FROM dance_styles WHERE name = 'Hip Hop'), 'advanced'),
((SELECT id FROM users WHERE email = 'mike.johnson@email.com'), (SELECT id FROM dance_styles WHERE name = 'Breaking'), 'intermediate'),

-- Emma Davis's styles
((SELECT id FROM users WHERE email = 'emma.davis@email.com'), (SELECT id FROM dance_styles WHERE name = 'Contemporary'), 'advanced'),
((SELECT id FROM users WHERE email = 'emma.davis@email.com'), (SELECT id FROM dance_styles WHERE name = 'Jazz'), 'intermediate');

-- ============================================
-- SAMPLE CLASSES
-- ============================================

INSERT INTO classes (title, description, level, duration_mins, max_capacity, price, schedule_days, schedule_time, requirements, image_url, is_active) VALUES
('Beginner Salsa Fundamentals', 'Learn the basic steps and rhythm of salsa dance in a fun, supportive environment', 'Beginner', 60, 20, 25.00, 'Monday,Wednesday', '19:00:00', 'No prior experience required. Comfortable shoes recommended.', 'https://example.com/salsa-class.jpg', true),
('Advanced Ballet Technique', 'Intensive ballet class focusing on advanced technique and artistry', 'Advanced', 90, 15, 35.00, 'Tuesday,Thursday', '18:30:00', 'Minimum 3 years ballet experience. Ballet shoes required.', 'https://example.com/ballet-class.jpg', true),
('Hip Hop Choreography', 'Learn popular hip hop moves and create your own choreography', 'Intermediate', 75, 25, 30.00, 'Friday', '20:00:00', 'Basic hip hop knowledge helpful. Sneakers required.', 'https://example.com/hiphop-class.jpg', true),
('Ballroom Basics', 'Introduction to waltz, foxtrot, and tango for couples', 'Beginner', 60, 16, 40.00, 'Saturday', '14:00:00', 'Come with or without a partner. Dress shoes recommended.', 'https://example.com/ballroom-class.jpg', true);

-- ============================================
-- SAMPLE CLASS INSTRUCTORS
-- ============================================

INSERT INTO class_instructors (class_id, instructor_id, is_primary) VALUES
((SELECT id FROM classes WHERE title = 'Beginner Salsa Fundamentals'), (SELECT id FROM instructors WHERE user_id = (SELECT id FROM users WHERE email = 'maria.garcia@email.com')), true),
((SELECT id FROM classes WHERE title = 'Advanced Ballet Technique'), (SELECT id FROM instructors WHERE user_id = (SELECT id FROM users WHERE email = 'anna.petrov@email.com')), true),
((SELECT id FROM classes WHERE title = 'Hip Hop Choreography'), (SELECT id FROM instructors WHERE user_id = (SELECT id FROM users WHERE email = 'david.chen@email.com')), true),
((SELECT id FROM classes WHERE title = 'Ballroom Basics'), (SELECT id FROM instructors WHERE user_id = (SELECT id FROM users WHERE email = 'carlos.rodriguez@email.com')), true);

-- ============================================
-- SAMPLE CLASS STYLES
-- ============================================

INSERT INTO class_styles (class_id, style_id) VALUES
-- Salsa class
((SELECT id FROM classes WHERE title = 'Beginner Salsa Fundamentals'), (SELECT id FROM dance_styles WHERE name = 'Salsa')),

-- Ballet class
((SELECT id FROM classes WHERE title = 'Advanced Ballet Technique'), (SELECT id FROM dance_styles WHERE name = 'Ballet')),

-- Hip Hop class
((SELECT id FROM classes WHERE title = 'Hip Hop Choreography'), (SELECT id FROM dance_styles WHERE name = 'Hip Hop')),

-- Ballroom class
((SELECT id FROM classes WHERE title = 'Ballroom Basics'), (SELECT id FROM dance_styles WHERE name = 'Waltz')),
((SELECT id FROM classes WHERE title = 'Ballroom Basics'), (SELECT id FROM dance_styles WHERE name = 'Foxtrot')),
((SELECT id FROM classes WHERE title = 'Ballroom Basics'), (SELECT id FROM dance_styles WHERE name = 'Tango'));

-- ============================================
-- SAMPLE CLASS SESSIONS
-- ============================================

INSERT INTO class_sessions (class_id, session_date, start_time, end_time, venue_id, instructor_id, status) VALUES
-- Salsa class sessions (next 4 weeks)
((SELECT id FROM classes WHERE title = 'Beginner Salsa Fundamentals'), CURRENT_DATE + 1, '19:00:00', '20:00:00', 
 (SELECT id FROM venues WHERE name = 'Downtown Dance Studio'), 
 (SELECT id FROM instructors WHERE user_id = (SELECT id FROM users WHERE email = 'maria.garcia@email.com')), 'scheduled'),
 
((SELECT id FROM classes WHERE title = 'Beginner Salsa Fundamentals'), CURRENT_DATE + 3, '19:00:00', '20:00:00', 
 (SELECT id FROM venues WHERE name = 'Downtown Dance Studio'), 
 (SELECT id FROM instructors WHERE user_id = (SELECT id FROM users WHERE email = 'maria.garcia@email.com')), 'scheduled'),

-- Ballet class sessions
((SELECT id FROM classes WHERE title = 'Advanced Ballet Technique'), CURRENT_DATE + 2, '18:30:00', '20:00:00', 
 (SELECT id FROM venues WHERE name = 'Riverside Arts Center'), 
 (SELECT id FROM instructors WHERE user_id = (SELECT id FROM users WHERE email = 'anna.petrov@email.com')), 'scheduled'),

-- Hip Hop class session
((SELECT id FROM classes WHERE title = 'Hip Hop Choreography'), CURRENT_DATE + 5, '20:00:00', '21:15:00', 
 (SELECT id FROM venues WHERE name = 'Mission District Studio'), 
 (SELECT id FROM instructors WHERE user_id = (SELECT id FROM users WHERE email = 'david.chen@email.com')), 'scheduled');

-- ============================================
-- SAMPLE EVENTS
-- ============================================

INSERT INTO events (title, description, event_type, start_datetime, end_datetime, venue_id, price, max_attendees, organizer_user_id, status, is_featured) VALUES
('Summer Salsa Festival', 'Annual outdoor salsa festival with live music and performances', 'Festival', 
 CURRENT_TIMESTAMP + INTERVAL '2 weeks', CURRENT_TIMESTAMP + INTERVAL '2 weeks' + INTERVAL '8 hours',
 (SELECT id FROM venues WHERE name = 'The Grand Ballroom'), 45.00, 200, 
 (SELECT id FROM users WHERE email = 'maria.garcia@email.com'), 'published', true),

('Hip Hop Battle Championship', 'Competitive breaking and hip hop dance battle', 'Competition',
 CURRENT_TIMESTAMP + INTERVAL '1 month', CURRENT_TIMESTAMP + INTERVAL '1 month' + INTERVAL '6 hours',
 (SELECT id FROM venues WHERE name = 'Venice Beach Dance Hall'), 20.00, 150,
 (SELECT id FROM users WHERE email = 'david.chen@email.com'), 'published', true),

('Ballet Masterclass with Guest Artist', 'Special workshop with visiting principal dancer', 'Workshop',
 CURRENT_TIMESTAMP + INTERVAL '10 days', CURRENT_TIMESTAMP + INTERVAL '10 days' + INTERVAL '3 hours',
 (SELECT id FROM venues WHERE name = 'Riverside Arts Center'), 65.00, 30,
 (SELECT id FROM users WHERE email = 'anna.petrov@email.com'), 'published', false);

-- ============================================
-- SAMPLE EVENT STYLES
-- ============================================

INSERT INTO event_styles (event_id, style_id) VALUES
-- Summer Salsa Festival
((SELECT id FROM events WHERE title = 'Summer Salsa Festival'), (SELECT id FROM dance_styles WHERE name = 'Salsa')),
((SELECT id FROM events WHERE title = 'Summer Salsa Festival'), (SELECT id FROM dance_styles WHERE name = 'Bachata')),

-- Hip Hop Battle
((SELECT id FROM events WHERE title = 'Hip Hop Battle Championship'), (SELECT id FROM dance_styles WHERE name = 'Hip Hop')),
((SELECT id FROM events WHERE title = 'Hip Hop Battle Championship'), (SELECT id FROM dance_styles WHERE name = 'Breaking')),

-- Ballet Masterclass
((SELECT id FROM events WHERE title = 'Ballet Masterclass with Guest Artist'), (SELECT id FROM dance_styles WHERE name = 'Ballet')),
((SELECT id FROM events WHERE title = 'Ballet Masterclass with Guest Artist'), (SELECT id FROM dance_styles WHERE name = 'Contemporary'));

-- ============================================
-- SAMPLE BOOKINGS
-- ============================================

INSERT INTO bookings (user_id, class_id, booking_datetime, status, amount_paid, payment_method) VALUES
-- John Doe books salsa class
((SELECT id FROM users WHERE email = 'john.doe@email.com'), 
 (SELECT id FROM classes WHERE title = 'Beginner Salsa Fundamentals'), 
 CURRENT_TIMESTAMP - INTERVAL '2 days', 'confirmed', 25.00, 'stripe'),

-- Sarah Wilson books ballet class
((SELECT id FROM users WHERE email = 'sarah.wilson@email.com'), 
 (SELECT id FROM classes WHERE title = 'Advanced Ballet Technique'), 
 CURRENT_TIMESTAMP - INTERVAL '1 day', 'confirmed', 35.00, 'paypal'),

-- Event bookings
((SELECT id FROM users WHERE email = 'mike.johnson@email.com'), 
 NULL,
 (SELECT id FROM events WHERE title = 'Hip Hop Battle Championship'),
 CURRENT_TIMESTAMP - INTERVAL '3 hours', 'pending', 20.00, 'stripe'),

((SELECT id FROM users WHERE email = 'emma.davis@email.com'), 
 NULL,
 (SELECT id FROM events WHERE title = 'Ballet Masterclass with Guest Artist'),
 CURRENT_TIMESTAMP - INTERVAL '1 hour', 'confirmed', 65.00, 'stripe');

-- ============================================
-- SAMPLE TRANSACTIONS
-- ============================================

INSERT INTO transactions (booking_id, user_id, provider, provider_payment_id, type, status, amount, currency) VALUES
-- Transaction for John's salsa class booking
((SELECT id FROM bookings WHERE user_id = (SELECT id FROM users WHERE email = 'john.doe@email.com') AND class_id IS NOT NULL),
 (SELECT id FROM users WHERE email = 'john.doe@email.com'), 
 'stripe', 'pi_1234567890abcdef', 'payment', 'succeeded', 25.00, 'USD'),

-- Transaction for Sarah's ballet class booking
((SELECT id FROM bookings WHERE user_id = (SELECT id FROM users WHERE email = 'sarah.wilson@email.com') AND class_id IS NOT NULL),
 (SELECT id FROM users WHERE email = 'sarah.wilson@email.com'), 
 'paypal', 'PAY-1234567890ABCDEF', 'payment', 'succeeded', 35.00, 'USD'),

-- Transaction for Mike's event booking
((SELECT id FROM bookings WHERE user_id = (SELECT id FROM users WHERE email = 'mike.johnson@email.com') AND event_id IS NOT NULL),
 (SELECT id FROM users WHERE email = 'mike.johnson@email.com'), 
 'stripe', 'pi_0987654321fedcba', 'payment', 'created', 20.00, 'USD'),

-- Transaction for Emma's event booking
((SELECT id FROM bookings WHERE user_id = (SELECT id FROM users WHERE email = 'emma.davis@email.com') AND event_id IS NOT NULL),
 (SELECT id FROM users WHERE email = 'emma.davis@email.com'), 
 'stripe', 'pi_1122334455667788', 'payment', 'succeeded', 65.00, 'USD');

-- ============================================
-- SAMPLE FORUM POSTS
-- ============================================

INSERT INTO forum_posts (user_id, category, title, content, views_count, likes_count) VALUES
((SELECT id FROM users WHERE email = 'john.doe@email.com'), 'General', 'New to Salsa - Any Tips?', 
 'Hi everyone! I just started learning salsa and would love some advice on how to improve my basic steps. Any recommendations for practice?', 
 45, 8),

((SELECT id FROM users WHERE email = 'sarah.wilson@email.com'), 'Technique', 'Ballet Barre Exercises at Home', 
 'Sharing my favorite barre exercises that you can do at home without a proper barre. Perfect for maintaining technique between classes!', 
 123, 15),

((SELECT id FROM users WHERE email = 'mike.johnson@email.com'), 'Events', 'Excited for the Hip Hop Battle!', 
 'Can''t wait for next month''s hip hop battle championship. Who else is competing? Let''s support each other!', 
 67, 12);

-- ============================================
-- SAMPLE FORUM REPLIES
-- ============================================

INSERT INTO forum_replies (post_id, user_id, content, likes_count) VALUES
-- Replies to John's salsa post
((SELECT id FROM forum_posts WHERE title = 'New to Salsa - Any Tips?'), 
 (SELECT id FROM users WHERE email = 'maria.garcia@email.com'), 
 'Welcome to salsa! My advice: focus on the rhythm first, then worry about fancy moves. Practice your basic step until it becomes second nature. Feel free to join my beginner class!', 
 12),

-- Replies to Sarah's ballet post
((SELECT id FROM forum_posts WHERE title = 'Ballet Barre Exercises at Home'), 
 (SELECT id FROM users WHERE email = 'anna.petrov@email.com'), 
 'Excellent post, Sarah! I would add that maintaining proper alignment is crucial even without a barre. A chair back can be a good substitute for support.', 
 8),

-- Replies to Mike's hip hop post
((SELECT id FROM forum_posts WHERE title = 'Excited for the Hip Hop Battle!'), 
 (SELECT id FROM users WHERE email = 'david.chen@email.com'), 
 'So excited to see everyone compete! Remember, it''s about expressing yourself and having fun. Good luck to all participants!', 
 6);

-- ============================================
-- SAMPLE FAVORITES
-- ============================================

INSERT INTO favorites (user_id, entity_type, entity_id) VALUES
-- John favorites Maria (instructor) and Salsa Festival
((SELECT id FROM users WHERE email = 'john.doe@email.com'), 'instructor', 
 (SELECT id FROM instructors WHERE user_id = (SELECT id FROM users WHERE email = 'maria.garcia@email.com'))),
((SELECT id FROM users WHERE email = 'john.doe@email.com'), 'event', 
 (SELECT id FROM events WHERE title = 'Summer Salsa Festival')),

-- Sarah favorites Anna (instructor) and Downtown studio
((SELECT id FROM users WHERE email = 'sarah.wilson@email.com'), 'instructor', 
 (SELECT id FROM instructors WHERE user_id = (SELECT id FROM users WHERE email = 'anna.petrov@email.com'))),
((SELECT id FROM users WHERE email = 'sarah.wilson@email.com'), 'venue', 
 (SELECT id FROM venues WHERE name = 'Riverside Arts Center')),

-- Mike favorites David (instructor) and Hip Hop event
((SELECT id FROM users WHERE email = 'mike.johnson@email.com'), 'instructor', 
 (SELECT id FROM instructors WHERE user_id = (SELECT id FROM users WHERE email = 'david.chen@email.com'))),
((SELECT id FROM users WHERE email = 'mike.johnson@email.com'), 'event', 
 (SELECT id FROM events WHERE title = 'Hip Hop Battle Championship'));

-- ============================================
-- SAMPLE TESTIMONIALS
-- ============================================

INSERT INTO testimonials (user_id, rating, message, is_featured) VALUES
((SELECT id FROM users WHERE email = 'john.doe@email.com'), 5, 
 'Amazing salsa classes! Maria is an incredible instructor who makes learning fun and accessible. Highly recommend to anyone wanting to learn Latin dance!', true),

((SELECT id FROM users WHERE email = 'sarah.wilson@email.com'), 5, 
 'Anna''s ballet technique classes have transformed my dancing. Her attention to detail and patient teaching style are exceptional.', true),

((SELECT id FROM users WHERE email = 'mike.johnson@email.com'), 4, 
 'Great hip hop community here! David''s classes are energetic and challenging. The venue facilities are top-notch.', false),

((SELECT id FROM users WHERE email = 'emma.davis@email.com'), 5, 
 'The contemporary dance workshops opened up a whole new world of expression for me. Professional instructors and welcoming environment.', true);

-- ============================================
-- SAMPLE NOTIFICATIONS
-- ============================================

INSERT INTO notifications (user_id, type, title, message, is_read, priority) VALUES
((SELECT id FROM users WHERE email = 'john.doe@email.com'), 'booking_confirmation', 
 'Class Booking Confirmed', 'Your booking for Beginner Salsa Fundamentals has been confirmed for next Monday at 7:00 PM.', true, 'normal'),

((SELECT id FROM users WHERE email = 'sarah.wilson@email.com'), 'class_reminder', 
 'Class Reminder', 'Don''t forget about your Advanced Ballet Technique class tomorrow at 6:30 PM!', false, 'normal'),

((SELECT id FROM users WHERE email = 'mike.johnson@email.com'), 'event_update', 
 'Event Registration Open', 'Registration is now open for the Hip Hop Battle Championship! Secure your spot today.', false, 'high'),

((SELECT id FROM users WHERE email = 'emma.davis@email.com'), 'payment_received', 
 'Payment Confirmed', 'Your payment for the Ballet Masterclass has been processed successfully.', true, 'normal');

-- ============================================
-- SAMPLE CONTACT MESSAGES
-- ============================================

INSERT INTO contact_messages (name, email, phone, subject, message, is_read) VALUES
('Jennifer Smith', 'jennifer.smith@email.com', '+1-555-0401', 'Private Lesson Inquiry', 
 'Hello, I''m interested in booking private salsa lessons for my wedding preparation. Could you please provide information about availability and pricing?', false),

('Robert Brown', 'robert.brown@email.com', '+1-555-0402', 'Venue Rental Question', 
 'Hi, I''m organizing a dance competition and wondering if your studio spaces are available for rent. Please let me know about rates and availability.', true),

('Lisa Taylor', 'lisa.taylor@email.com', '+1-555-0403', 'Group Class Booking', 
 'I''d like to book a hip hop class for a group of 15 teenagers. Do you offer group discounts? What would be the best time slot?', false);

-- ============================================
-- SAMPLE PARTNER REQUESTS
-- ============================================

INSERT INTO partner_requests (requester_id, skill_level, location_city, availability_text, message, status) VALUES
((SELECT id FROM users WHERE email = 'john.doe@email.com'), 'Intermediate', 'New York', 
 'Available weekday evenings and weekends', 'Looking for a salsa practice partner. I''ve been dancing for about 6 months and would love to practice with someone around my level.', 'active'),

((SELECT id FROM users WHERE email = 'emma.davis@email.com'), 'Advanced', 'New York', 
 'Available Tuesday and Thursday evenings', 'Seeking a contemporary dance partner for collaborative choreography projects. Open to exploring fusion styles.', 'active');

-- ============================================
-- DATA VALIDATION QUERIES
-- ============================================

-- Count records in each table
SELECT 'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'instructors', COUNT(*) FROM instructors
UNION ALL  
SELECT 'venues', COUNT(*) FROM venues
UNION ALL
SELECT 'dance_styles', COUNT(*) FROM dance_styles
UNION ALL
SELECT 'classes', COUNT(*) FROM classes
UNION ALL
SELECT 'class_sessions', COUNT(*) FROM class_sessions
UNION ALL
SELECT 'events', COUNT(*) FROM events
UNION ALL
SELECT 'bookings', COUNT(*) FROM bookings
UNION ALL
SELECT 'transactions', COUNT(*) FROM transactions
UNION ALL
SELECT 'user_styles', COUNT(*) FROM user_styles
UNION ALL
SELECT 'class_styles', COUNT(*) FROM class_styles
UNION ALL
SELECT 'event_styles', COUNT(*) FROM event_styles
UNION ALL
SELECT 'forum_posts', COUNT(*) FROM forum_posts
UNION ALL
SELECT 'forum_replies', COUNT(*) FROM forum_replies
UNION ALL
SELECT 'favorites', COUNT(*) FROM favorites
UNION ALL
SELECT 'testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'notifications', COUNT(*) FROM notifications
ORDER BY table_name;

-- Verify referential integrity (should return no rows if all FKs are valid)
SELECT 'orphaned_instructors' as issue, COUNT(*) as count
FROM instructors i 
LEFT JOIN users u ON i.user_id = u.id 
WHERE u.id IS NULL

UNION ALL

SELECT 'orphaned_bookings_users', COUNT(*)
FROM bookings b 
LEFT JOIN users u ON b.user_id = u.id 
WHERE u.id IS NULL

UNION ALL

SELECT 'orphaned_bookings_classes', COUNT(*)
FROM bookings b 
LEFT JOIN classes c ON b.class_id = c.id 
WHERE b.class_id IS NOT NULL AND c.id IS NULL

UNION ALL

SELECT 'orphaned_bookings_events', COUNT(*)
FROM bookings b 
LEFT JOIN events e ON b.event_id = e.id 
WHERE b.event_id IS NOT NULL AND e.id IS NULL;

-- ============================================
-- SAMPLE DATA SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Sample Data Insertion Complete!';
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Sample data includes:';
    RAISE NOTICE '- 12 dance styles';
    RAISE NOTICE '- 5 venues in NY and CA';
    RAISE NOTICE '- 10 users (4 regular, 4 instructors, 2 admins)';
    RAISE NOTICE '- 4 classes with sessions';
    RAISE NOTICE '- 3 upcoming events';
    RAISE NOTICE '- Sample bookings and transactions';
    RAISE NOTICE '- Forum posts and community content';
    RAISE NOTICE '============================================';
    RAISE NOTICE 'You can now test queries and application connectivity!';
    RAISE NOTICE '============================================';
END;
$$;
