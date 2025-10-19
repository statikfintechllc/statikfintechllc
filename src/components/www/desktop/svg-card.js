/**
 * Auto-generated domain component
 * Domain   : www
 * Variant  : desktop
 * Component: svg-card
 * Source   : components/global.c/desktop/svg-card.js
 * Generated: 2025-10-19T00:07:54.779Z
 */

// @ts-nocheck
/**
 * SFTi SVG Card Component (Desktop Variant)
 * =======================================
 *
 * Retains the legacy SVG card implementation for desktop layouts. A
 * mobile optimised wrapper lives in ../mobile/svg-card.js.
 */

class SFTiSVGCard extends SFTiComponent {
    constructor(config = {}) {
        super('svg-card', config.domain || 'www');

        this.config = {
            svgPath: '',
            title: '',
            description: '',
            link: null,
            external: false,
            category: 'default',
            size: 'medium',
            animated: true,
            ...config
        };
    }

    render(container) {
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }

        if (!container) {
            console.error('SVG Card container not found');
            return;
        }

        const cardElement = document.createElement('div');
        cardElement.className = this.getCardClasses();
        cardElement.innerHTML = this.getTemplate();

        if (this.config.link) {
            this.makeClickable(cardElement);
        }

        container.appendChild(cardElement);
        this.attachEventListeners(cardElement);

        return cardElement;
    }

    getCardClasses() {
        const baseClasses = [
            'sfti-svg-card',
            'group',
            'relative',
            'rounded-xl',
            'overflow-hidden',
            'transition-all',
            'duration-300',
            'ease-in-out',
            'border',
            'border-white/10',
            'hover:border-red-500/50',
            'hover:shadow-xl',
            'hover:shadow-red-500/20',
            'hover:-translate-y-1'
        ];

        const categoryClasses = {
            project: ['bg-gradient-to-br', 'from-red-900/20', 'to-black/80'],
            paper: ['bg-gradient-to-br', 'from-blue-900/20', 'to-black/80'],
            repo: ['bg-gradient-to-br', 'from-green-900/20', 'to-black/80'],
            institute: ['bg-gradient-to-br', 'from-purple-900/20', 'to-black/80'],
            default: ['bg-gradient-to-br', 'from-gray-900/20', 'to-black/80']
        };

        const sizeClasses = {
            small: ['w-64', 'h-48'],
            medium: ['w-80', 'h-64'],
            large: ['w-96', 'h-80']
        };

        const animationClasses = this.config.animated ? ['hover:scale-[1.02]'] : [];

        return [
            ...baseClasses,
            ...categoryClasses[this.config.category],
            ...sizeClasses[this.config.size],
            ...animationClasses,
            'cursor-pointer'
        ].join(' ');
    }

    getTemplate() {
        return `
            <div class="relative w-full h-full p-6 flex flex-col">
                ${this.getSVGSection()}
                ${this.getContentSection()}
                ${this.getOverlayEffects()}
            </div>
        `;
    }

    getSVGSection() {
        if (!this.config.svgPath) return '';

        return `
            <div class="flex-1 flex items-center justify-center mb-4 relative">
                <div class="w-full h-32 flex items-center justify-center">
                    <img
                        src="${this.config.svgPath}"
                        alt="${this.config.title}"
                        class="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                    />
                    <div class="hidden w-16 h-16 bg-red-500/20 rounded-full items-center justify-center">
                        <span class="text-red-400 text-2xl">${this.getCategoryIcon()}</span>
                    </div>
                </div>
            </div>
        `;
    }

    getCategoryIcon() {
        const icons = {
            project: '🚀',
            paper: '📄',
            repo: '📦',
            institute: '🎓',
            default: '📊'
        };
        return icons[this.config.category] || icons.default;
    }

    getContentSection() {
        return `
            <div class="relative z-10 space-y-3">
                ${this.config.title ? `
                    <h3 class="text-lg font-semibold text-white group-hover:text-red-400 transition-colors leading-tight">
                        ${this.config.title}
                    </h3>
                ` : ''}

                ${this.config.description ? `
                    <p class="text-gray-300 text-sm leading-relaxed line-clamp-3">
                        ${this.config.description}
                    </p>
                ` : ''}

                ${this.getActionSection()}
            </div>
        `;
    }

    getActionSection() {
        if (!this.config.link) return '';

        const linkText = this.config.external ? 'View External' : 'Learn More';
        const icon = this.config.external ? '↗' : '→';

        return `
            <div class="flex items-center justify-between pt-3 border-t border-white/10">
                <span class="text-xs text-gray-400 group-hover:text-red-400 transition-colors">
                    ${linkText} ${icon}
                </span>
                <div class="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span class="text-red-400 text-xs">${icon}</span>
                </div>
            </div>
        `;
    }

    getOverlayEffects() {
        return `
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div class="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 rounded-xl"></div>
            </div>

            <div class="absolute top-0 right-0 w-20 h-20 opacity-30 overflow-hidden rounded-xl">
                <div class="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-red-500 via-yellow-400 to-red-500 rounded-full blur-md group-hover:blur-sm transition-all duration-300"></div>
            </div>

            <div class="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-black/40 text-gray-400 border border-white/10">
                ${this.config.category}
            </div>
        `;
    }

    makeClickable(element) {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleClick();
        });

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.handleClick();
            }
        });

        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        element.setAttribute('aria-label', `${this.config.title} - ${this.config.description}`);
    }

    handleClick() {
        if (!this.config.link) return;

        if (this.config.external) {
            window.open(this.config.link, '_blank', 'noopener,noreferrer');
        } else if (this.config.link.startsWith('#')) {
            const target = document.querySelector(this.config.link);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.location.href = this.config.link;
        }
    }

    attachEventListeners(element) {
        const img = element.querySelector('img');
        if (img) {
            img.addEventListener('load', () => {
                element.classList.add('svg-loaded');
            });

            img.addEventListener('error', () => {
                element.classList.add('svg-error');
            });
        }
    }
}

const SFTiSVGCardTemplates = {
    project: {
        category: 'project',
        size: 'medium',
        animated: true
    },
    research: {
        category: 'paper',
        size: 'medium',
        animated: true
    },
    repository: {
        category: 'repo',
        size: 'medium',
        animated: true
    },
    institute: {
        category: 'institute',
        size: 'large',
        animated: true
    }
};

function createProjectSVGCard(config) {
    return new SFTiSVGCard({
        ...SFTiSVGCardTemplates.project,
        ...config
    });
}

function createResearchSVGCard(config) {
    return new SFTiSVGCard({
        ...SFTiSVGCardTemplates.research,
        ...config
    });
}

function createRepositorySVGCard(config) {
    return new SFTiSVGCard({
        ...SFTiSVGCardTemplates.repository,
        ...config
    });
}

function createInstituteSVGCard(config) {
    return new SFTiSVGCard({
        ...SFTiSVGCardTemplates.institute,
        ...config
    });
}

function createSVGCardFromDocs(svgFolder, config = {}) {
    const basePath = `/docs/${svgFolder}/assets/`;
    const svgFile = `${svgFolder.toLowerCase().replace('.svg', '')}-card.svg`;

    return new SFTiSVGCard({
        svgPath: `${basePath}${svgFile}`,
        ...config
    });
}

if (typeof window !== 'undefined') {
    window.SFTiSVGCard = SFTiSVGCard;
    window.createProjectSVGCard = createProjectSVGCard;
    window.createResearchSVGCard = createResearchSVGCard;
    window.createRepositorySVGCard = createRepositorySVGCard;
    window.createInstituteSVGCard = createInstituteSVGCard;
    window.createSVGCardFromDocs = createSVGCardFromDocs;
    window.SFTiSVGCardTemplates = SFTiSVGCardTemplates;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SFTiSVGCard,
        createProjectSVGCard,
        createResearchSVGCard,
        createRepositorySVGCard,
        createInstituteSVGCard,
        createSVGCardFromDocs,
        SFTiSVGCardTemplates
    };
}


(function registerSFTiDomainBindings() {
    const domain = 'www';
    const variant = 'desktop';
    const component = 'svg-card';
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
        if (variant === 'mobile' && globalObj['SFTiMobileSvgCard']) {
            implementation = globalObj['SFTiMobileSvgCard'];
        } else if (globalObj['SFTiSvgCard']) {
            implementation = globalObj['SFTiSvgCard'];
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
        if (!globalObj['WwwSvgCardDesktop']) {
            globalObj['WwwSvgCardDesktop'] = DomainImplementation;
        }
        if (!globalObj['createWwwSvgCardDesktop']) {
            globalObj['createWwwSvgCardDesktop'] = (config = {}) => new DomainImplementation(config);
        }
        globalObj.SFTiComponents = globalObj.SFTiComponents || {};
        globalObj.SFTiComponents[domain] = globalObj.SFTiComponents[domain] || {};
        globalObj.SFTiComponents[domain][variant] = globalObj.SFTiComponents[domain][variant] || {};
        globalObj.SFTiComponents[domain][variant][component] = DomainImplementation;
    }
})();

