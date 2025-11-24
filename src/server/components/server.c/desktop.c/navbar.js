/**
 * Auto-generated domain component
 * Domain   : server
 * Variant  : desktop
 * Component: navbar
 * Source   : components/global.c/desktop/navbar.js
 * Generated: 2025-11-24T02:36:05.770Z
 */

// @ts-nocheck
/**
 * SFTi Navbar Component (Desktop Variant)
 * ======================================
 *
 * Provides the desktop-first navigation experience. Mobile specific
 * behaviour lives in ../mobile/navbar.js which wraps this implementation.
 */

class SFTiNavbar {
    constructor(config) {
        this.config = {
            logoText: 'SFTi',
            logoSubtitle: 'StatikFinTech, LLC',
            items: [],
            containerId: 'navbar-container',
            ...config
        };
        this.mobileMenuOpen = false;
        this.init();
    }

    init() {
        this.disableOldNavbar();
        this.render();
        this.attachEventListeners();
    }

    disableOldNavbar() {
        const oldNavbars = document.querySelectorAll('.navbar, nav.navbar');
        oldNavbars.forEach(nav => {
            nav.style.display = 'none';
        });

        const style = document.createElement('style');
        style.innerHTML = `
            .navbar, nav.navbar {
                display: none !important;
            }

            #navbar-container .navbar {
                display: block !important;
            }

            body {
                margin-top: 0 !important;
                padding-top: 48px !important;
            }
        `;
        document.head.appendChild(style);
    }

    render() {
        const container = document.getElementById(this.config.containerId);
        if (!container) {
            console.error(`Container with id "${this.config.containerId}" not found`);
            return;
        }

        if (typeof this.getTemplate === 'function' && this.getTemplate !== SFTiNavbar.prototype.getTemplate) {
            container.innerHTML = this.getTemplate();
            return;
        }

        container.innerHTML = this.getTemplate();
    }

    getTemplate() {
        return `
            <nav class="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10 h-12 min-h-12 max-h-12">
                <div class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                    <div class="flex flex-col leading-none">
                        <span class="text-red-500 font-bold text-lg leading-tight">
                            ${this.config.logoText}
                        </span>
                        <span class="text-yellow-400 text-xs leading-tight">
                            ${this.config.logoSubtitle}
                        </span>
                    </div>

                    <div class="hidden md:flex items-center space-x-6">
                        ${this.config.items.map(item => `
                            <a href="${item.href}"
                               class="text-white hover:text-yellow-400 transition-colors text-sm"
                               ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                                ${item.title}
                            </a>
                        `).join('')}
                    </div>

                    <button id="mobile-menu-toggle" class="md:hidden p-2 h-8 w-8 flex items-center justify-center">
                        <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>

                <div id="mobile-menu" class="md:hidden fixed inset-y-0 right-0 w-64 bg-black/95 backdrop-blur-sm border-l border-white/10 transform translate-x-full transition-transform duration-300 ease-in-out">
                    <div class="flex flex-col p-6 space-y-4 mt-6">
                        <button id="mobile-menu-close" class="self-end p-2 mb-4">
                            <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        ${this.config.items.map(item => `
                            <a href="${item.href}"
                               class="text-white hover:text-yellow-400 transition-colors text-base py-2"
                               ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                                ${item.title}
                            </a>
                        `).join('')}
                    </div>
                </div>
            </nav>
        `;
    }

    attachEventListeners() {
        const toggleButton = document.getElementById('mobile-menu-toggle');
        const closeButton = document.getElementById('mobile-menu-close');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = mobileMenu.querySelectorAll('a');

        toggleButton?.addEventListener('click', () => this.toggleMobileMenu());
        closeButton?.addEventListener('click', () => this.closeMobileMenu());

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        document.addEventListener('click', (e) => {
            if (this.mobileMenuOpen && !mobileMenu.contains(e.target) && !toggleButton.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        this.mobileMenuOpen = !this.mobileMenuOpen;

        if (this.mobileMenuOpen) {
            mobileMenu.classList.remove('translate-x-full');
        } else {
            mobileMenu.classList.add('translate-x-full');
        }
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        this.mobileMenuOpen = false;
        mobileMenu.classList.add('translate-x-full');
    }
}

function createSFTiNavbar(config) {
    return new SFTiNavbar(config);
}

const SFTiNavbarConfigs = {
    main: {
        logoText: 'SFTi',
        logoSubtitle: 'StatikFinTech, LLC',
        items: [
            { title: 'Home', href: '#home' },
            { title: 'Institute', href: '#institute' },
            { title: 'Projects', href: '#projects' },
            { title: 'Research', href: '#research' },
            { title: 'Contact Us', href: '#contact-us' },
            { title: 'PWAs', href: 'https://statikfintechllc.github.io/statikfintechllc/dev.sfti-ai.org.html', external: true },
            { title: 'Server', href: 'https://statikfintechllc.github.io/statikfintechllc/server.sfti-ai.org.html', external: true }
        ]
    },
    dev: {
        logoText: 'SFTi Dev',
        logoSubtitle: 'PWA Hub',
        items: [
            { title: 'Home', href: 'https://statikfintechllc.github.io/statikfintechllc/', external: true },
            { title: 'Institute', href: 'https://statikfintechllc.github.io/statikfintechllc/#institute', external: true },
            { title: 'Projects', href: 'https://statikfintechllc.github.io/statikfintechllc/#projects', external: true },
            { title: 'Research', href: 'https://statikfintechllc.github.io/statikfintechllc/#research', external: true },
            { title: 'PWAs', href: '#pwas' },
            { title: 'Status', href: '#status' },
            { title: 'Server', href: 'https://statikfintechllc.github.io/statikfintechllc/server.sfti-ai.org.html', external: true }
        ]
    },
    server: {
        logoText: 'SFTi Server',
        logoSubtitle: 'Secure Access Portal',
        items: [
            { title: 'Home', href: 'https://statikfintechllc.github.io/statikfintechllc/', external: true },
            { title: 'Institute', href: 'https://statikfintechllc.github.io/statikfintechllc/#institute', external: true },
            { title: 'Projects', href: 'https://statikfintechllc.github.io/statikfintechllc/#projects', external: true },
            { title: 'Research', href: 'https://statikfintechllc.github.io/statikfintechllc/#research', external: true },
            { title: 'PWAs', href: 'https://statikfintechllc.github.io/statikfintechllc/dev.sfti-ai.org.html', external: true },
            { title: 'Docs', href: '#documentation' }
        ]
    }
};

if (typeof window !== 'undefined') {
    window.SFTiNavbar = SFTiNavbar;
    window.createSFTiNavbar = createSFTiNavbar;
    window.SFTiNavbarConfigs = SFTiNavbarConfigs;
}


(function registerSFTiDomainBindings() {
    const domain = 'server';
    const variant = 'desktop';
    const component = 'navbar';
    const themeTokens = {
    "primary": "#ff0080",
    "secondary": "#8000ff",
    "accent": "#00ff80",
    "danger": "#ff4040",
    "warning": "#ffb000",
    "success": "#00ff80",
    "bgDark": "#000",
    "bgDarker": "#0d0d0d",
    "bgCard": "#1a1a1a",
    "textLight": "#fff",
    "textGray": "#aaa",
    "textDim": "#666",
    "border": "#333",
    "glassBg": "rgba(26,26,26,.9)",
    "glassBorder": "rgba(255,0,128,.3)",
    "transition": "all 0.3s ease",
    "shadowGlow": "0 0 20px rgba(255,0,128,.4)"
};
    const globalObj = typeof window !== 'undefined' ? window : globalThis;

    const registrar = (typeof registerDomainTheme === 'function' && registerDomainTheme)
        || (globalObj && typeof globalObj.registerDomainTheme === 'function' && globalObj.registerDomainTheme)
        || null;

    if (registrar && themeTokens && Object.keys(themeTokens).length) {
        registrar(domain, themeTokens);
    }

    const resolver = (typeof getSFTiComponent === 'function' && getSFTiComponent)
        || (globalObj && typeof globalObj.getSFTiComponent === 'function' && globalObj.getSFTiComponent)
        || null;

    const registry = (typeof registerSFTiComponent === 'function' && registerSFTiComponent)
        || (globalObj && typeof globalObj.registerSFTiComponent === 'function' && globalObj.registerSFTiComponent)
        || null;

    let implementation = resolver ? resolver('global', variant, component) : null;

    if (!implementation && globalObj) {
        if (variant === 'mobile' && globalObj['SFTiMobileNavbar']) {
            implementation = globalObj['SFTiMobileNavbar'];
        } else if (globalObj['SFTiNavbar']) {
            implementation = globalObj['SFTiNavbar'];
        }
    }

    let DomainImplementation = implementation;

    if (implementation && typeof implementation === 'function') {
        DomainImplementation = class extends implementation {
            constructor(config = {}) {
                const nextConfig = (config && typeof config === 'object') ? { ...config } : {};
                if (!nextConfig.domain) {
                    nextConfig.domain = domain;
                }
                // Inject theme colors into config for components
                if (themeTokens) {
                    nextConfig.themeColors = {
                        primary: themeTokens.primary || '#ef4444',
                        secondary: themeTokens.secondary || '#eab308'
                    };
                }
                super(nextConfig);
            }
        };
        Object.setPrototypeOf(DomainImplementation, implementation);
    }

    if (!DomainImplementation) {
        if (globalObj && globalObj.console && typeof globalObj.console.warn === 'function') {
            globalObj.console.warn('[SFTi] Missing base implementation for ' + domain + '/' + variant + '/' + component);
        }
        return;
    }

    if (registry) {
        registry({ domain, variant, name: component, implementation: DomainImplementation });
    }

    if (globalObj) {
        if (!globalObj['ServerNavbarDesktop']) {
            globalObj['ServerNavbarDesktop'] = DomainImplementation;
        }
        if (!globalObj['createServerNavbarDesktop']) {
            globalObj['createServerNavbarDesktop'] = (config = {}) => new DomainImplementation(config);
        }
        globalObj.SFTiComponents = globalObj.SFTiComponents || {};
        globalObj.SFTiComponents[domain] = globalObj.SFTiComponents[domain] || {};
        globalObj.SFTiComponents[domain][variant] = globalObj.SFTiComponents[domain][variant] || {};
        globalObj.SFTiComponents[domain][variant][component] = DomainImplementation;
    }
})();

