/**
 * Global Footer Component
 * =======================
 * 
 * Universal footer component with social links, copyright, and domain adaptations.
 * Provides base structure for domain-specific footer extensions.
 * 
 * Features:
 * - Responsive footer layout
 * - Social media links
 * - Copyright and legal
 * - Domain-specific adaptations
 * - Dark theme optimized
 */

class SFTiFooter extends SFTiComponent {
    constructor(config = {}) {
        const defaultConfig = {
            domain: 'global',
            logoText: 'SFTi',
            tagline: 'Sovereign Financial Technology Institute',
            copyright: {
                year: new Date().getFullYear(),
                entity: 'Statik FinTech LLC',
                allRights: true
            },
            social: {
                github: { href: 'https://github.com/statikfintechllc', icon: '🐙', label: 'GitHub' },
                linkedin: { href: '#', icon: '💼', label: 'LinkedIn' },
                twitter: { href: '#', icon: '🐦', label: 'Twitter' },
                medium: { href: '#', icon: '📝', label: 'Medium' }
            },
            links: {
                main: [
                    { title: 'Home', href: 'https://www.sfti-ai.org' },
                    { title: 'Institute', href: 'https://www.sfti-ai.org#institute' },
                    { title: 'Projects', href: 'https://www.sfti-ai.org#projects' },
                    { title: 'Research', href: 'https://www.sfti-ai.org#research' }
                ],
                domains: [
                    { title: 'Main Site', href: 'https://www.sfti-ai.org', description: 'Corporate website' },
                    { title: 'Dev Hub', href: 'https://dev.sfti-ai.org', description: 'PWA development' },
                    { title: 'Server Portal', href: 'https://server.sfti-ai.org', description: 'Secure access' }
                ],
                legal: [
                    { title: 'Privacy Policy', href: '#privacy' },
                    { title: 'Terms of Service', href: '#terms' },
                    { title: 'Security', href: '#security' },
                    { title: 'Contact', href: '#contact' }
                ]
            },
            contact: {
                email: 'info@sfti-ai.org',
                location: 'Global Operations'
            },
            ...config
        };
        
        super(defaultConfig);
        this.initFooter();
    }

    initFooter() {
        this.setupResponsive();
        this.setupSocialTracking();
    }

    getTemplate() {
        return `
            <footer class="sfti-footer bg-black border-t border-white/10 mt-auto">
                <div class="max-w-7xl mx-auto px-4 py-12">
                    <!-- Main Footer Content -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        <!-- Brand Section -->
                        <div class="lg:col-span-1">
                            <div class="mb-6">
                                <h3 class="text-white font-bold text-xl mb-2 ${this.getDomainAccent()}">${this.config.logoText}</h3>
                                <p class="text-gray-400 text-sm leading-relaxed">${this.config.tagline}</p>
                            </div>
                            
                            <!-- Social Links -->
                            <div class="flex space-x-4">
                                ${this.renderSocialLinks()}
                            </div>
                        </div>

                        <!-- Quick Links -->
                        <div class="lg:col-span-1">
                            <h4 class="text-white font-semibold mb-4">Quick Links</h4>
                            <ul class="space-y-2">
                                ${this.renderQuickLinks()}
                            </ul>
                        </div>

                        <!-- Domains -->
                        <div class="lg:col-span-1">
                            <h4 class="text-white font-semibold mb-4">Our Domains</h4>
                            <ul class="space-y-2">
                                ${this.renderDomainLinks()}
                            </ul>
                        </div>

                        <!-- Legal & Contact -->
                        <div class="lg:col-span-1">
                            <h4 class="text-white font-semibold mb-4">Legal & Contact</h4>
                            <ul class="space-y-2 mb-4">
                                ${this.renderLegalLinks()}
                            </ul>
                            
                            <!-- Contact Info -->
                            <div class="text-sm text-gray-400">
                                <p class="mb-1">${this.config.contact.email}</p>
                                <p>${this.config.contact.location}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Section -->
                    <div class="pt-8 border-t border-white/10">
                        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <!-- Copyright -->
                            <div class="text-gray-400 text-sm">
                                <span>&copy; ${this.config.copyright.year} ${this.config.copyright.entity}</span>
                                ${this.config.copyright.allRights ? '<span class="ml-2">All rights reserved.</span>' : ''}
                            </div>

                            <!-- Additional Info -->
                            <div class="text-gray-400 text-sm flex items-center space-x-4">
                                <span class="flex items-center">
                                    <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                    System Status: Operational
                                </span>
                                <span class="hidden md:inline">|</span>
                                <span class="${this.getDomainAccent()}">${this.getDomainLabel()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    renderSocialLinks() {
        if (!this.config.social) return '';
        
        return Object.entries(this.config.social).map(([key, social]) => `
            <a 
                href="${social.href}" 
                class="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-all duration-200"
                title="${social.label}"
                target="_blank"
                rel="noopener noreferrer"
                data-social="${key}"
            >
                <span class="text-lg">${social.icon}</span>
            </a>
        `).join('');
    }

    renderQuickLinks() {
        if (!this.config.links?.main) return '';
        
        return this.config.links.main.map(link => `
            <li>
                <a 
                    href="${link.href}" 
                    class="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    ${link.href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}
                >
                    ${link.title}
                </a>
            </li>
        `).join('');
    }

    renderDomainLinks() {
        if (!this.config.links?.domains) return '';
        
        return this.config.links.domains.map(domain => `
            <li>
                <a 
                    href="${domain.href}" 
                    class="text-gray-400 hover:text-white transition-colors duration-200 text-sm block"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div class="font-medium">${domain.title}</div>
                    <div class="text-xs text-gray-500">${domain.description}</div>
                </a>
            </li>
        `).join('');
    }

    renderLegalLinks() {
        if (!this.config.links?.legal) return '';
        
        return this.config.links.legal.map(link => `
            <li>
                <a 
                    href="${link.href}" 
                    class="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                    ${link.title}
                </a>
            </li>
        `).join('');
    }

    getDomainAccent() {
        const accents = {
            'www': 'text-red-400',
            'dev': 'text-blue-400',
            'server': 'text-amber-400',
            'global': 'text-white'
        };
        return accents[this.config.domain] || accents.global;
    }

    getDomainLabel() {
        const labels = {
            'www': 'Main Website',
            'dev': 'Development Hub',
            'server': 'Secure Portal',
            'global': 'SFTi Network'
        };
        return labels[this.config.domain] || labels.global;
    }

    setupResponsive() {
        // Add responsive behavior if needed
        this.handleResize = () => {
            // Future: Add responsive adjustments
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.handleResize);
        }
    }

    setupSocialTracking() {
        // Add click tracking for social links
        this.trackSocialClick = (platform) => {
            console.log(`Social click tracked: ${platform}`);
            // Future: Implement analytics tracking
        };

        // Add event listeners after component mounts
        this.addSocialTracking = () => {
            const socialLinks = document.querySelectorAll('[data-social]');
            socialLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const platform = link.getAttribute('data-social');
                    this.trackSocialClick(platform);
                });
            });
        };
    }

    mount(selector) {
        super.mount(selector);
        // Add social tracking after mount
        setTimeout(() => this.addSocialTracking(), 100);
    }

    // Static method to create and mount footer
    static create(selector, config = {}) {
        const footer = new SFTiFooter(config);
        footer.mount(selector);
        return footer;
    }
}

// Global Footer configurations
const GlobalFooterConfig = {
    domain: 'global',
    responsive: true,
    socialTracking: true
};

// Factory function for global footer
function createSFTiFooter(config = {}) {
    return new SFTiFooter({ ...GlobalFooterConfig, ...config });
}

// Export for module systems
if (typeof window !== 'undefined') {
    window.SFTiFooter = SFTiFooter;
    window.createSFTiFooter = createSFTiFooter;
    window.GlobalFooterConfig = GlobalFooterConfig;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SFTiFooter, createSFTiFooter, GlobalFooterConfig };
}