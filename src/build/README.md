# SFTi Build System
## Comprehensive Multi-Domain Build Management

This directory contains the centralized build system for the SFTi Web Templates project, designed to handle all domains, PWAs, and deployment scenarios efficiently.

## Build Scripts

### `build-all.sh` - Master Build Script

The primary build orchestrator that handles the entire build process across all domains and applications.

**Usage:**
```bash
# Production build (all components)
./build/build-all.sh

# Development build (no optimization)
./build/build-all.sh dev

# Clean build (remove all caches)
./build/build-all.sh clean

# Build only PWA applications
./build/build-all.sh pwa-only

# Build only static sites
./build/build-all.sh static-only
```

**Features:**
- ✅ Dependency checking and installation
- ✅ Multi-domain static site building
- ✅ PWA application building (IB-G.Scanner, Pilot-Server)
- ✅ Asset copying and optimization
- ✅ Service worker and manifest handling
- ✅ Build validation and reporting
- ✅ Comprehensive error handling
- ✅ Cleanup and temporary file management

### Environment Variables

Control build behavior with environment variables:

```bash
# Force clean build
CLEAN_BUILD=true ./build/build-all.sh

# Disable PWA building
BUILD_PWA=false ./build/build-all.sh

# Disable static site building
BUILD_STATIC=false ./build/build-all.sh

# Disable optimization
OPTIMIZE=false ./build/build-all.sh
```

## Build Architecture

### Domain Structure

The build system handles three primary domains:

1. **Root Domain (`/`)** - Router/launcher page
2. **Main Website (`www.sfti-ai.org/`)** - Marketing site with SVG cards, research papers, projects
3. **Development Hub (`dev.sfti-ai.org/`)** - PWA hosting for trading and management tools
4. **Server Portal (`server.sfti-ai.org/`)** - User authentication and account management

### Component Integration

- **Global Components** (`src/components/global.c/`) - Shared across all domains
- **Domain-Specific Components** (`src/components/{www,dev,server}.c/`) - Domain-specific UI
- **SVG Card System** - Dynamic SVG content from `docs/` with Tailwind/shadcn styling
- **Service Worker** - Comprehensive caching for all domains and assets

### PWA Applications

The build system integrates two Progressive Web Applications:

1. **IB-G.Scanner** - Advanced market scanning and analysis
2. **Pilot-Server** - Autonomous server management system

Both PWAs are built independently and integrated into the dev domain.

## Build Output

### Directory Structure

```
dist/
├── index.html                    # Root launcher
├── manifest.json                 # PWA manifest
├── sw.js                        # Service worker
├── assets/                      # Optimized assets
├── badges/                      # Static badges
├── docs/                        # SVG documentation
├── src/                         # Component system
├── www.sfti-ai.org/
│   └── index.html              # Main website
├── dev.sfti-ai.org/
│   ├── index.html              # Dev hub
│   ├── IB-G.Scanner/           # Trading scanner PWA
│   └── Pilot-Server/           # Server management PWA
└── server.sfti-ai.org/
    └── index.html              # Server portal
```

### Build Reports

Each build generates a comprehensive report at `dist/build-report.txt` containing:
- Build configuration and timing
- Component status (✓/✗)
- Asset inventory
- Build size information
- Validation results

## Development Workflow

### Local Development

```bash
# Start unified development server
npm run dev:all

# Start individual components
npm run dev              # Root Vite server
npm run dev:static       # Static file server
```

### Production Building

```bash
# Full production build
npm run build:prod

# Quick static build
npm run build:static

# PWA applications only
npm run build:pwa
```

### Build Validation

The build system includes comprehensive validation:
- Required file existence checks
- Asset integrity verification
- PWA manifest validation
- Service worker functionality
- Component system integration

## Optimization Features

### Automatic Optimizations

- SVG compression (when `svgo` available)
- Asset minification
- Source map removal in production
- Cache busting for static assets
- Gzip size reporting

### Build Modes

- **Production** - Full optimization, minification, validation
- **Development** - Fast builds, source maps, no optimization
- **Clean** - Remove all caches and rebuild from scratch

## Integration Points

### GitHub Actions

The build system is designed to integrate with CI/CD pipelines:

```yaml
- name: Build SFTi Platform
  run: |
    ./build/build-all.sh clean
    npm run build:prod
```

### Deployment

Built assets in `dist/` are ready for deployment to:
- GitHub Pages
- Netlify
- Vercel
- Traditional web servers
- CDN networks

## Troubleshooting

### Common Issues

1. **Build fails with dependency errors**
   ```bash
   npm run install:all
   ./build/build-all.sh clean
   ```

2. **PWA builds fail**
   ```bash
   # Check individual PWA builds
   cd dev.sfti-ai.org/IB-G.Scanner && npm run build
   cd dev.sfti-ai.org/Pilot-Server && npm run build
   ```

3. **Service worker issues**
   - Check `sw.js` syntax
   - Verify asset paths in `STATIC_ASSETS`
   - Test with `npm run serve:dev`

### Debug Mode

Enable verbose logging:
```bash
DEBUG=true ./build/build-all.sh
```

## Extending the Build System

### Adding New Domains

1. Create domain directory structure
2. Add HTML entry point
3. Update `vite.config.ts` input configuration
4. Add domain to service worker `STATIC_ASSETS`
5. Update manifest shortcuts

### Adding New PWAs

1. Create PWA in appropriate domain directory
2. Add build commands to `build-all.sh`
3. Update package.json scripts
4. Add PWA assets to service worker cache

### Custom Build Steps

Extend `build-all.sh` with custom functions:

```bash
# Add after main build steps
custom_build_step() {
    log_info "Running custom build step..."
    # Your custom logic here
    log_success "Custom build step completed"
}

# Call in main() function
custom_build_step
```

## Support

For build system issues or enhancements:
- Check build reports in `dist/build-report.txt`
- Review build logs for error details
- Test individual components separately
- Use development builds for debugging

---

**Note:** This build system is specifically designed for the SFTi Web Templates multi-domain architecture. Modifications should maintain compatibility with all domains and PWA applications.