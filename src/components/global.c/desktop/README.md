# Global Desktop Components

This directory hosts the desktop-first implementations of the global component set. Each module mirrors the original `global.c` behaviour but is now separated so the build system can target desktop and mobile variants independently.

- `card.js` – Feature-rich project card implementation.
- `footer.js` – Multi-column footer with social and legal sections.
- `navbar.js` – Fixed-height navigation with responsive fallback.
- `navbar-example.html` – Standalone usage example for the navbar module.
- `svg-card.js` – SVG showcase card used across marketing surfaces.
- `ticker.js` – Shared ticker base class that renders a compact panel on desktop and powers the mobile overlay variant.

When adding new components ensure both desktop and mobile variants remain in sync, even if one simply wraps the other. Keeping contracts aligned allows the build tooling to output predictable assets for every domain target.