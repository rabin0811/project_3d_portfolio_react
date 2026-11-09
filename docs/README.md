# 3D Portfolio — Technical Documentation

## Overview

This project combines an animated React portfolio with a small Flask API. The frontend presents a 3D hero scene, profile, skills, projects, education, certifications, GitHub activity, and a contact form. The backend validates contact submissions and stores them in SQLite.

## Architecture

```text
Browser
  ├─ React/Vite SPA
  │   ├─ Three.js / React Three Fiber scenes
  │   ├─ Framer Motion animations
  │   └─ Contact form → POST /api/contact
  │
  └─ Flask API (backend/app.py)
        ├─ GET  /health
        ├─ GET  /api/profile
        ├─ POST /api/contact
        ├─ GET  /api/admin/messages  (Bearer SECRET_KEY)
        └─ GET  /admin               (server-rendered template)
              │
              ▼
        SQLite: backend/portfolio.db
```

## Frontend structure

```text
frontend/src/
  components/three/     Three.js scenes and 3D objects
  components/sections/  Page sections including Contact
  components/ui/        Shared UI components such as Button
  data/                 Static profile, project, skill, and resume data
  hooks/                Device tier, scroll, mouse, and image hooks
  layouts/              Root layout
  pages/                Home and CV pages
  store/                Zustand UI state
  styles/               Global Tailwind styles
```

The production build is generated in `frontend/dist/`.

## Backend structure

```text
backend/
  app.py              Flask app and routes
  config.py           Environment-driven settings
  models/             Data/model helpers
  services/           Service helpers
  controllers/        Controller helpers
  templates/          Admin page
  portfolio.db        Local SQLite database (ignored by Git)
  seed_profile.py     Profile seed helper
  requirements.txt    Python dependencies
```

## Configuration

`backend/.env`:

```dotenv
PORT=5000
DATABASE_URL=sqlite:///portfolio.db
CORS_ORIGIN=http://localhost:5173,http://localhost:4173,http://localhost:4175,http://localhost:4178,http://localhost:5500
SECRET_KEY=replace-with-a-long-random-secret
```

`frontend/.env` (optional):

```dotenv
VITE_API_BASE_URL=http://localhost:5000
```

`CORS_ORIGIN` accepts a comma-separated list. Add every origin that should be allowed to call the API.

## Data model

The backend creates two tables automatically:

| Table | Columns | Purpose |
| --- | --- | --- |
| `contacts` | `id`, `name`, `email`, `message`, `created_at` | Contact form submissions |
| `profile` | `id`, `data` | Optional JSON profile override; falls back to built-in profile data |

## Contact flow

1. The React form validates required fields in the browser.
2. It sends `{ name, email, message }` as JSON to `${VITE_API_BASE_URL}/api/contact`.
3. Flask validates name length, email shape, and message length.
4. Valid messages are inserted into `contacts` with an ISO timestamp.
5. The API returns `{ status: "success", message: "..." }`; the UI shows a confirmation state.
6. Errors are displayed below the submit button.

## Admin messages

```powershell
curl.exe -H "Authorization: Bearer change-me-in-production" http://localhost:5000/api/admin/messages
```

Use a strong `SECRET_KEY` in any non-local environment. The current scheme is intentionally simple for a portfolio demo.

## Verification evidence (2026-11-09)

Environment: Node.js 24.18.0, Python 3.12, local Flask development server.

| Check | Result |
| --- | --- |
| `npm ci` in `frontend/` | Passed |
| `npm run build` (`tsc -b && vite build`) | Passed |
| Preview `/` | 200 |
| Built JS/CSS/Three.js assets | 200 |
| Routes `/admin`, `/projects`, `/about`, `/contact` | 200 |
| Flask `/health` | 200 |
| Flask `/api/profile` | 200 |
| CORS preflight from `http://localhost:4178` | 200 with matching `Access-Control-Allow-Origin` |
| `POST /api/contact` | 200, row inserted |
| `GET /api/admin/messages` with bearer secret | 200 |
| Verification row cleanup | Deleted |

## Known limitations

- No automated frontend or backend tests.
- Contact form submission is real, but no email notification is sent.
- Admin authentication is a shared bearer secret rather than per-user login.
- Profile data is partly hard-coded in the frontend; the Flask `/api/profile` endpoint is available but the current UI uses local data.
- The Three.js bundle is large and may benefit from further code splitting.

## Deployment notes

- Build the frontend with `npm run build` and serve `frontend/dist/` from a static host.
- Run the Flask API with a production WSGI server (for example Gunicorn or Waitress) instead of the development server.
- Set `CORS_ORIGIN` to the deployed frontend URL and use a strong `SECRET_KEY`.
- Persist `portfolio.db` outside the deployment artifact or migrate to a managed database if messages must survive redeploys.
