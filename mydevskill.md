# AI Developer Skill: Django Web Application Development

## Core Preferences & Standards

### 1. Project Structure & Planning

#### Directory Structure
```
project_root/
├── manage.py
├── requirements.txt
├── .env
├── .gitignore
├── core/                      # Main project configuration
│   ├── settings/
│   │   ├── base.py           # Base settings
│   │   ├── development.py    # Dev settings
│   │   └── production.py     # Production settings
│   └── urls.py
├── apps/                      # All Django applications
│   ├── accounts/              # User authentication & profiles
│   ├── core_app/              # Main application logic
│   └── api/                   # API endpoints (if needed)
├── static/
│   ├── css/
│   ├── js/
│   └── images/
├── templates/
│   ├── base_public.html       # Public-facing template (navbar)
│   ├── base_authenticated.html # Authenticated template (sidebar)
│   ├── includes/              # Reusable components
│   └── emails/                # Email templates
└── media/                     # User uploaded files
```

#### App Naming Convention
- Use descriptive, singular names: `accounts`, `blog`, `shop`, `tasks`
- Keep apps focused and modular
- Maximum 5-7 apps per project for maintainability

---

### 2. Base Templates Architecture

#### Template 1: `base_public.html` (Public-facing with Navbar)

**Features:**
- Responsive navbar that collapses on mobile
- Logo on left, navigation links on right
- Mobile menu toggle with hamburger icon
- Close button for mobile menu
- Role-based links (login/register vs dashboard/logout)
- Flash messages container (fixed position, top center)
- Footer with copyright and links

**Structure:**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}App Name{% endblock %}</title>
    <!-- CSS: Google Fonts, Font Awesome, Custom CSS -->
    {% block extra_css %}{% endblock %}
</head>
<body>
    <nav class="navbar">...</nav>
    <div class="messages-container">{% if messages %}...{% endif %}</div>
    <main>{% block content %}{% endblock %}</main>
    <footer>...</footer>
    <script src="{% static 'js/main.js' %}"></script>
    {% block extra_js %}{% endblock %}
</body>
</html>
```

#### Template 2: `base_authenticated.html` (User Dashboard with Sidebar)

**Features:**
- Fixed sidebar that can be collapsed
- Sidebar toggle button (desktop: collapse, mobile: slide)
- Overlay for mobile sidebar (click to close)
- Top navbar with: page title, notification bell, user menu
- User menu dropdown with profile and logout
- Notification dropdown with real-time updates
- Role-based sidebar navigation (admin vs regular user)
- Responsive: sidebar slides off-canvas on mobile
- Flash messages same as public template
- Web push permission prompt

**Structure:**
```html
<div class="app-wrapper">
    <aside class="sidebar" id="sidebar">...</aside>
    <main class="main-content">
        <div class="top-navbar">...</div>
        <div class="messages-container">...</div>
        <div class="content-wrapper">{% block content %}{% endblock %}</div>
    </main>
</div>
```

---

### 3. Flash Messages System

**Styling:**
- Position: Fixed, top center (top: 80px, left: 50%, transform: translateX(-50%))
- Max-width: 500px, width: 90%
- Z-index: 1100
- Border-radius: 0.75rem
- Box-shadow for depth
- Backdrop-filter: blur(10px) for modern look

**Message Types:**
- `success` → Green gradient background
- `error` → Red gradient background
- `info` → Blue gradient background
- `warning` → Orange/Yellow gradient background

**Behavior:**
- Auto-dismiss after 5-7 seconds with fade-out animation
- Slide-in animation from top
- X button to manually close
- Icon matching message type

**JavaScript Features:**
- Auto-dismiss timer
- Close button handler
- Smooth fade-out animation
- Stack multiple messages

---

### 4. Authentication System

#### Custom User Model
```python
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
```

#### Registration Flow
1. User registers with: email, first_name, last_name, password
2. Account created with `is_active=False`
3. Email verification token generated (UUID)
4. Verification email sent with link
5. User clicks link → account activated → logged in

#### Email Verification
- Token expiry: 24 hours
- Resend verification option with rate limiting
- Pending verification page after registration

#### Login
- Email-based login (no username)
- "Remember me" option (2 weeks session)
- Rate limiting: 5 attempts, 15-minute lockout
- Redirect inactive users to verification page

#### Password Reset
- Email-based reset link
- Token expiry: 1 hour
- Rate limiting
- Strong password validation (8+ chars, uppercase, lowercase, number, special)

#### Password Change (Logged-in users)
- Rate limited: 3 attempts per 14 days
- Same validation as registration

#### Social Auth (Google)
- OAuth2 integration via django-allauth
- Auto-create account if email doesn't exist
- Connect to existing account if email matches

---

### 5. Password Validation (Frontend & Backend)

#### Requirements (Both Frontend & Backend)
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&*)

#### Frontend Features
- Real-time validation as user types
- Visual checklist of requirements
- Password strength meter (Weak/Fair/Good/Strong)
- Show/hide password toggle (eye icon)
- Confirm password match validation
- Disabled submit button until all requirements met

#### Backend Validation
- Same rules enforced in forms
- Clean methods with specific error messages
- Server-side validation for security

---

### 6. Dashboard System

#### Dashboard Redirect View
```python
def dashboard_redirect(request):
    if request.user.is_admin:
        return redirect('admin_dashboard')
    return redirect('user_dashboard')
```

#### Root URL Configuration
```python
urlpatterns = [
    path('dashboard/', login_required(dashboard_redirect), name='dashboard'),
    # Other URLs...
]
```

#### Role-Based Dashboards

**Admin Dashboard:**
- Analytics cards (total users, reports, etc.)
- Quick actions (view all, manage users)
- Recent activity table
- Charts and statistics

**User Dashboard:**
- Welcome banner
- Personal statistics cards
- Recent activity list
- Nearby/related items
- Quick action buttons

#### Sidebar Navigation
- Common links for all users (dashboard, feed, map)
- Role-specific sections with visual separators
- Profile and logout at bottom

---

### 7. URL Structure

#### Root URLs (No nesting)
```
/dashboard/          → Role-based dashboard redirect
/login/              → Login page
/register/           → Registration page
/logout/             → Logout
/profile/            → User profile
/admin/              → Django admin
/api/                → API endpoints (if needed)
```

#### App URLs (Nested under app namespace)
```
/accounts/           → All auth-related URLs
/reports/            → Main app URLs
/settings/           → User settings
```

---

### 8. Responsive Design Standards

#### Breakpoints
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

#### CSS Variables System
```css
:root {
    /* Spacing Scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px) */
    --space-xs: 0.25rem;   /* 4px */
    --space-sm: 0.5rem;    /* 8px */
    --space-md: 0.75rem;   /* 12px */
    --space-base: 1rem;    /* 16px */
    --space-lg: 1.5rem;    /* 24px */
    --space-xl: 2rem;      /* 32px */
    --space-2xl: 3rem;     /* 48px */
    --space-3xl: 4rem;     /* 64px */
    
    /* Border Radius */
    --radius-sm: 0.375rem;
    --radius-base: 0.5rem;
    --radius-md: 0.75rem;
    --radius-lg: 1rem;
    --radius-xl: 1.5rem;
    
    /* Transitions */
    --transition-fast: all 0.15s ease;
    --transition-base: all 0.25s ease;
    --transition-slow: all 0.35s ease;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

#### Responsive Patterns
- Use `rem` instead of `px` for font sizes
- Use `max-width` instead of fixed widths
- Grid with `repeat(auto-fit, minmax(280px, 1fr))`
- Tables: convert to cards on mobile (display: flex)
- Touch targets: minimum 44px on mobile

---

### 9. Branding System

#### Project Naming Guidelines
- Keep it short (1-2 syllables)
- Make it memorable and pronounceable
- Add a verb or action word (Watch, Track, Relay, etc.)
- Combine two relevant words
- Consider domain availability (.com, .app, .io)

#### Name Suggestions Patterns
- [Action] + [Object]: GridWatch, TaskFlow, DataHub
- [Descriptive] + [Noun]: RuralRelay, SmartTrack, QuickAlert
- Single powerful word: Beacon, Pulse, Nexus
- Local language words (Swahili, Yoruba, Hausa) for African projects

#### Brand Colors
- **Primary:** Trust color (blue, green, purple)
- **Secondary:** Neutral (dark gray, charcoal)
- **Accent:** Highlight color (orange, yellow, teal)
- **Success:** Green
- **Error:** Red
- **Warning:** Orange
- **Info:** Blue

#### Typography
- **Headings:** Poppins, Montserrat, Inter (sans-serif, bold)
- **Body:** Roboto, Open Sans, Source Sans Pro (sans-serif, regular)
- **Monospace:** For codes and IDs

---

### 10. Notification System

#### In-App Notifications
- Real-time polling (every 15-30 seconds)
- Badge count on bell icon
- Dropdown showing latest 5 notifications
- Mark as read on click
- Delete individual notification
- "Mark all read" button
- Separate notification history page

#### Email Notifications
- Welcome email after registration
- Email verification
- Password reset
- Status update notifications
- HTML email templates with fallback plain text

#### Web Push Notifications (PWA)
- Request permission prompt
- VAPID key configuration
- Service worker for push handling
- Click to open relevant page

.env
# ============================================================================
# DJANGO CORE SETTINGS
# ============================================================================
DJANGO_SECRET_KEY=
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
SITE_URL=http://127.0.0.1:8000

# ============================================================================
# DATABASE SETTINGS (SQLite - no env vars needed)
# ============================================================================
# Using SQLite by default, no configuration needed

# ============================================================================
# EMAIL CONFIGURATION
# ============================================================================
DJANGO_EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
DJANGO_EMAIL_HOST=smtp.gmail.com
DJANGO_EMAIL_PORT=587
DJANGO_EMAIL_USE_TLS=True
DJANGO_EMAIL_HOST_USER=
DJANGO_EMAIL_HOST_PASSWORD=
DEFAULT_FROM_EMAIL=

# ============================================================================
# GOOGLE OAUTH
# ============================================================================
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# ============================================================================
# SESSION SETTINGS
# ============================================================================
SESSION_ENGINE=django.contrib.sessions.backends.db
SESSION_COOKIE_AGE=3600
SESSION_SAVE_EVERY_REQUEST=True
SESSION_EXPIRE_AT_BROWSER_CLOSE=True

# ============================================================================
# TOKEN EXPIRY SETTINGS
# ============================================================================
OTP_EXPIRY_MINUTES=10
PASSWORD_RESET_TOKEN_EXPIRY_HOURS=1
EMAIL_VERIFICATION_TOKEN_EXPIRY_HOURS=24

# ============================================================================
# RATE LIMITING SETTINGS
# ============================================================================
RATE_LIMIT_MAX_ATTEMPTS=3
RATE_LIMIT_BLOCK_HOURS=1
RATE_LIMIT_WINDOW_HOURS=1

---

### 11. PWA (Progressive Web App) Standards

#### Requirements
- manifest.json with app icons, theme colors, start URL
- Service worker for offline caching
- HTTPS required (use ngrok for testing)
- Add to home screen prompt
- Offline fallback page
- Background sync for offline actions

#### Caching Strategy
- Cache static assets on install
- Network-first for API requests
- Cache-first for static assets
- Offline fallback for HTML pages

---

### 12. Form Standards

#### Styling
- Consistent padding: 0.75rem 1rem
- Border radius: 0.75rem
- Border: 1.5px solid var(--gray-light)
- Focus state: border-color + box-shadow ring
- Touch-friendly inputs (min-height: 44px on mobile)

#### Validation
- Real-time validation on input
- Error messages below field
- Success states for valid fields
- Disabled submit until form valid
- Server-side validation for security

#### Layout
- Single column on mobile
- Two columns on desktop for related fields (first/last name)
- Consistent spacing (margin-bottom: 1.25rem)

---

### 13. API Development Standards

#### Structure
- Use `api/` namespace
- JSON responses only
- Consistent response format: `{'success': True, 'data': {...}}`
- HTTP status codes for errors

#### Authentication
- Login required for protected endpoints
- CSRF protection for POST requests
- Token-based for mobile (optional)

---

### 14. Security Standards

#### Required Settings
- `DEBUG=False` in production
- `ALLOWED_HOSTS` properly configured
- `SECRET_KEY` in environment variables
- `SESSION_COOKIE_SECURE=True` in production
- `CSRF_COOKIE_SECURE=True` in production
- `SECURE_SSL_REDIRECT=True` in production

#### Rate Limiting
- Login attempts: 5 per 15 minutes
- Password reset: 3 per hour
- Email verification resend: 3 per hour
- Registration: 3 per day per email

#### Password Validation
- Minimum 8 characters
- Mix of character types
- Not common password
- Not similar to email

---

### 15. Development Workflow

#### Setup Steps
1. Create virtual environment
2. Install Django and core packages
3. Create project and apps
4. Configure custom user model
5. Set up templates and static files
6. Implement authentication system
7. Create base templates
8. Build role-based dashboards
9. Add core functionality
10. Implement notifications
11. Add PWA features
12. Test and deploy

#### Required Packages
```
Django==4.2.7
django-allauth==0.60.0
Pillow==10.1.0
python-dotenv==1.0.0
django-crispy-forms==2.1
crispy-bootstrap5==0.7
django-pwa==1.1.0
```

---

### 16. Code Organization

#### Settings
- Split into base, development, production
- Environment variables for secrets
- Different settings for different environments

#### Static Files
- CSS: Component-based organization
- JS: Vanilla JavaScript (no jQuery)
- Use CSS variables for theming
- Minimal external dependencies

#### Templates
- Base templates for layout
- Partial templates for reusable components
- Email templates in separate directory
- Consistent indentation (2 spaces)

---

### 17. Additional Preferences

#### Modal/Dialog System
- Centered modals with backdrop
- Close on outside click
- ESC key to close
- Animate in/out

#### Loading States
- Spinner animations
- Disabled buttons during submission
- Skeleton screens for content loading

#### Error Handling
- User-friendly error messages
- Fallback for API failures
- Graceful degradation

#### Accessibility (a11y)
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast
- Focus indicators visible

#### Performance
- Lazy load images
- Debounce scroll events
- Throttle resize events
- Minify CSS/JS in production
- Compress images

This document serves as a comprehensive guide for AI models to generate Django applications that match your development preferences and standards.
```

This skill document can be used as a prompt for any AI model to generate Django applications that follow your exact preferences. It's generic enough for any project but specific enough to maintain consistency across all your applications.