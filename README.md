# Panther Hub - A Centralized Campus Event Management Platform

## Overview
**Panther Hub** is a centralized campus event management platform that provides real-time updates interactive maps, and RSVP functionality for students, faculty, and staff.

## Table of Contents
- [Features](#features)
- [Project Structure](#project_structure)
- [Technology Stack](#technology_stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Configuration](#environment_configuration)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

### User Authentication
- Secure user authentication using Firebase Authentication.
- Role-based access control (Admin and User roles).

### Event Management
- Create, update, and delete events (Admin only).
- View all events with detailed information.
- RSVP to events and manage RSVPs.

### User Profile
- View and update user profile information.
- Role-based navigation (Admin and User).

### Real-Time Updates
- Real-time updates for events and RSVPs using Firebase Firestore.

### Responsive Design
- Fully responsive design for seamless use on both desktop and mobile devices.

### Interactive UI
- User-friendly and interactive UI built with React.
- Navigation using React Router.

## Project Structure
```plaintext
├── .gitignore                  # Prevents committing unnecessary files to version control
├── LICENSE                     # Specifies legal terms for project use and distribution
├── README.md                   # Project documentation and setup instructions
├── package.json                # Root-level project metadata and dependency management
├── package-lock.json           # Locks root-level dependency versions
├── backend
│   ├── package-lock.json       # Locks backend dependency versions
│   ├── package.json            # Backend-specific dependencies and scripts
│   ├── server.js               # Main server entry point (Express.js setup, routes, middleware)
│   └── tests
│       └── user.test.js        # Backend unit tests for user-related functionality
├── frontend
│   ├── README.md               # Frontend-specific documentation
│   ├── package-lock.json       # Locks frontend dependency versions
│   ├── package.json            # Frontend dependencies and React scripts
│   ├── public                  # Static assets served directly to the browser
│   │   ├── background.png      # Background image for application
│   │   ├── favicon.ico         # Website tab icon
│   │   ├── index.html          # Main HTML template for React application
│   │   ├── logo192.png         # Small application logo (192x192 pixels)
│   │   ├── logo512.png         # Large application logo (512x512 pixels)
│   │   ├── manifest.json       # Web App Manifest for PWA configuration
│   │   └── robots.txt          # Search engine crawler instructions
│   └── src
│       ├── App.js              # Root React component (app structure, routing, global state)
│       ├── __tests__
│       │   └── App.test.js     # Unit tests for main App component
│       ├── components          # Utility and shared components
│       │   ├── reportWebVitals.js  # Web performance monitoring
│       │   └── setupTests.js   # Testing environment configuration
│       ├── index.js            # React application entry point
│       ├── logo.svg            # Scalable Vector Graphics logo
│       ├── pages               # Individual page components for different routes
│       │   ├── admin.js        # Admin dashboard page
│       │   ├── events.js       # Events management or listing page
│       │   ├── home.js         # Main homepage
│       │   ├── login.js        # User login page
│       │   ├── profile.js      # User profile management page
│       │   ├── register.js     # User registration page
│       │   └── welcome.js      # Initial landing or welcome page
│       └── styles              # CSS stylesheets for application styling
│           ├── App.css         # Global application styles
│           ├── admin.css       # Admin dashboard specific styles
│           ├── events.css      # Events page specific styles
│           ├── home.css        # Homepage styles
│           ├── index.css       # Base and global CSS styles
│           ├── login.css       # Login page specific styles
│           ├── profile.css     # Profile page specific styles
│           ├── register.css    # Registration page specific styles
│           ├── shared.css      # Reusable styles across components
│           └── welcome.css     # Welcome page specific styles
└── package.json                # Root-level project configuration
```

## Technology Stack

### Frontend
- React 
- React Router 
- Firebase
- Google Maps API

### Backend
- Node.js
- Express
- Twilio
- Firebase Admin SDK

## Prerequisites
- Node.js (v14 or higher)
- npm
- Firebase Account

## Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/aidynk22/Panther-Hub.git
   cd Panther-Hub
   ```

2. **Install dependencies**:
   ```bash
   cd frontend/
   npm install
   cd backend/
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the `frontend/` directory:
   ```plaintext
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

   Create a `.env` file in the `backend/` directory:
   ```plaintext
   FIREBASE_DATABASE_URL=your_database_url
   PORT=5001
   ```

4. **Start the development server**:
   ```bash
   cd backend/
   npm run dev
   cd frontend/
   npm start
   ```

The app will run locally at `http://localhost:3000`.

## Environment Configuration
- Ensure your Firebase project is set up with Authentication and Firestore enabled.
- Keep `.env` files secure and listed in `.gitignore` to avoid exposing sensitive data.

## Testing
Run the test suite:
   ```bash
   npm test
   ```

## Contributing
We welcome contributions to enhance **Panther Hub**. To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear and concise messages.
4. Push the branch to your forked repository.
5. Open a pull request with a detailed description of your changes.

### Orginal Contributors
- Aidyn Kittrell
- Niyako Abajebel
- Harun Ali
- Carlos Mejia De los Santos
- Griffin McCue

## License
This project is open-source and available under the MIT License.

## Support
For support, please open an issue or contact the development team.