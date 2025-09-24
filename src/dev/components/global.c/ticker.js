/**
 * SFTi Global Ticker Component - MOBILE ONLY
 * ==========================================
 * 
 * Universal ticker component that displays repository statistics.
 * Used across all domains with mobile-only display.
 * 
 * FEATURES:
 * - Mobile-only display (hidden on desktop)
 * - Full viewport width display on mobile
 * - Proper positioning under navbar
 * - Cross-domain compatibility
 * 
 * USAGE:
 * const ticker = new SFTiTicker();
 * ticker.render('#ticker-container');
 */

class SFTiTicker extends SFTiComponent {
    constructor(domain = 'global') {
        super('ticker', domain);
        this.gifUrl = 'https://raw.githubusercontent.com/KDK-Grim/WorkFlowRepo-Mirror/master/docs/ticker-bot/ticker.gif';
    }

    render(container) {
        const containerElement = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;

        if (!containerElement) {
            console.error('SFTiTicker: Container not found');
            return;
        }

        // Clear existing content
        containerElement.innerHTML = '';

        // Create ticker wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'sfti-ticker-wrapper';
        
        // Create ticker image
        const image = document.createElement('img');
        image.src = this.gifUrl;
        image.alt = 'Repo Ticker Stats';
        image.className = 'sfti-ticker-image';
        
        // Error handling for image loading
        image.onerror = () => {
            console.warn('SFTiTicker: Failed to load ticker image');
            wrapper.style.display = 'none';
        };

        wrapper.appendChild(image);
        containerElement.appendChild(wrapper);

        this.init();
        return wrapper;
    }

    attachEventListeners() {
        // Add any ticker-specific event listeners here
        // For now, ticker is static display
    }

    // Method to update ticker URL if needed
    updateGifUrl(newUrl) {
        this.gifUrl = newUrl;
        const image = document.querySelector('.sfti-ticker-image');
        if (image) {
            image.src = newUrl;
        }
    }
}

// Register component globally
if (typeof window !== 'undefined') {
    window.SFTiTicker = SFTiTicker;
    if (window.SFTiComponents) {
        window.SFTiComponents.global.ticker = SFTiTicker;
    }
}

// Auto-initialize if container exists
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('ticker-container');
    if (container) {
        const ticker = new SFTiTicker();
        ticker.render(container);
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SFTiTicker;
}