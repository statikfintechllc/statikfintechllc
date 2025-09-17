# Hidden Configurations & Special Setups

## 🕵️ Discovered Hidden Files & Configurations

This document catalogs all the special configurations, hidden files, and unique setups found in the SFTi-Web.Templates repository that may not be immediately obvious to developers or AI assistants.

---

## 📁 Hidden Directory Structure

### Server Configuration Files
```
.cagefs/          # CageFS isolation system (NameCheap hosting)
.caldav/          # Calendar server configuration
.cl.selector/     # CloudLinux selector files
.cpanel/          # cPanel configuration and cache
.htpasswds/       # Password protection files
.nc_plugin/       # NameCheap plugin configurations
.softaculous/     # Auto-installer configurations
.spamassassin/    # Email spam filtering
.ssh/             # SSH keys and configurations
.system-php/      # PHP version management
.trash/           # Deleted file recovery
```

### Application-Specific Hidden Files
```
.bash_history     # Shell command history
.bash_logout      # Logout scripts
.bash_profile     # User environment setup
.bashrc           # Shell configuration
.ftpquota         # FTP usage limits
.gemrc            # Ruby gem configuration
.gitconfig        # Git user configuration
.gitignore        # Git ignore patterns
.imunify_patch_id # Security patch tracking
.last.inodes      # Filesystem usage tracking
.lastlogin        # Login history
.myimunify_id     # Security system ID
.spbldr_localStorage # Site builder local storage
```

---

## 🎨 shadcn/ui Hidden Configurations

### Component System Setup
Each PWA application has a hidden `components.json` configuration:

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
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

**Key Discovery**: Both IB-G.Scanner and Pilot-Server use identical shadcn/ui configurations with:
- **Style**: "new-york" (clean, modern aesthetic)
- **Base Color**: "neutral" (semantic color system)
- **CSS Variables**: Enabled for dynamic theming
- **Icon Library**: Lucide React for consistency

### Theme System Discovery
```javascript
// Hidden theme loading mechanism in tailwind.config.js
let theme = {};
try {
  const themePath = "./theme.json";
  if (fs.existsSync(themePath)) {
    theme = JSON.parse(fs.readFileSync(themePath, "utf-8"));
  }
} catch (err) {
  console.error('failed to parse custom styles', err)
}
```

**Note**: Currently `theme.json` files are empty `{}`, but the system is prepared for dynamic theme injection.

---

## 🎭 CSS Custom Properties System

### Discovered Color Variables
```css
/* Complete neutral scale (1-12) */
--color-neutral-1 through --color-neutral-12
--color-neutral-a1 through --color-neutral-a12 (alpha variants)
--color-neutral-contrast

/* Accent color system */
--color-accent-1 through --color-accent-12
--color-accent-contrast

/* Secondary accent system */
--color-accent-secondary-1 through --color-accent-secondary-12
--color-accent-secondary-contrast

/* Semantic colors */
--color-fg (foreground text)
--color-fg-secondary (secondary text)
--color-bg (background)
--color-bg-inset (inset backgrounds)
--color-bg-overlay (overlay backgrounds)
--color-focus-ring (focus indicators)
```

### Spacing System
```css
/* Custom spacing scale */
--size-px through --size-96
--size-0-5, --size-1-5, --size-2-5, --size-3-5 (half sizes)

/* Border radius system */
--radius-sm through --radius-2xl
--radius-full
```

---

## 🔧 Build System Discoveries

### Package.json Hidden Scripts
```json
{
  "kill": "fuser -k 4174/tcp",           # Kill processes on development port
  "optimize": "vite optimize",           # Vite dependency optimization
  "start:full": "concurrently \"npm run server\" \"npm run dev\"",
  "start:prod": "concurrently \"npm run server\" \"npm run preview\""
}
```

### Vite Configuration Secrets
```typescript
// Hidden Tailwind v4 integration
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // New v4 plugin system
  ],
  // ... other config
});
```

**Discovery**: Using cutting-edge Tailwind CSS v4 with Vite plugin integration.

---

## 🌐 PWA Hidden Features

### Responsive Breakpoints
```css
/* Custom media queries discovered in tailwind.config.js */
screens: {
  coarse: { raw: "(pointer: coarse)" },  # Touch devices
  fine: { raw: "(pointer: fine)" },      # Mouse/trackpad
  pwa: { raw: "(display-mode: standalone)" }, # PWA mode
}
```

### Service Worker Configuration
```javascript
// Hidden in runtime.config.json files
{
  "workbox": {
    "mode": "production",
    "swDest": "sw.js",
    "globPatterns": ["**/*.{js,css,html,ico,png,svg}"]
  }
}
```

---

## 🔒 Security Hidden Configurations

### Rate Limiting Setup
```javascript
// Discovered in server.js files
import rateLimit from 'express-rate-limit';
import { RateLimiterFlexible } from 'rate-limiter-flexible';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

### CORS Configuration
```javascript
// Hidden CORS setup
import cors from 'cors';

app.use(cors({
  origin: ['https://dev.sfti-ai.org', 'https://server.sfti-ai.org'],
  credentials: true,
  optionsSuccessStatus: 200
}));
```

### Helmet Security Headers
```javascript
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
```

---

## 📊 Monitoring & Analytics

### Hidden Performance Tracking
```javascript
// Discovered in script files
const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}: ${entry.duration}ms`);
  }
});
performanceObserver.observe({ entryTypes: ['measure', 'navigation'] });
```

### Error Tracking System
```javascript
// Hidden error boundary integration
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert" className="error-container">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
```

---

## 🎨 Hidden Design Assets

### SVG Integration System
```javascript
// Discovered external SVG references
const svgSources = {
  'ib-g-scanner': 'https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/docs/IB.G.svg/assets/ib-g-scanner-card.svg',
  'pilot-server': 'https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/docs/P.S.svg/assets/pilot-server-card.svg',
  'gremlingpt': 'https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/docs/G.G.svg/assets/gremlingpt-card.svg',
  'gremlin-shadtail': 'https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/docs/G.S.svg/assets/gremlin-shadtail-trader-card.svg'
};
```

### Skill Icons Integration
```html
<!-- Hidden in multiple HTML files -->
<img src="https://skillicons.dev/icons?i=python,bash,linux,css,tailwind,react,anaconda,nodejs,electron,go,typescript,javascript,html,astro,nix&theme=dark" alt="Technical Skills">
```

---

## 🎯 AI-Specific Discoveries

### GitHub Copilot Configuration
```json
// Found in .github/copilot-config.json
{
  "suggestions": {
    "enabled": true,
    "languages": {
      "typescript": true,
      "javascript": true,
      "css": true,
      "html": true
    }
  },
  "context": {
    "shadcn": true,
    "tailwind": true,
    "react": true
  }
}
```

### AI Development Patterns
```markdown
// Discovered in CONTRIBUTING.md
- Python: Follow PEP8, but break rules if breaking them is cooler *and* justifiable.
- JS/React (frontend): Functional components only. Tailwind unless your soul needs healing.
- Log everything. Then mute it. Then log it again.
```

---

## 🔄 Deployment Hidden Secrets

### Environment Detection
```javascript
// Hidden environment detection
const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';
const isStaging = process.env.NODE_ENV === 'staging';
```

### Build Optimization Secrets
```javascript
// Hidden in vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        ui: ['@radix-ui/react-dialog', '@radix-ui/react-button'],
      },
    },
  },
}
```

---

## 📋 Maintenance Notes

### Auto-Update Systems
- **Dependencies**: Automated via Dependabot (GitHub)
- **Security patches**: Imunify360 system tracking
- **SSL certificates**: Auto-renewal through NameCheap
- **Domain management**: DNS auto-configuration

### Backup Systems
- **Git**: Complete version history
- **Server**: cPanel automated backups
- **Local**: Developer machine backups recommended

---

## ⚠️ Critical Configuration Warnings

1. **Never modify** `.cagefs/`, `.cpanel/`, or `.system-php/` directories
2. **Protect** `.ssh/` and SSL certificate files
3. **Monitor** `.ftpquota` and `.last.inodes` for resource usage
4. **Backup** `components.json` files before shadcn/ui updates
5. **Test** theme.json changes in development before production

---

**This documentation should be updated whenever new hidden configurations are discovered or when the system architecture changes.**