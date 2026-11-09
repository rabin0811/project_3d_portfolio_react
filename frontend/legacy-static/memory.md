# Memory & Session Log

## Completed Tasks

### Phase 1 — Setup & Foundation ✅
- [x] Initialize project directory structure (folders, index.html, CSS layers, JS modules)
- [x] Create `index.html` — semantic HTML5 with 5 sections (Home, About, Skills, Projects, Contact), navbar, scroll-snap container, GSAP CDN, meta/OG tags from old portfolio
- [x] Create `base.css` — CSS reset, custom property design tokens (colors, fonts, spacing, shadows, transitions), `@layer` declaration, fluid typography scale, selection styling, skip-link
- [x] Create `layout.css` — fixed navbar with backdrop-blur, `scroll-snap-type: y mandatory` on sections container, responsive hamburger menu, about-grid layout, avatar frame, footer
- [x] Create `components.css` — gradient buttons, skill cards with animated bars, project cards with SVG thumbnails, contact form with validation states, toast notifications, social links, responsive grid
- [x] Create `anime.css` — SVG character container with walk cycle keyframes (arm swing, leg step, blink), FSM idle/walking states, glitch text effect, `prefers-reduced-motion` guard
- [x] Create `main.js` — ES6 module entry point, IntersectionObserver for section detection, navbar `aria-current` sync, nav toggle, scroll hint fade, cleanup hook
- [x] Set up Python Flask backend scaffold — `app.py` with health check, CORS, SQLite contact form persistence, `config.py` with .env loading, `requirements.txt`
- [x] Create `.gitignore` and `.env` template

### Phase 2 — Core Features & Animations ✅
- [x] **Background (`background.js`)** — Python code rain canvas animation. 120+ real Python snippets including:
  - Hello World & basic I/O
  - Data structures (lists, dicts, sets, stacks, queues, BST)
  - Sorting algorithms (bubble, quick, merge, insertion)
  - Machine learning (linear regression, k-means, SVM, random forest, gradient descent, sigmoid)
  - Neural network (PyTorch Linear layers, CrossEntropyLoss, Adam)
  - Flask web framework routes
  - Graph algorithms (BFS, Dijkstra)
  - Decorators, dataclasses, generators, comprehensions
  - Color-coded tokens (keywords purple, strings green, numbers pink, decorators lilac, comments gray, bright white for leader drops)
  - Tail effect with fade, leader drops highlighted, DPR-aware canvas
- [x] **Walk Cycle (`walk-cycle.js`)** — SVG anime character FSM (IDLE → WALKING → STOPPING → IDLE). GSAP ScrollTrigger scrub drives horizontal position. `getVelocity()` maps scroll speed to animation state. Character arms/legs swing via CSS keyframes, frozen on idle.
- [x] **Zoom-out Transitions (`animations.js`)** — GSAP timeline per section: previous section scales 1→1.12 + opacity fade + blur, overlay flash, next section scales 1.12→1 + opacity fade-in + unblur. Content fade-in on scroll via ScrollTrigger.
- [x] **About section** — real bio: "Computer Engineering Student and Full Stack Developer from Nepal", stats counter placeholders, SVG avatar
- [x] **Skills section** — 8 skill cards (Python 90%, React 88%, Node.js 85%, JS/ES6+ 82%, MongoDB/SQL 80%, Docker/Cloud 78%, TypeScript 75%, React Native 72%) with animated progress bars via IntersectionObserver
- [x] **Projects section** — 3 filterable cards (Portfolio, API Forge, React Dashboard) with SVG thumbnails and tag chips, filter buttons (All / Web / API / Full Stack)
- [x] **Contact section** — validated form (name, email, message) with inline errors, loading spinner, toast notifications, social links (GitHub rabin0811, LinkedIn, Facebook, Instagram)
- [x] **Contact API (`api.js`)** — `fetch` POST to Flask backend with loading state, error handling, auto-dismiss toast
- [x] **Backend (`app.py`)** — `POST /api/contact` validates and stores in SQLite, `GET /api/admin/messages` Bearer auth, `GET /health`

### Phase 3 — Polish (In Progress)
- [ ] Responsive polish — test mobile touch scroll-snap, tablet breakpoints
- [ ] Performance audit — 60fps verification, reduced-motion path
- [ ] Admin view — password-protected contact message viewer
- [ ] Accessibility pass — keyboard nav, focus management, ARIA live regions, color contrast

---

## Content Extracted from Old Portfolio

| Field | Value |
|-------|-------|
| Name | Rabin Humagain |
| Title | Full Stack Developer |
| Bio | Computer Engineering Student and Full Stack Developer from Nepal |
| GitHub | https://github.com/rabin0811 |
| LinkedIn | https://www.linkedin.com/in/rabin-humagain-417a35410 |
| Facebook | https://facebook.com/rabin.humagai |
| Instagram | https://instagram.com/__ra_bin__ |
| Old Site | https://rabin-portfolio-jade.vercel.app (React + Vite + Tailwind) |
| Old Backend | https://rabin-portfolio-backend.onrender.com |
| Theme | Dark (#0f0f0f), Red Primary (#dc2626), Font: Poppins |
| Admin Routes | /admin/dashboard, /admin/blogs, /admin/projects, /admin/gallery, /admin/resumes, /admin/messages |

---

## Architecture Notes

- **Background:** Canvas-based Python code rain. Drops are real code snippets (ML, sorting, web, data structures). Color-tokenized. Tail fades behind leader. `requestAnimationFrame` at 60fps.
- **Character:** SVG anime figure. Walk position driven by GSAP ScrollTrigger. FSM via scroll velocity. CSS keyframe animations for limbs.
- **Transitions:** Zoom-out with blur → overlay flash → zoom-in on next section. Content fade-in per section.
- **Backend:** Flask + SQLite. Contact form persisted. Admin endpoint with Bearer token.
