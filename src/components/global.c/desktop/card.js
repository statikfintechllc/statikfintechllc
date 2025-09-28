// @ts-nocheck
/**
 * SFTi Global Card Component (Desktop Variant)
 * ===========================================
 *
 * Mirrors the legacy implementation and represents the authoritative
 * desktop experience. Mobile specific behaviour now lives in
 * ../mobile/card.js which extends this base class.
 */

class SFTiCard extends SFTiComponent {
    constructor(config = {}) {
        super('card', config.domain || 'global');

        this.config = {
            type: 'default',
            title: '',
            subtitle: '',
            description: '',
            image: null,
            icon: null,
            link: null,
            external: false,
            interactive: true,
            size: 'medium',
            variant: 'glass',
            ...config
        };
    }

    render(container) {
        if (typeof container === 'string') {
            container = document.getElementById(container);
        }

        if (!container) {
            console.error('Card container not found');
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
            'sfti-card',
            'relative',
            'overflow-hidden',
            'transition-all',
            'duration-300',
            'ease-in-out'
        ];

        const sizeClasses = {
            small: ['w-64', 'h-48', 'p-4'],
            medium: ['w-80', 'h-64', 'p-6'],
            large: ['w-96', 'h-80', 'p-8']
        };

        const variantClasses = {
            glass: [
                'bg-black/10',
                'backdrop-blur-sm',
                'border',
                'border-white/10',
                'shadow-lg'
            ],
            solid: [
                'bg-gray-900',
                'border',
                'border-gray-700',
                'shadow-xl'
            ],
            outline: [
                'bg-transparent',
                'border-2',
                'border-white/20',
                'hover:bg-white/5'
            ],
            gradient: [
                'bg-gradient-to-br',
                'from-gray-900',
                'to-black',
                'border',
                'border-white/10'
            ]
        };

        const interactiveClasses = this.config.interactive ? [
            'cursor-pointer',
            'hover:scale-105',
            'hover:shadow-2xl',
            'hover:border-yellow-400/50'
        ] : [];

        const linkClasses = this.config.link ? ['group'] : [];

        return [
            ...baseClasses,
            ...sizeClasses[this.config.size],
            ...variantClasses[this.config.variant],
            ...interactiveClasses,
            ...linkClasses,
            'rounded-xl'
        ].join(' ');
    }

    getTemplate() {
        return `
            ${this.getImageSection()}
            ${this.getContentSection()}
            ${this.getOverlayEffects()}
        `;
    }

    getImageSection() {
        if (!this.config.image && !this.config.icon) return '';

        if (this.config.image) {
            return `
                <div class="relative w-full h-32 mb-4 overflow-hidden rounded-lg">
                    <img
                        src="${this.config.image}"
                        alt="${this.config.title}"
                        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
            `;
        }

        if (this.config.icon) {
            return `
                <div class="flex items-center justify-center w-16 h-16 mb-4 mx-auto rounded-full bg-red-500/20 border border-red-500/30">
                    ${typeof this.config.icon === 'string' ?
                        `<img src="${this.config.icon}" alt="Icon" class="w-8 h-8" />` :
                        this.config.icon
                    }
                </div>
            `;
        }

        return '';
    }

    getContentSection() {
        return `
            <div class="relative z-10">
                ${this.config.title ? `
                    <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                        ${this.config.title}
                    </h3>
                ` : ''}

                ${this.config.subtitle ? `
                    <p class="text-sm text-yellow-400 font-medium mb-2">
                        ${this.config.subtitle}
                    </p>
                ` : ''}

                ${this.config.description ? `
                    <p class="text-gray-300 text-sm leading-relaxed">
                        ${this.config.description}
                    </p>
                ` : ''}

                ${this.getActionSection()}
            </div>
        `;
    }

    getActionSection() {
        if (!this.config.link) return '';

        const linkText = this.config.external ? 'Visit External →' : 'Learn More →';

        return `
            <div class="mt-4 pt-4 border-t border-white/10">
                <span class="text-xs text-gray-400 group-hover:text-yellow-400 transition-colors">
                    ${linkText}
                </span>
            </div>
        `;
    }

    getOverlayEffects() {
        return `
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div class="absolute inset-0 bg-gradient-to-r from-red-500/10 via-yellow-400/10 to-red-500/10 rounded-xl"></div>
            </div>

            <div class="absolute top-0 right-0 w-16 h-16 opacity-20">
                <div class="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full blur-sm"></div>
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
        element.setAttribute('aria-label', `Navigate to ${this.config.title || 'link'}`);
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
        // Reserved for future desktop specific interactions.
    }
}

const SFTiCardTemplates = {
    project: {
        variant: 'glass',
        size: 'medium',
        interactive: true
    },
    feature: {
        variant: 'gradient',
        size: 'small',
        interactive: true
    },
    repo: {
        variant: 'solid',
        size: 'medium',
        interactive: true
    },
    contact: {
        variant: 'outline',
        size: 'large',
        interactive: true
    }
};

function createSFTiCard(config) {
    return new SFTiCard(config);
}

function createProjectCard(config) {
    return new SFTiCard({
        ...SFTiCardTemplates.project,
        type: 'project',
        ...config
    });
}

function createFeatureCard(config) {
    return new SFTiCard({
        ...SFTiCardTemplates.feature,
        type: 'feature',
        ...config
    });
}

function createRepoCard(config) {
    return new SFTiCard({
        ...SFTiCardTemplates.repo,
        type: 'repo',
        ...config
    });
}

function createContactCard(config) {
    return new SFTiCard({
        ...SFTiCardTemplates.contact,
        type: 'contact',
        ...config
    });
}

if (typeof window !== 'undefined') {
    window.SFTiCard = SFTiCard;
    window.createSFTiCard = createSFTiCard;
    window.createProjectCard = createProjectCard;
    window.createFeatureCard = createFeatureCard;
    window.createRepoCard = createRepoCard;
    window.createContactCard = createContactCard;
    window.SFTiCardTemplates = SFTiCardTemplates;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SFTiCard,
        createSFTiCard,
        createProjectCard,
        createFeatureCard,
        createRepoCard,
        createContactCard,
        SFTiCardTemplates
    };
}

if (typeof registerSFTiComponent === 'function') {
    registerSFTiComponent({ domain: 'global', variant: 'desktop', name: 'card', implementation: SFTiCard });
}
