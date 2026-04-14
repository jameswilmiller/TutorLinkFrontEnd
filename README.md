# TutorLink Front End

## Project Status

This frontend is currently in active development and is being used primarily to validate backend functionality, including authentication and API integration. The current implementation prioritises functionality and system integration over visual design, with a more refined user experience planned for future iterations.

## Overview

The TutorLink frontend is a React-based web application responsible for rendering the user interface and interacting with the backend API. It provides functionality for user authentication, tutor discovery, and profile management.

The application is designed with a focus on modularity, maintainability, and clear separation of concerns, following modern React development practices.

# Tech Stack and versions
| Component | Version |
| --------------- | -------- |
| Node.js         | 22.14.0  |
| React           | 19.2.0   |
| Vite            | 7.2.4    |
| Tailwind CSS    | 4.2.1    |
| React Router    | 7.13.1   |


## Key Features

### Implemented
- User Authentication (login, signup, verify)
- Token-based session handling
- Location autocomplete integration
- Location based tutor discovery

### In Progress
- Tutor listing interface
- Tutor Search filtering
- Protected Routes

## Architecture Overview

The frontend follows a component based architecture with a clear seperation of responsibilities:

- Components: reusable UI elements
- Pages: route-level views
- Context: global state
- Hooks: reusable logic
- Services: API interaction

### Data Flow
UI -> Hook -> Service -> API -> Response -> UI

### Authentication
- Access tokens stored in memory
- Refresh tokens stored via HTTP-only cookies

Requests include:

```Authorization: Bearer <access_token>```

### API Integration
API calls are abstracted into a service layer to seperate UI from data-fetching logic and centralise request handling.

## Configuration

Environment variables are required for API communication and external services

create a `.env` file in the root of the project:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_GOOGLE_MAPS_API_KEY=your_api_key
```

### Notes
- VITE_API_BASE_URL should point to the backend API
  - Local: http://localhost:8080
  - Production: your deployed backend domain
- VITE_GOOGLE_MAPS_API_KEY is required for location autocomplete functionality

### External Services
The frontend uses the Google Maps Places API for location autocomplete.

To configure:

1. Create a project in Google Cloud Console
2. Enable the Places API
3. Generate an API key
4. Restrict the key to:
    - HTTP referrers (recommended)
    - Your frontend domain (for production)

Without a valid API key, location autocomplete will not function.

## Local Development
### Pre-requisites
Ensure the following are installed:
- Node.js
- npm

### Clone the repository

```bash
git clone https://github.com/jameswilmiller/TutorLinkFrontEnd.git
cd TutorLinkFrontEnd
```
### Install Dependencies
```
npm install
```
### Run development server
```
npm run dev
```
The application will be available at http://localhost:5173

### Integration with backend
The frontend communicates with the backend via the configured API base URL.

For local development:
```env
VITE_API_BASE_URL=http://localhost:8080
```
Ensure:
- the backend is running
- CORS is configured to allow requests from http://localhost:5173
  
## Design Decisions

### State Management
React Context and custom hooks are used to minimise complexity while supporting current requirements

  
### Token Storage
Access tokens are stored in memory to reduce exposure to XSS. This requires a refresh token mechanism for session continuity.

### API Layer
A dedicated service layer isolates API logic from UI components, improving maintainability.

### Styling
Tailwind CSS is used for rapid development and consistent styling. Visual refinement is deferred in favour of functional validation.

## Security 
- No tokens are stored in local storage or sessionStorage
- Authentication is handled server-side
- HTTPS required in production

## Author

James Miller
For questions or collaboration: jameswil.miller@gmail.com
