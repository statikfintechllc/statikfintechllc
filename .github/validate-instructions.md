# 🧪 AI Assistant Instruction Validation Checklist

**Use this checklist to verify you've properly read and understood the COPILOT_INSTRUCTIONS.md file before starting any work.**

## ✅ Pre-Work Validation

### Repository Understanding
- [ ] I have read the complete `.github/COPILOT_INSTRUCTIONS.md` file
- [ ] I understand the 3-domain architecture (public_html, dev, server)
- [ ] I know the file structure mapping (repository → server deployment)
- [ ] I can identify which domain(s) my task affects

### Task Queue Protocol  
- [ ] I will create a detailed task queue before making any changes
- [ ] I will spend 5-10 minutes in planning/analysis phase
- [ ] I will update the task queue as I progress
- [ ] I will report progress frequently using the report_progress tool

### Build & Test Infrastructure
- [ ] I know how to install dependencies (`npm install` for PWA projects)
- [ ] I understand the lint expectations:
  - IB-G.Scanner: 89 warnings, 0 errors expected
  - Pilot-Server: 30 errors, 11 warnings (builds with --noCheck)
- [ ] I know the development server ports:
  - IB-G.Scanner: port 5000 (despite config showing 4174)
  - Pilot-Server: default Vite port (5173)
- [ ] I will test build/lint/dev processes before committing

### Design System Compliance
- [ ] I will use shadcn/ui components instead of custom UI
- [ ] I will follow the semantic color system (accent-9, neutral-1, etc.)
- [ ] I will ensure TypeScript types are properly defined
- [ ] I will maintain responsive design and accessibility standards

### Documentation Requirements
- [ ] I will update the COPILOT_INSTRUCTIONS.md file if I discover workflow changes
- [ ] I will add entries to the "Recent Updates Log" section
- [ ] I will update any project-specific copilot-instructions.md files if needed

## 🎯 Task-Specific Validation

### For React PWA Development (IB-G.Scanner, Pilot-Server)
- [ ] I have checked the project-specific `.github/copilot-instructions.md` file
- [ ] I understand the technology stack (React 19, TypeScript, Vite, Tailwind)
- [ ] I know the expected development workflow and testing procedures

### For Static Site Changes (public_html, dev, server portal)
- [ ] I understand the brand colors and corporate aesthetic requirements
- [ ] I know the responsive design patterns to maintain
- [ ] I will test changes in multiple browsers when possible

### For Documentation/Instruction Updates
- [ ] I will follow the auto-update protocol described in the instructions
- [ ] I will test any updated workflow steps before documenting them
- [ ] I will maintain consistency with existing instruction formats

## 🚨 Emergency Protocols Understanding
- [ ] I know what to do if builds fail (check TypeScript, imports, dependencies)
- [ ] I know what to do if linting fails (use --fix, review patterns, check config)
- [ ] I know what to do if I'm unsure (check existing patterns, ask for clarification)
- [ ] I understand the quality gates for completion

## 📝 Commitment Statement

**By checking all boxes above, I confirm that:**

1. I have thoroughly read and understood the comprehensive instruction file
2. I will follow the task queue protocol for all work
3. I will maintain the established design system and code quality standards  
4. I will test my changes thoroughly before committing
5. I will update documentation when I discover new workflow requirements
6. I will prioritize minimal surgical changes over broad refactoring

**Date**: [Fill in current date]  
**AI Assistant**: [Your identifier/name]  
**Task**: [Brief description of what you're working on]

---

*This validation checklist ensures consistency and quality across all AI assistant contributions to the SFTi Web Templates repository.*
