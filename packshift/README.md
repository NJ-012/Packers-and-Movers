# PackShift — Packers & Movers Landing Page

A bold, industrial-brutalist landing page for a Packers & Movers company. Built with vanilla HTML, CSS, and JavaScript — zero dependencies, zero build tools. Open `index.html` in a browser and it works.

## Design Direction

**Industrial Brutalist** — Heavy typography, raw orange/black/cream palette, grain overlay, oversized numbers. Designed to stand out in a sea of generic moving company websites.

- **Palette:** `#ff6b00` orange / `#0d0d0d` black / `#f5f0e8` cream
- **Fonts:** Bebas Neue (display) · DM Serif Display (italic accent) · Syne (body)
- **Vibe:** Freight company meets editorial magazine

## Features

- ✅ Fully responsive (mobile / tablet / desktop)
- ✅ Custom cursor with lag effect
- ✅ Animated SVG truck with road, smoke, and floating stats
- ✅ Scroll-triggered reveal animations (IntersectionObserver)
- ✅ Service card tilt effect on hover
- ✅ Infinite marquee ticker (pauses on hover for a11y)
- ✅ Sticky navbar with blur on scroll + active link highlighting
- ✅ Mobile hamburger menu with smooth slide
- ✅ Parallax hero background text
- ✅ Counter animation on stat cards
- ✅ Contact form with real-time inline validation
- ✅ Grain texture overlay for atmosphere
- ✅ SEO-optimised HTML (meta tags, semantic elements, aria labels)
- ✅ Respects `prefers-reduced-motion`
- ✅ Zero JS libraries — pure vanilla

## Sections

1. **Navbar** — Logo, nav links, CTA button, mobile menu
2. **Hero** — Headline, subtext, animated truck SVG, floating stat cards
3. **Marquee** — Scrolling service ticker
4. **Services** — 6 service cards (Home Shifting, Office Relocation, Vehicle Transport, Storage, International Moving, Premium Packing)
5. **Why Us** — 4 trust points + badges
6. **Contact Form** — Name, Phone, Service dropdown, From/To cities, Notes, validated submit
7. **Footer** — Brand, social links, service/company/city columns, legal

## File Structure

```
packshift/
├── index.html    ← Full page structure + SEO meta
├── style.css     ← All styles, CSS variables, animations, responsive
├── script.js     ← All interactions, validation, observers
├── favicon.svg   ← Orange PS logo
└── README.md
```

## How to Run

```bash
# Option 1 — just open the file
open index.html

# Option 2 — local server (avoids font CORS issues)
npx serve .
# or
python3 -m http.server 8080
```

## Customisation

All colours and fonts are CSS variables at the top of `style.css`:
```css
:root {
  --orange: #ff6b00;
  --black:  #0d0d0d;
  --cream:  #f5f0e8;
  --font-display: 'Bebas Neue', sans-serif;
}
```

To connect the contact form to a real backend, replace the `await new Promise(...)` mock in `script.js` section 8 with a `fetch('/api/contact', { method: 'POST', body: formData })` call.

## SEO

- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<footer>`, `<article>`, `<nav>`)
- Descriptive `aria-label` on all interactive elements
- `alt` text on all images
- Open Graph meta tags
- Descriptive `<title>` and `<meta name="description">`
- Clean heading hierarchy (h1 → h2 → h3)

## Browser Support

Chrome, Firefox, Safari, Edge — all modern browsers. IE not supported.
