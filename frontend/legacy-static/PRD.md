# PRD: Anime Portfolio Website

## What to Build (Core Goal)
A single-page portfolio website showcasing the developer's identity, skills, and projects through immersive anime-aesthetic UI with canvas-driven background loops, a scroll-synced character walk animation, and cinematic zoom-out section transitions — backed by a Python MVC backend for contact form processing.

## Target Users
- Recruiters and hiring managers
- Potential freelance clients
- Collaborators and peers
- The developer (as a living digital resume)

## Key Features

### 1. Anime Background Loops
- Hero and section backgrounds feature lightweight canvas/WebGL looping animations (floating particles, sakura petals, energy trails)
- Consistent 60fps performance via requestAnimationFrame
- Pause when section is off-screen using IntersectionObserver

### 2. Scroll-Driven Walk Animation
- An anime character sprite/vector appears on scroll
- Walk cycle syncs steps to scroll velocity (start → walk → freeze)
- FSM-driven states: IDLE → WALKING → STOPPING → IDLE
- Powered by GSAP ScrollTrigger mapping scroll progress to animation frames

### 3. Zoom-Out Section Transitions
- Each vertical section change triggers a cinematic zoom-out
- Current section scales from 1.0 → 1.15 + opacity 0
- Next section scales from 1.15 → 1.0 + opacity 1
- All transitions use GPU-composited `transform` properties only

### 4. MVC Backend (Python)
- Flask/FastAPI REST API routes
- Contact form: POST → validate → send email or store in SQLite
- Serve portfolio content via JSON endpoints
- Lightweight admin panel (Phase 3)

### 5. Semantic HTML5 Sections
- `<header>` with sticky nav
- `<section id="home">` — hero with background canvas + tagline
- `<section id="about">` — bio, timeline, personality
- `<section id="skills">` — animated progress bars / icon grid
- `<section id="projects">` — filterable project cards
- `<section id="contact">` — validated form + social links
- `<footer>` with credits

### 6. Performant CSS + JS Architecture
- Pure CSS with `@layer` cascade, custom properties, no preprocessors
- ES6 modules, `IntersectionObserver`, debounced handlers
- GSAP + ScrollTrigger for animation orchestration
- GPU-composited animations, `will-change` hints, `contain` where applicable
