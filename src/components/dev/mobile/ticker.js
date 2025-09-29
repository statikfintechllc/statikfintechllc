/**
 * Auto-generated domain component
 * Domain   : dev
 * Variant  : mobile
 * Component: ticker
 * Source   : components/global.c/mobile/ticker.js
 * Generated: 2025-09-29T03:17:02.831Z
 */

// @ts-nocheck
/**
 * SFTi Global Ticker Component (Mobile Variant)
 * ===========================================
 */

const BaseTicker = typeof SFTiTicker !== 'undefined'
    ? SFTiTicker
    : (typeof window !== 'undefined' ? window.SFTiTicker : undefined);

if (!BaseTicker) {
    throw new Error('SFTi Mobile Ticker: desktop variant must be loaded first.');
}

class SFTiMobileTicker extends BaseTicker {
    constructor(config = {}) {
        super({
            hidden: false,
            ...config
        });
    }

    render(container) {
        const target = this.resolveContainer(container);

        if (!target) {
            console.error('SFTiMobileTicker: Container not found');
            return null;
        }

        target.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'sfti-ticker-mobile fixed inset-x-0 bottom-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/10';

        const content = document.createElement('div');
        content.className = 'max-w-lg mx-auto px-4 py-3 flex items-center space-x-3';

        const badge = document.createElement('span');
        badge.className = 'text-xs font-semibold tracking-wide uppercase text-yellow-400/90';
        badge.textContent = 'Live Repo Feed';

        const image = document.createElement('img');
        image.src = this.config.gifUrl;
        image.alt = 'Repo Ticker Stats';
        image.className = 'h-10 w-auto flex-1 object-contain mix-blend-screen';
        image.loading = 'lazy';

        image.onerror = () => {
            console.warn('SFTiMobileTicker: Failed to load ticker image');
            wrapper.style.display = 'none';
        };

        content.appendChild(badge);
        content.appendChild(image);
        wrapper.appendChild(content);
        target.appendChild(wrapper);

        this.init();
        return wrapper;
    }
}

function createMobileSFTiTicker(config) {
    return new SFTiMobileTicker(config);
}

if (typeof window !== 'undefined') {
    window.SFTiMobileTicker = SFTiMobileTicker;
    window.createMobileSFTiTicker = createMobileSFTiTicker;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SFTiMobileTicker, createMobileSFTiTicker };
}

const bootTicker = () => {
    const container = document.getElementById('ticker-container');
    if (container) {
        const ticker = new SFTiMobileTicker();
        ticker.render(container);
    }
};

document.addEventListener('DOMContentLoaded', bootTicker);


(function registerSFTiDomainBindings() {
    const domain = 'dev';
    const variant = 'mobile';
    const component = 'ticker';
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
        if (variant === 'mobile' && globalObj['SFTiMobileTicker']) {
            implementation = globalObj['SFTiMobileTicker'];
        } else if (globalObj['SFTiTicker']) {
            implementation = globalObj['SFTiTicker'];
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
        if (!globalObj['DevTickerMobile']) {
            globalObj['DevTickerMobile'] = DomainImplementation;
        }
        if (!globalObj['createDevTickerMobile']) {
            globalObj['createDevTickerMobile'] = (config = {}) => new DomainImplementation(config);
        }
        globalObj.SFTiComponents = globalObj.SFTiComponents || {};
        globalObj.SFTiComponents[domain] = globalObj.SFTiComponents[domain] || {};
        globalObj.SFTiComponents[domain][variant] = globalObj.SFTiComponents[domain][variant] || {};
        globalObj.SFTiComponents[domain][variant][component] = DomainImplementation;
    }
})();

