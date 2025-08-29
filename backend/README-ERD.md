# Dance Website ERD Documentation

This directory contains the Entity Relationship Diagram (ERD) documentation for the Dance Website backend database.

## Files

### Main Documentation
- **`ERD-v2.md`** - The complete ERD specification in Markdown format
- **`Dance-Website-ERD-v2.pdf`** - Professional PDF version of the ERD documentation

### Supporting Files
- **`ERD-v2.html`** - Styled HTML version (intermediate format for PDF generation)
- **`md_to_html.py`** - Python script to convert Markdown to styled HTML
- **`create_pdf.py`** - Python script to generate PDF from HTML using Chrome headless

## ERD v2 Features

The latest ERD (v2) includes:

### ✅ **Core Improvements**
- **RBAC System**: Unified user roles (user/instructor/admin) 
- **Soft Delete**: `deleted_at` fields for safe data recovery
- **Counter Optimization**: Aggregate counts from bookings instead of stored counters
- **Timezone Support**: All timestamps in UTC with timezone fields
- **Enhanced Bookings**: Unified system for classes, events, and sessions

### ✅ **Database Design**
- **Venues Management**: Normalized venue information
- **Dance Styles**: Proper normalization with mapping tables
- **Class Sessions**: Detailed session scheduling with exceptions
- **Payment Tracking**: Complete transaction logging
- **Performance**: Optimized indexes and constraints

### ✅ **Key Tables**
- `USERS` (with RBAC)
- `INSTRUCTORS` (linked to users)
- `CLASSES` & `CLASS_SESSIONS`
- `EVENTS`
- `VENUES`
- `BOOKINGS` (unified)
- `TRANSACTIONS`
- `DANCE_STYLES` + mapping tables

## Regenerating PDF

If you need to regenerate the PDF:

```bash
# Convert markdown to HTML
python3 md_to_html.py

# Generate PDF from HTML
python3 create_pdf.py
```

### Requirements
- Python 3 with `markdown` library
- Google Chrome (for PDF generation)
- Or alternatively: `wkhtmltopdf` via Homebrew

### Manual PDF Generation
If automatic generation fails:
1. Open `ERD-v2.html` in your browser
2. Press `Cmd+P` to print
3. Choose "Save as PDF" from the PDF dropdown
4. Save as `Dance-Website-ERD-v2.pdf`

## Usage

The ERD serves as the definitive specification for:
- Database schema design
- Migration planning
- API development
- Frontend data modeling
- Performance optimization

Refer to the PDF version for presentations and documentation sharing.
