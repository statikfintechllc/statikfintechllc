/**
 * Dev Domain Footer Component
 * ===========================
 * 
 * Development hub footer with PWA focus and technical resources.
 * Extends global footer with developer-specific styling and links.
 */

class DevFooter extends SFTiFooter {
    constructor(config = {}) {
        const devConfig = {
            domain: 'dev',
            logoText: 'SFTi Dev',
            tagline: 'Progressive Web Applications & Development Hub',
            developer: {
                tools: [
                    { title: 'GitHub Repository', href: 'https://github.com/statikfintechllc', icon: '🐙' },
                    { title: 'API Documentation', href: '#api-docs', icon: '📚' },
                    { title: 'Development Guide', href: '#dev-guide', icon: '🛠️' },
                    { title: 'Code Examples', href: '#examples', icon: '💻' }
                ],
                resources: [
                    { title: 'PWA Templates', href: '#pwa-templates' },
                    { title: 'Component Library', href: '#components' },
                    { title: 'Build Tools', href: '#build-tools' },
                    { title: 'Testing Suite', href: '#testing' }
                ]
            },
            links: {
                main: [
                    { title: 'Home', href: 'https://statikfintechllc.github.io/statikfintechllc/', external: true },
                    { title: 'PWA Gallery', href: '#pwas' },
                    { title: 'Documentation', href: '#docs' },
                    { title: 'Status Monitor', href: '#status' }
                ]
            },
            contact: {
                email: 'dev@sfti-ai.org',
                support: 'support@sfti-ai.org',
                location: 'Development Hub'
            },
            ...config
        };
        
        super(devConfig);
    }

    getTemplate() {
        return `
            <footer class="sfti-footer sfti-dev-footer bg-black border-t border-blue-500/20 mt-auto">
                <div class="max-w-7xl mx-auto px-4 py-10">
                    <!-- Main Footer Content -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <!-- Brand & Dev Info -->
                        <div class="lg:col-span-1">
                            <div class="mb-6">
                                <h3 class="text-blue-400 font-bold text-xl mb-2 font-mono">${this.config.logoText}</h3>
                                <p class="text-gray-300 text-sm leading-relaxed font-mono">${this.config.tagline}</p>
                            </div>
                            
                            <!-- Dev Status -->
                            <div class="bg-blue-500/10 border border-blue-500/20 rounded p-3 mb-4">
                                <div class="flex items-center space-x-2 mb-2">
                                    <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span class="text-green-400 text-xs font-mono">BUILD: STABLE</span>
                                </div>
                                <div class="text-xs text-gray-400 font-mono">
                                    <p>Last Deploy: ${new Date().toLocaleDateString()}</p>
                                    <p>Version: v1.0.3</p>
                                </div>
                            </div>
                        </div>

                        <!-- Developer Tools -->
                        <div class="lg:col-span-1">
                            <h4 class="text-blue-400 font-semibold mb-4 font-mono">Dev Tools</h4>
                            <ul class="space-y-2">
                                ${this.renderDevTools()}
                            </ul>
                        </div>

                        <!-- Resources -->
                        <div class="lg:col-span-1">
                            <h4 class="text-blue-400 font-semibold mb-4 font-mono">Resources</h4>
                            <ul class="space-y-2">
                                ${this.renderDevResources()}
                            </ul>
                        </div>

                        <!-- Quick Links & Contact -->
                        <div class="lg:col-span-1">
                            <h4 class="text-blue-400 font-semibold mb-4 font-mono">Navigation</h4>
                            <ul class="space-y-2 mb-6">
                                ${this.renderQuickLinks()}
                            </ul>
                            
                            <!-- Contact -->
                            <div class="text-sm text-gray-400 font-mono">
                                <h5 class="text-white font-medium mb-2">Dev Contact</h5>
                                <p><a href="mailto:${this.config.contact.email}" class="hover:text-blue-400 transition-colors">${this.config.contact.email}</a></p>
                                <p><a href="mailto:${this.config.contact.support}" class="hover:text-blue-400 transition-colors">${this.config.contact.support}</a></p>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Section -->
                    <div class="pt-6 border-t border-blue-500/20">
                        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <!-- Copyright -->
                            <div class="text-gray-400 text-sm font-mono">
                                <span>&copy; ${this.config.copyright.year} ${this.config.copyright.entity}</span>
                                <span class="ml-4 text-blue-400">PWA Development Hub</span>
                            </div>

                            <!-- Dev Status -->
                            <div class="text-gray-400 text-sm flex items-center space-x-4 font-mono">
                                <span class="flex items-center">
                                    <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                    DEV: ONLINE
                                </span>
                                <span class="hidden md:inline">|</span>
                                <span class="text-blue-400">DEVELOPMENT ENVIRONMENT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    renderDevTools() {
        if (!this.config.developer?.tools) return '';
        
        return this.config.developer.tools.map(tool => `
            <li>
                <a 
                    href="${tool.href}" 
                    class="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm font-mono flex items-center"
                    ${tool.href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}
                >
                    <span class="mr-2">${tool.icon}</span>
                    ${tool.title}
                </a>
            </li>
        `).join('');
    }

    renderDevResources() {
        if (!this.config.developer?.resources) return '';
        
        return this.config.developer.resources.map(resource => `
            <li>
                <a 
                    href="${resource.href}" 
                    class="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm font-mono"
                >
                    ${resource.title}
                </a>
            </li>
        `).join('');
    }
}

// Factory function for Dev footer
function createDevFooter(config = {}) {
    return new DevFooter(config);
}

// Export for module systems
if (typeof window !== 'undefined') {
    window.DevFooter = DevFooter;
    window.createDevFooter = createDevFooter;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DevFooter, createDevFooter };
}