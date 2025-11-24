/**
 * Dev Domain Navbar Component
 * ===========================
 * 
 * Development hub navbar with PWA and developer tools focus.
 * Extends global navbar with dev-specific styling and navigation.
 * 
 * Features:
 * - Developer-focused navigation
 * - PWA status indicators
 * - Development tools access
 * - Technical documentation links
 */

class DevNavbar extends SFTiNavbar {
    constructor(config = {}) {
        const devConfig = {
            domain: 'dev',
            logoText: 'SFTi Dev',
            logoSubtitle: 'PWA Hub',
            items: [
                { title: 'Home', href: 'index.html', external: true, description: 'Main website' },
                { title: 'Institute', href: 'index.html#institute', external: true, description: 'Research division' },
                { title: 'Projects', href: 'index.html#projects', external: true, description: 'Featured projects' },
                { title: 'Research', href: 'index.html#research', external: true, description: 'Publications' },
                { title: 'PWAs', href: '#pwas', description: 'Progressive Web Applications' },
                { title: 'Status', href: '#status', description: 'System status and monitoring' },
                { title: 'Server', href: 'server.sfti-ai.org.html', external: true, description: 'Secure access portal' }
            ],
            tools: {
                github: { href: 'https://github.com/statikfintechllc', icon: '🐙' },
                docs: { href: '#documentation', icon: '📚' },
                api: { href: '#api', icon: '🔌' }
            },
            status: {
                indicators: true,
                realtime: true
            },
            ...config
        };
        
        super(devConfig);
        this.initDevFeatures();
    }

    initDevFeatures() {
        this.setupStatusMonitoring();
        this.setupDevTools();
    }

    getTemplate() {
        return `
            <nav class="sfti-navbar sfti-dev-navbar fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-blue-500/20 h-12">
                <div class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                    <!-- Dev Logo with Status -->
                    <div class="flex items-center space-x-4">
                        <div class="flex flex-col leading-none group cursor-pointer" onclick="window.location.href='#home'">
                            <span class="text-blue-400 font-bold text-lg leading-tight transition-all duration-300 group-hover:text-blue-300 group-hover:scale-105">
                                ${this.config.logoText}
                            </span>
                            <span class="text-green-400 text-xs leading-tight transition-all duration-300 group-hover:text-green-300">
                                ${this.config.logoSubtitle}
                            </span>
                        </div>
                        
                        <!-- Dev Status Indicators -->
                        <div class="hidden lg:flex items-center space-x-3">
                            <div class="flex items-center space-x-1">
                                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span class="text-green-400 text-xs font-mono">DEV</span>
                            </div>
                            <div class="w-px h-4 bg-white/20"></div>
                            <div class="flex items-center space-x-1">
                                <span class="text-blue-400 text-xs font-mono" id="build-status">BUILD: OK</span>
                            </div>
                        </div>
                    </div>

                    <!-- Desktop Navigation with Dev Tools -->
                    <div class="hidden md:flex items-center space-x-6">
                        ${this.renderDevNavItems()}
                        
                        <!-- Dev Tools -->
                        <div class="flex items-center space-x-2 ml-4 pl-4 border-l border-white/20">
                            ${this.renderDevTools()}
                        </div>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button 
                        id="mobile-menu-toggle" 
                        class="md:hidden p-2 h-8 w-8 flex items-center justify-center hover:bg-blue-500/20 rounded transition-colors"
                        aria-label="Toggle mobile menu"
                        aria-expanded="false"
                    >
                        ${this.getMobileMenuIcon()}
                    </button>
                </div>

                <!-- Dev Mobile Menu -->
                ${this.getDevMobileMenu()}
            </nav>
        `;
    }

    renderDevNavItems() {
        return this.config.items.map(item => `
            <div class="relative group">
                <a 
                    href="${item.href}" 
                    class="text-white hover:text-green-400 transition-all duration-300 text-sm font-medium font-mono ${this.isActiveLink(item.href) ? 'text-green-400' : ''}"
                    ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
                    title="${item.description || item.title}"
                >
                    ${item.title}
                    ${item.external ? '<span class="ml-1 text-xs text-gray-400">↗</span>' : ''}
                </a>
                
                <!-- Dev Tooltip -->
                <div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900/95 text-green-400 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-green-400/20">
                    ${item.description || item.title}
                    <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900/95"></div>
                </div>
            </div>
        `).join('');
    }

    renderDevTools() {
        if (!this.config.tools) return '';
        
        return Object.entries(this.config.tools).map(([key, tool]) => `
            <a 
                href="${tool.href}" 
                class="p-2 text-white hover:text-blue-400 hover:bg-blue-500/20 rounded transition-all duration-200"
                title="${key.charAt(0).toUpperCase() + key.slice(1)}"
                ${tool.href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}
            >
                <span class="text-sm">${tool.icon}</span>
            </a>
        `).join('');
    }

    getDevMobileMenu() {
        return `
            <!-- Dev Mobile Menu -->
            <div 
                id="mobile-menu" 
                class="md:hidden fixed inset-y-0 right-0 w-80 bg-gray-900/95 backdrop-blur-sm border-l border-blue-500/20 transform translate-x-full transition-transform duration-300 ease-in-out"
                role="dialog"
                aria-labelledby="mobile-menu-toggle"
            >
                <div class="flex flex-col h-full">
                    <!-- Mobile Header -->
                    <div class="flex items-center justify-between p-6 border-b border-blue-500/20">
                        <div class="flex flex-col">
                            <span class="text-blue-400 font-bold text-xl font-mono">${this.config.logoText}</span>
                            <span class="text-green-400 text-sm">${this.config.logoSubtitle}</span>
                        </div>
                        <button 
                            id="mobile-menu-close" 
                            class="p-2 hover:bg-blue-500/20 rounded transition-colors"
                            aria-label="Close mobile menu"
                        >
                            ${this.getCloseIcon()}
                        </button>
                    </div>
                    
                    <!-- Mobile Navigation -->
                    <div class="flex-1 px-6 py-4 space-y-1">
                        ${this.renderMobileDevItems()}
                    </div>
                    
                    <!-- Mobile Dev Tools -->
                    <div class="p-6 border-t border-blue-500/20">
                        <div class="mb-4">
                            <h4 class="text-blue-400 font-medium text-sm mb-3 font-mono">Dev Tools</h4>
                            <div class="grid grid-cols-3 gap-3">
                                ${this.renderMobileDevTools()}
                            </div>
                        </div>
                        
                        <!-- System Status -->
                        <div class="text-center pt-4 border-t border-white/10">
                            <div class="flex items-center justify-center space-x-2 mb-2">
                                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span class="text-green-400 text-sm font-mono">ALL SYSTEMS OPERATIONAL</span>
                            </div>
                            <p class="text-gray-400 text-xs font-mono">PWA Development Environment</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderMobileDevItems() {
        return this.config.items.map(item => `
            <a 
                href="${item.href}" 
                class="flex items-center justify-between p-3 text-white hover:text-green-400 hover:bg-blue-500/10 transition-all duration-200 rounded-lg ${this.isActiveLink(item.href) ? 'text-green-400 bg-blue-500/10' : ''}"
                ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
            >
                <div>
                    <div class="font-medium font-mono">${item.title}</div>
                    <div class="text-sm text-gray-400">${item.description || ''}</div>
                </div>
                ${item.external ? '<span class="text-gray-400">↗</span>' : '<span class="text-gray-400">→</span>'}
            </a>
        `).join('');
    }

    renderMobileDevTools() {
        if (!this.config.tools) return '';
        
        return Object.entries(this.config.tools).map(([key, tool]) => `
            <a 
                href="${tool.href}" 
                class="flex flex-col items-center p-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors text-center"
                ${tool.href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}
            >
                <span class="text-lg mb-1">${tool.icon}</span>
                <span class="text-xs text-blue-400 font-mono">${key.toUpperCase()}</span>
            </a>
        `).join('');
    }

    setupStatusMonitoring() {
        // Simulate real-time status monitoring
        this.updateBuildStatus = () => {
            const statusEl = document.getElementById('build-status');
            if (statusEl) {
                const statuses = ['BUILD: OK', 'BUILD: RUNNING', 'BUILD: TESTING'];
                const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                statusEl.textContent = randomStatus;
            }
        };

        // Update status every 30 seconds
        setInterval(this.updateBuildStatus, 30000);
    }

    setupDevTools() {
        // Add developer-specific tools and shortcuts
        this.setupKeyboardShortcuts();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for quick navigation
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openQuickNav();
            }
        });
    }

    openQuickNav() {
        // Future: Implement quick navigation modal
        console.log('Quick navigation - Future implementation');
    }
}

// Dev Domain specific configurations
const DevNavbarConfig = {
    domain: 'dev',
    developerMode: true,
    showStatus: true
};

// Factory function for Dev navbar
function createDevNavbar(config = {}) {
    return new DevNavbar({ ...DevNavbarConfig, ...config });
}

// Export for module systems
if (typeof window !== 'undefined') {
    window.DevNavbar = DevNavbar;
    window.createDevNavbar = createDevNavbar;
    window.DevNavbarConfig = DevNavbarConfig;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DevNavbar, createDevNavbar, DevNavbarConfig };
}