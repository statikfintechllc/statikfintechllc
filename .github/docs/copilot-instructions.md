# Copilot Instructions for statikfintechllc Repository

**ALWAYS follow these instructions first. Only fallback to additional search and context gathering if the information here is incomplete or found to be in error.**

## Repository Overview

This is the main GitHub profile repository for **statikfintechllc** (Statik DK Smoke | SFTi | Sovereign Systems). It serves as a dynamic, automated profile page with custom badges, animated SVG statistics, featured work showcases, and hosts two PWA applications for development and server management.

## Working Effectively

### Bootstrap the Repository
Run these commands in this exact order to set up the complete development environment:

```bash
# Install main repository dependencies (~4 seconds - NEVER CANCEL)
npm install

# Install IB-G.Scanner PWA dependencies (~20 seconds - NEVER CANCEL)
cd dev.sfti-ai.org/IB-G.Scanner && npm install && cd ../..

# Install Pilot-Server PWA dependencies (~13 seconds - NEVER CANCEL)
cd dev.sfti-ai.org/Pilot-Server && npm install && cd ../..
```

### Build and Test the Repository

#### Main Repository Commands
```bash
# Lint all projects (~3 seconds)
npm run lint

# Individual project linting
npm run lint:dev-scanner      # IB-G.Scanner: 89 warnings expected, 0 errors required
npm run lint:server-scanner   # Pilot-Server: 30 errors, 11 warnings (builds anyway with --noCheck)

# Build fails - no index.html in root (expected)
npm run build                 # Will fail - use individual project builds instead

# Master build script (~4 seconds - has known issues but continues)
./build/build-all.sh
```

#### IB-G.Scanner PWA (React + TypeScript + Vite)
```bash
cd dev.sfti-ai.org/IB-G.Scanner

# Development server (~6 seconds to start - NEVER CANCEL)
npm run dev                   # Runs on http://localhost:5000 (NOT 4174 despite config)

# Build for production (~6 seconds - NEVER CANCEL)
npm run build                 # Must succeed - TypeScript compiled with --noCheck

# Lint code (~3 seconds)
npm run lint                  # 89 warnings expected, 0 errors required

# Kill development server
npm run kill                  # Kills port 4174 process
```

#### Pilot-Server PWA (React + TypeScript + Vite)
```bash
cd dev.sfti-ai.org/Pilot-Server

# Development server (~3 seconds to start - NEVER CANCEL)
npm run dev                   # Runs on default Vite port (usually 5173)

# Build for production (~14 seconds - NEVER CANCEL)
npm run build                 # Succeeds with --noCheck flag despite lint errors

# Lint code (~3 seconds)
npm run lint                  # 30 errors, 11 warnings expected (fails but builds work)

# Validation scripts
npm run validate:all          # Full validation suite
npm run test:quality          # Quality gates testing
```

## Validation

### Manual Testing Requirements
ALWAYS perform these validation steps after making any changes:

#### IB-G.Scanner Validation
1. Run `npm run build` - must complete successfully
2. Run `npm run dev` - should start on http://localhost:5000
3. Open browser to http://localhost:5000
4. Verify page shows "SFTi Stock Scanner" with market status
5. Check console for "IBKR connection failed, running in demo mode" (expected)
6. Verify all UI components render without errors
7. Test basic interactions (scanner table, filters, charts)

#### Pilot-Server Validation
1. Run `npm run build` - must complete successfully despite lint errors
2. Run `npm run dev` - should start on default Vite port
3. Open browser to the dev server URL
4. Verify AI chat interface loads with model selection
5. Test basic chat functionality (should work in demo mode)
6. Verify glassmorphic UI design renders correctly
7. Check responsive design on mobile viewport

#### SVG Generation System Validation
```bash
# Test SVG generation (requires GitHub token)
cd docs/c.svg
npm install && npm run build:flow

# Expected: "Missing GH_TOKEN/GITHUB_TOKEN" (normal without token)
# With token: Should generate crimson-flow.svg in assets/
```

### Build Time Expectations
Set these timeout values for long-running commands:

- **npm install (main)**: 4 seconds - timeout: 60 seconds
- **npm install (IB-G.Scanner)**: 20 seconds - timeout: 120 seconds  
- **npm install (Pilot-Server)**: 13 seconds - timeout: 120 seconds
- **npm run build (IB-G.Scanner)**: 6 seconds - timeout: 180 seconds
- **npm run build (Pilot-Server)**: 14 seconds - timeout: 300 seconds
- **npm run lint**: 2-3 seconds - timeout: 60 seconds
- **Master build script**: 4 seconds - timeout: 300 seconds

**CRITICAL**: NEVER CANCEL these operations even if they appear to hang. Build processes may take longer on slower systems.

## Validation Scenarios

After making changes, ALWAYS run through these complete user scenarios:

### Scenario 1: IB-G.Scanner Stock Analysis Workflow
1. Start development server: `npm run dev`
2. Navigate to http://localhost:5000
3. Verify scanner shows market data table (demo mode)
4. Test filter controls (price range, volume, etc.)
5. Click on a stock symbol to view details
6. Verify chart component loads and displays data
7. Test alert system configuration
8. Verify settings panel functionality

### Scenario 2: Pilot-Server AI Chat Workflow  
1. Start development server: `npm run dev`
2. Navigate to development URL
3. Verify model selection dropdown works
4. Test sending a message to the AI chat
5. Verify conversation history persists
6. Test image upload functionality
7. Verify code syntax highlighting works
8. Test responsive mobile design

### Scenario 3: Profile Repository GitHub Integration
1. Verify README.md displays all SVG badges correctly
2. Check that dynamic stats (streak, trophies, traffic) load
3. Confirm all project links work and point to correct repositories
4. Test that GitHub Actions workflows are functioning
5. Verify sponsorship links are working

## Common Issues and Solutions

### Build Failures
- **IB-G.Scanner vite config error**: Import issues with @github/spark package
  - **Solution**: Use corrected imports in vite.config.ts (already fixed)
- **Pilot-Server missing @github/spark**: Package not installed
  - **Solution**: Spark plugins disabled in vite.config.ts (already fixed)
- **Main build fails**: No index.html in root
  - **Solution**: Expected behavior - use individual project builds

### Development Server Issues
- **IB-G.Scanner wrong port**: Config says 4174 but runs on 5000
  - **Solution**: Expected behavior - always use http://localhost:5000
- **IBKR connection failed**: Normal without gateway
  - **Solution**: Expected behavior - app runs in demo mode

### Linting Issues
- **IB-G.Scanner**: 89 warnings expected, 0 errors required
- **Pilot-Server**: 30 errors, 11 warnings expected (builds with --noCheck)
- **Solution**: These are known issues - builds work correctly

## Environment Requirements

### Required Dependencies
- **Node.js**: Version 20 or higher (specified in docs/package.json engines)
- **npm**: Latest version recommended
- **GitHub Token**: Required for SVG generation (GH_TOKEN or GITHUB_TOKEN)

### Optional for Full Functionality
- **IBKR Gateway**: For live market data (IB-G.Scanner)
- **AI API Keys**: For chat functionality (Pilot-Server)

## File Structure Navigation

### Key Project Areas
```
statikfintechllc/
├── .github/                     # Workflows, funding, copilot instructions
├── dev.sfti-ai.org/            
│   ├── IB-G.Scanner/           # Stock scanner PWA (React + TypeScript)
│   └── Pilot-Server/           # AI chat PWA (React + TypeScript)
├── docs/                       # SVG generation system
│   ├── c.svg/                  # Crimson flow (activity charts)
│   ├── s.svg/                  # Streak visualization
│   ├── t.svg/                  # Trophies display
│   └── v.svg/                  # Profile views
├── badges/                     # Static SVG badges
├── build/                      # Build scripts and utilities
└── package.json               # Main project configuration
```

### Frequently Modified Files
- **IB-G.Scanner**: `src/App.tsx`, `src/components/`, `src/lib/`
- **Pilot-Server**: `src/App.tsx`, `src/components/`, `src/hooks/`
- **Profile**: `README.md`, `.github/workflows/`
- **Build**: `build/build-all.sh`, individual `package.json` files

## Git Workflow

### Before Committing
ALWAYS run these commands and ensure they pass:

```bash
# Build all projects successfully
cd dev.sfti-ai.org/IB-G.Scanner && npm run build && cd ../..
cd dev.sfti-ai.org/Pilot-Server && npm run build && cd ../..

# Run linting with expected results
npm run lint  # Should show expected warnings/errors as documented above

# Manual browser testing completed
# No regressions introduced
```

### Commit Message Format
Use clear, descriptive commit messages:
```bash
feat: add new stock scanner filter options
fix: resolve vite config import issues for spark plugins  
docs: update copilot instructions with build timings
style: improve responsive design for mobile chat interface
```

## Troubleshooting

### Debug Steps for Common Issues
1. **Clear build artifacts**: Remove `dist/`, `node_modules/`, `package-lock.json`
2. **Reinstall dependencies**: `npm install` in affected directories
3. **Check Node.js version**: Ensure Node 20+ is installed
4. **Verify environment variables**: GitHub tokens for SVG generation
5. **Check console errors**: Browser DevTools for runtime issues
6. **Review GitHub Actions**: Check workflow logs for CI/CD issues

### Performance Optimization
- **Bundle size warnings**: Expected for PWA applications (~600KB+ JS bundles)
- **Large chunk warnings**: Consider code splitting for production optimization
- **Build time optimization**: Use `--noCheck` flag for TypeScript (already configured)

## Security Considerations

- **API tokens**: Stored as GitHub secrets, never commit tokens to repository
- **Rate limiting**: GitHub API calls in SVG generation respect rate limits
- **CORS configuration**: Properly configured for local development
- **Authentication**: Handled securely in PWA applications

---

**Remember**: This repository represents StatikFinTech LLC's complete professional presence. Every change should be tested thoroughly and maintain the high standard of automation, visual appeal, and technical excellence established in the codebase.

**Success Criteria**: All builds pass, manual browser testing completed, no regressions introduced, expected lint results achieved, and complete user scenarios validated.