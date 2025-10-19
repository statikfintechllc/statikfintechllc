# Instructions for AI Assistants

This directory contains comprehensive instructions and guidelines for AI assistants working on the StatikFinTech LLC repository.

## Files

### Primary Instructions
- **[COPILOT_INSTRUCTIONS.md](COPILOT_INSTRUCTIONS.md)** - **START HERE** - Master instruction file for all AI assistants
  - Repository architecture and structure
  - Domain configuration (www, dev, server)
  - PWA manifest and icon system
  - Task queue protocols
  - Development workflows
  - Testing and validation procedures

### Development Guidelines
- **[AI_DEVELOPMENT_GUIDELINES.md](AI_DEVELOPMENT_GUIDELINES.md)** - Coding standards and best practices
  - Design system and color usage
  - Component architecture patterns
  - TypeScript and React conventions
  - Accessibility requirements
  - Performance optimization

### Specialized Instructions
- **[copilot-instructions.md](copilot-instructions.md)** - Additional Copilot-specific guidance
- **[validate-instructions.md](validate-instructions.md)** - Validation rules and testing procedures

## Quick Start for AI Assistants

1. **Read [COPILOT_INSTRUCTIONS.md](COPILOT_INSTRUCTIONS.md)** first - it's the master file
2. Review [AI_DEVELOPMENT_GUIDELINES.md](AI_DEVELOPMENT_GUIDELINES.md) for coding standards
3. Check domain-specific instructions for the area you're working on
4. Follow the task queue protocol for all changes
5. Update these instructions if you discover new patterns

## Key Principles

- **Manifest-based icons**: All icons defined in `/src/manifest.json`, not HTML
- **Minimal changes**: Surgical, precise modifications only
- **Test thoroughly**: Build, lint, and validate all changes
- **Document updates**: Keep instructions current with repository changes
- **Task queues**: Use checkboxes to track progress

## Repository Structure

```
statikfintechllc/
├── index.html              # Root site
├── src/
│   ├── www/                # Main website
│   ├── dev/                # Dev hub + PWAs
│   ├── server/             # Server portal
│   ├── public/             # Shared assets
│   └── manifest.json       # PWA configuration
├── docs/                   # SVG generation
└── .github/
    ├── instructions/       # YOU ARE HERE
    ├── docs/               # Repository docs
    └── workflows/          # CI/CD
```

## Recent Updates

### 2025-10-19: PWA Manifest Icon System
- Centralized all icon configuration in `/src/manifest.json`
- Removed hardcoded icon links from all HTML files
- Added favicon.ico support for Safari
- Documented manifest-based icon management

### 2025-10-19: Documentation Organization
- Created `.github/docs/` for general documentation
- Created `.github/instructions/` for AI assistant instructions
- Added README files throughout repository

## Contributing to Instructions

When you discover new patterns or requirements:
1. Update the relevant instruction file
2. Add entry to "Recent Updates" section above
3. Ensure consistency across all instruction files
4. Test that instructions work for future AI assistants

## Related Documentation

- [Repository Documentation](../docs/) - General repository docs
- [Workflows](../workflows/) - GitHub Actions CI/CD
- [Main README](../../README.md) - Project overview
