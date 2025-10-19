/**
 * Auto-generated domain component
 * Domain   : server
 * Variant  : mobile
 * Component: card
 * Source   : components/global.c/mobile/card.js
 * Generated: 2025-10-19T00:07:55.101Z
 */

// @ts-nocheck
/**
 * SFTi Mobile Card Component
 * =========================
 *
 * Extends the desktop card implementation with mobile-first defaults.
 * Loads the base class from ../desktop/card.js and trims footprint so
 * cards remain legible on smaller viewports.
 */

const BaseCard = typeof SFTiCard !== 'undefined'
    ? SFTiCard
    : (typeof window !== 'undefined' ? window.SFTiCard : undefined);

if (!BaseCard) {
    throw new Error('SFTi Mobile Card: desktop variant must be loaded first.');
}

class SFTiMobileCard extends BaseCard {
    constructor(config = {}) {
        super({
            size: 'small',
            variant: 'glass',
            interactive: true,
            ...config
        });
    }

    getCardClasses() {
        const base = super.getCardClasses().split(' ');

        const filtered = base.filter((token) => ![
            'w-96', 'w-80', 'w-64',
            'h-80', 'h-64', 'h-48',
            'p-8', 'p-6', 'p-4'
        ].includes(token));

        filtered.push(
            'w-full',
            'max-w-sm',
            'p-4',
            'h-auto',
            'min-h-[14rem]'
        );

        return Array.from(new Set(filtered)).join(' ');
    }
}

function createMobileSFTiCard(config) {
    return new SFTiMobileCard(config);
}

if (typeof window !== 'undefined') {
    window.SFTiMobileCard = SFTiMobileCard;
    window.createMobileSFTiCard = createMobileSFTiCard;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SFTiMobileCard, createMobileSFTiCard };
}


(function registerSFTiDomainBindings() {
    const domain = 'server';
    const variant = 'mobile';
    const component = 'card';
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
        if (variant === 'mobile' && globalObj['SFTiMobileCard']) {
            implementation = globalObj['SFTiMobileCard'];
        } else if (globalObj['SFTiCard']) {
            implementation = globalObj['SFTiCard'];
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
        if (!globalObj['ServerCardMobile']) {
            globalObj['ServerCardMobile'] = DomainImplementation;
        }
        if (!globalObj['createServerCardMobile']) {
            globalObj['createServerCardMobile'] = (config = {}) => new DomainImplementation(config);
        }
        globalObj.SFTiComponents = globalObj.SFTiComponents || {};
        globalObj.SFTiComponents[domain] = globalObj.SFTiComponents[domain] || {};
        globalObj.SFTiComponents[domain][variant] = globalObj.SFTiComponents[domain][variant] || {};
        globalObj.SFTiComponents[domain][variant][component] = DomainImplementation;
    }
})();

