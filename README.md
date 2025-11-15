# Student Course Dashboard

A small React-based dashboard for viewing and managing student progress in course modules. This repository is a lightweight front-end demo that includes searchable/filterable student cards, a responsive grid layout, a simple SVG-based progress visualization, and a mock authentication flow using browser localStorage.

---

## Features

- Responsive cards grid for student entries
- Search, filter and sort controls
- Progress visualization component (donut + distribution pie)
- Student card with avatar (initials), status badge, progress and enrollment date
- Mock authentication (register / sign in) stored in `localStorage`
- Dark mode toggle and polished styling

## Project Structure

- `index.html` — app entry
- `src/main.jsx` — app bootstrap (wraps `App` with the `AuthProvider`)
- `src/App.jsx` — main layout, filters, and card grid
- `src/components/` — UI components (StudentCard, ProgressBar, ProgressChart, Login, etc.)
- `src/auth/AuthProvider.jsx` — simple auth context using `localStorage`
- `src/data/students.json` — sample student data (10 entries)
- `src/assets/` — folder for images, logos, and static assets
- `src/styles.css` & `src/index.css` — global styles

## Quick Start (development)

Make sure you have Node.js installed, then in the project root run:

```powershell
npm install
npm run dev
```

Open the page that Vite serves (usually `http://localhost:5173`).

## Authentication (local demo)

This project uses a mock, client-side authentication flow suitable for demos only:

- Registered users are stored in browser `localStorage` under the key `scd_users`.
- The currently signed-in user is stored under `scd_user`.
- Passwords are encoded with `btoa()` (NOT secure) — this is only to demonstrate a simple login flow.

How to test:

1. Open the app in your browser.
2. Click `Create account` on the login form and register a username/password.
3. After registration you are automatically signed in.
4. To sign out, click the `Sign out` button in the top-right.

If you prefer a quick demo, use the `Demo` button to prefill `demo`/`demo` and then create the account first with those credentials.

## Data

- The dataset is `src/data/students.json`. Add or modify entries there to change what the UI displays.
- Each student object supports the fields currently used by the UI: `id`, `name`, `course`, `progress` (0-100), `status` (string), `enrollmentDate`.

## Charts

- `src/components/ProgressChart.jsx` provides a small SVG donut showing average progress and a pie distribution of students by progress buckets (0–25, 26–50, 51–75, 76–100).
- The chart is computed from the active (filtered) student list so it updates as you search/filter.

## Styling

- Global styles live in `src/styles.css`. The project uses CSS variables for theming and includes a dark-mode class you can toggle via the UI.

## Screenshot

Create a Account-(image-1.png)
Login Page-(image.png)
Student Dashboard-(image-2.png)
Active Student-(image-3.png)
Completed Student-(image-4.png)
Progress[High-Low]-(image-5.png)

## Security & Production Notes

- This project is a front-end demo; do NOT use the mock `localStorage` authentication in production.
- For a production-ready auth system, use a backend API with hashed passwords (bcrypt or Argon2), HTTPS, and secure session management (JWT or server-side sessions).

## Next Improvements (ideas)

- Replace the mock auth with a minimal Express + SQLite backend and JWT authentication.
- Add interactive chart tooltips and animations using a chart library (Chart.js, Recharts, etc.).
- Add role-based UI or per-student details + edit flows.
- Add unit tests for key components and flows.

## Where to look in the code

- `src/components/StudentCard.jsx` — update card layout
- `src/components/ProgressChart.jsx` — chart implementation
- `src/auth/AuthProvider.jsx` — auth functions (`signin`, `register`, `signout`)

---

If you'd like, I can scaffold a small backend to replace the mock auth, or add richer charts/tooltips. Tell me which option you prefer and I will implement it.
