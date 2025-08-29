# Dance Website ERD Files

This directory contains the Entity Relationship Diagrams (ERDs) for the Dance Website project with comprehensive user dashboard functionality.

## Files Overview

### 📄 ERD Files Available

| File | Format | Description | Size |
|------|--------|-------------|------|
| `ERD.md` | Markdown | Original ERD with basic entities | 22KB |
| `ERD-Visual.md` | Markdown | Mermaid diagram version of the ERD | 14KB |
| `ERD-updated.md` | Markdown | **Enhanced ERD with User Dashboard System** | 29KB |
| `ERD.html` | HTML | Styled HTML version of original ERD | - |
| `ERD-Visual.html` | HTML | Styled HTML version of visual ERD | - |
| `ERD-updated.html` | HTML | Styled HTML version of enhanced ERD | - |
| `ERD.pdf` | PDF | PDF version of original ERD | 271KB |
| `ERD-Visual.pdf` | PDF | PDF version of visual ERD | 250KB |
| `ERD-updated.pdf` | PDF | **PDF version of enhanced ERD** | 348KB |

## 🎯 Recommended File: `ERD-updated.pdf`

The **`ERD-updated.pdf`** is the most comprehensive version that includes:

### ✨ Core Features
- User authentication and management
- Class and event booking system
- Instructor management
- Partner matching system
- Community forum features
- Admin panel functionality

### 🚀 **NEW: User Dashboard System**
- **Personal Dashboards**: Multiple customizable dashboards per user
- **Widget System**: 10+ configurable widgets including:
  - Upcoming classes and events
  - Progress tracking
  - Goal management
  - Activity feeds
  - Partner matches
  - Class recommendations
  - Achievement badges
  - Calendar views
  - Expense tracking
  - Instructor favorites

### 📊 Analytics & Tracking
- **User Analytics**: Comprehensive activity metrics
- **Goal Setting**: Personal dance goals with progress tracking
- **Activity Logging**: Detailed user interaction tracking
- **Performance Insights**: Usage patterns and engagement metrics

### 🛠 Technical Features
- Grid-based widget positioning
- Real-time dashboard updates
- Customizable themes and layouts
- Privacy controls
- Responsive design
- Performance optimizations

## Database Entities

### Core Entities (Original)
- USERS, ADMINS, INSTRUCTORS
- CLASSES, EVENTS, DANCE_STYLES
- CLASS_BOOKINGS, EVENT_BOOKINGS
- PARTNER_REQUESTS, PARTNER_MATCHES
- FORUM_POSTS, FORUM_REPLIES
- TESTIMONIALS, NOTIFICATIONS
- CONTACT_MESSAGES, NEWSLETTERS
- AUDIT_LOGS, SETTINGS

### 🆕 Dashboard Entities (Enhanced)
- **USER_DASHBOARDS** - Dashboard configurations
- **DASHBOARD_WIDGETS** - Widget instances and settings
- **USER_ANALYTICS** - User activity metrics
- **USER_GOALS** - Personal goals and progress
- **USER_ACTIVITY_LOG** - Detailed activity tracking
- **DASHBOARD_LAYOUTS** - Reusable layout templates

## Key Relationships

- Users can have multiple dashboards (1:N)
- Each dashboard can contain multiple widgets (1:N)
- Users have comprehensive analytics tracking (1:1)
- Users can set multiple goals (1:N)
- All user activities are logged (1:N)

## Business Rules

1. Each user gets a default dashboard on registration
2. Dashboard widgets are drag-and-drop configurable
3. Analytics are auto-calculated from user activities
4. Goal progress is automatically tracked
5. Activity logs enable detailed user insights
6. Dashboard layouts can be shared as templates

## 🔧 Conversion Tools

### Files Included:
- `convert_erd.py` - Python script to convert MD to HTML
- `html-to-pdf.js` - Node.js script to convert HTML to PDF
- `package.json` - Node.js dependencies for PDF conversion

### To Regenerate PDFs:
```bash
# Convert MD to HTML
python3 convert_erd.py

# Convert HTML to PDF
node html-to-pdf.js
```

## 📋 Next Steps

1. **Review** the enhanced ERD (`ERD-updated.pdf`)
2. **Implement** the dashboard system entities
3. **Create** database migrations
4. **Develop** dashboard API endpoints
5. **Build** the frontend dashboard interface

---

**Generated**: August 2025
**Version**: Enhanced with User Dashboard System
**Status**: Ready for Implementation
