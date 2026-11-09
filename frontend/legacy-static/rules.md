# Rules & Conventions

## What to Use
- Semantic HTML5 landmarks (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`) with ARIA attributes (`aria-label`, `role`, `aria-current`)
- CSS custom properties for ALL design tokens — single `:root` block in `base.css`, no hardcoded colors/units elsewhere
- `@layer` cascade: `base → layout → components → anime`
- ES6 modules (`<script type="module">`) — no IIFE or global scope pollution
- `IntersectionObserver` for lazy-loading sections and triggering GSAP timelines
- `requestAnimationFrame` for all custom canvas/animation loops — never `setInterval`
- Python type hints on all backend route handlers and service functions
- Pydantic (FastAPI) or `dataclasses` (Flask) for request validation
- Environment variables via `.env` for secrets (SMTP creds, DB URIs)
- Fetch API with async/await + try/catch for all HTTP calls

## What to Avoid
- No jQuery, Bootstrap, Tailwind, or any CSS framework
- No `setInterval` / `setTimeout` for rendering or animation frames
- No `window.onscroll` — use GSAP ScrollTrigger or debounced IntersectionObserver
- No monolithic JS files — one concern per module (animations.js, walk-cycle.js, etc.)
- No hardcoded breakpoints — use `clamp()`, `min()`, `max()` for fluid typography/spacing
- No inline styles or `!important` (except documented utility overrides)
- No `alert()`, `confirm()`, or `prompt()` in production code
- No synchronous `XMLHttpRequest` — only `fetch()` with proper error handling
- No external CDN fonts without fallback — self-host or use system font stack
- No `@import` in CSS files (causes render-blocking) — use `<link>` in HTML head

## Boundaries for AI

### State Management
- Walk animation must use a finite state machine: IDLE → WALKING → STOPPING → IDLE
- Scroll velocity drives FSM transitions, not scroll position alone
- Canvas background loops run independently via rAF — never tied to scroll events directly

### Animations
- Zoom-out transitions must use `transform: scale()` + `opacity` only (GPU-composited)
- No layout-triggering properties during transitions (no width/height/top/left/margin)
- All GSAP timelines must include `markers: false` in production
- Max 3 simultaneous canvas background loops; pause others when off-screen

### Backend
- All contact form data validated client-side (HTML5 constraint API + custom JS) AND server-side
- Backend routes return JSON only (no server-rendered HTML)
- CORS restricted to the portfolio's origin in production
- SMTP credentials loaded from environment variables only — never hardcoded

### Code Quality
- Every JS module exports a clean API (init, destroy, update)
- Every CSS layer documents its purpose in a comment block
- Every Python function has a docstring
- Error boundaries: all fetch calls have `.catch()` or try/catch with user-facing fallback
