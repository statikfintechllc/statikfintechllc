# 🚀 Quick Reference - SFTi Web Templates

**Essential information for AI assistants working on this repository**

## 📂 Repository Structure
```
SFTi-Web.Templates/
├── 📂 public_html/              → www.sfti-ai.org (Corporate site)
|   ├── 📂 dev.sfti-ai.org/      → dev.sfti-ai.org (PWA hub)  
|   └── 📂 server.sfti-ai.org/   → server.sfti-ai.org (Secure portal)
|     ├── 📂 IB-G.Scanner/       → React PWA (Trading scanner)
|     └── 📂 Pilot-Server/       → React PWA (AI chat interface)
└── 📂 .github/                  → Instructions and CI/CD
```

## ⚡ Critical Commands

### IB-G.Scanner PWA
```bash
cd public_html/server.sfti-ai.org/IB-G.Scanner/
npm install        # ~60 seconds, don't cancel
npm run lint       # 89 warnings, 0 errors expected  
npm run build      # Must succeed
npm run dev        # Opens on port 5000 (not 4174)
```

### Pilot-Server PWA  
```bash
cd public_html/server.sfti-ai.org/Pilot-Server/
npm install        # ~30 seconds
npm run lint       # 30 errors, 11 warnings (builds anyway)
npm run build      # Succeeds with --noCheck flag
npm run dev        # Default Vite port (5173)
```

## 🎨 Design System Rules

### ✅ ALWAYS USE
- `shadcn/ui` components instead of custom UI
- Semantic colors: `accent-9`, `neutral-1`, `neutral-12`
- TypeScript with proper interfaces
- Responsive design patterns
- WCAG 2.1 AA accessibility

### ❌ NEVER USE  
- Custom components when shadcn/ui exists
- Hardcoded colors like `bg-red-500`
- `any` types in TypeScript
- Non-responsive layouts

## 📋 Task Queue Protocol (MANDATORY)

### Before Any Changes:
1. **Read complete** `.github/COPILOT_INSTRUCTIONS.md`
2. **Plan thoroughly** (5-10 minutes thinking)
3. **Create task queue** with detailed checklist
4. **Identify affected domains/projects**
5. **Design minimal surgical changes**

### During Work:
- ✅ Update task queue after each major step
- ✅ Test build/lint/dev frequently  
- ✅ Report progress with clear milestones
- ✅ Follow established code patterns

### Before Committing:
- ✅ All affected projects build successfully
- ✅ Linting matches expected results
- ✅ Manual browser testing completed
- ✅ No regressions introduced
- ✅ Update instruction files if workflow changed

## 🚨 Emergency Info

### Build Failures
- Check TypeScript configuration
- Verify all imports exist and are typed
- Review package.json dependencies

### Lint Failures
- Run `npm run lint --fix` for auto-fixes
- Review established code patterns
- Check project-specific eslint config

### Port Conflicts
- IB-G.Scanner: Expect port 5000 (not 4174 as configured)
- Pilot-Server: Uses default Vite port 5173
- Backend server: Port 3000 (HTTP), 3001 (WebSocket)

### If Unsure
1. Check existing components in codebase
2. Refer to project-specific instruction files
3. Follow patterns from similar functionality
4. Ask for clarification rather than guessing

## 📖 Key Documentation Files

- **Master Instructions**: `.github/COPILOT_INSTRUCTIONS.md`
- **Design System**: `.github/AI_DEVELOPMENT_GUIDELINES.md`  
- **IB-G.Scanner**: `public_html/server.sfti-ai.org/IB-G.Scanner/.github/copilot-instructions.md`
- **Pilot-Server**: `public_html/server.sfti-ai.org/Pilot-Server/.github/copilot-instructions.md`
- **Validation Checklist**: `.github/validate-instructions.md`

## 🎯 Success Criteria Summary

Every completed task must have:
- ✅ All builds passing
- ✅ Lint results matching expectations  
- ✅ Manual browser testing done
- ✅ Design system compliance maintained
- ✅ Accessibility standards preserved
- ✅ Documentation updated if needed
- ✅ Clean git commits with clear messages

---
*Always start with the complete instruction file. This is just a quick reference.*
