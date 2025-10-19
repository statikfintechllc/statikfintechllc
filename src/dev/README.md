# Development Hub

PWA launcher and development portal (dev.sfti-ai.org)

## Overview

Central hub for:
- Launching PWA applications
- Development tools
- System status monitoring
- Application management

## Structure

- `index.html` - Hub entry point
- `dev.styles/` - Development hub styles
- `components/` - Dev hub components
- `lib/` - Utility libraries
- `public/` - Dev-specific assets

### PWA Applications

- **[IB-G.Scanner/](IB-G.Scanner/)** - Stock market scanner (React + TypeScript + Vite)
- **[Pilot-Server/](Pilot-Server/)** - AI chat interface (React + TypeScript + Vite)

## Features

- PWA application launcher
- System status dashboard
- Real-time metrics
- Application cards with status indicators
- Responsive terminal-style UI

## Development

```bash
# Development hub
open index.html

# IB-G.Scanner PWA
cd IB-G.Scanner
npm install
npm run dev  # Runs on http://localhost:5000

# Pilot-Server PWA
cd Pilot-Server
npm install
npm run dev  # Runs on http://localhost:4173
```

## PWA Applications

Each PWA has its own:
- Build configuration (vite.config.ts)
- TypeScript setup (tsconfig.json)
- React components
- Independent deployment

See individual PWA directories for details.

## Components

- Desktop and mobile navbars
- Footer components
- PWA launcher cards
- Status indicators
- Metrics displays

## Related

- [Main README](../../README.md) - Project overview
- [src/manifest.json](../manifest.json) - PWA configuration
- [IB-G.Scanner/README.md](IB-G.Scanner/README.md) - Scanner app docs
- [Pilot-Server/README.md](Pilot-Server/README.md) - Pilot Server docs
