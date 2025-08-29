-- Dance Website PostgreSQL Database Initialization Script
-- This script creates the database and applies the schema and indexes
-- Author: Generated from ERD v2 specification  
-- Created: 2025-08-28

-- ============================================
-- DATABASE CREATION
-- ============================================

-- Note: This section should be run by a PostgreSQL superuser
-- Connect to postgres database first, then run these commands

-- Create database (uncomment if creating new database)
-- CREATE DATABASE dance_website 
--     WITH 
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'en_US.UTF-8'
--     LC_CTYPE = 'en_US.UTF-8'
--     TEMPLATE = template0;

-- Create database user (uncomment if creating new user)
-- CREATE USER dance_app WITH PASSWORD 'your_secure_password_here';
-- GRANT ALL PRIVILEGES ON DATABASE dance_website TO dance_app;

-- Connect to the dance_website database before running the rest
-- \c dance_website;

-- ============================================
-- EXTENSIONS
-- ============================================

-- Enable required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";  -- For UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "pg_trgm";    -- For trigram matching (better text search)
CREATE EXTENSION IF NOT EXISTS "unaccent";   -- For accent-insensitive text search

-- ============================================
-- GRANT PERMISSIONS TO APPLICATION USER
-- ============================================

-- Grant schema usage
GRANT USAGE ON SCHEMA public TO dance_app;

-- Grant table permissions (run after schema.sql)
-- These will be applied after tables are created
DO $$
BEGIN
    -- Grant permissions on all current tables
    EXECUTE 'GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dance_app';
    
    -- Grant permissions on all current sequences
    EXECUTE 'GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO dance_app';
    
    -- Grant permissions on future tables
    EXECUTE 'ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO dance_app';
    
    -- Grant permissions on future sequences
    EXECUTE 'ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO dance_app';
    
EXCEPTION 
    WHEN insufficient_privilege THEN
        RAISE NOTICE 'Skipping permission grants - run as superuser or database owner';
END;
$$;

-- ============================================
-- SCHEMA VALIDATION QUERIES
-- ============================================

-- Verify all tables were created
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Verify all ENUM types were created
SELECT 
    t.typname as enum_name,
    array_agg(e.enumlabel ORDER BY e.enumsortorder) as values
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid  
WHERE t.typname LIKE '%_enum'
GROUP BY t.typname
ORDER BY t.typname;

-- Verify foreign key constraints
SELECT
    tc.table_name, 
    tc.constraint_name, 
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema = 'public'
ORDER BY tc.table_name, tc.constraint_name;

-- Verify indexes were created
SELECT 
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE schemaname = 'public'
    AND indexname LIKE 'idx_%'
ORDER BY tablename, indexname;

-- ============================================
-- BASIC HEALTH CHECKS
-- ============================================

-- Check table row counts (should all be 0 for fresh database)
SELECT 
    schemaname,
    tablename,
    n_tup_ins as inserts,
    n_tup_upd as updates,
    n_tup_del as deletes
FROM pg_stat_user_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check for any constraint violations or issues
SELECT 
    conname as constraint_name,
    conrelid::regclass as table_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE connamespace = 'public'::regnamespace
    AND contype IN ('c', 'f', 'u')  -- check, foreign key, unique
ORDER BY conrelid::regclass, conname;

-- ============================================
-- PERFORMANCE TUNING SETTINGS
-- ============================================

-- Recommended PostgreSQL settings for this schema
-- Add these to postgresql.conf and restart PostgreSQL

/*
# Memory settings (adjust based on available RAM)
shared_buffers = 256MB                    # 25% of RAM for dedicated server
effective_cache_size = 1GB               # 75% of RAM
work_mem = 4MB                           # Per query operation
maintenance_work_mem = 64MB              # For maintenance operations

# Connection settings
max_connections = 100                     # Adjust based on application needs

# Query planning
random_page_cost = 1.1                   # For SSD storage
effective_io_concurrency = 200           # For SSD storage

# Write-ahead logging
wal_level = replica                      # For replication if needed
max_wal_size = 1GB
min_wal_size = 80MB

# Checkpoints
checkpoint_completion_target = 0.7
checkpoint_timeout = 10min

# Logging (for development)
log_statement = 'mod'                    # Log all modifications
log_min_duration_statement = 100ms       # Log slow queries
log_line_prefix = '%t [%p]: '            # Timestamp and process ID

# Autovacuum (important for this schema with many updates)
autovacuum = on
autovacuum_max_workers = 3
autovacuum_naptime = 1min
*/

-- ============================================
-- MAINTENANCE PROCEDURES
-- ============================================

-- Create a function to analyze all tables (run periodically)
CREATE OR REPLACE FUNCTION analyze_all_tables()
RETURNS void AS $$
DECLARE
    table_record record;
BEGIN
    FOR table_record IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    LOOP
        EXECUTE 'ANALYZE ' || table_record.tablename;
        RAISE NOTICE 'Analyzed table: %', table_record.tablename;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create a function to get index usage statistics
CREATE OR REPLACE FUNCTION get_index_usage_stats()
RETURNS TABLE(
    table_name text,
    index_name text,
    index_scans bigint,
    tuples_read bigint,
    tuples_fetched bigint
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        schemaname || '.' || tablename as table_name,
        indexrelname as index_name,
        idx_scan as index_scans,
        idx_tup_read as tuples_read,
        idx_tup_fetch as tuples_fetched
    FROM pg_stat_user_indexes 
    WHERE schemaname = 'public'
    ORDER BY idx_scan DESC;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Dance Website Database Initialization Complete!';
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Next Steps:';
    RAISE NOTICE '1. Run schema.sql to create all tables';
    RAISE NOTICE '2. Run indexes.sql to create all indexes';
    RAISE NOTICE '3. Run sample_data.sql to insert test data (optional)';
    RAISE NOTICE '4. Update postgresql.conf with recommended settings';
    RAISE NOTICE '5. Test database connectivity from your application';
    RAISE NOTICE '============================================';
END;
$$;
