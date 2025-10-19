/**
 * Auto-generated domain component
 * Domain   : www
 * Variant  : mobile
 * Component: navbar
 * Source   : components/global.c/mobile/navbar.js
 * Generated: 2025-10-19T01:28:31.072Z
 */

// @ts-nocheck
/**
 * SFTi Navbar Component (Mobile Variant)
 * =====================================
 *
 * Extends the desktop navbar with an immersive mobile drawer experience.
 */

const BaseNavbar = typeof SFTiNavbar !== 'undefined'
    ? SFTiNavbar
    : (typeof window !== 'undefined' ? window.SFTiNavbar : undefined);

if (!BaseNavbar) {
    throw new Error('SFTi Mobile Navbar: desktop variant must be loaded first.');
}

class SFTiMobileNavbar extends BaseNavbar {
    constructor(config) {
        super(config);
        this.resizeHandler = null;
    }

    getTemplate() {
        // Get theme colors from config or use defaults
        const primaryColor = this.config.themeColors?.primary || '#ef4444';
        const secondaryColor = this.config.themeColors?.secondary || '#eab308';
        
        return `
            <div class="fixed top-0 left-0 right-0 z-50" id="navbar-wrapper">
                <!-- Main navbar -->
                <nav class="bg-black/95 backdrop-blur-xl border-b border-white/10">
                    <div class="px-4 h-14 flex items-center justify-between">
                        <div class="flex flex-col leading-tight">
                            <span class="font-bold text-base" style="color: ${primaryColor};">${this.config.logoText}</span>
                            <span class="text-[10px] uppercase tracking-wide" style="color: ${secondaryColor};">
                                ${this.config.logoSubtitle}
                            </span>
                        </div>

                        <button id="mobile-menu-toggle" class="p-2 rounded-md border border-white/10">
                            <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>

                    <div id="mobile-menu" class="fixed left-0 right-0 bg-black/95 backdrop-blur-xl transform transition-transform duration-300 ease-in-out" style="z-index: 60;">
                        <div class="h-full flex flex-col">
                            <div class="flex items-center justify-between px-4 h-14 border-b border-white/10">
                                <div class="text-sm text-gray-300">Navigation</div>
                                <button id="mobile-menu-close" class="p-2 rounded-md border border-white/10">
                                    <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>

                            <div class="flex-1 overflow-y-auto px-6 py-8 space-y-4">
                                ${this.config.items.map(item => `
                                    <a href="${item.href}"
                                       class="block text-lg font-medium text-white/90 bg-white/5 border border-white/10 rounded-xl px-4 py-3 active:bg-white/10 touch-manipulation"
                                       ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                                        ${item.title}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </nav>
                
                <!-- Integrated ticker at bottom of navbar stack -->
                <div id="navbar-ticker" class="bg-black/95 backdrop-blur-xl border-b border-white/10" style="position: relative; z-index: 50;">
                    <div class="max-w-lg mx-auto px-4 py-3 flex items-center justify-center">
                        <img src="${this.config.tickerGifUrl || 'https://raw.githubusercontent.com/KDK-Grim/WorkFlowRepo-Mirror/master/docs/ticker-bot/ticker.gif'}" 
                             alt="Repo Ticker Stats"
                             class="h-10 w-auto object-contain mix-blend-screen"
                             onerror="this.style.display='none';" />
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Clean up existing listeners if being called multiple times
        this.cleanup();
        
        // Store references to avoid redundant DOM queries
        const mobileMenu = document.getElementById('mobile-menu');
        const navbarWrapper = document.getElementById('navbar-wrapper');
        const toggleButton = document.getElementById('mobile-menu-toggle');
        const closeButton = document.getElementById('mobile-menu-close');
        
        // Position and hide menu on init - use requestAnimationFrame to ensure DOM is ready
        const initializeMenu = () => {
            if (mobileMenu && navbarWrapper) {
                // Use requestAnimationFrame to ensure layout is complete
                requestAnimationFrame(() => {
                    // Calculate navbar + ticker height from the wrapper
                    const navbarHeight = navbarWrapper.offsetHeight;
                    
                    // Position menu below navbar with calculated height
                    mobileMenu.style.top = `${navbarHeight}px`;
                    mobileMenu.style.height = `calc(100vh - ${navbarHeight}px)`;
                    
                    // Hide menu by translating it down offscreen
                    mobileMenu.style.transform = 'translateY(100%)';
                });
            }
        };

        // Initialize immediately
        initializeMenu();
        
        // Add resize listener with cleanup support
        this.resizeHandler = initializeMenu;
        window.addEventListener('resize', this.resizeHandler);

        if (toggleButton) {
            toggleButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeMobileMenu();
            });
        }

        // Close menu when clicking a link
        if (mobileMenu) {
            const links = mobileMenu.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.mobileMenuOpen && mobileMenu && toggleButton) {
                if (!mobileMenu.contains(e.target) && !toggleButton.contains(e.target)) {
                    this.closeMobileMenu();
                }
            }
        });
    }

    cleanup() {
        // Remove resize listener to prevent memory leaks
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
            this.resizeHandler = null;
        }
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu) return;
        
        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        // Use inline style only for consistent behavior across all browsers
        mobileMenu.style.transform = this.mobileMenuOpen ? 'translateY(0)' : 'translateY(100%)';
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu) return;
        
        this.mobileMenuOpen = false;
        // Use inline style only for consistent behavior across all browsers
        mobileMenu.style.transform = 'translateY(100%)';
    }
}

function createMobileSFTiNavbar(config) {
    return new SFTiMobileNavbar(config);
}

if (typeof window !== 'undefined') {
    window.SFTiMobileNavbar = SFTiMobileNavbar;
    window.createMobileSFTiNavbar = createMobileSFTiNavbar;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SFTiMobileNavbar, createMobileSFTiNavbar };
}


(function registerSFTiDomainBindings() {
    const domain = 'www';
    const variant = 'mobile';
    const component = 'navbar';
    const themeTokens = {
    "primary": "red",
    "secondary": "gold",
    "bgDark": "#000",
    "bgDarker": "#111",
    "textLight": "#fff",
    "textGray": "#ccc",
    "glassBg": "rgba(0,0,0,.1)",
    "glassBorder": "hsla(0,0%,100%,.1)",
    "transition": "all 0.3s ease"
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
                // Inject theme colors into config for navbar components
                if (component === 'navbar' && themeTokens) {
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
        if (!globalObj['WwwNavbarMobile']) {
            globalObj['WwwNavbarMobile'] = DomainImplementation;
        }
        if (!globalObj['createWwwNavbarMobile']) {
            globalObj['createWwwNavbarMobile'] = (config = {}) => new DomainImplementation(config);
        }
        globalObj.SFTiComponents = globalObj.SFTiComponents || {};
        globalObj.SFTiComponents[domain] = globalObj.SFTiComponents[domain] || {};
        globalObj.SFTiComponents[domain][variant] = globalObj.SFTiComponents[domain][variant] || {};
        globalObj.SFTiComponents[domain][variant][component] = DomainImplementation;
    }
})();

