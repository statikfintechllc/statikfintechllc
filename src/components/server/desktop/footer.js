/**
 * Auto-generated domain component
 * Domain   : server
 * Variant  : desktop
 * Component: footer
 * Source   : components/global.c/desktop/footer.js
 * Generated: 2025-10-19T02:54:38.727Z
 */

// @ts-nocheck
/**
 * SFTi Footer Component (Desktop Variant)
 * ======================================
 *
 * Provides a simple, clean footer for all domains.
 * Mobile specific behaviour lives in ../mobile/footer.js.
 */

class SFTiFooter {
    constructor(config) {
        this.config = {
            domain: 'global',
            containerId: 'footer-container',
            ...config
        };
        this.modalOpen = false;
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        const container = document.getElementById(this.config.containerId);
        if (!container) {
            console.error(`Container with id "${this.config.containerId}" not found`);
            return;
        }

        container.innerHTML = this.getTemplate();
    }

    getTemplate() {
        const accentColor = this.getDomainAccent();
        const year = new Date().getFullYear();
        
        return `
            <footer class="bg-black border-t border-white/10 mt-auto py-8">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="flex flex-col items-center space-y-4">
                        <!-- Copyright -->
                        <div class="text-gray-400 text-sm">
                            © ${year} StatikFinTech, LLC
                        </div>
                        
                        <!-- Links -->
                        <div class="flex items-center space-x-6">
                            <a href="https://github.com/statikfintechllc" 
                               class="${accentColor} hover:opacity-80 transition-opacity text-sm font-medium"
                               target="_blank" rel="noopener noreferrer">
                                GitHub
                            </a>
                            <button id="connect-modal-trigger"
                                    class="${accentColor} hover:opacity-80 transition-opacity text-sm font-medium cursor-pointer bg-transparent border-none">
                                Connect
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            <!-- Connect Modal -->
            <div id="connect-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden items-center justify-center">
                <div class="bg-gray-900 border border-white/10 rounded-lg p-8 max-w-md w-full mx-4 relative">
                    <button id="connect-modal-close" class="absolute top-4 right-4 text-gray-400 hover:text-white">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                    
                    <h3 class="text-white text-xl font-bold mb-6">Connect with Us</h3>
                    
                    <div class="flex flex-wrap gap-3 justify-center">
                        <a href="https://github.com/statikfintechllc" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.shields.io/badge/-000000?logo=github&logoColor=white&style=flat-square" alt="GitHub">
                        </a>
                        <a href="https://www.linkedin.com/in/daniel-morris-780804368" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.shields.io/badge/In-e11d48?logo=linkedin&logoColor=white&style=flat-square" alt="LinkedIn">
                        </a>
                        <a href="mailto:daniel@sfti-ai.org">
                            <img src="https://img.shields.io/badge/-D14836?logo=gmail&logoColor=white&style=flat-square" alt="Email">
                        </a>
                        <a href="https://www.youtube.com/@Gremlins_Forge" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.shields.io/badge/-FF0000?logo=youtube&logoColor=white&style=flat-square" alt="YouTube">
                        </a>
                        <a href="https://x.com/GremlinsForge" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.shields.io/badge/-000000?logo=x&logoColor=white&style=flat-square" alt="X/Twitter">
                        </a>
                        <a href="https://medium.com/@ascend.gremlin" target="_blank" rel="noopener noreferrer">
                            <img src="https://img.shields.io/badge/-000000?logo=medium&logoColor=white&style=flat-square" alt="Medium">
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    getDomainAccent() {
        const accents = {
            'www': 'text-red-500',
            'dev': 'text-blue-500',
            'server': 'text-purple-500',
            'global': 'text-red-500'
        };
        return accents[this.config.domain] || accents.global;
    }

    attachEventListeners() {
        const modalTrigger = document.getElementById('connect-modal-trigger');
        const modal = document.getElementById('connect-modal');
        const closeButton = document.getElementById('connect-modal-close');

        modalTrigger?.addEventListener('click', () => this.openModal());
        closeButton?.addEventListener('click', () => this.closeModal());
        
        modal?.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalOpen) {
                this.closeModal();
            }
        });
    }

    openModal() {
        const modal = document.getElementById('connect-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            this.modalOpen = true;
        }
    }

    closeModal() {
        const modal = document.getElementById('connect-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            this.modalOpen = false;
        }
    }
}

if (typeof window !== 'undefined') {
    window.SFTiFooter = SFTiFooter;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SFTiFooter };
}


(function registerSFTiDomainBindings() {
    const domain = 'server';
    const variant = 'desktop';
    const component = 'footer';
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
        if (variant === 'mobile' && globalObj['SFTiMobileFooter']) {
            implementation = globalObj['SFTiMobileFooter'];
        } else if (globalObj['SFTiFooter']) {
            implementation = globalObj['SFTiFooter'];
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
        if (!globalObj['ServerFooterDesktop']) {
            globalObj['ServerFooterDesktop'] = DomainImplementation;
        }
        if (!globalObj['createServerFooterDesktop']) {
            globalObj['createServerFooterDesktop'] = (config = {}) => new DomainImplementation(config);
        }
        globalObj.SFTiComponents = globalObj.SFTiComponents || {};
        globalObj.SFTiComponents[domain] = globalObj.SFTiComponents[domain] || {};
        globalObj.SFTiComponents[domain][variant] = globalObj.SFTiComponents[domain][variant] || {};
        globalObj.SFTiComponents[domain][variant][component] = DomainImplementation;
    }
})();

