# Rabin Humagain — Portfolio

Anime-themed single-page portfolio featuring a seamless looping cybersecurity HUD canvas background, scroll-driven character walk animation, and zoom-out section transitions.

## Architecture

```
├── index.html          # Semantic HTML5 with all sections
├── css/
│   ├── base.css        # Reset, custom properties, typography
│   ├── layout.css      # Grid, scroll-snap, navbar, canvas, responsive
│   ├── components.css  # Buttons, cards, forms, skill bars, projects
│   └── anime.css       # Character animation, glitch effect, reduced-motion
├── js/
│   ├── main.js         # Entry point, section observer, nav toggle, theme
│   ├── background.js   # HUD canvas renderer (seamless 12s loop)
│   ├── animations.js   # GSAP zoom-out transitions per section
│   ├── walk-cycle.js   # Scroll-driven character FSM via ScrollTrigger
│   ├── api.js          # Contact form validation + fetch to backend
│   └── components.js   # Skill bar animation, project filter + keyboard nav
└── backend/
    ├── app.py           # Flask server: contact API, admin page, health
    ├── config.py        # Env-based settings
    ├── requirements.txt
    ├── templates/
    │   └── admin.html   # Admin panel for viewing contact messages
    └── controllers/     # Route handlers
```

## Setup

### Frontend

Serve the root directory with any HTTP server:

```bash
npx serve . -p 5500
```

Or use VS Code Live Server.

### Backend

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate    # Windows
pip install -r requirements.txt
python app.py              # Runs on :5000
```

Configure `.env` in the project root:

```
SECRET_KEY=change-me-in-production
CORS_ORIGIN=http://localhost:5500
DATABASE_URL=sqlite:///portfolio.db
```

## Features

- **Cybersecurity HUD background** — C kernel code scroll, metallic padlock, circular dials, ECG pulse, bar chart, waveforms, grid, coordinate crosses. Seamless 12s loop with smooth crossfade at loop boundary.
- **Light/dark theme** — Toggle persisted in `localStorage`, canvas adapts colors per frame.
- **Character walk** — SVG character with CSS animation, controlled by scroll velocity via ScrollTrigger.
- **Zoom-out transitions** — GSAP-powered scale+blur transition between sections.
- **Contact form** — Validated with inline errors, sends to Flask + SQLite. Toast notification with `aria-live`.
- **Project filter** — Tab-based with full keyboard navigation (arrow keys, Home, End).
- **Admin panel** — `localhost:5000/admin`, Bearer token auth, view all contact submissions.
- **Mobile responsive** — Three breakpoints: mobile (<600px), tablet (600–899px), desktop (900px+). All HUD elements reposition/scaled per viewport.
- **Accessibility** — Skip link, `aria-current` nav, `aria-live` regions, `inert` during transitions, `prefers-reduced-motion` support.

## Technology

- **Frontend:** HTML5, CSS `@layer`, custom properties, ES6 modules, GSAP + ScrollTrigger
- **Backend:** Python Flask, SQLite, Bearer token auth
- **No build step** — plain files served over HTTP
