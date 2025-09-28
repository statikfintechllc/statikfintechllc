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
