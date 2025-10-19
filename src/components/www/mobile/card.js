/**
 * Auto-generated domain component
 * Domain   : www
 * Variant  : mobile
 * Component: card
 * Source   : components/global.c/mobile/card.js
 * Generated: 2025-10-19T00:07:54.738Z
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
    const domain = 'www';
    const variant = 'mobile';
    const component = 'card';
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
        if (!globalObj['WwwCardMobile']) {
            globalObj['WwwCardMobile'] = DomainImplementation;
        }
        if (!globalObj['createWwwCardMobile']) {
            globalObj['createWwwCardMobile'] = (config = {}) => new DomainImplementation(config);
        }
        globalObj.SFTiComponents = globalObj.SFTiComponents || {};
        globalObj.SFTiComponents[domain] = globalObj.SFTiComponents[domain] || {};
        globalObj.SFTiComponents[domain][variant] = globalObj.SFTiComponents[domain][variant] || {};
        globalObj.SFTiComponents[domain][variant][component] = DomainImplementation;
    }
})();

