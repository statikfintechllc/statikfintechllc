/**
 * Auto-generated domain component
 * Domain   : www
 * Variant  : desktop
 * Component: navbar
 * Source   : components/global.c/desktop/navbar.js
 * Generated: 2025-09-29T03:16:27.838Z
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
            <nav class="fixed top-0 left-0 right-0 z-50" style="height: 48px; background: rgba(0, 0, 0, 0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                <div class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between" style="max-width: 80rem; margin: 0 auto; padding: 0 1rem; height: 100%; display: flex; align-items: center; justify-content: space-between;">
                    <div class="flex flex-col justify-center leading-none py-1" style="display: flex; flex-direction: column; justify-content: center; line-height: 1; padding: 0.25rem 0;">
                        <span class="text-red-500 font-bold leading-tight" style="color: #FF0000; font-weight: bold; line-height: 1.2; font-size: 1.1rem;">
                            ${this.config.logoText}
                        </span>
                        <span class="text-yellow-400 leading-tight" style="color: #FFD700; line-height: 1.2; font-size: 0.7rem;">
                            ${this.config.logoSubtitle}
                        </span>
                    </div>

                    <div id="desktop-nav-links" style="display: flex; align-items: center; gap: 1.5rem;">
                        ${this.config.items.map(item => `
                            <a href="${item.href}"
                               style="color: white; text-decoration: none; font-size: 0.875rem; transition: color 0.2s;"
                               onmouseover="this.style.color='#FFD700'"
                               onmouseout="this.style.color='white'"
                               ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                                ${item.title}
                            </a>
                        `).join('')}
                    </div>

                    <button id="mobile-menu-toggle" style="display: none; padding: 0.5rem; color: white; background: transparent; border: none; cursor: pointer;">
                        <svg style="height: 1.25rem; width: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>

                <div id="mobile-menu" style="display: none; position: fixed; top: 0; bottom: 0; right: 0; width: 16rem; background: rgba(0, 0, 0, 0.98); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-left: 1px solid rgba(255, 255, 255, 0.1); transform: translateX(100%); transition: transform 0.3s ease-in-out; z-index: 60;">
                    <div style="display: flex; flex-direction: column; padding: 1.5rem; gap: 1rem; margin-top: 4rem;">
                        <button id="mobile-menu-close" style="align-self: flex-end; padding: 0.5rem; margin-bottom: 1rem; color: white; background: transparent; border: none; cursor: pointer;">
                            <svg style="height: 1.25rem; width: 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        ${this.config.items.map(item => `
                            <a href="${item.href}"
                               style="color: white; text-decoration: none; font-size: 1rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); transition: color 0.2s;"
                               onmouseover="this.style.color='#FFD700'"
                               onmouseout="this.style.color='white'"
                               ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                                ${item.title}
                            </a>
                        `).join('')}
                    </div>
                </div>
            </nav>
            <script>
                (function() {
                    const mobileToggle = document.getElementById('mobile-menu-toggle');
                    const desktopLinks = document.getElementById('desktop-nav-links');
                    
                    // Show/hide based on screen width
                    function updateNav() {
                        if (window.innerWidth < 768) {
                            mobileToggle.style.display = 'block';
                            desktopLinks.style.display = 'none';
                        } else {
                            mobileToggle.style.display = 'none';
                            desktopLinks.style.display = 'flex';
                        }
                    }
                    
                    updateNav();
                    window.addEventListener('resize', updateNav);
                })();
            </script>
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
            { title: 'PWAs', href: 'https://dev.sfti-ai.org', external: true },
            { title: 'Server', href: 'https://server.sfti-ai.org', external: true }
        ]
    },
    dev: {
        logoText: 'SFTi Dev',
        logoSubtitle: 'PWA Hub',
        items: [
            { title: 'Home', href: 'https://www.sfti-ai.org', external: true },
            { title: 'Institute', href: 'https://www.sfti-ai.org#institute', external: true },
            { title: 'Projects', href: 'https://www.sfti-ai.org#projects', external: true },
            { title: 'Research', href: 'https://www.sfti-ai.org#research', external: true },
            { title: 'PWAs', href: '#pwas' },
            { title: 'Status', href: '#status' },
            { title: 'Server', href: 'https://server.sfti-ai.org', external: true }
        ]
    },
    server: {
        logoText: 'SFTi Server',
        logoSubtitle: 'Secure Access Portal',
        items: [
            { title: 'Home', href: 'https://www.sfti-ai.org', external: true },
            { title: 'Institute', href: 'https://www.sfti-ai.org#institute', external: true },
            { title: 'Projects', href: 'https://www.sfti-ai.org#projects', external: true },
            { title: 'Research', href: 'https://www.sfti-ai.org#research', external: true },
            { title: 'PWAs', href: 'https://dev.sfti-ai.org', external: true },
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
    const domain = 'www';
    const variant = 'desktop';
    const component = 'navbar';
    const themeTokens = {};
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
        if (!globalObj['WwwNavbarDesktop']) {
            globalObj['WwwNavbarDesktop'] = DomainImplementation;
        }
        if (!globalObj['createWwwNavbarDesktop']) {
            globalObj['createWwwNavbarDesktop'] = (config = {}) => new DomainImplementation(config);
        }
        globalObj.SFTiComponents = globalObj.SFTiComponents || {};
        globalObj.SFTiComponents[domain] = globalObj.SFTiComponents[domain] || {};
        globalObj.SFTiComponents[domain][variant] = globalObj.SFTiComponents[domain][variant] || {};
        globalObj.SFTiComponents[domain][variant][component] = DomainImplementation;
    }
})();

