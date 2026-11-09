# Design System

## Color & Theme

| Token                 | Hex / Value          | Usage                                |
|-----------------------|----------------------|--------------------------------------|
| `--color-primary`     | `#6C5CE7`            | Brand color, buttons, links          |
| `--color-secondary`   | `#FD79A8`            | Accent highlights, scrollbar thumb   |
| `--color-bg`          | `#0F0A1E`            | Main background (deep purple-black)  |
| `--color-surface`     | `#1A1230`            | Card / section backgrounds           |
| `--color-text`        | `#E8E0F0`            | Body text                            |
| `--color-muted`       | `#8B7F9E`            | Secondary text, captions             |
| `--color-accent-glow` | `rgba(108,92,231,0.3)`| Glow effects on canvas particles    |
| `--color-success`     | `#00B894`            | Success states, toast notifications  |
| `--color-error`       | `#FF6B6B`            | Error states, validation messages    |

## Fonts & Typography

| Usage       | Font Stack                                    |
|-------------|-----------------------------------------------|
| Headings    | `'Orbitron', system-ui, sans-serif`           |
| Body        | `'Inter', system-ui, sans-serif`              |
| Monospace   | `'JetBrains Mono', 'Cascadia Code', monospace`|

### Type Scale

```
h1: clamp(2.5rem, 6vw, 4.5rem) | weight 900 | letter-spacing 0.05em | uppercase
h2: clamp(2rem, 4vw, 3rem)     | weight 700 | letter-spacing 0.02em
h3: clamp(1.25rem, 2.5vw, 1.75rem) | weight 600
body: 1rem / 1.6 line-height   | weight 400
small / caption: 0.875rem      | weight 300 | color var(--color-muted)
```

## Spacing Scale

```
--space-xs: 0.25rem
--space-sm: 0.5rem
--space-md: 1rem
--space-lg: 2rem
--space-xl: 4rem
--space-2xl: 8rem
```

## Border Radius

```
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 16px
--radius-full: 9999px
```

## Shadows & Glows

```
--shadow-sm: 0 2px 8px rgba(0,0,0,0.3)
--shadow-md: 0 4px 16px rgba(0,0,0,0.4)
--shadow-lg: 0 8px 32px rgba(0,0,0,0.5)
--shadow-glow: 0 0 20px var(--color-accent-glow)
```

## Transitions & Animation

```
--transition-fast: 150ms ease
--transition-base: 300ms ease
--transition-slow: 500ms ease
--transition-zoom: 800ms cubic-bezier(0.4, 0, 0.2, 1)
```
