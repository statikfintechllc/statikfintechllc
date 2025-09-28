// @ts-nocheck
/**
 * SFTi Component System Architecture
 * ==================================
 *
 * Central registry for component implementations and domain theming. The
 * registry understands desktop/mobile variants so the build pipeline can
 * project the correct assets into each target domain.
 */

const DEFAULT_DOMAINS = ['global', 'www', 'dev', 'server'];
const DEFAULT_VARIANTS = ['desktop', 'mobile'];

const SFTiComponents = DEFAULT_DOMAINS.reduce((acc, domain) => {
    acc[domain] = DEFAULT_VARIANTS.reduce((variantMap, variant) => {
        variantMap[variant] = {};
        return variantMap;
    }, {});
    return acc;
}, {});

const BaseTheme = {
    primary: '#FF0000',
    secondary: '#FFD700',
    dark: '#000000',
    darker: '#111111',
    light: '#FFFFFF',
    gray: '#CCCCCC'
};

const InitialThemes = {
    global: BaseTheme,
    www: {
        accent: '#E11D48',
        highlight: '#FCD34D'
    },
    dev: {
        accent: '#3B82F6',
        highlight: '#10B981'
    },
    server: {
        accent: '#8B5CF6',
        highlight: '#F59E0B'
    }
};

const SFTiThemes = DEFAULT_DOMAINS.reduce((acc, domain) => {
    acc[domain] = {
        ...BaseTheme,
        ...(InitialThemes[domain] || {})
    };
    return acc;
}, {});

function registerComponent({ domain = 'global', variant = 'desktop', name, implementation }) {
    if (!name || !implementation) {
        console.warn('[SFTi] registerComponent requires a name and implementation');
        return;
    }

    if (!SFTiComponents[domain]) {
        SFTiComponents[domain] = {};
    }

    if (!SFTiComponents[domain][variant]) {
        SFTiComponents[domain][variant] = {};
    }

    SFTiComponents[domain][variant][name] = implementation;
}

function getComponent(domain, variant, name) {
    return SFTiComponents?.[domain]?.[variant]?.[name] ?? null;
}

function registerDomainTheme(domain, tokens = {}) {
    if (!domain) {
        console.warn('[SFTi] registerDomainTheme requires a domain');
        return;
    }

    SFTiThemes[domain] = {
        ...(domain === 'global' ? BaseTheme : { ...BaseTheme, ...(SFTiThemes[domain] || {}) }),
        ...tokens
    };
}

function applyThemeToDocument(domain = 'global') {
    const theme = SFTiThemes[domain] || BaseTheme;
    const root = typeof document !== 'undefined' ? document.documentElement : null;

    if (!root) return theme;

    Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(`--sfti-${key}`, value);
    });

    return theme;
}

function getDomainTheme(domain = 'global') {
    if (!domain || !SFTiThemes[domain]) {
        return { ...BaseTheme };
    }
    return { ...SFTiThemes[domain] };
}

class SFTiComponent {
    constructor(type, domain = 'global', variant = 'desktop') {
        this.type = type;
        this.domain = domain;
        this.variant = variant;
        this.theme = SFTiThemes[domain] || SFTiThemes.global;
        this.initialized = false;
    }

    init() {
        this.applyTheme();
        this.attachEventListeners();
        this.initialized = true;
    }

    applyTheme() {
        applyThemeToDocument(this.domain);
    }

    attachEventListeners() {}

    render() {
        throw new Error('render() method must be implemented');
    }

    resolveContainer(target) {
        if (typeof target === 'string') {
            return typeof document !== 'undefined' ? document.querySelector(target) : null;
        }

        if (target && typeof target.querySelector === 'function') {
            return target;
        }

        return null;
    }

    mount(selector) {
        const target = this.resolveContainer(selector);
        if (!target) {
            console.error(`[SFTi] mount target not found for ${this.type}`);
            return null;
        }
        target.innerHTML = '';
        return this.render(target);
    }
}

if (typeof window !== 'undefined') {
    window.SFTiComponent = SFTiComponent;
    window.SFTiComponents = SFTiComponents;
    window.SFTiThemes = SFTiThemes;
    window.registerSFTiComponent = registerComponent;
    window.getSFTiComponent = getComponent;
    window.registerDomainTheme = registerDomainTheme;
    window.applyThemeToDocument = applyThemeToDocument;
    window.getSFTiTheme = getDomainTheme;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SFTiComponent,
        SFTiComponents,
        SFTiThemes,
        registerComponent,
        getComponent,
        registerDomainTheme,
        applyThemeToDocument,
        getDomainTheme
    };
}