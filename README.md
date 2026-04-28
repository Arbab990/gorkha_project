# Bhartiya Gorkha Seva Samaj — Official Website

> **Dedicated to the welfare, cultural preservation, and upliftment of the Gorkha community across India.**

A full-stack community platform for **Bhartiya Gorkha Seva Samaj**, Uttar Pradesh, Lucknow. Built with React 18, Vite, Tailwind CSS v4, Framer Motion, and a Node.js / Express / MongoDB backend. The platform supports **trilingual content** (English, Hindi, Nepali), online **membership applications**, **contact form submissions**, **donation workflows**, and a rich media **gallery** — all wrapped in a polished, animation-driven UI.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend Architecture](#frontend-architecture)
  - [Pages](#pages)
  - [Components](#components)
  - [Routing Map](#routing-map)
- [Backend Architecture](#backend-architecture)
  - [API Endpoints](#api-endpoints)
  - [Database Models](#database-models)
- [Key Features](#key-features)
- [Unique Selling Points (USPs)](#unique-selling-points-usps)
- [Design System](#design-system)
- [Internationalization (i18n)](#internationalization-i18n)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [License](#license)

---

## Tech Stack

### Frontend

| Layer           | Technology                                      |
| --------------- | ----------------------------------------------- |
| Framework       | React 18 with Vite 5                            |
| Styling         | Tailwind CSS v4 (CSS-first `@theme` config)     |
| Animations      | Framer Motion 12                                |
| Routing         | React Router DOM v7                             |
| i18n            | i18next + react-i18next (EN / HI / NE)         |
| Icons           | Lucide React, React Icons                       |
| Typography      | Playfair Display (headings), DM Sans (body)     |
| Image Tooling   | Sharp (build-time WebP compression)             |
| Utilities       | clsx, tailwind-merge, class-variance-authority  |

### Backend

| Layer           | Technology                                      |
| --------------- | ----------------------------------------------- |
| Runtime         | Node.js + Express 4                             |
| Database        | MongoDB via Mongoose 8                          |
| Auth / Security | CORS whitelist, JSON body limit (10 MB)         |
| Dev Tooling     | Nodemon, dotenv                                 |

---

## Project Structure

```
gorkha_project/
|
|-- backend/                        # Express API server
|   |-- config/
|   |   |-- db.js                   # MongoDB connection helper
|   |-- models/
|   |   |-- ContactMessage.js       # Contact form schema
|   |   |-- Membership.js           # Membership application schema
|   |-- routes/
|   |   |-- contactRoutes.js        # POST / GET /api/contact
|   |   |-- membershipRoutes.js     # POST / GET /api/memberships
|   |-- server.js                   # App entry, middleware, error handling
|   |-- package.json
|   |-- .env                        # MONGO_URI, PORT, CLIENT_URL
|
|-- gorkha/                         # React + Vite frontend
|   |-- public/
|   |   |-- images/                 # Gallery & hero images
|   |   |-- logo/                   # Organisation logo, UPI/payment SVGs
|   |-- src/
|   |   |-- assets/                 # Static SVG assets
|   |   |-- components/             # 19 reusable UI components
|   |   |-- locales/
|   |   |   |-- en/translation.json # English strings
|   |   |   |-- hi/translation.json # Hindi strings
|   |   |   |-- ne/translation.json # Nepali strings
|   |   |-- pages/                  # 23 page-level components
|   |   |-- i18n.js                 # i18next initialisation
|   |   |-- App.jsx                 # Root router & layout
|   |   |-- main.jsx                # React DOM entry
|   |   |-- index.css               # Tailwind v4 theme tokens
|   |   |-- App.css                 # Supplementary styles
|   |-- index.html                  # HTML shell with font preloading
|   |-- vite.config.js              # Vite + React plugin
|   |-- compress-images.cjs         # Sharp-based bulk WebP converter
|   |-- package.json
|
|-- README.md                       # <-- You are here
```

---

## Frontend Architecture

### Pages

The application contains **23 distinct page components** organised into logical groups:

#### About Us

| Page               | Route                     | Description                                                         |
| ------------------ | ------------------------- | ------------------------------------------------------------------- |
| `OurStory`         | `/about/our-story`        | Organisation origin narrative with animated sections                 |
| `MissionVision`    | `/about/mission-vision`   | Core mission, vision statement, and guiding values                  |
| `Leadership`       | `/about/leadership`       | Current leadership team profiles                                    |
| `AboutFounder`     | `/about/about-founder`    | Dedicated founder biography page                                    |

#### Legacy

| Page               | Route                     | Description                                                         |
| ------------------ | ------------------------- | ------------------------------------------------------------------- |
| `Timeline`         | `/legacy/timeline`        | Interactive auto-advancing timeline with milestone popover cards     |
| `Founders`         | `/legacy/founders`        | Historical founding members showcase                                |
| `Archives`         | `/legacy/archives`        | Historical documents and records                                    |

#### Our Work

| Page                 | Route                              | Description                                                    |
| -------------------- | ---------------------------------- | -------------------------------------------------------------- |
| `CommunitySupport`   | `/our-work/community-support`      | Community welfare programmes and initiatives                   |
| `MedicalAssistance`  | `/our-work/medical-assistance`     | Healthcare aid, medical camps, and support details              |
| `MarriageSupport`    | `/our-work/marriage-support`       | Marriage assistance and matrimonial facilitation                |
| `StudentRecognition` | `/our-work/student-recognition`    | Academic felicitation and scholarship programmes                |
| `CulturalActivities` | `/our-work/cultural-activities`    | Cultural events, festivals, and heritage preservation           |

#### Events

| Page               | Route                     | Description                                                         |
| ------------------ | ------------------------- | ------------------------------------------------------------------- |
| `UpcomingEvents`   | `/events/upcoming`        | Future scheduled events with details                                |
| `PastEvents`       | `/events/past`            | Archived past events with photo documentation                      |

#### Gallery & News

| Page               | Route                     | Description                                                         |
| ------------------ | ------------------------- | ------------------------------------------------------------------- |
| `Gallery`          | `/gallery`                | Folder-based photo gallery with 10 event albums and lightbox view   |
| `News`             | `/news`                   | Community news and announcements                                    |

#### Get Involved

| Page               | Route                              | Description                                                    |
| ------------------ | ---------------------------------- | -------------------------------------------------------------- |
| `BecomeMember`     | `/get-involved/become-member`      | Multi-section membership form with family member table          |
| `Volunteer`        | `/get-involved/volunteer`          | Six volunteer role cards with tags, time commitment, location   |

#### Donate & Contact

| Page               | Route                     | Description                                                         |
| ------------------ | ------------------------- | ------------------------------------------------------------------- |
| `Donate`           | `/donate`                 | Full donation flow with UPI / GPay / PhonePe / Net Banking / Card   |
| `Contact`          | `/contact`                | Contact form, info cards, social links, embedded Google Maps        |

#### Legal

| Page               | Route                     | Description                                                         |
| ------------------ | ------------------------- | ------------------------------------------------------------------- |
| `PrivacyPolicy`    | `/privacy-policy`         | Organisation privacy policy                                         |
| `TermsConditions`  | `/terms-conditions`       | Terms and conditions                                                |

---

### Components

**19 reusable UI components** power the home page and shared layouts:

| Component                | Purpose                                                                                 |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `Navbar`                 | Fixed top navigation with desktop dropdowns, mobile accordion menu, scroll-aware styling |
| `Hero`                   | Full-screen image slider with autoplay, directional transitions, and CTA buttons        |
| `Introduction`           | Organisation introduction section with animated text reveals                            |
| `OurWorkOverview`        | Card grid previewing the five welfare programme categories                              |
| `Legacy`                 | Interactive auto-cycling timeline with icon nodes and popover description cards          |
| `Impact`                 | Animated counter cards (25+ years, 750+ families, 150+ events, 500+ students)           |
| `UpcomingEventsOverview` | Upcoming events preview with date badges and quick-view cards                           |
| `GalleryOverview`        | 4-image grid teaser linking to the full gallery page                                    |
| `Testimonials`           | Community testimonial cards with star ratings and quote styling                          |
| `FinalCallToAction`      | Bottom-of-page CTA section with donation and membership prompts                         |
| `Stats`                  | Statistical highlights with animated counters                                           |
| `Story`                  | Organisation story narrative section                                                    |
| `Features`               | Key feature highlights with icon-driven cards                                           |
| `Priorities`             | Organisation priorities showcase                                                        |
| `Partners`               | Partner organisations display                                                           |
| `Newsletter`             | Email newsletter signup section                                                         |
| `Footer`                 | Site-wide footer with branding, quick links, legal links, and contact info              |
| `LanguageSwitcher`       | Dropdown language toggle (English / Hindi / Nepali)                                     |
| `ScrollToTop`            | Automatic scroll-to-top on route navigation                                             |

---

### Routing Map

```
/                              --> Home
|
|-- /about
|   |-- /our-story             --> OurStory
|   |-- /mission-vision        --> MissionVision
|   |-- /leadership            --> Leadership
|   |-- /about-founder         --> AboutFounder
|
|-- /legacy
|   |-- /timeline              --> Timeline
|   |-- /founders              --> Founders
|   |-- /archives              --> Archives
|
|-- /our-work
|   |-- /community-support     --> CommunitySupport
|   |-- /medical-assistance    --> MedicalAssistance
|   |-- /marriage-support      --> MarriageSupport
|   |-- /student-recognition   --> StudentRecognition
|   |-- /cultural-activities   --> CulturalActivities
|
|-- /events
|   |-- /upcoming              --> UpcomingEvents
|   |-- /past                  --> PastEvents
|
|-- /gallery                   --> Gallery
|-- /news                      --> News
|
|-- /get-involved
|   |-- /become-member         --> BecomeMember
|   |-- /volunteer             --> Volunteer
|
|-- /donate                    --> Donate
|-- /contact                   --> Contact
|-- /privacy-policy            --> PrivacyPolicy
|-- /terms-conditions          --> TermsConditions
```

All routes share a common `Layout` wrapper that renders `Navbar` above `<Outlet />` and `Footer` below.

---

## Backend Architecture

The backend is a lightweight **Express 4** REST API that connects to **MongoDB Atlas** (or local MongoDB) via Mongoose.

### Server Configuration (`server.js`)

- JSON body parsing with **10 MB** limit
- URL-encoded body parsing
- CORS whitelisting for the Vite dev server origin
- Health check endpoint at `GET /api/health`
- Centralised 404 and global error handlers

### API Endpoints

#### Contact Messages

| Method | Endpoint         | Description                          | Access  |
| ------ | ---------------- | ------------------------------------ | ------- |
| `POST` | `/api/contact`   | Submit a contact form message        | Public  |
| `GET`  | `/api/contact`   | List all messages (admin panel ready)| Private |

**Validation**: Name, email, and message are required. Email format is validated via regex. Each message receives an auto-generated reference ID (`BGSS-C-xxxx`) and a `status` field (`unread` / `read` / `replied`).

#### Membership Applications

| Method | Endpoint              | Description                               | Access  |
| ------ | --------------------- | ----------------------------------------- | ------- |
| `POST` | `/api/memberships`    | Submit a new membership application       | Public  |
| `GET`  | `/api/memberships`    | List all applications (admin panel ready) | Private |
| `GET`  | `/api/memberships/:id`| Get a single application by ID            | Private |

**Validation**: Full name, mobile number (Indian 10-digit), Aadhaar number (12-digit), date of birth, and permanent address are validated. Family member sub-documents are stored as an embedded array. Each application receives an auto-generated reference ID (`BGSS-M-xxxx`) and a `status` field (`pending` / `approved` / `rejected`).

### Database Models

#### `ContactMessage`

```
name           : String (required)
email          : String (required, validated)
phone          : String
subject        : String
message        : String (required, min 10 chars)
referenceId    : String (unique, auto-generated)
status         : Enum [unread, read, replied]
timestamps     : createdAt, updatedAt (auto)
```

#### `Membership`

```
fullName         : String (required)
guardianName     : String (required)
mobileNumber     : String (required, validated: Indian 10-digit)
occupation       : String
permanentAddress : String (required)
dateOfBirth      : String (required)
aadhaarNumber    : String (required, validated: 12-digit)
familyCount      : String
monthlyIncome    : String
additionalDetails: String
familyMembers    : [{ name, relation, age }]
metadata         : { source, timestamp, userAgent }
referenceId      : String (unique, auto-generated)
status           : Enum [pending, approved, rejected]
timestamps       : createdAt, updatedAt (auto)
```

---

## Key Features

### Trilingual Internationalization
- Full i18n support via `i18next` with **English**, **Hindi**, and **Nepali** translations
- LanguageSwitcher component in the navbar for instant locale switching
- All page content, labels, navigation items, and form placeholders are translatable

### Rich Animation System
- Framer Motion powers page transitions, scroll-triggered reveals, hover effects, and micro-interactions
- Hero slider with directional slide transitions and autoplay
- Animated counters for impact statistics (scroll-triggered, counts up from zero)
- Interactive timeline with auto-advancing nodes and popover cards
- Staggered card grid animations across all listing sections

### Online Membership Application
- Comprehensive multi-field membership form with applicant details and family member table
- Client-side validation with inline error messages
- Real-time API submission to MongoDB with auto-generated reference IDs
- Success modal with reference ID display for tracking

### Multi-Method Donation System
- Support for **UPI**, **Google Pay**, **PhonePe**, **Net Banking**, and **Debit/Credit Card**
- Preset amounts (101, 251, 501, 1001, 2501, 5001 INR) with custom amount input
- One-time and monthly recurring donation toggle
- UPI Intent URL generation for mobile app redirection
- Donor information capture with full form validation
- Payment gateway integration points (Razorpay / Cashfree / PayU ready)
- Real-time amount preview pill and motivational donation reminder

### Contact Form with Backend Persistence
- Full contact form with name, email, phone, subject, and message fields
- Client-side validation (email regex, phone format, message length)
- API submission with success/error feedback banners
- Contact info cards with email, phone, location, and response time
- Social media links (Facebook, Instagram, YouTube) with animated hover effects
- Embedded Google Maps for office location

### Folder-Based Photo Gallery
- 10 organised event albums (Bada Mangal, Foundation Day, Run For Gorkhaland, etc.)
- Folder grid view with cover images and photo counts
- Individual album view with masonry-style image grid
- Hover-to-zoom effects and animated transitions between views
- Support for both `object-cover` and `object-contain` display modes

### Volunteer Role Explorer
- Six categorised volunteer roles: Community, Digital, Legal, Skill, Content, Event
- Each role card displays description, time commitment, location, and skill tags
- Apply Now CTA on each role card

### Responsive Navbar with Mega Dropdowns
- Fixed-position navigation with scroll-aware background transitions
- Desktop: hover-activated animated dropdowns for nested sections
- Mobile: full accordion menu with nested sub-navigation
- Integrated language switcher across all breakpoints

### Image Optimisation Pipeline
- Build-time image compression via `compress-images.cjs` (Sharp)
- Automatic WebP conversion for hero slider images
- Preloading critical hero images in HTML `<head>`

### Legal Pages
- Privacy Policy and Terms & Conditions pages
- Linked from the site footer

---

## Unique Selling Points (USPs)

### Hyper-Local Community Focus
Built specifically for the Indian Gorkha diaspora with culturally relevant content, Hindi/Nepali language support, and India-specific features like Aadhaar-based membership verification and UPI/GPay/PhonePe payment integration.

### India-First Payment Architecture
The donation system is designed ground-up for the Indian payment ecosystem. UPI Intent URLs enable one-tap donations from mobile apps, with preset amounts in INR and support for all major Indian payment methods.

### Trilingual Content Delivery
Every string in the application is served through `i18next`, enabling seamless switching between English, Hindi, and Nepali. This is not a translation overlay — it is a first-class trilingual architecture with per-locale JSON resource bundles.

### Production-Ready Backend Integration
Both the membership and contact forms are fully wired to a Node.js / Express / MongoDB backend with auto-generated reference IDs, Mongoose validation, and RESTful endpoints designed for future admin panel integration.

### Animation-Driven Storytelling
The entire UI uses Framer Motion for purposeful animations — from the hero slider and impact counters to timeline nodes and gallery transitions. Animations are not decorative; they guide the user through the organisation's story and call-to-actions.

### Optimised Media Pipeline
Hero images are pre-compressed to WebP format using Sharp, reducing payload from ~24 MB to ~1.5 MB. Critical images are preloaded in the HTML head for instant above-the-fold rendering.

### Reference ID Tracking
Both contact messages and membership applications receive unique, human-readable reference IDs (`BGSS-C-xxxx`, `BGSS-M-xxxx`) using base-36 encoded timestamps — enabling applicants to track their submissions without requiring user accounts.

---

## Design System

### Colour Tokens (defined in `index.css` via Tailwind v4 `@theme`)

| Token             | Value     | Usage                                  |
| ----------------- | --------- | -------------------------------------- |
| `--color-orange`  | `#F26522` | Primary accent, CTAs, active states    |
| `--color-orange-light` | `#FF8C42` | Hover states, gradients           |
| `--color-green-dark`   | `#1A3C2E` | Navbar, footer, headings          |
| `--color-green`        | `#2D6A4F` | Secondary green, form focus rings |

### Typography

| Font             | Weight      | Usage               |
| ---------------- | ----------- | -------------------- |
| Playfair Display | 700, 800    | Headings (`font-heading`) |
| DM Sans          | 400, 500, 600 | Body text (`font-body`) |

### Iconography

The project uses **Lucide React** as the primary icon library across components, supplemented by **React Icons** (`react-icons/hi`, `react-icons/fi`, `react-icons/bi`) for specialised icons. Key Lucide icons used throughout the codebase:

- `Users`, `Landmark`, `Network`, `Heart`, `BookOpen`, `Flag` — Timeline nodes
- `Mail`, `Phone`, `MapPin`, `Clock`, `Send`, `MessageSquare` — Contact page
- `GraduationCap`, `HeartPulse`, `PartyPopper`, `Handshake`, `Zap` — Donate page
- `Quote`, `Star` — Testimonials
- `Loader2`, `CheckCircle2`, `AlertCircle` — Form states
- `Clock`, `MapPin` — Volunteer cards
- `Diamond`, `RefreshCcw` — Donation type toggle

---

## Internationalization (i18n)

| Language | Code | Locale File                    |
| -------- | ---- | ------------------------------ |
| English  | `en` | `src/locales/en/translation.json` |
| Hindi    | `hi` | `src/locales/hi/translation.json` |
| Nepali   | `ne` | `src/locales/ne/translation.json` |

The `i18n.js` module initialises i18next with `react-i18next`. The `LanguageSwitcher` component in the navbar allows real-time language toggling. All navigation labels, page headings, form placeholders, button text, and content blocks reference translation keys.

---

## Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB** (local or Atlas connection string)

### 1. Clone the repository

```bash
git clone <repository-url>
cd gorkha_project
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### 3. Set up the Frontend

```bash
cd gorkha
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable     | Description                        | Default                    |
| ------------ | ---------------------------------- | -------------------------- |
| `MONGO_URI`  | MongoDB connection string          | _(required)_               |
| `PORT`       | Express server port                | `5000`                     |
| `CLIENT_URL` | Allowed CORS origin                | `http://localhost:5173`    |

---

## Scripts

### Frontend (`gorkha/`)

| Script            | Command            | Description                       |
| ----------------- | ------------------- | --------------------------------- |
| `npm run dev`     | `vite`              | Start Vite dev server             |
| `npm run build`   | `vite build`        | Production build                  |
| `npm run preview` | `vite preview`      | Preview production build locally  |
| `npm run lint`    | `eslint .`          | Lint source files                 |

### Backend (`backend/`)

| Script            | Command              | Description                      |
| ----------------- | --------------------- | -------------------------------- |
| `npm start`       | `node server.js`      | Start production server          |
| `npm run dev`     | `nodemon server.js`   | Start dev server with hot reload |

---

## License

This project is developed for **Bhartiya Gorkha Seva Samaj**, Uttar Pradesh, Lucknow.
Powered by [Onebigbit Technologies Private Limited](https://onebigbit.com/).

---

> Built with purpose. Serving the Gorkha community with technology.
