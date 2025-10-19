# Components

Shared UI components for the StatikFinTech LLC web platform.

## Structure

### Domain-Specific Components
- **www/** - Components for main website (www.sfti-ai.org)
- **dev/** - Components for development hub (dev.sfti-ai.org)
- **server/** - Components for server portal (server.sfti-ai.org)

### Shared Components
- **global.c/** - Global components used across all domains
- **ui/** - Reusable UI elements and widgets

## Component System

Components use the SFTi Component System:
- `sfti-component-system.js` - Base component framework
- Modular, reusable architecture
- Supports desktop and mobile variants
- Navbar and footer components for all domains

## Usage

Components are loaded in HTML files:
```html
<script src="components/sfti-component-system.js"></script>
<script src="components/www/desktop/navbar.js"></script>
<script src="components/www/desktop/footer.js"></script>
```

## Development

When creating new components:
1. Place in appropriate domain directory
2. Follow existing component patterns
3. Include both desktop and mobile variants
4. Update component system registration

## Related

- [Main README](../../README.md) - Project overview
- [src/](../) - Source directory overview
