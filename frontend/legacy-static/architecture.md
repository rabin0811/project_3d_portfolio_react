# Architecture: Anime Portfolio

## App Flow & Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Client)                      │
│  ┌─────────────────────────────────────────────────────┐│
│  │  index.html (SPA shell, semantic HTML5 sections)    ││
│  │  ├── css/                                           ││
│  │  │   ├── base.css    (reset, variables, @layer)     ││
│  │  │   ├── layout.css  (grid, sections, scroll-snap)  ││
│  │  │   ├── anime.css   (character, transitions, fx)   ││
│  │  │   └── components.css (navbar, cards, contact)    ││
│  │  ├── js/                                            ││
│  │  │   ├── main.js       (app init, scroll mgr)       ││
│  │  │   ├── animations.js (GSAP timelines, triggers)   ││
│  │  │   ├── walk-cycle.js (character render, FSM)      ││
│  │  │   ├── background.js (canvas loops, particles)    ││
│  │  │   └── api.js        (fetch to Python backend)    ││
│  │  └── assets/ (sprites, backgrounds, icons)          ││
│  └─────────────────────────────────────────────────────┘│
└────────────────────────┬────────────────────────────────┘
                         │ REST / JSON (fetch API)
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Python Backend (Flask/FastAPI)              │
│  └── app.py         (routes, CORS, error handlers)      │
│  └── controllers/   (business logic per feature)        │
│  └── models/        (dataclass / Pydantic models)       │
│  └── services/      (email, contact, portfolio)         │
│  └── config.py      (env vars, settings)                │
│  └── requirements.txt                                   │
└─────────────────────────────────────────────────────────┘
```

## Folder & File Structure

```
portfolio/
├── index.html
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── anime.css
│   └── components.css
├── js/
│   ├── main.js
│   ├── animations.js
│   ├── walk-cycle.js
│   ├── background.js
│   └── api.js
├── assets/
│   ├── sprites/
│   ├── backgrounds/
│   └── icons/
├── backend/
│   ├── app.py
│   ├── controllers/
│   │   ├── __init__.py
│   │   └── contact_controller.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── contact.py
│   ├── services/
│   │   ├── __init__.py
│   │   └── email_service.py
│   ├── config.py
│   └── requirements.txt
└── README.md
```

## Tech Stack

| Layer     | Technology                                                              |
|-----------|-------------------------------------------------------------------------|
| Frontend  | Vanilla HTML5 + CSS3 (custom properties, @layer, scroll-snap, container queries) + ES6+ JS (modules, no frameworks) |
| Animation | GSAP + ScrollTrigger plugin (https://gsap.com)                          |
| Backend   | Python 3.11+ with Flask (lightweight) or FastAPI (async)                |
| Contact   | smtplib (email) or SQLite + SQLAlchemy for persistence                  |
| Dev Tools | Live Server (VSCode extension), python venv, ESLint + Prettier configs  |

## Data Flow

1. User scrolls → CSS `scroll-snap` snaps to nearest section
2. `IntersectionObserver` fires → dispatches active-section event
3. GSAP ScrollTrigger reads scroll progress → maps to walk cycle frames
4. GSAP timeline triggers zoom-out transition between sections
5. Canvas background loop runs independently via `requestAnimationFrame`
6. Contact form submit → `api.js` POSTs JSON → Flask/FastAPI validates + processes → returns JSON success/error
