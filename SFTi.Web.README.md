# SFTi Web Templates

**Modern Web Template System** for StatikFinTech LLC's Multi-Domain Infrastructure

[![Built with Shadcn/UI](https://img.shields.io/badge/UI-shadcn%2Fui-black?style=for-the-badge&logo=radixui&logoColor=white)](https://ui.shadcn.com/)
[![Styled with Tailwind CSS](https://img.shields.io/badge/CSS-Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Built with TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

## Overview

This repository contains a **unified design system** and professionally crafted web templates for StatikFinTech LLC's three-domain architecture. Built with modern web standards, featuring **shadcn/ui components**, **Tailwind CSS styling**, and **Progressive Web App** capabilities.

## 🏗️ Architecture & Design System

### Core Technologies

- **UI Framework**: [shadcn/ui](https://ui.shadcn.com/) with Radix UI primitives
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with utility-first approach
- **Framework**: React 19 with TypeScript for enhanced type safety
- **Build Tool**: Vite 6+ for lightning-fast development
- **PWA**: Service Workers with offline capabilities
- **Icons**: Lucide React for consistent iconography

### Design Principles

1. **Consistent theming** across all domains using CSS custom properties
2. **Responsive-first** design with mobile-optimized components
3. **Accessibility-focused** with ARIA compliance and keyboard navigation
4. **Performance-optimized** with lazy loading and code splitting
5. **Dark/Light mode** support with system preference detection

## 🎨 Color System & Theming

Our design system uses a **semantic color palette** with CSS custom properties for consistent theming:

```css
/* Neutral colors (1-12 scale) */
--color-neutral-1: /* Lightest background */
--color-neutral-12: /* Darkest text */

/* Accent colors */
--color-accent-9: /* Primary brand color */
--color-accent-secondary-9: /* Secondary brand color */

/* Semantic colors */
--color-fg: /* Primary text */
--color-bg: /* Primary background */
--color-focus-ring: /* Focus indicators */
```

### Brand Colors

- **Primary**: Red/Crimson (#DC2626 variants)
- **Secondary**: Gold/Amber (#F59E0B variants)
- **Accent**: Blue/Tech (#3B82F6 variants)
- **Matrix Green**: #00FF00 (dev environment)

## 📁 Project Structure

```
SFTi-Web.Templates/
├── 📂 public_html/              # Main domain (www.sfti-ai.org)
│   ├── index.html               # Landing page
│   ├── style.css               # Custom styles
│   ├── script.js               # Interactive features
│   └── 📂 About Us/            # Company documentation
├── 📂 dev.sfti-ai.org/         # Development PWA Hub
│   ├── index.html              # PWA launcher interface
│   ├── dev-styles.css          # Terminal-inspired styling
│   └── dev-script.js           # PWA management logic
├── 📂 server.sfti-ai.org/      # Secure server access
│   ├── index.html              # Authentication portal
│   ├── server-styles.css       # Security-focused design
│   ├── server-script.js        # Security & auth logic
│   ├── 📂 IB-G.Scanner/        # Trading scanner PWA
│   │   ├── package.json        # Dependencies & scripts
│   │   ├── components.json     # shadcn/ui configuration
│   │   ├── tailwind.config.js  # Tailwind customization
│   │   ├── tsconfig.json       # TypeScript configuration
│   │   └── 📂 src/             # React components
│   └── 📂 Pilot-Server/        # Server management PWA
│       ├── package.json        # Dependencies & scripts
│       ├── components.json     # shadcn/ui configuration
│       └── 📂 src/             # React components
├── 📂 .github/                 # GitHub workflows & templates
├── .gitignore                  # Comprehensive ignore rules
└── README.md                   # This documentation
```

## 🌐 Domain-Specific Features

### 🏠 www.sfti-ai.org - Corporate Landing Page

**Purpose**: Professional company showcase and project portfolio
**Design**: Modern, corporate aesthetic with interactive elements

**Key Features:**
- 🎯 **Hero Section** with animated floating cards and CTAs
- 🏛️ **Institute Showcase** featuring Ascend-Institute SVG integrations
- 📱 **Project Gallery** with PWA launch cards for major applications
- 📚 **Research Hub** displaying academic papers and Medium publications
- 💼 **Professional Contact** information and support channels
- 🎨 **Responsive Design** with smooth scroll animations
- 🎨 **Brand Colors**: Red/Gold professional theme

**Technical Stack:**
- Pure HTML5/CSS3/JavaScript
- Custom animations and transitions
- SVG integrations from Ascend-Institute
- Responsive grid layouts
- Professional typography

### ⚡ dev.sfti-ai.org - PWA Development Hub

**Purpose**: Progressive Web Application launcher and development portal
**Design**: Terminal-inspired, tech-focused interface

**Key Features:**
- 💻 **Terminal Aesthetics** with matrix-style background effects
- 🚀 **PWA Application Cards** with real-time status indicators
- 📊 **System Monitoring** with live metrics and health checks
- 🔧 **Development Tools** for application management
- 🎮 **Interactive Launch** sequences with loading animations
- 📱 **Mobile-Optimized** PWA interface
- 🌈 **Theme**: Matrix green/blue tech aesthetic

**Available PWAs:**
- **IB-G.Scanner** (Online) - Market scanning and analysis
- **Pilot-Server** (Online) - Autonomous server management
- **GremlinGPT** (Development) - Recursive AI system
- **Gremlin-ShadTail-Trader** (Online) - AI trading platform

**Technical Implementation:**
- React 19 + TypeScript
- shadcn/ui component library
- Tailwind CSS styling
- Progressive Web App features
- Service Worker integration

### 🔒 server.sfti-ai.org - Secure Access Portal

**Purpose**: Authenticated server access and administrative dashboard
**Design**: Security-focused with enterprise-grade features

**Key Features:**
- 🔐 **Multi-Factor Authentication** with session management
- 📊 **Real-Time Dashboard** with system metrics
- 🛡️ **Security Monitoring** with activity logs
- ⚡ **Quick Actions** for server management
- 🚨 **Emergency Controls** and shutdown capabilities
- 📱 **Responsive Security** interface
- 🎯 **Enhanced Protection** (disabled dev tools, right-click protection)

**Security Features:**
- Session-based authentication
- Failed login attempt monitoring
- Suspicious activity detection
- Activity logging and audit trails
- Remember-me functionality
- Emergency access protocols

**Technical Architecture:**
- React + TypeScript applications
- shadcn/ui security components
- Express.js backend services
- WebSocket real-time updates
- Rate limiting and CORS protection

## 🚀 Installation & Development

### 🏃‍♂️ Quick Start (Streamlined Development)

**No more pushing to repo to test changes!** Start developing locally in seconds:

```bash
# Clone the repository
git clone https://github.com/statikfintechllc/SFTi-Web.Templates.git
cd SFTi-Web.Templates

# One-command setup and start all services
./setup-dev.sh
npm run dev:all

# Access your applications locally:
# 🏠 Main Site:       http://localhost:3333
# 📊 Dev Scanner:     http://dev.localhost:3333  
# 🖥️ Server Scanner:  http://server.localhost:3333
# ⚡ API Server:      http://api.localhost:3333
```

**✨ Features:**
- 🔥 **Hot Reload** - See changes instantly without page refresh
- 🌐 **Multi-Domain** - Test all domains simultaneously
- 🚀 **Zero Config** - Everything works out of the box
- 🧪 **Local Testing** - No more waiting for deployments
- 📱 **API Integration** - Full backend/frontend testing

### 📋 Development Commands

```bash
# Start everything at once (recommended)
npm run dev:all           # Unified development server

# Individual project development
npm run dev               # Main site only
cd dev.sfti-ai.org/IB-G.Scanner && npm run start:full     # Dev scanner + API
cd server.sfti-ai.org/IB-G.Scanner && npm run start:full  # Server scanner + API

# Build and preview
npm run build:all         # Build all projects
npm run preview:all       # Preview all built projects

# Maintenance
npm run install:all       # Install deps for all projects
npm run lint              # Lint all projects
```

### 🔧 Development Workflow

1. **Start Development**: `npm run dev:all`
2. **Edit Files**: Make changes to any file in the project
3. **See Changes**: Browser automatically refreshes with updates
4. **Test Features**: Use local URLs to test all functionality
5. **Push When Ready**: Only push after local testing confirms everything works

> **📖 Detailed Guide**: See [DEVELOPMENT.md](DEVELOPMENT.md) for comprehensive development documentation.

### Prerequisites

- **Node.js** 18+ with npm/yarn
- **Git** for version control
- **VS Code** (recommended) with extensions:
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript
  - ES7+ React/Redux/React-Native snippets

### Initial Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/statikfintechllc/SFTi-Web.Templates.git
   cd SFTi-Web.Templates
   ```

2. **Install Dependencies** (for PWA projects)
   ```bash
   # IB-G.Scanner setup
   cd server.sfti-ai.org/IB-G.Scanner
   npm install
   
   # Pilot-Server setup
   cd ../Pilot-Server
   npm install
   ```

3. **shadcn/ui Configuration**
   ```bash
   # Initialize shadcn/ui (if needed)
   npx shadcn@latest init
   
   # Add components
   npx shadcn@latest add button card dialog
   ```

### Development Workflow

#### For PWA Applications (React + TypeScript)

```bash
# Development server
npm run dev           # Starts Vite dev server on port 4174

# Building
npm run build         # TypeScript compilation + Vite build
npm run build:basic   # Basic build without type checking

# Production
npm run preview       # Preview production build
npm run start:prod    # Full production stack

# Full development stack
npm run start:full    # Backend + frontend concurrently
```

#### For Static Sites (HTML/CSS/JS)

```bash
# Simple HTTP server for testing
cd public_html && python -m http.server 8000
cd dev.sfti-ai.org && python -m http.server 8001

# Using Live Server (VS Code extension)
# Right-click index.html → "Open with Live Server"
```

### Component Development Guidelines

#### shadcn/ui Integration

```typescript
// Example component usage
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export function ExampleComponent() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h3 className="text-lg font-semibold">Component Title</h3>
      </CardHeader>
      <CardContent>
        <Button variant="default" size="lg">
          Action Button
        </Button>
      </CardContent>
    </Card>
  );
}
```

#### Tailwind CSS Best Practices

```css
/* Use semantic color variables */
.custom-component {
  @apply bg-neutral-1 text-neutral-12 border-neutral-6;
}

/* Responsive design patterns */
.responsive-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
}

/* Focus and accessibility */
.interactive-element {
  @apply focus:ring-2 focus:ring-accent-9 focus:outline-none;
}
```

### Theme Customization

#### CSS Custom Properties
```css
/* Override theme variables in theme.json or CSS */
:root {
  --color-accent-9: #your-brand-color;
  --color-accent-secondary-9: #your-secondary-color;
  --radius-md: 8px; /* Border radius */
}
```

#### Tailwind Configuration
```javascript
// tailwind.config.js customization
export default {
  theme: {
    extend: {
      colors: {
        'custom-brand': '#your-color',
      },
      animation: {
        'custom-bounce': 'bounce 2s infinite',
      }
    }
  }
}
```

## 🌐 Deployment Guide

### NameCheap cPanel Hosting

#### File Structure Mapping
```bash
# Repository → Server mapping
public_html/              → /public_html/
dev.sfti-ai.org/         → /dev.sfti-ai.org/
server.sfti-ai.org/      → /server.sfti-ai.org/

# PWA builds (after npm run build)
IB-G.Scanner/dist/       → /server.sfti-ai.org/ib-g-scanner/
Pilot-Server/dist/       → /server.sfti-ai.org/pilot-server/
```

#### Deployment Steps

1. **Build PWA Applications**
   ```bash
   cd server.sfti-ai.org/IB-G.Scanner
   npm run build
   
   cd ../Pilot-Server
   npm run build
   ```

2. **Upload via cPanel File Manager**
   - Upload `public_html/` contents to main domain
   - Upload `dev.sfti-ai.org/` to dev subdomain
   - Upload `server.sfti-ai.org/` to server subdomain
   - Upload PWA builds to appropriate server paths

3. **Configure Subdomains**
   - Create subdomains in cPanel
   - Point to respective directories
   - Install SSL certificates for all domains

4. **DNS Configuration**
   ```dns
   Type    Name                    Target
   A       @                       Your-Server-IP
   A       www                     Your-Server-IP
   A       dev                     Your-Server-IP
   A       server                  Your-Server-IP
   ```

### Production Environment Variables

Create `.env.production` files for each PWA:

```env
# IB-G.Scanner/.env.production
VITE_API_URL=https://server.sfti-ai.org/api
VITE_WS_URL=wss://server.sfti-ai.org/ws
VITE_APP_VERSION=0.1.7

# Pilot-Server/.env.production
VITE_SERVER_URL=https://server.sfti-ai.org
VITE_MONITOR_INTERVAL=5000
```

### Performance Optimization

#### Static Assets
- Enable gzip compression in `.htaccess`
- Set proper cache headers
- Optimize images (WebP format recommended)
- Minify CSS/JS files

#### PWA Optimization
```javascript
// Service Worker caching strategy
const CACHE_NAME = 'sfti-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js'
];
```

## 🔧 Configuration Files

### shadcn/ui Configuration (`components.json`)
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/main.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  },
  "iconLibrary": "lucide"
}
```

### TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Vite Configuration (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-button'],
        },
      },
    },
  },
});
```

## 🧪 Testing & Quality Assurance

### Browser Compatibility
- **Chrome** 90+ (Primary development target)
- **Firefox** 88+ (Full support)
- **Safari** 14+ (iOS/macOS support)
- **Edge** 90+ (Chromium-based)
- **Mobile browsers** (iOS Safari, Chrome Mobile)

### Testing Credentials (Development Only)

⚠️ **For testing the server access portal in development:**

```
Username: admin      Password: secure123
Username: developer  Password: dev456
Username: operator   Password: ops789
```

**🚨 CRITICAL**: Remove these credentials in production and implement proper authentication!

### Performance Metrics
- **Lighthouse Score**: 95+ target
- **Core Web Vitals**: Green metrics
- **Bundle Size**: <500KB initial load
- **Time to Interactive**: <3 seconds

### Accessibility Standards
- **WCAG 2.1 AA** compliance
- **Keyboard navigation** support
- **Screen reader** compatibility
- **Color contrast** ratios meet standards

## 🤝 Contributing & Development Standards

### Code Style Guidelines

#### TypeScript/React Components
```typescript
// ✅ Preferred component structure
interface ComponentProps {
  title: string;
  variant?: 'default' | 'destructive';
  onClick?: () => void;
}

export function ExampleComponent({ 
  title, 
  variant = 'default', 
  onClick 
}: ComponentProps) {
  return (
    <Card className="w-full">
      <CardContent>
        <Button variant={variant} onClick={onClick}>
          {title}
        </Button>
      </CardContent>
    </Card>
  );
}
```

#### CSS/Tailwind Conventions
```css
/* ✅ Use semantic naming and consistent spacing */
.dashboard-card {
  @apply bg-neutral-1 border border-neutral-6 rounded-lg p-6;
  @apply hover:bg-neutral-2 transition-colors duration-200;
}

/* ✅ Responsive design patterns */
.grid-responsive {
  @apply grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4;
}
```

### Commit Message Format
```
feat(domain): add new authentication component
fix(ui): resolve button alignment issue
docs(readme): update installation instructions
style(theme): adjust color contrast ratios
```

### Pull Request Requirements
- [ ] Code follows style guidelines
- [ ] Components use shadcn/ui where possible
- [ ] Tailwind classes are semantic and consistent
- [ ] TypeScript types are properly defined
- [ ] Responsive design tested on mobile
- [ ] Accessibility standards maintained
- [ ] Performance impact assessed

## 📚 Documentation & Resources

### Internal Documentation
- [`CONTRIBUTING.md`](./public_html/About%20Us/CONTRIBUTING.md) - Developer guidelines
- [`LICENSE.md`](./public_html/About%20Us/LICENSE.md) - Project licensing
- [`SECURITY.md`](./public_html/About%20Us/SECURITY.md) - Security policies

### External Resources
- **shadcn/ui Documentation**: https://ui.shadcn.com/
- **Tailwind CSS Guide**: https://tailwindcss.com/docs
- **React 19 Documentation**: https://react.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Radix UI Primitives**: https://www.radix-ui.com/primitives

### Community & Support
- **GitHub Issues**: Bug reports and feature requests
- **Discord Community**: Development discussions
- **Email Support**: ascend.gremlin@gmail.com
- **Phone**: +1 (620) 266-9837
- **Text/SMS**: +1 (785) 443-6288

## 🔮 Future Roadmap

### Planned Features
- [ ] **GraphQL API** integration for data fetching
- [ ] **Storybook** component documentation
- [ ] **Jest/Testing Library** test suite
- [ ] **GitHub Actions** CI/CD pipeline
- [ ] **Docker** containerization
- [ ] **Kubernetes** deployment configs
- [ ] **Micro-frontend** architecture migration

### Technology Upgrades
- [ ] **Next.js 15** migration for SSR capabilities
- [ ] **Turbopack** build optimization
- [ ] **React Server Components** implementation
- [ ] **WebAssembly** integration for performance-critical features

---

## 📄 License & Legal

**© 2024 StatikFinTech, LLC. All rights reserved.**

This project is licensed under a **Fair Use License** - see the [LICENSE.md](./public_html/About%20Us/LICENSE.md) file for details.

### Third-Party Acknowledgments
- **shadcn/ui** - MIT License
- **Tailwind CSS** - MIT License  
- **Radix UI** - MIT License
- **React** - MIT License
- **Lucide Icons** - ISC License

---

*Built with ❤️ by the StatikFinTech team*
