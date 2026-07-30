# TutorLink Front End

React single-page app for [TutorLink](https://tutorlink.dev), a peer tutoring platform for University of Queensland students. Students search for tutors by course, view profiles, and request bookings; tutors onboard through a guided wizard and manage their listing from a dashboard.
 
**Live:** https://tutorlink.dev · **Backend:** [tutorlink-backend](https://github.com/jameswilmiller/TutorLinkBackEnd)
 
> TutorLink is an independent personal project and is not affiliated with, endorsed by, or connected to the University of Queensland.
> 
<img width="2264" height="1070" alt="tutorlinkfrontend" src="https://github.com/user-attachments/assets/95b22fec-35bc-4bee-a58b-17ecebd7008d" />




## Features
 
**For students**
- Search tutors by course code, faculty, lesson mode, or proximity to a location
- Debounced course autocomplete across 120+ UQ courses
- Full tutor profiles — bio, hourly rate, courses, credentials, teaching styles, languages, and reviews
- Two-step booking flow with review-before-submit, for online or in-person sessions
- Rate and review tutors after a completed session
  
**For tutors**
- Four-step onboarding wizard with per-step validation, resumable if abandoned partway
- Dashboard with profile completeness tracking and section-by-section inline editing
- Client-side photo cropping before upload
- Accept, decline, complete, or cancel incoming booking requests
## Tech Stack
 
| Choice | Why |
| --- | --- |
| React 19 + Vite 7 | Fast dev server; static production build served by nginx |
| Tailwind CSS 4 | CSS-first `@theme` config — design tokens defined once, consumed as utilities |
| React Router 7 | Client-side routing with guards for authenticated and tutor-only routes |
| React Context (no Redux) | Shared state is essentially "who is logged in"; a store would add indirection without benefit |
| react-easy-crop | Square crop and downscale before upload — bounded payload, consistent avatars |
| Google Places Autocomplete | Location search returning coordinates, used for proximity filtering |
 
Full dependency list in [`package.json`](package.json).
 
## Local Development
 
### Prerequisites
 
- Node.js 22+
- The [backend](https://github.com/jameswilmiller/TutorLinkBackEnd) running at `http://localhost:8080`, with CORS allowing `http://localhost:5173`
### Setup
 
```bash
git clone https://github.com/jameswilmiller/TutorLinkFrontEnd.git
cd TutorLinkFrontEnd
npm install
cp .env.example .env   # then fill in the values below
npm run dev
```
 
The app runs at http://localhost:5173.
 
### Environment variables
 
| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | No | Backend origin. Defaults to `http://localhost:8080`; set to the deployed backend domain in production |
| `VITE_GOOGLE_MAPS_API_KEY` | Yes | Google Places autocomplete for location search. Requires a Google Cloud project with the Places API enabled; restrict the key to your HTTP referrers |
 

### Running with Docker
 
The Dockerfile produces the production image: a multi-stage build that compiles the app and serves the static bundle with nginx.
 
```bash
docker build -t tutorlink-frontend .
docker run -p 3000:80 tutorlink-frontend
```
 
For day-to-day development, prefer `npm run dev`, the Docker image is a production build with no hot reload.
 
## Routes
 
| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Landing page and search entry |
| `/browse` | Public | Search results with filters |
| `/tutors/:slug` | Public | Tutor profile and booking entry point |
| `/login`, `/signup` | Public | Authentication |
| `/become-a-tutor` | Authenticated | Tutor onboarding wizard |
| `/tutor/dashboard` | Tutor | Listing management |
| `/bookings` | Authenticated | Booking list |
| `/bookings/:id` | Authenticated | Booking detail, status actions, and reviews |
 
## Project Structure
 
Components are grouped by feature, with shared primitives in `ui/`. All API access goes through `services/`
 
```
src/
├── components/
│   ├── booking/      booking modal, cards, status badges
│   ├── common/       image uploader and shared widgets
│   ├── review/       review form and summary
│   ├── search/       course and location autocomplete
│   ├── tutor-edit/   dashboard editing sections
│   └── ui/           primitives — Button, Field, TextInput, TextArea
├── pages/            route-level components
├── features/         onboarding wizard and its co-located logic
├── services/         API client and per-domain request modules
├── hooks/            shared hooks — useAuth, useEditableList
└── utils/            formatting and small helpers
```
 
## Design System
 
Colour, typography, and radius tokens are declared once in `src/index.css` using Tailwind v4's `@theme` block, then consumed as ordinary utilities (`text-tl-ink`, `bg-tl-surface`, `border-tl-border`). Changing the palette is a single-file edit rather than a find-and-replace.
 
- **Type:** Playfair Display for headings, DM Sans for body
- **Palette:** deep navy accent, warm off-white background, muted grey secondary text
- **Layout:** mobile-first; cards, rounded corners, generous whitespace
## Design Decisions
 
### Token storage
Access tokens live in memory only to reduce exposure to XSS. Refresh tokens are HTTP-only cookies handled server side. The trade off is that a page refresh loses the access token, so the app silently re-authenticates via the refresh endpoint on load. All authenticated requests send `Authorization: Bearer <access_token>`.
 
### Single API client
Every request goes through one `apiClient` module handling base URL resolution, bearer token injection, JSON vs text response parsing, and error normalisation into a typed `ApiError` carrying status, message, and per-field validation errors. Domain service modules are thin wrappers over it, and backend validation errors map directly onto the form fields that caused them.
 
### Server truth after writes
Profile updates render from the API's response body rather than patching local state optimistically. Server-derived fields — presigned image URLs, slugs, rating aggregates — can't be computed client-side, and rendering from the response removes a whole class of "only correct after refresh" bugs.
 
### Client-side image cropping
Profile photos are cropped square and downscaled on canvas before upload, so the network carries a bounded ~500×500 JPEG instead of a multi-megabyte original. The server independently re-validates and re-encodes every upload — the client-side step is a UX and bandwidth optimisation, never a trust boundary.
 
### Resumable onboarding
The tutor wizard persists after each step rather than only at the end, so an abandoned signup resumes with earlier steps prefilled. Route guards send users without a profile into the wizard and users with a completed profile to their dashboard.
 
### State management
React Context plus custom hooks, no external store. The only genuinely global state is authentication; everything else is local to its feature.
 
## Deployment
 
Pushes to `main` trigger a GitHub Actions workflow that builds the Docker image, pushes it to Docker Hub tagged with both `latest` and the commit SHA, and deploys to AWS EC2, where nginx serves the static bundle and proxies `/api/*` to the backend.
 
Architecture, data model, and design decision records for the whole system live in [tutorlink-backend/docs](https://github.com/jameswilmiller/TutorLinkBackEnd/tree/main/docs).
 
## Author
 
James Miller — [jameswil.miller@gmail.com](mailto:jameswil.miller@gmail.com)
