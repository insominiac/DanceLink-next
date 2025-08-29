# DanceLink - Entity Relationship Diagram (ERD)

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
         │                                                   │
         │                                                   │
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     CLASSES     │       │     EVENTS      │       │ CLASS_INSTRUCTORS│
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │       │ id (PK)         │
│ title           │       │ title           │       │ class_id (FK)   │
│ description     │       │ description     │       │ instructor_id(FK)│
│ level           │       │ event_type      │       │ is_primary      │
│ dance_style     │       │ start_date      │       │ created_at      │
│ duration        │       │ end_date        │       └─────────────────┘
│ max_capacity    │       │ start_time      │                │
│ price           │       │ end_time        │                │
│ schedule_days   │       │ location        │                │
│ schedule_time   │       │ address         │                │
│ requirements    │       │ price           │                │
│ image_url       │       │ max_attendees   │                │
│ is_active       │       │ current_attendees│               │
│ created_at      │       │ image_url       │                │
│ updated_at      │       │ organizer       │                │
└─────────────────┘       │ tags            │                │
         │                │ rating          │                │
         │                │ status          │                │
         │                │ is_featured     │                │
         │                │ created_at      │                │
         │                │ updated_at      │                │
         │                └─────────────────┘                │
         │                         │                         │
         │                         │                         │
         └─────────────┬───────────┴─────────────────────────┘
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
│  FORUM_REPLIES  │    │    │   AUDIT_LOGS    │       │ DASHBOARD_WIDGETS│
├─────────────────┤    │    ├─────────────────┤       ├─────────────────┤
│ id (PK)         │    │    │ id (PK)         │       │ id (PK)         │
│ post_id (FK)    │    │    │ user_id (FK)    │       │ dashboard_id(FK)│
│ user_id (FK)    │────┘    │ admin_id (FK)   │       │ widget_type     │
│ parent_id (FK)  │         │ action          │       │ position_x      │
│ content         │         │ table_name      │       │ position_y      │
│ likes_count     │         │ record_id       │       │ width           │
│ is_solution     │         │ old_values      │       │ height          │
│ created_at      │         │ new_values      │       │ settings        │
│ updated_at      │         │ ip_address      │       │ title           │
└─────────────────┘         │ user_agent      │       │ is_visible      │
                            │ created_at      │       │ created_at      │
                            └─────────────────┘       │ updated_at      │
                                                      └─────────────────┘
                                                      
┌─────────────────┐         ┌─────────────────┐       ┌─────────────────┐
│  USER_ANALYTICS │         │ USER_GOALS      │       │ USER_ACTIVITY_LOG│
├─────────────────┤         ├─────────────────┤       ├─────────────────┤
│ id (PK)         │         │ id (PK)         │       │ id (PK)         │
│ user_id (FK)    │         │ user_id (FK)    │       │ user_id (FK)    │
│ login_count     │         │ title           │       │ activity_type   │
│ class_bookings  │         │ description     │       │ entity_type     │
│ event_bookings  │         │ goal_type       │       │ entity_id       │
│ total_spent     │         │ target_value    │       │ action          │
│ forum_posts     │         │ current_value   │       │ details         │
│ forum_replies   │         │ start_date      │       │ ip_address      │
│ partner_requests│         │ end_date        │       │ user_agent      │
│ avg_class_rating│         │ priority        │       │ created_at      │
│ last_login      │         │ status          │       └─────────────────┘
│ created_at      │         │ created_at      │
│ updated_at      │         │ updated_at      │
└─────────────────┘         └─────────────────┘

┌─────────────────┐
│ DASHBOARD_LAYOUTS│
├─────────────────┤
│ id (PK)         │
│ name            │
│ description     │
│ template        │
│ columns         │
│ is_default      │
│ is_active       │
│ created_at      │
│ updated_at      │
└─────────────────┘
│ visibility      │
│ likes_count     │    │    │ payment_method  │       │ last_accessed   │
│ replies_count   │    │    │ notes           │       │ created_at      │
│ is_pinned       │    │    │ created_at      │       │ updated_at      │
│ is_locked       │    │    │ updated_at      │       └─────────────────┘
│ created_at      │    │    └─────────────────┘                │
│ updated_at      │    │             │                         │
└─────────────────┘    │
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
- **USER_DASHBOARDS** ↔ **DASHBOARD_LAYOUTS** (through dashboard_id and layout configuration)

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
- **JSON fields**: preferences, social_links, tags (MySQL JSON type)

### Business Rules
1. Users can book multiple classes and events
2. Instructors can teach multiple classes
3. Classes can have multiple instructors (primary and assistant)
4. Events have capacity limits
5. Partner matching is mutual (both users must agree)
6. Forum replies can be nested (threaded discussions)
7. Admin actions are logged for audit trail
8. Soft deletes for important data (is_active flag)
9. Each user can have multiple dashboards but only one default
10. Dashboard widgets are configurable and can be resized/repositioned
11. User analytics are automatically calculated based on user activity
12. User goals track progress toward specific dance achievements
13. Activity logs track all user interactions for analytics purposes

### Security Considerations
- Password hashing (bcrypt)
- JWT tokens for authentication
- Role-based access control (RBAC)
- Input validation and sanitization
- Audit logging for admin actions
- Rate limiting on API endpoints
