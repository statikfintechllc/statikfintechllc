# 🤖 Comprehensive AI Assistant Instructions for SFTi Web Templates

**MASTER INSTRUCTION FILE** - All AI assistants working on this repository must read and follow these instructions before beginning any task.

## 🏗️ Repository Overview

This repository hosts **StatikFinTech LLC's complete web infrastructure** - a professional multi-domain system built with modern web technologies. The repository serves as both a development environment and production deployment source for all domains.

### 🌐 Domain Architecture

```
statikfintechllc/
├── 📂 index.html              → www.sfti-ai.org (Main Corporate Site - Root)
├── 📂 src/
│   ├── 📂 www/                → www.sfti-ai.org (Main site source)
│   ├── 📂 dev/                → dev.sfti-ai.org (Development Hub)
│   │   ├── 📂 IB-G.Scanner/   → PWA: Stock market scanner
│   │   └── 📂 Pilot-Server/   → PWA: AI chat interface
│   ├── 📂 server/             → server.sfti-ai.org (Secure Server Access)
│   ├── 📂 public/             → Shared assets (icons, images)
│   ├── 📂 components/         → Shared UI components
│   └── 📄 manifest.json       → PWA manifest for all domains
├── 📂 docs/                   → SVG generation system
├── 📂 badges/                 → Badge SVG assets
└── 📂 .github/
    ├── 📂 instructions/       → AI assistant instructions (YOU ARE HERE)
    ├── 📂 docs/               → Repository documentation
    └── 📂 workflows/          → GitHub Actions CI/CD
```

**PWA Structure:**
- All domains reference `/src/manifest.json` for icons and PWA configuration
- Icons stored in `/src/public/` (16x16 to 512x512 PNG + favicon.ico)
- No hardcoded icon links in HTML - manifest handles all icons

**File Structure Mapping (Repository → Deployment):**
```bash
# Main domain
index.html                → Root site entry
src/www/index.html        → WWW site entry

# Subdomains  
src/dev/index.html        → dev.sfti-ai.org
src/server/index.html     → server.sfti-ai.org

# PWA Applications (after npm run build)
src/dev/IB-G.Scanner/dist/   → Deployed as PWA
src/dev/Pilot-Server/dist/   → Deployed as PWA
```

## 📱 PWA Manifest & Icon System

**CRITICAL: All icon configuration is centralized in `/src/manifest.json`**

### Icon Management Rules

1. **✅ DO:**
   - Add ALL icons to `/src/manifest.json` in the `icons` array
   - Store icon files in `/src/public/`
   - Use absolute paths: `/src/public/icon-{size}.png`
   - Include all standard sizes: 16, 32, 72, 96, 128, 144, 152, 180, 192, 384, 512
   - Add favicon.ico for legacy browser support

2. **❌ DON'T:**
   - Hardcode icon links in HTML files (`<link rel="icon">`)
   - Add apple-touch-icon tags to HTML
   - Create separate icon configurations per domain
   - Use relative paths for icons in manifest

### HTML Configuration

All 4 HTML files MUST have:
```html
<!-- PWA Manifest -->
<link rel="manifest" href="../manifest.json">  <!-- or "src/manifest.json" for root -->
```

**NO icon links** - the manifest handles everything.

### Manifest Structure

```json
{
  "icons": [
    {
      "src": "/src/public/favicon.ico",
      "sizes": "32x32",
      "type": "image/x-icon",
      "purpose": "any"
    },
    {
      "src": "/src/public/icon-16x16.png",
      "sizes": "16x16",
      "type": "image/png",
      "purpose": "any"
    },
    // ... all other sizes
  ]
}
```

### Browser Compatibility

- ✅ Chrome: Uses manifest icons
- ✅ Safari: Uses manifest icons + favicon.ico fallback
- ✅ Firefox: Uses manifest icons
- ✅ Edge: Uses manifest icons
- ✅ iOS Safari: Uses manifest apple-touch-icon entries
- ✅ Android: Uses manifest maskable icons

### Adding New Icons/Assets

When adding new images to `src/public/`:
1. Add entry to manifest.json if it's an icon
2. Specify correct size, type, and purpose
3. Test in all browsers (especially Safari)
4. Update this documentation if new patterns emerge

## 🎯 CRITICAL FIRST STEPS - Task Queue Protocol

**EVERY AI ASSISTANT MUST FOLLOW THIS PROTOCOL:**

### 1. Initial Assessment & Planning Phase (5-10 minutes thinking)
Before making ANY changes, you must:

1. **Read this entire instruction file** - Do not skip sections
2. **Understand the complete task scope** - Analyze requirements thoroughly  
3. **Map affected domains/projects** - Identify which parts of the system are involved
4. **Plan minimal surgical changes** - Design the smallest possible modifications
5. **Create a detailed task queue** with checkboxes in your first response

### 2. Task Queue Template
```markdown
## 🔄 Task Queue for [Task Description]

### Planning & Analysis
- [ ] ✅ Read master instructions completely
- [ ] ✅ Understand task requirements and scope  
- [ ] ✅ Identify affected domains/projects
- [ ] ✅ Plan surgical changes and adjustments needed building todos and task queues
- [ ] ✅ Review existing code patterns and standards

### Implementation Phase  
- [ ] Implement core functionality
- [ ] Add proper TypeScript types and error handling
- [ ] Follow established design system patterns
- [ ] Ensure responsive design and accessibility

### Testing & Validation
- [ ] Run lint checks (`npm run lint`)
- [ ] Build affected projects (`npm run build`) 
- [ ] Test development servers (`npm run dev`)
- [ ] Manual browser testing and validation
- [ ] Verify no regressions introduced

### Documentation & Cleanup
- [ ] Update this instruction file if workflow changes
- [ ] Clean up temporary files
- [ ] Commit changes with clear messages
- [ ] Update task queue status
```

### 3. Continuous Queue Updates
- **Update the task queue** after completing each major step
- **Mark items complete** with ✅ and add completion notes
- **Report progress frequently** using the report_progress tool
- **Always update this instruction file** if you discover new workflow patterns or requirements

## 📁 Domain-Specific Instructions

### 🏠 public_html/ - Main Corporate Website (www.sfti-ai.org)

**Technology Stack:** Static HTML/CSS/JavaScript with custom styling  
**Purpose:** Professional company showcase and project portfolio

**Key Files:**
- `index.html` - Main landing page with floating cards animation
- `styles.css` - Custom CSS with corporate theme (red/gold branding)  
- `script.js` - Interactive features and animations
- `About Us/` - Company documentation and founder materials

**Development Standards:**
- Maintain corporate aesthetic with red (#DC2626) and gold (#F59E0B) branding
- Ensure mobile responsiveness across all breakpoints
- Keep animations smooth and professional
- Test cross-browser compatibility

**Build Commands:**
```bash
# No build process - static files
# Direct deployment to server
```

### 🛠️ dev.sfti-ai.org/ - Development Hub

**Technology Stack:** Static HTML with terminal/matrix-inspired design  
**Purpose:** PWA launcher and development tools interface

**Key Files:**
- `index.html` - Development dashboard with PWA links
- `dev-styles.css` - Terminal-inspired styling with matrix green theme
- `dev-script.js` - PWA management and development utilities

**Development Standards:**
- Maintain terminal/matrix aesthetic (#00FF00 green theme)
- Focus on developer experience and functionality
- Ensure PWA links work correctly
- Test integration with subdomain PWAs

### 🔒 server.sfti-ai.org/ - Secure Server Access Portal

**Technology Stack:** Static portal + Two React PWA Applications  
**Purpose:** Authentication portal + Trading scanner + Server management

**Main Portal Files:**
- `index.html` - Security-focused authentication interface
- `server-styles.css` - Security-themed design
- `server-script.js` - Authentication and security logic

#### 📊 IB-G.Scanner PWA - Interactive Brokers Stock Scanner

**Technology Stack:** React 19 + TypeScript + Vite 6.3.5 + Tailwind CSS 4.1.11

**Architecture:** Professional real-time penny stock scanner with IBKR integration, AI-powered analysis, pattern recognition, and comprehensive market insights.

**🔧 Development Commands:**
```bash
cd public_html/server.sfti-ai.org/IB-G.Scanner/

# Install dependencies (takes ~40 seconds - never cancel)
npm install

# Development server 
# NOTE: Currently starts on port 5000 despite config specifying 4174
npm run dev

# Build for production (takes ~10 seconds - never cancel)
npm run build

# Lint code (89 warnings expected, 0 errors required)
npm run lint

# Start backend server (Port: 3000 HTTP, 3001 WebSocket)
npm run server

# Full development environment
npm run start:full

# Production preview
npm run start:prod
```

**🧩 Key Architecture Components:**
- **Frontend**: React 19, TypeScript, Vite 6.3.5, TailwindCSS 4.1.11
- **UI Components**: Radix UI, Shadcn/ui, Phosphor Icons
- **Charts**: Lightweight Charts library for financial data
- **Backend Services**: Express server with WebSocket support
- **IBKR Integration**: Client Portal Gateway browser connection + server proxy
- **AI Services**: Built-in pattern recognition (`src/lib/aiPatterns.ts`)

**🎯 Critical Development Requirements:**
- **ALWAYS** run `npm run lint` before committing (89 warnings expected, 0 errors required)
- **ALWAYS** test development server at http://localhost:5000 (note: runs on 5000 despite config)
- **ALWAYS** verify build completes without TypeScript errors
- **Expected behavior**: App shows "IBKR connection failed, running in demo mode" (normal without Gateway)
- **Manual browser testing required** - no automated tests exist

**📂 File Structure:**
```
IB-G.Scanner/
├── src/
│   ├── components/          # React components (UI, Charts, etc.)
│   ├── lib/                # Core logic (IBKR, alerts, AI patterns)
│   ├── types/              # TypeScript type definitions  
│   └── App.tsx             # Main application component
├── dist/                   # Built application (auto-generated)
├── scripts/server.js       # Express HTTP/WebSocket server
├── .github/copilot-instructions.md  # Project-specific instructions
└── package.json            # Dependencies and scripts
```

**⚠️ Important Notes:**
- Package type: ES modules (`"type": "module"` in package.json)
- Build size warnings are normal (~646KB JS, ~248KB CSS)
- Icon system uses proxy that maps missing icons to "Question" fallback
- Application works fully in demo mode without IBKR connection

#### 🚀 Pilot-Server PWA - AI Chat Interface & Server Management

**Technology Stack:** React 19 + TypeScript + Vite 6.3.5 + Express.js 5.1.0

**Architecture:** Modern AI Chat Interface with multi-model conversation capabilities, developer workflows, and server management features.

**🔧 Development Commands:**
```bash
cd public_html/server.sfti-ai.org/Pilot-Server/

# Install dependencies
npm install

# Development server (default Vite port: 5173)
npm run dev

# Build for production (uses --noCheck to bypass TypeScript errors)
npm run build

# Lint code (currently has 30 errors, 11 warnings - needs cleanup)
npm run lint

# Validation scripts
npm run validate:all
npm run test:quality

# Kill development server
npm run kill
```

**🧩 Key Features:**
- Multi-model chat interface (GPT-4o, GPT-4o-mini)
- Conversation history and persistence
- Image upload and analysis capabilities  
- Code syntax highlighting and developer-focused features
- Modern glassmorphic UI with Radix UI components
- MCP (Model Context Protocol) server integration

**📂 File Structure:**
```
Pilot-Server/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI primitives (Radix UI)
│   │   ├── chat/         # Chat-specific components
│   │   ├── auth/         # Authentication components
│   │   └── shared/       # Shared business logic components
│   ├── lib/              # Utilities and constants
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript type definitions
├── scripts/              # Validation and build scripts
├── .github/copilot-instructions.md  # Project-specific instructions
└── package.json          # Dependencies and scripts
```

## 🎨 Design System Standards

### Universal Design Principles
All projects must follow the established design system:

1. **shadcn/ui components** - Always use instead of custom UI components
2. **Tailwind CSS only** - No custom CSS classes unless absolutely necessary
3. **Semantic color system** - Use CSS custom properties (`--color-accent-9`, etc.)
4. **TypeScript for all React** - Proper type definitions required
5. **Responsive-first design** - Mobile optimization mandatory
6. **Accessibility compliance** - WCAG 2.1 AA standards

### Color System
```css
/* Semantic colors for all projects */
--color-neutral-1: /* Lightest background */
--color-neutral-12: /* Darkest text */
--color-accent-9: /* Primary brand color */
--color-accent-secondary-9: /* Secondary brand color */
--color-fg: /* Primary text */
--color-bg: /* Primary background */
```

**Brand Colors:**
- **Primary Red**: `accent-9` (#DC2626 variants)
- **Secondary Gold**: `accent-secondary-9` (#F59E0B variants)  
- **Matrix Green**: `#00FF00` (dev environment only)
- **Tech Blue**: `#3B82F6` (accent elements only)

### Component Standards
```typescript
// ✅ ALWAYS USE - shadcn/ui components
import { Button } from '@/components/ui/button';
<Button variant="default" size="lg">Primary Action</Button>

// ✅ ALWAYS USE - Semantic colors
className="bg-neutral-1 text-neutral-12 border-neutral-6"
className="bg-accent-9 text-accent-contrast"

// ❌ NEVER USE - Custom components when shadcn/ui exists
function CustomButton() { /* DON'T DO THIS */ }

// ❌ NEVER USE - Hardcoded colors  
className="bg-red-500 text-white border-gray-300"
```

## 🔧 Development Workflow Standards

### Pre-Development Checklist
Before starting any development task:

- [ ] ✅ Read project-specific copilot-instructions.md if it exists
- [ ] ✅ Check which domain(s) are affected by your changes
- [ ] ✅ Understand the build/test infrastructure for affected projects
- [ ] ✅ Plan minimal surgical changes
- [ ] ✅ Set up task queue with clear milestones

### Build & Test Infrastructure

#### For React PWA Projects (IB-G.Scanner, Pilot-Server):
```bash
# Always run these commands in order:
npm install                    # Install dependencies (40+ seconds, don't cancel)

# IB-G.Scanner: 89 warnings, 0 errors expected
# Pilot-Server: 30 errors, 11 warnings (build bypasses with --noCheck)
npm run lint                   

npm run build                  # Must complete successfully
npm run dev                    # Test in browser manually
```

#### For Static Sites (public_html, dev, server portal):
```bash
# No build process required
# Test by opening HTML files in browser
# Validate HTML/CSS/JavaScript syntax
```

### Error Handling Standards

#### Frontend Error Handling (React Projects):
```typescript
try {
  // API calls or risky operations
} catch (error) {
  console.error('Operation failed:', error);
  // Show user-friendly error message
  // Log error for debugging
}
```

#### TypeScript Requirements:
```typescript
// ✅ ALWAYS - Proper interface definitions
interface ComponentProps {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'outline';
  isLoading?: boolean;
  onAction?: () => void;
  children?: React.ReactNode;
}

// ✅ ALWAYS - Proper state typing
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState<boolean>(false);
const [errors, setErrors] = useState<string[]>([]);
```

### Testing Requirements

#### Manual Testing Protocol (Required for all changes):
1. **Build Verification**: All affected projects must build successfully
2. **Lint Verification**: All code must pass linting without errors
3. **Browser Testing**: Manually test core functionality in browser
4. **Responsive Testing**: Verify mobile and desktop layouts work
5. **Cross-Browser Testing**: Test in Chrome, Firefox, Safari when possible

#### Expected Test Results:
- **IB-G.Scanner**: Shows "SFTi Stock Scanner" with market status at http://localhost:5000, demo mode message expected
- **Pilot-Server**: Shows AI chat interface with model selection at default Vite port
- **Static sites**: All animations and interactions work smoothly

### Performance & Accessibility

#### Performance Standards:
- **Bundle size monitoring** - Watch for large chunk warnings
- **Loading state management** - Always implement proper loading UX
- **Image optimization** - Use appropriate formats and sizes
- **Code splitting** - Use dynamic imports for large features

#### Accessibility Requirements:
```typescript
// ✅ ALWAYS include proper ARIA labels
<Button aria-label="Close dialog" onClick={closeDialog}>
  <X className="h-4 w-4" />
</Button>

// ✅ ALWAYS use semantic HTML
<main role="main">
  <section aria-labelledby="section-title">
    <h2 id="section-title">Section Title</h2>
  </section>
</main>

// ✅ ALWAYS implement keyboard navigation
className="focus:ring-2 focus:ring-accent-9 focus:outline-none"
```

## 🚨 Emergency Protocols & Common Issues

### Critical Error Categories:

#### 1. Build Failures
**Symptoms**: TypeScript compilation errors, Vite build failures  
**Actions**: 
- Check TypeScript configuration consistency
- Verify all imports exist and are properly typed
- Check for circular dependency issues
- Review package.json dependencies for version conflicts

#### 2. Linting Failures  
**Symptoms**: ESLint errors preventing commit
**Actions**:
- Fix auto-fixable issues: `npm run lint --fix`
- Review ESLint configuration for project-specific rules
- Ensure code follows established patterns
- Check for unused variables and imports

#### 3. Runtime Errors
**Symptoms**: JavaScript errors in browser console
**Actions**:
- Check browser DevTools network tab for failed requests
- Verify environment variables are properly configured
- Test error boundaries and fallback states
- Implement proper loading and error states

#### 4. Design System Violations
**Symptoms**: Inconsistent styling, custom components instead of shadcn/ui
**Actions**:
- Review AI_DEVELOPMENT_GUIDELINES.md
- Replace custom components with shadcn/ui equivalents
- Use semantic color variables instead of hardcoded colors
- Ensure responsive design patterns are followed

### If You're Unsure:
1. **Check existing components** in the codebase first
2. **Refer to project-specific copilot-instructions.md** files
3. **Follow established patterns** from similar functionality
4. **Ask for clarification** rather than guessing
5. **Test thoroughly** on multiple devices and browsers

## 🔄 Auto-Update Protocol for This File

**THIS FILE MUST BE UPDATED** whenever you discover:

### Workflow Changes
- New build commands or development processes
- Changed port numbers or server configurations  
- Updated dependency requirements or Node.js versions
- New testing procedures or validation requirements

### Architecture Changes  
- New domains or subdirectories added to the repository
- Changes to the deployment mapping (repository → server)
- New PWA projects or technology stack changes
- Updates to the design system or component libraries

### Documentation Changes
- New project-specific instruction files created
- Changes to existing copilot-instructions.md files
- Updates to package.json scripts or configurations
- New development tools or VS Code extensions required

### Update Procedure:
1. **Document the change** in detail with before/after examples
2. **Update relevant sections** of this instruction file
3. **Add to the task queue template** if it's a workflow change
4. **Commit the changes** with clear commit message: `docs: update copilot instructions - [description]`
5. **Test the updated workflow** to ensure accuracy

### Example Update Entry:
```markdown
## 📝 Recent Updates Log

### [Date] - [Your Name/AI Assistant]
**Changed**: [Description of what changed]
**Reason**: [Why the change was necessary]  
**Impact**: [Which projects/workflows are affected]
**Testing**: [How the change was validated]
```

## 📝 Recent Updates Log

### 2025-01-17 - GitHub Copilot Assistant
**Changed**: Added comprehensive instruction ecosystem with validation checklist and quick reference
**Reason**: Ensure AI assistants have proper validation tools and quick access to critical information
**Impact**: All future AI assistants now have structured validation process and quick reference materials
**Testing**: 
- Created `.github/validate-instructions.md` with pre-work verification checklist
- Created `.github/QUICK_REFERENCE.md` with essential commands and info
- Updated support resources section with new documentation links

### 2025-01-17 - GitHub Copilot Assistant  
**Changed**: Corrected port information for IB-G.Scanner dev server and lint expectations
**Reason**: Testing revealed dev server runs on port 5000 despite config specifying 4174, and Pilot-Server has lint errors
**Impact**: Affects development workflow instructions for both PWA projects
**Testing**: 
- Tested `npm install`, `npm run lint`, `npm run build`, `npm run dev` for both projects
- IB-G.Scanner: 89 warnings/0 errors in lint, builds successfully, dev server on port 5000
- Pilot-Server: 30 errors/11 warnings in lint, builds with --noCheck flag, default Vite port

## 🎯 Success Criteria

### For Every Task Completion:
- [ ] ✅ All affected projects build successfully
- [ ] ✅ Linting passes with no errors
- [ ] ✅ Manual browser testing completed
- [ ] ✅ No regressions introduced to existing functionality
- [ ] ✅ Changes follow established design system standards
- [ ] ✅ TypeScript types are properly defined
- [ ] ✅ Responsive design tested on mobile and desktop
- [ ] ✅ Accessibility standards maintained
- [ ] ✅ Task queue updated with completion status
- [ ] ✅ This instruction file updated if workflow changes discovered
- [ ] ✅ Clean commit messages and proper git hygiene
- [ ] ✅ Documentation updated where relevant

### Quality Gates:
1. **Code Quality**: TypeScript compilation clean, ESLint passing
2. **Functionality**: Core features work as expected in browser testing
3. **Design**: Follows established design system and brand guidelines  
4. **Performance**: No significant bundle size increases or performance regressions
5. **Accessibility**: WCAG 2.1 AA compliance maintained
6. **Documentation**: Changes are documented and instruction file updated

---

**Remember: This repository represents StatikFinTech LLC's complete web presence. Every change should be professional, well-tested, and aligned with the established standards. When in doubt, favor minimal surgical changes over broad refactoring.**

## 📞 Support Resources

- **🎯 Quick Reference**: `.github/QUICK_REFERENCE.md` (Essential info at a glance)
- **✅ Validation Checklist**: `.github/validate-instructions.md` (Pre-work verification)
- **🎨 Design System**: `.github/AI_DEVELOPMENT_GUIDELINES.md` (Component and styling standards)
- **📊 IB-G.Scanner**: `public_html/server.sfti-ai.org/IB-G.Scanner/.github/copilot-instructions.md`
- **🚀 Pilot-Server**: `public_html/server.sfti-ai.org/Pilot-Server/.github/copilot-instructions.md`
- **🌐 shadcn/ui Documentation**: https://ui.shadcn.com/
- **🎨 Tailwind CSS Documentation**: https://tailwindcss.com/docs
- **📋 Company Documentation**: `public_html/About Us/` directory

---

*Last Updated: [Auto-update when this file is modified]*
*Version: 1.0.0*
*Maintainer: AI Assistant Collective*
