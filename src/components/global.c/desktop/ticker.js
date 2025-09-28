// @ts-nocheck
/**
 * SFTi Global Ticker Component (Desktop Variant)
 * ============================================
 *
 * Provides the base ticker implementation used by all domains. The desktop
 * flavour renders a compact panel that stays out of the way on wider layouts
 * while still exposing lifecycle hooks for downstream variants. Mobile builds
 * extend this class to present the full-screen ticker stream.
 */

class SFTiTicker extends SFTiComponent {
    constructor(config = {}) {
        super('ticker', config.domain || 'global');
        this.config = {
            gifUrl: 'https://raw.githubusercontent.com/KDK-Grim/WorkFlowRepo-Mirror/master/docs/ticker-bot/ticker.gif',
            mountSelector: null,
            hidden: true,
            ...config
        };
    }

    resolveContainer(container) {
        if (typeof container === 'string') {
            return document.querySelector(container);
        }

        if (container) {
            return container;
        }

        if (this.config.mountSelector) {
            return document.querySelector(this.config.mountSelector);
        }

        return null;
    }

    render(container) {
        const target = this.resolveContainer(container);

        if (!target) {
            console.error('[SFTiTicker] Container not found for ticker render');
            return null;
        }

        target.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = [
            'sfti-ticker-desktop',
            'relative',
            'overflow-hidden',
            'rounded-xl',
            'border',
            'border-white/10',
            'bg-black/40',
            'backdrop-blur',
            this.config.hidden ? 'hidden lg:block' : 'block'
        ].join(' ');

        const inner = document.createElement('div');
        inner.className = 'flex items-center justify-center px-6 py-4';

        const img = document.createElement('img');
        img.src = this.config.gifUrl;
        img.alt = 'SFTi Repo Ticker';
        img.loading = 'lazy';
        img.className = 'max-w-full h-auto mix-blend-screen opacity-90';

        img.onerror = () => {
            console.warn('[SFTiTicker] Failed to load ticker media');
            wrapper.style.display = 'none';
        };

        inner.appendChild(img);
        wrapper.appendChild(inner);
        target.appendChild(wrapper);

        this.init();
        return wrapper;
    }

    updateGifUrl(nextUrl) {
        if (!nextUrl) return;
        this.config.gifUrl = nextUrl;
        const node = document.querySelector('.sfti-ticker-desktop img');
        if (node) {
            node.src = nextUrl;
        }
    }
}

function createSFTiTicker(config) {
    return new SFTiTicker(config);
}

if (typeof window !== 'undefined') {
    window.SFTiTicker = SFTiTicker;
    window.createSFTiTicker = createSFTiTicker;
}

if (typeof registerSFTiComponent === 'function') {
    registerSFTiComponent({ domain: 'global', variant: 'desktop', name: 'ticker', implementation: SFTiTicker });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SFTiTicker, createSFTiTicker };
}
