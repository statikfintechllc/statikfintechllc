# Global Mobile Components

Mobile-first wrappers for the SFTi component suite. Each module extends the desktop implementation with viewport-friendly defaults such as reduced padding, single-column layouts, or immersive navigation shells.

Available modules:

- `card.js` – Shrinks spacing and width for handheld layouts.
- `footer.js` – Collapses footer sections into stacked blocks.
- `navbar.js` – Presents a full-screen drawer experience.
- `navbar-example.html` – Usage snippet demonstrating load order.
- `svg-card.js` – Mobile-friendly SVG showcase tile.
- `ticker.js` – Overlay ticker that extends the shared desktop base.

Scripts in this directory assume the matching desktop variant has already been loaded so they can safely extend the base class without duplicating logic. Ensure `<script>` tags include the desktop component before the mobile one when used in standalone contexts.