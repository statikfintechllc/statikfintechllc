/**
 * WWW Domain Navbar Component
 * ===========================
 * 
 * Main website navbar with business/marketing focus.
 * Extends global navbar with www-specific styling and navigation.
 * 
 * Features:
 * - Business-focused navigation
 * - Call-to-action buttons
 * - Marketing-oriented styling
 * - Lead generation focus
 */

class WWWNavbar extends SFTiNavbar {
    constructor(config = {}) {
        const wwwConfig = {
            domain: 'www',
            logoText: 'SFTi',
            logoSubtitle: 'StatikFinTech, LLC',
            items: [
                { title: 'Home', href: '#home', description: 'Company overview and services' },
                { title: 'Institute', href: '#institute', description: 'The Ascend Institute - Our research division' },
                { title: 'Projects', href: '#projects', description: 'Featured projects and solutions' },
                { title: 'Research', href: '#research', description: 'Publications and research papers' },
                { title: 'PWAs', href: 'dev.sfti-ai.org.html', external: true, description: 'Progressive Web Applications hub' },
                { title: 'Server', href: 'server.sfti-ai.org.html', external: true, description: 'Secure access portal' }
            ],
            cta: {
                primary: { text: 'Get Started', href: '/sign-up', style: 'primary' },
                secondary: { text: 'Contact Us', href: '#contact', style: 'outline' }
            },
            branding: {
                showSubtitle: true,
                logoAnimation: true,
                hoverEffects: true
            },
            ...config
        };
        
        super(wwwConfig);
        this.initWWWFeatures();
    }

    initWWWFeatures() {
        // Add business-specific initialization
        this.setupAnalytics();
        this.setupLeadTracking();
    }

    getTemplate() {
        return `
            <nav class="sfti-navbar sfti-www-navbar fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10 h-12">
                <div class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                    <!-- Enhanced Logo with Animation -->
                    <div class="flex items-center space-x-4">
                        <div class="flex flex-col leading-none group cursor-pointer" onclick="window.location.href='#home'">
                            <span class="text-red-500 font-bold text-lg leading-tight transition-all duration-300 group-hover:text-red-400 group-hover:scale-105">
                                ${this.config.logoText}
                            </span>
                            <span class="text-yellow-400 text-xs leading-tight transition-all duration-300 group-hover:text-yellow-300">
                                ${this.config.logoSubtitle}
                            </span>
                        </div>
                        
                        <!-- Business Status Indicator -->
                        <div class="hidden lg:flex items-center space-x-2">
                            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span class="text-green-400 text-xs font-medium">LIVE</span>
                        </div>
                    </div>

                    <!-- Desktop Navigation with Enhanced Links -->
                    <div class="hidden md:flex items-center space-x-6">
                        ${this.renderEnhancedNavItems()}
                        
                        <!-- CTA Buttons -->
                        <div class="flex items-center space-x-3 ml-4 pl-4 border-l border-white/20">
                            ${this.renderCTAButtons()}
                        </div>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button 
                        id="mobile-menu-toggle" 
                        class="md:hidden p-2 h-8 w-8 flex items-center justify-center hover:bg-white/10 rounded transition-colors"
                        aria-label="Toggle mobile menu"
                        aria-expanded="false"
                    >
                        ${this.getMobileMenuIcon()}
                    </button>
                </div>

                <!-- Enhanced Mobile Menu -->
                ${this.getEnhancedMobileMenu()}
            </nav>
        `;
    }

    renderEnhancedNavItems() {
        return this.config.items.map(item => `
            <div class="relative group">
                <a 
                    href="${item.href}" 
                    class="text-white hover:text-yellow-400 transition-all duration-300 text-sm font-medium ${this.isActiveLink(item.href) ? 'text-yellow-400' : ''}"
                    ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
                    title="${item.description || item.title}"
                >
                    ${item.title}
                    ${item.external ? '<span class="ml-1 text-xs">↗</span>' : ''}
                </a>
                
                <!-- Hover Tooltip -->
                <div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    ${item.description || item.title}
                    <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/90"></div>
                </div>
            </div>
        `).join('');
    }

    renderCTAButtons() {
        if (!this.config.cta) return '';
        
        return `
            ${this.config.cta.secondary ? `
                <a 
                    href="${this.config.cta.secondary.href}" 
                    class="px-4 py-2 text-sm border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 rounded-lg font-medium"
                >
                    ${this.config.cta.secondary.text}
                </a>
            ` : ''}
            
            ${this.config.cta.primary ? `
                <a 
                    href="${this.config.cta.primary.href}" 
                    class="px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-600 transition-all duration-300 rounded-lg font-medium shadow-lg hover:shadow-red-500/25"
                >
                    ${this.config.cta.primary.text}
                </a>
            ` : ''}
        `;
    }

    getEnhancedMobileMenu() {
        return `
            <!-- Mobile Menu -->
            <div 
                id="mobile-menu" 
                class="md:hidden fixed inset-y-0 right-0 w-80 bg-black/95 backdrop-blur-sm border-l border-white/10 transform translate-x-full transition-transform duration-300 ease-in-out"
                role="dialog"
                aria-labelledby="mobile-menu-toggle"
            >
                <div class="flex flex-col h-full">
                    <!-- Mobile Header -->
                    <div class="flex items-center justify-between p-6 border-b border-white/10">
                        <div class="flex flex-col">
                            <span class="text-red-500 font-bold text-xl">${this.config.logoText}</span>
                            <span class="text-yellow-400 text-sm">${this.config.logoSubtitle}</span>
                        </div>
                        <button 
                            id="mobile-menu-close" 
                            class="p-2 hover:bg-white/10 rounded transition-colors"
                            aria-label="Close mobile menu"
                        >
                            ${this.getCloseIcon()}
                        </button>
                    </div>
                    
                    <!-- Mobile Navigation -->
                    <div class="flex-1 px-6 py-4 space-y-1">
                        ${this.renderMobileNavItems()}
                    </div>
                    
                    <!-- Mobile CTA Section -->
                    <div class="p-6 border-t border-white/10 space-y-3">
                        ${this.renderMobileCTAButtons()}
                        
                        <!-- Business Info -->
                        <div class="pt-4 text-center">
                            <div class="flex items-center justify-center space-x-2 mb-2">
                                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span class="text-green-400 text-sm font-medium">Available 24/7</span>
                            </div>
                            <p class="text-gray-400 text-xs">Enterprise AI Solutions</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderMobileNavItems() {
        return this.config.items.map(item => `
            <a 
                href="${item.href}" 
                class="flex items-center justify-between p-3 text-white hover:text-yellow-400 hover:bg-white/5 transition-all duration-200 rounded-lg ${this.isActiveLink(item.href) ? 'text-yellow-400 bg-white/5' : ''}"
                ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
            >
                <div>
                    <div class="font-medium">${item.title}</div>
                    <div class="text-sm text-gray-400">${item.description || ''}</div>
                </div>
                ${item.external ? '<span class="text-gray-400">↗</span>' : '<span class="text-gray-400">→</span>'}
            </a>
        `).join('');
    }

    renderMobileCTAButtons() {
        if (!this.config.cta) return '';
        
        return `
            ${this.config.cta.primary ? `
                <a 
                    href="${this.config.cta.primary.href}" 
                    class="block w-full px-4 py-3 text-center bg-red-500 text-white hover:bg-red-600 transition-all duration-300 rounded-lg font-medium"
                >
                    ${this.config.cta.primary.text}
                </a>
            ` : ''}
            
            ${this.config.cta.secondary ? `
                <a 
                    href="${this.config.cta.secondary.href}" 
                    class="block w-full px-4 py-3 text-center border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 rounded-lg font-medium"
                >
                    ${this.config.cta.secondary.text}
                </a>
            ` : ''}
        `;
    }

    setupAnalytics() {
        // Add analytics tracking for business metrics
        this.trackNavigation = (item) => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'navigate', {
                    'event_category': 'navigation',
                    'event_label': item.title,
                    'value': item.external ? 'external' : 'internal'
                });
            }
        };
    }

    setupLeadTracking() {
        // Track CTA interactions for lead generation
        this.trackCTA = (action, label) => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'event_category': 'lead_generation',
                    'event_label': label,
                    'value': action
                });
            }
        };
    }

    attachEventListeners() {
        super.attachEventListeners();
        
        // Add WWW-specific event listeners
        const ctaButtons = document.querySelectorAll('[href*="sign-up"], [href*="contact"]');
        ctaButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.trackCTA('click', button.textContent.trim());
            });
        });
    }
}

// WWW Domain specific configurations
const WWWNavbarConfig = {
    domain: 'www',
    enhanced: true,
    businessFocus: true
};

// Factory function for WWW navbar
function createWWWNavbar(config = {}) {
    return new WWWNavbar({ ...WWWNavbarConfig, ...config });
}

// Export for module systems
if (typeof window !== 'undefined') {
    window.WWWNavbar = WWWNavbar;
    window.createWWWNavbar = createWWWNavbar;
    window.WWWNavbarConfig = WWWNavbarConfig;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WWWNavbar, createWWWNavbar, WWWNavbarConfig };
}