# project_3d_portfolio_react

## 3D Portfolio (React + Flask)

An animated 3D personal portfolio built with React 19, Vite, Three.js, React Three Fiber, Framer Motion, and Tailwind CSS. A small Flask API stores contact messages in SQLite.

- Original location: `D:\projects\rabin\3d`
- Working copy: `D:\PROJECTS_READY\project_3d_portfolio_react`
- Frontend: React 19, Vite 8, Three.js, React Three Fiber, Tailwind CSS 4
- Backend: Flask 3, Flask-CORS, SQLite

## Folder layout

```text
project_3d_portfolio_react/
  frontend/             React/Vite application and production build
    legacy-static/      Earlier static version of the portfolio
  backend/              Flask API, templates, SQLite database, seed script
  database/             Database reference copy and notes
  docs/                 Technical and legacy documentation
  .venv/                Local Python virtual environment (ignored by Git)
```

## Setup

### Backend

```powershell
cd backend
..\.venv\Scripts\python.exe -m pip install -r requirements.txt
Copy-Item .env.example .env
..\.venv\Scripts\python.exe app.py
```

The API starts on <http://localhost:5000> by default. `backend/.env` controls `PORT`, `DATABASE_URL`, `CORS_ORIGIN`, and `SECRET_KEY`.

### Frontend

```powershell
cd frontend
npm ci
npm run dev
```

For a production preview:

```powershell
npm run build
npm run preview
```

The contact form calls `VITE_API_BASE_URL` (default `http://localhost:5000`). Set it in `frontend/.env` if the API runs elsewhere.

## Verified status (2026-11-09)

- [x] Frontend dependencies installed and production build passed (`tsc -b && vite build`)
- [x] Preview server served `/` with HTTP 200
- [x] Built JavaScript, CSS, and Three.js chunks returned HTTP 200
- [x] Client-side routes `/admin`, `/projects`, `/about`, and `/contact` returned HTTP 200
- [x] Flask backend started and `/health` returned HTTP 200
- [x] `/api/profile` returned profile data
- [x] CORS preflight from `http://localhost:4178` succeeded
- [x] Contact form POST to `/api/contact` returned HTTP 200 and stored a SQLite row
- [x] `/api/admin/messages` returned stored messages with the configured bearer secret
- [x] Verification message removed after the test

No automated test suite is included. Verification covered the production build, preview assets, API health, CORS, and a real contact submission.

## API overview

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| `GET` | `/health` | No | Health check |
| `GET` | `/api/profile` | No | Portfolio profile data |
| `POST` | `/api/contact` | No | Validate and store a contact message |
| `GET` | `/api/admin/messages` | `Authorization: Bearer <SECRET_KEY>` | List stored contact messages |
| `GET` | `/admin` | No | Flask-rendered admin message page |

## Notes and limitations

- Contact messages are stored in `backend/portfolio.db`; the SQLite file is ignored by Git.
- The frontend contact form now calls the Flask API instead of only simulating success.
- The admin message endpoint uses `SECRET_KEY` directly as a bearer token. This is a demo-level authentication scheme; use real sessions or an identity provider in production.
- The Three.js bundle is large (about 3.5 MB uncompressed); use code splitting or a CDN if deployment size matters.
- The `frontend/legacy-static/` folder is retained for reference and is not part of the React build.
- SMTP settings exist in the backend config but the current app stores messages rather than emailing them.

## Troubleshooting

- **Contact form shows an error**: confirm the Flask API is running on port 5000 and that `VITE_API_BASE_URL` matches it.
- **CORS error**: add the frontend origin to `CORS_ORIGIN` in `backend/.env` (comma-separated).
- **Port 5000 in use**: change `PORT` in `backend/.env` and set `VITE_API_BASE_URL` in `frontend/.env` to the same port.
- **SQLite errors**: ensure `backend/` is writable; the database and tables are created automatically on first request.
- **Blank page from `dist/index.html`**: serve the build over HTTP (`npm run preview`), not with `file://`.
