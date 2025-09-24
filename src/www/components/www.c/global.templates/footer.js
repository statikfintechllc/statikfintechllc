/**
 * WWW Domain Footer Component
 * ===========================
 * 
 * Main website footer with business focus and lead generation.
 * Extends global footer with corporate styling and features.
 * 
 * Features:
 * - Business-focused content
 * - Newsletter signup
 * - Corporate contact info
 * - Lead generation tracking
 */

class WWWFooter extends SFTiFooter {
    constructor(config = {}) {
        const wwwConfig = {
            domain: 'www',
            logoText: 'SFTi',
            tagline: 'Advancing AI Research & Financial Technology',
            newsletter: {
                enabled: true,
                title: 'Stay Updated',
                placeholder: 'Enter your email for research updates',
                cta: 'Subscribe'
            },
            businessInfo: {
                founded: '2024',
                focus: 'AI Research & FinTech Innovation',
                headquarters: 'Global Operations'
            },
            social: {
                github: { href: 'https://github.com/statikfintechllc', icon: '🐙', label: 'GitHub' },
                linkedin: { href: '#', icon: '💼', label: 'LinkedIn' },
                medium: { href: '#', icon: '📝', label: 'Medium Articles' },
                youtube: { href: '#', icon: '📺', label: 'YouTube Channel' }
            },
            links: {
                main: [
                    { title: 'Institute', href: '#institute' },
                    { title: 'Research Papers', href: '#research' },
                    { title: 'Featured Projects', href: '#projects' },
                    { title: 'About Us', href: '#about' }
                ],
                services: [
                    { title: 'AI Research', href: '#ai-research', description: 'Cutting-edge AI development' },
                    { title: 'FinTech Solutions', href: '#fintech', description: 'Financial technology innovation' },
                    { title: 'Consulting', href: '#consulting', description: 'Strategic technology guidance' },
                    { title: 'Development', href: '#development', description: 'Custom software solutions' }
                ],
                resources: [
                    { title: 'Documentation', href: '#docs' },
                    { title: 'API Reference', href: '#api' },
                    { title: 'Research Database', href: '#research-db' },
                    { title: 'White Papers', href: '#whitepapers' }
                ]
            },
            contact: {
                email: 'hello@sfti-ai.org',
                business: 'partnerships@sfti-ai.org',
                location: 'Global Operations',
                phone: 'Available upon request'
            },
            ...config
        };
        
        super(wwwConfig);
        this.initWWWFeatures();
    }

    initWWWFeatures() {
        this.setupNewsletterSignup();
        this.setupBusinessTracking();
    }

    getTemplate() {
        return `
            <footer class="sfti-footer sfti-www-footer bg-black border-t border-red-500/20 mt-auto">
                <div class="max-w-7xl mx-auto px-4 py-12">
                    <!-- Main Footer Content -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                        <!-- Brand & Newsletter Section -->
                        <div class="lg:col-span-2">
                            <div class="mb-6">
                                <h3 class="text-white font-bold text-2xl mb-2 text-red-400">${this.config.logoText}</h3>
                                <p class="text-gray-300 text-base leading-relaxed mb-4">${this.config.tagline}</p>
                                
                                <!-- Business Info -->
                                <div class="text-sm text-gray-400 space-y-1 mb-6">
                                    <p><span class="text-red-400">Founded:</span> ${this.config.businessInfo.founded}</p>
                                    <p><span class="text-red-400">Focus:</span> ${this.config.businessInfo.focus}</p>
                                    <p><span class="text-red-400">HQ:</span> ${this.config.businessInfo.headquarters}</p>
                                </div>
                            </div>
                            
                            <!-- Newsletter Signup -->
                            ${this.renderNewsletterSignup()}
                            
                            <!-- Social Links -->
                            <div class="flex space-x-4 mt-6">
                                ${this.renderSocialLinks()}
                            </div>
                        </div>

                        <!-- Quick Links -->
                        <div class="lg:col-span-1">
                            <h4 class="text-white font-semibold mb-4 text-red-400">Navigation</h4>
                            <ul class="space-y-3">
                                ${this.renderQuickLinks()}
                            </ul>
                        </div>

                        <!-- Services -->
                        <div class="lg:col-span-1">
                            <h4 class="text-white font-semibold mb-4 text-red-400">Our Services</h4>
                            <ul class="space-y-3">
                                ${this.renderServiceLinks()}
                            </ul>
                        </div>

                        <!-- Resources & Contact -->
                        <div class="lg:col-span-1">
                            <h4 class="text-white font-semibold mb-4 text-red-400">Resources</h4>
                            <ul class="space-y-3 mb-6">
                                ${this.renderResourceLinks()}
                            </ul>
                            
                            <!-- Contact Info -->
                            <div class="text-sm text-gray-400 space-y-2">
                                <h5 class="text-white font-medium mb-2">Contact</h5>
                                <p><a href="mailto:${this.config.contact.email}" class="hover:text-red-400 transition-colors">${this.config.contact.email}</a></p>
                                <p><a href="mailto:${this.config.contact.business}" class="hover:text-red-400 transition-colors">${this.config.contact.business}</a></p>
                                <p>${this.config.contact.phone}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Section -->
                    <div class="pt-8 border-t border-red-500/20">
                        <div class="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                            <!-- Copyright -->
                            <div class="text-gray-400 text-sm">
                                <span>&copy; ${this.config.copyright.year} ${this.config.copyright.entity}</span>
                                <span class="ml-2">All rights reserved.</span>
                                <span class="ml-4 text-red-400">Advancing the Future of AI</span>
                            </div>

                            <!-- Business Status -->
                            <div class="text-gray-400 text-sm flex items-center space-x-4">
                                <span class="flex items-center">
                                    <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                    Business Operations: Active
                                </span>
                                <span class="hidden lg:inline">|</span>
                                <span class="text-red-400 font-medium">Corporate Website</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    renderNewsletterSignup() {
        if (!this.config.newsletter?.enabled) return '';
        
        return `
            <div class="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                <h4 class="text-white font-semibold mb-2">${this.config.newsletter.title}</h4>
                <p class="text-gray-400 text-sm mb-3">Get the latest research updates and insights.</p>
                <form class="flex flex-col sm:flex-row gap-2" onsubmit="window.submitNewsletter(event)">
                    <input 
                        type="email" 
                        placeholder="${this.config.newsletter.placeholder}"
                        class="flex-1 px-3 py-2 bg-black/50 border border-white/20 rounded text-white text-sm placeholder-gray-500 focus:border-red-400 focus:outline-none transition-colors"
                        required
                        id="newsletter-email"
                    >
                    <button 
                        type="submit"
                        class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded transition-colors"
                    >
                        ${this.config.newsletter.cta}
                    </button>
                </form>
            </div>
        `;
    }

    renderServiceLinks() {
        if (!this.config.links?.services) return '';
        
        return this.config.links.services.map(service => `
            <li>
                <a 
                    href="${service.href}" 
                    class="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm block group"
                >
                    <div class="font-medium group-hover:text-white">${service.title}</div>
                    <div class="text-xs text-gray-500">${service.description}</div>
                </a>
            </li>
        `).join('');
    }

    renderResourceLinks() {
        if (!this.config.links?.resources) return '';
        
        return this.config.links.resources.map(resource => `
            <li>
                <a 
                    href="${resource.href}" 
                    class="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm"
                >
                    ${resource.title}
                </a>
            </li>
        `).join('');
    }

    setupNewsletterSignup() {
        // Add newsletter signup functionality
        if (typeof window !== 'undefined') {
            window.submitNewsletter = (event) => {
                event.preventDefault();
                const email = document.getElementById('newsletter-email').value;
                
                console.log('Newsletter signup:', email);
                // Future: Implement newsletter API integration
                
                // Show success message
                this.showNewsletterSuccess();
            };
        }
    }

    showNewsletterSuccess() {
        const form = document.querySelector('[onsubmit="window.submitNewsletter(event)"]');
        if (form) {
            form.innerHTML = `
                <div class="text-center py-2">
                    <span class="text-green-400 text-sm font-medium">✓ Successfully subscribed!</span>
                </div>
            `;
        }
    }

    setupBusinessTracking() {
        // Add business-specific tracking
        this.trackBusinessAction = (action, details = {}) => {
            console.log('Business action tracked:', action, details);
            // Future: Implement business analytics
        };
    }
}

// WWW Domain specific configurations
const WWWFooterConfig = {
    domain: 'www',
    businessMode: true,
    leadGeneration: true
};

// Factory function for WWW footer
function createWWWFooter(config = {}) {
    return new WWWFooter({ ...WWWFooterConfig, ...config });
}

// Export for module systems
if (typeof window !== 'undefined') {
    window.WWWFooter = WWWFooter;
    window.createWWWFooter = createWWWFooter;
    window.WWWFooterConfig = WWWFooterConfig;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WWWFooter, createWWWFooter, WWWFooterConfig };
}