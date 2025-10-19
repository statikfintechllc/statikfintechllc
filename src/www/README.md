# WWW - Main Website

Main StatikFinTech LLC website (www.sfti-ai.org)

## Overview

The primary marketing and showcase website featuring:
- Company overview and mission
- Project portfolio
- Research papers and publications
- Contact information
- Integrated carousels and dynamic content

## Structure

- `index.html` - Main entry point
- `www.styles/` - Stylesheets and design system
- `components/` - WWW-specific components
- `lib/` - JavaScript libraries and utilities
- `public/` - WWW-specific assets

## Features

- Responsive design (mobile and desktop)
- Scroll effects and animations
- Project carousels
- Research paper showcase
- GitHub integration
- PWA support via shared manifest

## Development

```bash
# Open in browser
open index.html

# Or use a local server
python -m http.server 8000
```

## Components

- Desktop navbar with integrated ticker
- Mobile navbar with ticker integration
- Footer with social links
- Carousel components for projects
- Modal popups for details

## Styling

Uses:
- Tailwind CSS (via CDN)
- Custom CSS in `www.styles/`
- Scroll effects via `www.scrollFX.js`

## Related

- [Main README](../../README.md) - Project overview
- [src/manifest.json](../manifest.json) - PWA configuration
- [src/components/www/](../components/www/) - WWW components
