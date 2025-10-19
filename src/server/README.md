# Server Portal

Secure server access portal (server.sfti-ai.org)

## Overview

Authentication and management portal for:
- User account management
- Server access control
- Secure login and registration
- Administrative functions

## Structure

- `index.html` - Portal entry point
- `server.styles/` - Server-specific styles
- `components/` - Server UI components
- `lib/` - Server utilities

## Features

- Secure authentication
- User profile management
- Password reset functionality
- Session management
- PWA support via shared manifest

## Development

```bash
# Open in browser
open index.html

# Or use a local server
python -m http.server 8000
```

## Components

- Desktop and mobile navbars
- Footer components
- Login/registration forms
- Profile management UI

## Security

- HTTPS required for production
- Secure session handling
- Password encryption
- CSRF protection

## Related

- [Main README](../../README.md) - Project overview
- [src/manifest.json](../manifest.json) - PWA configuration
- [src/components/server/](../components/server/) - Server components
