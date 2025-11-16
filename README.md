# Student Course Dashboard

A clean and responsive React-based dashboard built to display student progress across different course modules.
The application uses mock JSON data and includes a simple authentication flow using localStorage.
It focuses on UI clarity, interactivity, and modern component-based design.


## Features

- Responsive grid layout for displaying student cards
- Search, filter, and sort options
- Progress visualization (donut chart + progress distribution)
- Student profile card with initials avatar, status tag, and enrollment date
- Simple register/login flow stored in localStorage
- Light/Dark mode toggle
- Organized, modular React component structure

## Project Structure

- index.html                 → Entry point
- src/main.jsx               → App bootstrap (ReactDOM + Auth Provider)
- src/App.jsx                → Main layout with filters and student grid
- src/components/            → UI components
- src/auth/AuthProvider.jsx  → LocalStorage-based authentication
- src/data/students.json     → Mock student data
- src/assets/                → Images and static files
- src/styles.css / index.css → Global styles

## Quick Start (development)

Make sure you have Node.js installed, then in the project root run:

```powershell
npm install
npm run dev
```

Open the page that Vite serves (usually `http://localhost:5173`).

## Authentication (Demo Only)

The app includes a lightweight authentication flow meant purely for demonstration:

- Registered users are saved in localStorage under scd_users
- Logged-in user is stored under scd_user
- Passwords are encoded using btoa() (not secure — only for mock demo)

How to use:

1. Open the app
2. Click Create account
3. Enter a username and password
4. You’ll be signed in automatically
5. Use the Sign out button on the top-right when needed
   
There’s also a Demo button that pre-fills demo/demo for quick testing.

## Data

- All student information lives in:
  
    src/data/students.json
  
- Each student object supports the fields currently used by the UI: `id`, `name`, `course`, `progress` (0-100), `status` (string), `enrollmentDate`.

## Charts

The component:

  src/components/ProgressChart.jsx

renders:

- A donut chart showing average progress
  
- A pie representation of students grouped by progress ranges
(0–25, 26–50, 51–75, 76–100)

Charts update automatically when filters/search change.

## Styling

Global styling is handled through styles.css and index.css, using:

- CSS variables for easy theming
- A dark class for dark mode
- Reusable utility classes

## Screenshot

![Screenshot 1](src/assets/screenshots/create-account.png)
![Screenshot 2](src/assets/screenshots/login-page.png)
![Screenshot 3](src/assets/screenshots/active-student.png)
![Screenshot 4](src/assets/screenshots/completed-student.png)
![Screenshot 5](src/assets/screenshots/progress-high-low.png)


## Deployment link


**Live Demo:** unrivaled-jalebi-a0526a.netlify.app



## Notes on Security

This is a frontend-only demo.
LocalStorage-based auth is not suitable for real applications.
For production, use:
 - Backend API
 - Hashed passwords (bcrypt / Argon2)
 - JWT or server-side sessions
 - HTTPS

## Possible Enhancements

- Replace mock auth with a small Express + SQLite backend
- Add animations and tooltips using Chart.js or Recharts
- Add detailed student profile pages
- Role-based access control
- Unit tests for components and auth logic

## Important Files to Explore

- StudentCard.jsx — student layout and UI
- ProgressChart.jsx — chart calculation + SVG rendering
- AuthProvider.jsx — login, registration, logout logic
  
---
