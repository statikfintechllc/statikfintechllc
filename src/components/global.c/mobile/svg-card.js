// @ts-nocheck
/**
 * SFTi SVG Card Component (Mobile Variant)
 * ======================================
 */

const BaseSVGCard = typeof SFTiSVGCard !== 'undefined'
    ? SFTiSVGCard
    : (typeof window !== 'undefined' ? window.SFTiSVGCard : undefined);

if (!BaseSVGCard) {
    throw new Error('SFTi Mobile SVG Card: desktop variant must be loaded first.');
}

class SFTiMobileSVGCard extends BaseSVGCard {
    constructor(config = {}) {
        super({
            size: 'small',
            animated: true,
            ...config
        });
    }

    getCardClasses() {
        const base = super.getCardClasses().split(' ');
        const filtered = base.filter((token) => !['w-96', 'w-80', 'h-80', 'h-64', 'w-64'].includes(token));
        filtered.push('w-full', 'max-w-sm', 'h-auto', 'p-4');
        return Array.from(new Set(filtered)).join(' ');
    }

    getTemplate() {
        return `
            <div class="relative w-full h-full p-4 flex flex-col space-y-4">
                ${this.getSVGSection()}
                ${this.getContentSection()}
                ${this.getOverlayEffects()}
            </div>
        `;
    }
}

function createMobileSVGCard(config) {
    return new SFTiMobileSVGCard(config);
}

if (typeof window !== 'undefined') {
    window.SFTiMobileSVGCard = SFTiMobileSVGCard;
    window.createMobileSVGCard = createMobileSVGCard;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SFTiMobileSVGCard, createMobileSVGCard };
}
