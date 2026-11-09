# Phases

## Phase 1: Setup & Foundation ✅
- [x] Initialize project directory structure (folders, index.html, CSS layers, JS modules)
- [x] Create `index.html` with semantic HTML5 landmarks, meta tags, social preview, link to all CSS + JS
- [x] Create `base.css` — CSS reset, custom properties (`:root`), fluid typography scale, `@layer` declaration
- [x] Create `layout.css` — full-screen vertical sections grid, `scroll-snap-type: y mandatory`, sticky navbar, responsive breakpoints
- [x] Create `main.js` — module entry point, scroll snap detection, section dispatch events
- [x] Create `components.css` — navbar, section cards, skill bars, project cards, contact form base styles
- [x] Create `anime.css` — character container, transition overlays, glow/keyframe decorations
- [x] Set up Python virtual environment + Flask scaffold with CORS, health-check endpoint
- [x] Create `backend/config.py` with .env loading
- [x] Create `backend/requirements.txt`

> *No authentication needed for a public portfolio. Admin panel deferred to Phase 3.*

## Phase 2: Core Features ✅
- [x] Implement `background.js` — **Python code rain**: 120+ real code snippets (hello world, sorting algorithms, ML (linear regression, k-means, SVM, random forest, neural network), Flask routes, graph algorithms, dataclasses, generators), color-tokenized rendering, tail fade effect, leader highlights, DPR-aware canvas via `requestAnimationFrame`
- [x] Implement `walk-cycle.js` — SVG character FSM (IDLE → WALKING → STOPPING → IDLE), GSAP ScrollTrigger mapping scroll velocity to animation state
- [x] Implement `animations.js` — zoom-out timeline: current section scale(1 → 1.12) + opacity(0) + blur → overlay flash → next section scale(1.12 → 1) + opacity(1) + unblur; content fade-in per section
- [x] Build Home section — hero with name, tagline, subtitle, CTA buttons, background code rain canvas, character, scroll hint
- [x] Build About section — bio, stats, SVG avatar
- [x] Build Skills section — 8 animated skill bars with IntersectionObserver
- [x] Build Projects section — 3 filterable project cards with SVG thumbnails
- [x] Build Contact section — validated form with toast, social links (GitHub, LinkedIn, Facebook, Instagram)
- [x] Implement `api.js` — fetch wrapper with loading spinner, inline validation, toast system
- [x] Build Flask backend — POST `/api/contact` with SQLite persistence, GET `/api/admin/messages` with Bearer auth
- [x] Populate content from old portfolio (name, bio, skills, social links, SEO meta, OG tags)
- [x] Integrate GSAP via CDN

## Phase 3: Polishing & Context Logs (In Progress)
- [ ] Responsive design pass — test mobile (touch scroll-snap), tablet, desktop; adjust breakpoints
- [ ] Performance audit — verify 60fps in Chrome DevTools; reduce drop count on low-end devices / reduced motion preference
- [ ] Add `will-change: transform` and `contain: layout style` on animated sections
- [ ] Lazy-load section content with IntersectionObserver fade-in (already implemented)
- [ ] Lightweight admin route — password-protected single page to view contact form submissions (Flask-BasicAuth or simple token)
- [ ] Accessibility pass — keyboard navigation, focus management during zoom transitions, color contrast ratio validation, screen reader testing (ARIA live regions for dynamic content)
- [ ] Add console.debug logs with section/event markers for future AI editing sessions
- [ ] Optional: light/dark theme toggle using CSS custom properties + localStorage
- [ ] README.md with setup instructions, architecture overview, credits
