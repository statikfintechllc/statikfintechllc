/**
 * Auto-generated domain component
 * Domain   : dev
 * Variant  : mobile
 * Component: navbar
 * Source   : components/global.c/mobile/navbar.js
 * Generated: 2025-11-24T02:36:05.726Z
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
        this.toggleHandler = null;
        this.closeHandler = null;
        this.documentClickHandler = null;
        this.linkHandlers = [];
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

        // Store toggle button handler
        if (toggleButton) {
            this.toggleHandler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            };
            toggleButton.addEventListener('click', this.toggleHandler);
        }

        // Store close button handler
        if (closeButton) {
            this.closeHandler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeMobileMenu();
            };
            closeButton.addEventListener('click', this.closeHandler);
        }

        // Store link handlers
        if (mobileMenu) {
            const links = mobileMenu.querySelectorAll('a');
            this.linkHandlers = [];
            links.forEach(link => {
                const handler = () => {
                    this.closeMobileMenu();
                };
                this.linkHandlers.push({ element: link, handler });
                link.addEventListener('click', handler);
            });
        }

        // Store document click handler
        this.documentClickHandler = (e) => {
            if (this.mobileMenuOpen && mobileMenu && toggleButton) {
                if (!mobileMenu.contains(e.target) && !toggleButton.contains(e.target)) {
                    this.closeMobileMenu();
                }
            }
        };
        document.addEventListener('click', this.documentClickHandler);
    }

    cleanup() {
        // Remove window resize listener
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
            this.resizeHandler = null;
        }
        
        // Remove toggle button listener
        if (this.toggleHandler) {
            const toggleButton = document.getElementById('mobile-menu-toggle');
            if (toggleButton) {
                toggleButton.removeEventListener('click', this.toggleHandler);
            }
            this.toggleHandler = null;
        }
        
        // Remove close button listener
        if (this.closeHandler) {
            const closeButton = document.getElementById('mobile-menu-close');
            if (closeButton) {
                closeButton.removeEventListener('click', this.closeHandler);
            }
            this.closeHandler = null;
        }
        
        // Remove link listeners
        if (this.linkHandlers && this.linkHandlers.length > 0) {
            this.linkHandlers.forEach(({ element, handler }) => {
                element.removeEventListener('click', handler);
            });
            this.linkHandlers = [];
        }
        
        // Remove document click listener
        if (this.documentClickHandler) {
            document.removeEventListener('click', this.documentClickHandler);
            this.documentClickHandler = null;
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
    const domain = 'dev';
    const variant = 'mobile';
    const component = 'navbar';
    const themeTokens = {
    "primary": "#0f8",
    "secondary": "#0af",
    "accent": "#ff6b00",
    "bgDark": "#0a0a0a",
    "bgDarker": "#050505",
    "bgCard": "#1a1a1a",
    "textLight": "#fff",
    "textGray": "#aaa",
    "textGreen": "#0f8",
    "border": "#333",
    "glassBg": "rgba(26,26,26,.8)",
    "glassBorder": "rgba(0,255,136,.2)",
    "transition": "all 0.3s ease",
    "shadowGlow": "0 0 20px rgba(0,255,136,.3)"
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
        if (!globalObj['DevNavbarMobile']) {
            globalObj['DevNavbarMobile'] = DomainImplementation;
        }
        if (!globalObj['createDevNavbarMobile']) {
            globalObj['createDevNavbarMobile'] = (config = {}) => new DomainImplementation(config);
        }
        globalObj.SFTiComponents = globalObj.SFTiComponents || {};
        globalObj.SFTiComponents[domain] = globalObj.SFTiComponents[domain] || {};
        globalObj.SFTiComponents[domain][variant] = globalObj.SFTiComponents[domain][variant] || {};
        globalObj.SFTiComponents[domain][variant][component] = DomainImplementation;
    }
})();

