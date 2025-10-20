# Public Assets

Shared static assets for all StatikFinTech LLC domains and applications.

## Contents

### Icons (PWA/Favicon)
- `favicon.ico` - Legacy browser icon (32x32)
- `favicon.png` - High-resolution favicon (1024x1024)
- `icon-16x16.png` through `icon-512x512.png` - Complete icon set for all devices

### Background Images
- `web.hero.bkg.png` - Hero section background
- `web.projects.bkg.png` - Projects section background
- `web.contact.bkg.png` - Contact section background

### App Icon
- `web.pwa.icon.png` - PWA screenshot/preview image

## Icon Sizes

All icon sizes are defined in `/src/manifest.json`:
- 16x16, 32x32 - Browser favicons
- 72x72, 96x96, 128x128, 144x144 - Android devices
- 152x152, 180x180 - iOS devices
- 192x192, 384x384, 512x512 - PWA app icons (maskable)

## Usage

These assets are referenced by:
- PWA manifest (`/src/manifest.json`)
- All HTML files (via manifest)
- CSS files (background images)

## Format

- Icons: PNG format, optimized for web
- Backgrounds: PNG format with transparency support
- ICO: Legacy favicon format

## Related

- [/src/manifest.json](../manifest.json) - PWA configuration
- [Main README](../../README.md) - Project overview
