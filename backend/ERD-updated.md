# Dance Website - Entity Relationship Diagram (ERD) with User Dashboards

## Database Schema Design

### Core Entities and Relationships

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│      USERS      │       │     ADMINS      │       │   INSTRUCTORS   │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │       │ id (PK)         │
│ email (UNIQUE)  │       │ email (UNIQUE)  │       │ name            │
│ password_hash   │       │ password_hash   │       │ specialty       │
│ full_name       │       │ username        │       │ bio             │
│ phone           │       │ role            │       │ image_url       │
│ dance_style     │       │ created_at      │       │ experience      │
│ skill_level     │       │ updated_at      │       │ social_links    │
│ bio             │       │ last_login      │       │ rating          │
│ profile_image   │       │ is_active       │       │ is_active       │
│ is_verified     │       └─────────────────┘       │ created_at      │
│ preferences     │                                 │ updated_at      │
│ created_at      │                                 └─────────────────┘
│ updated_at      │                                          │
└─────────────────┘                                          │
         │                                                   │
         ├─────────────────────────────────┐                 │
         │                                 │                 │
         ▼                                 ▼                 │
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│ USER_DASHBOARDS │       │  USER_ANALYTICS │       │ CLASS_INSTRUCTORS│
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │       │ id (PK)         │
│ user_id (FK)    │       │ user_id (FK)    │       │ class_id (FK)   │
│ title           │       │ login_count     │       │ instructor_id(FK)│
│ layout_config   │       │ class_bookings  │       │ is_primary      │
│ theme           │       │ event_bookings  │       │ created_at      │
│ is_default      │       │ total_spent     │       └─────────────────┘
│ visibility      │       │ forum_posts     │                │
│ last_accessed   │       │ forum_replies   │                │
│ created_at      │       │ partner_requests│                │
│ updated_at      │       │ avg_class_rating│                │
└─────────────────┘       │ last_login      │                │
         │                │ streak_days     │                │
         │                │ created_at      │                │
         ▼                │ updated_at      │                │
┌─────────────────┐       └─────────────────┘                │
│ DASHBOARD_WIDGETS│                │                        │
├─────────────────┤                │                        │
│ id (PK)         │                │                        │
│ dashboard_id(FK)│                │                        │
│ widget_type     │                │                        │
│ position_x      │                │                        │
│ position_y      │                ▼                        │
│ width           │       ┌─────────────────┐                │
│ height          │       │ USER_ACTIVITY_LOG│               │
│ settings        │       ├─────────────────┤                │
│ title           │       │ id (PK)         │                │
│ is_visible      │       │ user_id (FK)    │                │
│ created_at      │       │ activity_type   │                │
│ updated_at      │       │ entity_type     │                │
└─────────────────┘       │ entity_id       │                │
                          │ action          │                │
                          │ details         │                │
                          │ ip_address      │                │
                          │ user_agent      │                │
                          │ created_at      │                │
                          └─────────────────┘                │
                                   │                         │
                                   ▼                         │
                          ┌─────────────────┐                │
                          │   USER_GOALS    │                │
                          ├─────────────────┤                │
                          │ id (PK)         │                │
                          │ user_id (FK)    │                │
                          │ title           │                │
                          │ description     │                │
                          │ goal_type       │                │
                          │ target_value    │                │
                          │ current_value   │                │
                          │ start_date      │                │
                          │ end_date        │                │
                          │ priority        │                │
                          │ status          │                │
                          │ created_at      │                │
                          │ updated_at      │                │
                          └─────────────────┘                │
                                                             │
┌─────────────────┐       ┌─────────────────┐       ┌───────┴─────────┐
│     CLASSES     │       │     EVENTS      │       │   INSTRUCTORS   │
├─────────────────┤       ├─────────────────┤       └─────────────────┘
│ id (PK)         │       │ id (PK)         │                
│ title           │       │ title           │                
│ description     │       │ description     │                
│ level           │       │ event_type      │                
│ dance_style     │       │ start_date      │                
│ duration        │       │ end_date        │                
│ max_capacity    │       │ start_time      │                
│ price           │       │ end_time        │                
│ schedule_days   │       │ location        │                
│ schedule_time   │       │ address         │                
│ requirements    │       │ price           │                
│ image_url       │       │ max_attendees   │                
│ is_active       │       │ current_attendees│               
│ created_at      │       │ image_url       │                
│ updated_at      │       │ organizer       │                
└─────────────────┘       │ tags            │                
         │                │ rating          │                
         │                │ status          │                
         │                │ is_featured     │                
         │                │ created_at      │                
         │                │ updated_at      │                
         │                └─────────────────┘                
         │                         │                         
         │                         │                         
         └─────────────┬───────────┴─────────────────────────
                       │
┌─────────────────┐    │    ┌─────────────────┐       ┌─────────────────┐
│ CLASS_BOOKINGS  │    │    │ EVENT_BOOKINGS  │       │ CONTACT_MESSAGES│
├─────────────────┤    │    ├─────────────────┤       ├─────────────────┤
│ id (PK)         │    │    │ id (PK)         │       │ id (PK)         │
│ user_id (FK)    │    │    │ user_id (FK)    │       │ name            │
│ class_id (FK)   │    │    │ event_id (FK)   │       │ email           │
│ booking_date    │    │    │ booking_date    │       │ phone           │
│ status          │    │    │ status          │       │ message         │
│ payment_status  │    │    │ payment_status  │       │ subject         │
│ amount_paid     │    │    │ amount_paid     │       │ is_read         │
│ payment_method  │    │    │ payment_method  │       │ admin_response  │
│ notes           │    │    │ notes           │       │ created_at      │
│ created_at      │    │    │ created_at      │       │ updated_at      │
│ updated_at      │    │    │ updated_at      │       └─────────────────┘
└─────────────────┘    │    └─────────────────┘
         │              │             │
         │              │             │
         │              │             │
┌─────────────────┐    │    ┌─────────────────┐       ┌─────────────────┐
│ PARTNER_REQUESTS│    │    │   TESTIMONIALS  │       │   DANCE_STYLES  │
├─────────────────┤    │    ├─────────────────┤       ├─────────────────┤
│ id (PK)         │    │    │ id (PK)         │       │ id (PK)         │
│ requester_id(FK)│    │    │ user_id (FK)    │       │ name            │
│ dance_style     │    │    │ rating          │       │ description     │
│ skill_level     │    │    │ message         │       │ image_url       │
│ location        │    │    │ is_featured     │       │ difficulty_level│
│ availability    │    │    │ is_approved     │       │ popularity      │
│ message         │    │    │ created_at      │       │ category        │
│ status          │    │    │ updated_at      │       │ is_active       │
│ created_at      │    │    └─────────────────┘       │ created_at      │
│ updated_at      │    │                              │ updated_at      │
└─────────────────┘    │                              └─────────────────┘
         │              │
         │              │
         │              │
┌─────────────────┐    │    ┌─────────────────┐       ┌─────────────────┐
│ PARTNER_MATCHES │    │    │   NEWSLETTERS   │       │     SETTINGS    │
├─────────────────┤    │    ├─────────────────┤       ├─────────────────┤
│ id (PK)         │    │    │ id (PK)         │       │ id (PK)         │
│ user1_id (FK)   │    │    │ email           │       │ key             │
│ user2_id (FK)   │    │    │ name            │       │ value           │
│ match_score     │    │    │ is_subscribed   │       │ type            │
│ status          │    │    │ preferences     │       │ description     │
│ created_at      │    │    │ subscribed_at   │       │ is_public       │
│ updated_at      │    │    │ unsubscribed_at │       │ created_at      │
└─────────────────┘    │    │ created_at      │       │ updated_at      │
                       │    │ updated_at      │       └─────────────────┘
                       │    └─────────────────┘
                       │
                       │
┌─────────────────┐    │    ┌─────────────────┐       ┌─────────────────┐
│   NOTIFICATIONS │    │    │   AUDIT_LOGS    │       │ DASHBOARD_LAYOUTS│
├─────────────────┤    │    ├─────────────────┤       ├─────────────────┤
│ id (PK)         │    │    │ id (PK)         │       │ id (PK)         │
│ user_id (FK)    │    │    │ user_id (FK)    │       │ name            │
│ type            │    │    │ admin_id (FK)   │       │ description     │
│ title           │    │    │ action          │       │ template        │
│ message         │    │    │ table_name      │       │ columns         │
│ is_read         │    │    │ record_id       │       │ is_default      │
│ priority        │    │    │ old_values      │       │ is_active       │
│ action_url      │    │    │ new_values      │       │ created_at      │
│ created_at      │    │    │ ip_address      │       │ updated_at      │
└─────────────────┘    │    │ user_agent      │       └─────────────────┘
                       │    │ created_at      │
                       │    └─────────────────┘
                       │
                       │
┌─────────────────┐    │
│   FORUM_POSTS   │    │
├─────────────────┤    │
│ id (PK)         │    │
│ user_id (FK)    │    │
│ category        │    │
│ title           │    │
│ content         │    │
│ tags            │    │
│ views_count     │    │
│ likes_count     │    │
│ replies_count   │    │
│ is_pinned       │    │
│ is_locked       │    │
│ created_at      │    │
│ updated_at      │    │
└─────────────────┘    │
         │              │
         │              │
┌─────────────────┐    │
│  FORUM_REPLIES  │    │
├─────────────────┤    │
│ id (PK)         │    │
│ post_id (FK)    │    │
│ user_id (FK)    │────┘
│ parent_id (FK)  │
│ content         │
│ likes_count     │
│ is_solution     │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

## Dashboard System Features

### User Dashboard Entities

#### USER_DASHBOARDS
- **Purpose**: Each user can create multiple personalized dashboards
- **Key Features**:
  - Multiple dashboard configurations per user
  - Custom themes and layouts
  - Privacy controls (public/private)
  - Default dashboard selection

#### DASHBOARD_WIDGETS
- **Purpose**: Configurable widgets for dashboard customization
- **Widget Types**:
  - `upcoming_classes` - Shows user's upcoming class bookings
  - `progress_tracker` - Displays dance skill progress
  - `goal_summary` - Shows user's dance goals and completion
  - `activity_feed` - Recent user activities
  - `partner_matches` - Potential dance partners
  - `class_recommendations` - AI-suggested classes
  - `achievement_badges` - User achievements and milestones
  - `calendar_view` - Personal dance schedule
  - `expense_tracker` - Spending on classes/events
  - `instructor_favorites` - Favorite instructors

#### USER_ANALYTICS
- **Purpose**: Comprehensive user activity analytics
- **Tracked Metrics**:
  - Login frequency and patterns
  - Class/event booking history
  - Forum participation
  - Partner matching activity
  - Spending patterns
  - Goal completion rates
  - Skill progression

#### USER_GOALS
- **Purpose**: Personal goal setting and tracking
- **Goal Types**:
  - `skill_improvement` - Master specific dance styles
  - `frequency` - Attend X classes per month
  - `social` - Make X dance partner connections
  - `performance` - Participate in events/competitions
  - `financial` - Stay within budget limits

#### USER_ACTIVITY_LOG
- **Purpose**: Detailed activity tracking for insights
- **Tracked Activities**:
  - Page views and navigation patterns
  - Feature usage analytics
  - Search behavior
  - Booking patterns
  - Social interactions

## Relationships

### One-to-Many Relationships
- **USERS** → **CLASS_BOOKINGS** (1:N)
- **USERS** → **EVENT_BOOKINGS** (1:N)
- **USERS** → **PARTNER_REQUESTS** (1:N)
- **USERS** → **TESTIMONIALS** (1:N)
- **USERS** → **NOTIFICATIONS** (1:N)
- **USERS** → **FORUM_POSTS** (1:N)
- **USERS** → **FORUM_REPLIES** (1:N)
- **USERS** → **AUDIT_LOGS** (1:N)
- **USERS** → **USER_DASHBOARDS** (1:N)
- **USERS** → **USER_ANALYTICS** (1:1)
- **USERS** → **USER_GOALS** (1:N)
- **USERS** → **USER_ACTIVITY_LOG** (1:N)
- **USER_DASHBOARDS** → **DASHBOARD_WIDGETS** (1:N)
- **CLASSES** → **CLASS_BOOKINGS** (1:N)
- **EVENTS** → **EVENT_BOOKINGS** (1:N)
- **FORUM_POSTS** → **FORUM_REPLIES** (1:N)
- **FORUM_REPLIES** → **FORUM_REPLIES** (1:N - self-referencing for nested replies)

### Many-to-Many Relationships
- **CLASSES** ↔ **INSTRUCTORS** (through CLASS_INSTRUCTORS)
- **USERS** ↔ **USERS** (through PARTNER_MATCHES for partner matching)
- **USER_DASHBOARDS** ↔ **DASHBOARD_LAYOUTS** (through layout configuration)

### Key Constraints

#### Primary Keys (PK)
- All tables have an auto-incrementing `id` as primary key

#### Foreign Keys (FK)
- `user_id` references USERS(id)
- `admin_id` references ADMINS(id)
- `class_id` references CLASSES(id)
- `event_id` references EVENTS(id)
- `instructor_id` references INSTRUCTORS(id)
- `post_id` references FORUM_POSTS(id)
- `parent_id` references FORUM_REPLIES(id)
- `dashboard_id` references USER_DASHBOARDS(id)

#### Unique Constraints
- USERS.email
- ADMINS.email
- ADMINS.username

#### Indexes (for performance)
- email fields (USERS, ADMINS, NEWSLETTERS)
- foreign key fields
- created_at/updated_at timestamps
- status fields
- search fields (name, title, category)
- dashboard-related fields (user_id, widget_type)

## Data Types and Constraints

### Common Field Types
- **id**: BIGINT AUTO_INCREMENT PRIMARY KEY
- **email**: VARCHAR(255) UNIQUE NOT NULL
- **password_hash**: VARCHAR(255) NOT NULL
- **created_at/updated_at**: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- **is_active/is_featured/is_read**: BOOLEAN DEFAULT TRUE/FALSE
- **status**: ENUM('active', 'inactive', 'pending', 'cancelled', 'completed')
- **rating**: DECIMAL(3,2) DEFAULT 0.00 (0.00 to 5.00)
- **price/amount_paid**: DECIMAL(10,2)
- **JSON fields**: preferences, social_links, tags, layout_config, settings (MySQL JSON type)

### Dashboard-Specific Field Types
- **widget_type**: ENUM('upcoming_classes', 'progress_tracker', 'goal_summary', 'activity_feed', 'partner_matches', 'class_recommendations', 'achievement_badges', 'calendar_view', 'expense_tracker', 'instructor_favorites')
- **goal_type**: ENUM('skill_improvement', 'frequency', 'social', 'performance', 'financial')
- **activity_type**: ENUM('login', 'booking', 'forum_post', 'partner_request', 'goal_update', 'profile_update')
- **priority**: ENUM('low', 'medium', 'high', 'urgent')
- **visibility**: ENUM('private', 'friends', 'public')

### Business Rules
1. Users can book multiple classes and events
2. Instructors can teach multiple classes
3. Classes can have multiple instructors (primary and assistant)
4. Events have capacity limits
5. Partner matching is mutual (both users must agree)
6. Forum replies can be nested (threaded discussions)
7. Admin actions are logged for audit trail
8. Soft deletes for important data (is_active flag)
9. **Each user can have multiple dashboards but only one default**
10. **Dashboard widgets are configurable and can be resized/repositioned**
11. **User analytics are automatically calculated based on user activity**
12. **User goals track progress toward specific dance achievements**
13. **Activity logs track all user interactions for analytics purposes**
14. **Dashboard layouts can be shared between users (templates)**

### Dashboard Business Logic
1. **Default Dashboard Creation**: When a user registers, a default dashboard is automatically created
2. **Widget Positioning**: Widgets use grid-based positioning system (x,y coordinates with width/height)
3. **Analytics Aggregation**: User analytics are updated via database triggers or scheduled jobs
4. **Goal Progress Calculation**: Progress is automatically calculated based on related user activities
5. **Activity Logging**: All user actions are logged for analytics and dashboard insights
6. **Dashboard Sharing**: Users can share dashboard configurations as templates
7. **Widget Permissions**: Some widgets require specific user roles or subscription levels

### Security Considerations for Dashboards
- Dashboard data is user-scoped (users can only access their own dashboards)
- Widget settings are validated to prevent XSS attacks
- Activity logs include IP addresses for security monitoring
- Goal data includes privacy controls
- Analytics data is anonymized for system-wide insights
- Dashboard sharing requires explicit user consent

### Performance Optimizations
- Dashboard widgets use caching for expensive queries
- User analytics are pre-calculated and stored
- Activity logs are partitioned by date for performance
- Widget data is loaded asynchronously to improve page load times
- Database indexes on frequently queried dashboard fields
