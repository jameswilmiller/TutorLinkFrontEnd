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


# External Services
- Google Maps Places API (location autocomplete)

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

## Environment
VITE_API_BASE_URL=http://localhost:8080 

VITE_GOOGLE_MAPS_API_KEY=your_api_key

## Development
Install dependencies

```npm install```

Run Development Server

```npm run dev ```

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
