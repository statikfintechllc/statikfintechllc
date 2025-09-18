/**
 * SFTi Component System Architecture
 * ================================
 * 
 * This is the master component system for all SFTi domains.
 * Each domain inherits from global.c and extends with domain-specific styling.
 * 
 * STRUCTURE:
 * - src/components/global.c/   - Universal components used across all domains
 * - src/components/www.c/      - Main website (www.sfti-ai.org) specific components  
 * - src/components/dev.c/      - Development domain (dev.sfti-ai.org) specific components
 * - src/components/server.c/   - Server domain (server.sfti-ai.org) specific components
 * 
 * DOMAINS:
 * - www.sfti-ai.org    - Main marketing/business website
 * - dev.sfti-ai.org    - PWA hub and development tools
 * - server.sfti-ai.org - Secure access portal and documentation
 * 
 * COMPONENT TYPES:
 * - Navigation (navbar, menus, breadcrumbs)
 * - Cards (project cards, repo cards, feature cards)
 * - Forms (login, signup, contact)
 * - Layout (headers, footers, containers)
 * - Interactive (modals, dropdowns, carousels)
 * 
 * STYLING APPROACH:
 * - Tailwind CSS for utility-first styling
 * - ShadCN/UI for component primitives
 * - Domain-specific color themes preserved
 * - Mobile-first responsive design
 * 
 * LINKING SYSTEM:
 * - Internal: /sign-up, /dashboard, #section
 * - Cross-domain: https://dev.sfti-ai.org/app
 * - External: https://github.com/statikfintechllc
 * 
 * USAGE:
 * 1. Import base component from global.c
 * 2. Extend or override in domain-specific folder
 * 3. Apply domain theme through CSS variables
 * 4. Register component in domain manifest
 */

// Global Component Registry
const SFTiComponents = {
    global: {},
    www: {},
    dev: {},
    server: {}
};

// Theme Configuration
const SFTiThemes = {
    global: {
        primary: '#FF0000',
        secondary: '#FFD700', 
        dark: '#000000',
        darker: '#111111',
        light: '#FFFFFF',
        gray: '#CCCCCC'
    },
    www: {
        // Main website theme (extends global)
        accent: '#E11D48',
        highlight: '#FCD34D'
    },
    dev: {
        // Development portal theme
        accent: '#3B82F6',
        highlight: '#10B981'
    },
    server: {
        // Server portal theme  
        accent: '#8B5CF6',
        highlight: '#F59E0B'
    }
};

// Component Base Class
class SFTiComponent {
    constructor(type, domain = 'global') {
        this.type = type;
        this.domain = domain;
        this.theme = SFTiThemes[domain] || SFTiThemes.global;
        this.initialized = false;
    }

    init() {
        this.applyTheme();
        this.attachEventListeners();
        this.initialized = true;
    }

    applyTheme() {
        const root = document.documentElement;
        Object.entries(this.theme).forEach(([key, value]) => {
            root.style.setProperty(`--sfti-${key}`, value);
        });
    }

    attachEventListeners() {
        // Override in child components
    }

    render(container) {
        // Override in child components
        throw new Error('render() method must be implemented');
    }
}

// Export for use in component files
if (typeof window !== 'undefined') {
    window.SFTiComponent = SFTiComponent;
    window.SFTiComponents = SFTiComponents;
    window.SFTiThemes = SFTiThemes;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SFTiComponent, SFTiComponents, SFTiThemes };
}