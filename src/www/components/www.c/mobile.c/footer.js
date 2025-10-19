/**
 * Auto-generated domain component
 * Domain   : www
 * Variant  : mobile
 * Component: footer
 * Source   : components/global.c/mobile/footer.js
 * Generated: 2025-10-19T10:13:03.156Z
 */

// @ts-nocheck
/**
 * Global Footer Component (Mobile Variant)
 * =======================================
 *
 * Wraps the desktop footer with a simplified layout optimised for
 * stacked mobile presentation.
 */

const BaseFooter = typeof SFTiFooter !== 'undefined'
    ? SFTiFooter
    : (typeof window !== 'undefined' ? window.SFTiFooter : undefined);

if (!BaseFooter) {
    throw new Error('SFTi Mobile Footer: desktop variant must be loaded first.');
}

class SFTiMobileFooter extends BaseFooter {
    getTemplate() {
        return `
            <footer class="sfti-footer bg-black border-t border-white/10 mt-auto">
                <div class="max-w-xl mx-auto px-4 py-10 space-y-8">
                    <div class="text-center space-y-3">
                        <h3 class="text-white font-bold text-lg ${this.getDomainAccent()}">${this.config.logoText}</h3>
                        <p class="text-gray-400 text-sm leading-relaxed">${this.config.tagline}</p>
                        <div class="flex items-center justify-center space-x-4">
                            ${this.renderSocialLinks()}
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-6 text-center">
                        <div>
                            <h4 class="text-white font-semibold mb-3">Quick Links</h4>
                            <ul class="space-y-2">
                                ${this.renderQuickLinks()}
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-white font-semibold mb-3">Domains</h4>
                            <ul class="space-y-2">
                                ${this.renderDomainLinks()}
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-white font-semibold mb-3">Legal</h4>
                            <ul class="space-y-2">
                                ${this.renderLegalLinks()}
                            </ul>
                        </div>
                    </div>

                    <div class="text-center text-sm text-gray-400 space-y-2">
                        <div>
                            &copy; ${this.config.copyright.year} ${this.config.copyright.entity}
                            ${this.config.copyright.allRights ? '· All rights reserved.' : ''}
                        </div>
                        <div>${this.config.contact.email} · ${this.config.contact.location}</div>
                        <div class="flex items-center justify-center space-x-2 text-gray-300">
                            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span>System Status: Operational</span>
                            <span class="text-gray-500">|</span>
                            <span class="${this.getDomainAccent()}">${this.getDomainLabel()}</span>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

function createMobileSFTiFooter(config = {}) {
    return new SFTiMobileFooter({ ...config, responsive: true });
}

if (typeof window !== 'undefined') {
    window.SFTiMobileFooter = SFTiMobileFooter;
    window.createMobileSFTiFooter = createMobileSFTiFooter;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SFTiMobileFooter, createMobileSFTiFooter };
}


(function registerSFTiDomainBindings() {
    const domain = 'www';
    const variant = 'mobile';
    const component = 'footer';
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
        if (!globalObj['WwwFooterMobile']) {
            globalObj['WwwFooterMobile'] = DomainImplementation;
        }
        if (!globalObj['createWwwFooterMobile']) {
            globalObj['createWwwFooterMobile'] = (config = {}) => new DomainImplementation(config);
        }
        globalObj.SFTiComponents = globalObj.SFTiComponents || {};
        globalObj.SFTiComponents[domain] = globalObj.SFTiComponents[domain] || {};
        globalObj.SFTiComponents[domain][variant] = globalObj.SFTiComponents[domain][variant] || {};
        globalObj.SFTiComponents[domain][variant][component] = DomainImplementation;
    }
})();

