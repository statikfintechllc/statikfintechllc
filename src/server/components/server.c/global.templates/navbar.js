/**
 * Server Domain Navbar Component
 * ==============================
 * 
 * Secure portal navbar with enterprise security focus.
 * Extends global navbar with server-specific styling and navigation.
 * 
 * Features:
 * - Security-focused navigation
 * - Authentication status
 * - Enterprise portal access
 * - Secure server management
 */

class ServerNavbar extends SFTiNavbar {
    constructor(config = {}) {
        const serverConfig = {
            domain: 'server',
            logoText: 'SFTi Server',
            logoSubtitle: 'Secure Portal',
            items: [
                { title: 'Home', href: 'https://statikfintechllc.github.io/statikfintechllc/', external: true, description: 'Main website' },
                { title: 'Institute', href: 'https://statikfintechllc.github.io/statikfintechllc/#institute', external: true, description: 'Research division' },
                { title: 'Projects', href: 'https://statikfintechllc.github.io/statikfintechllc/#projects', external: true, description: 'Featured projects' },
                { title: 'Research', href: 'https://statikfintechllc.github.io/statikfintechllc/#research', external: true, description: 'Publications' },
                { title: 'Dashboard', href: '#dashboard', description: 'Server management dashboard' },
                { title: 'Analytics', href: '#analytics', description: 'Performance analytics' },
                { title: 'Dev Hub', href: 'https://statikfintechllc.github.io/statikfintechllc/dev.sfti-ai.org.html', external: true, description: 'Development environment' }
            ],
            security: {
                enabled: true,
                authRequired: true,
                encryption: 'AES-256'
            },
            features: {
                monitoring: true,
                alerts: true,
                analytics: true
            },
            ...config
        };
        
        super(serverConfig);
        this.initServerFeatures();
    }

    initServerFeatures() {
        this.setupSecurityMonitoring();
        this.setupServerTools();
    }

    getTemplate() {
        return `
            <nav class="sfti-navbar sfti-server-navbar fixed top-0 left-0 right-0 z-50 bg-gray-900/98 backdrop-blur-sm border-b border-red-500/30 h-12">
                <div class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                    <!-- Server Logo with Security Status -->
                    <div class="flex items-center space-x-4">
                        <div class="flex flex-col leading-none group cursor-pointer" onclick="window.location.href='#dashboard'">
                            <span class="text-red-400 font-bold text-lg leading-tight transition-all duration-300 group-hover:text-red-300 group-hover:scale-105">
                                ${this.config.logoText}
                            </span>
                            <span class="text-amber-400 text-xs leading-tight transition-all duration-300 group-hover:text-amber-300">
                                ${this.config.logoSubtitle}
                            </span>
                        </div>
                        
                        <!-- Security Status Indicators -->
                        <div class="hidden lg:flex items-center space-x-3">
                            <div class="flex items-center space-x-1">
                                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span class="text-green-400 text-xs font-mono">SECURE</span>
                            </div>
                            <div class="w-px h-4 bg-white/20"></div>
                            <div class="flex items-center space-x-1">
                                <div class="w-2 h-2 bg-amber-400 rounded-full"></div>
                                <span class="text-amber-400 text-xs font-mono" id="server-load">LOAD: NORMAL</span>
                            </div>
                            <div class="w-px h-4 bg-white/20"></div>
                            <div class="flex items-center space-x-1">
                                <span class="text-red-400 text-xs font-mono">🔒 SSL</span>
                            </div>
                        </div>
                    </div>

                    <!-- Desktop Navigation with Server Tools -->
                    <div class="hidden md:flex items-center space-x-6">
                        ${this.renderServerNavItems()}
                        
                        <!-- Server Control Panel -->
                        <div class="flex items-center space-x-2 ml-4 pl-4 border-l border-white/20">
                            <button 
                                class="p-2 text-white hover:text-amber-400 hover:bg-amber-500/20 rounded transition-all duration-200"
                                title="System Monitor"
                                onclick="window.openServerMonitor()"
                            >
                                <span class="text-sm">📊</span>
                            </button>
                            <button 
                                class="p-2 text-white hover:text-red-400 hover:bg-red-500/20 rounded transition-all duration-200"
                                title="Security Center"
                                onclick="window.openSecurityCenter()"
                            >
                                <span class="text-sm">🛡️</span>
                            </button>
                            <button 
                                class="p-2 text-white hover:text-green-400 hover:bg-green-500/20 rounded transition-all duration-200"
                                title="Admin Panel"
                                onclick="window.openAdminPanel()"
                            >
                                <span class="text-sm">⚙️</span>
                            </button>
                        </div>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button 
                        id="mobile-menu-toggle" 
                        class="md:hidden p-2 h-8 w-8 flex items-center justify-center hover:bg-red-500/20 rounded transition-colors"
                        aria-label="Toggle mobile menu"
                        aria-expanded="false"
                    >
                        ${this.getMobileMenuIcon()}
                    </button>
                </div>

                <!-- Server Mobile Menu -->
                ${this.getServerMobileMenu()}
            </nav>
        `;
    }

    renderServerNavItems() {
        return this.config.items.map(item => `
            <div class="relative group">
                <a 
                    href="${item.href}" 
                    class="text-white hover:text-amber-400 transition-all duration-300 text-sm font-medium font-mono ${this.isActiveLink(item.href) ? 'text-amber-400' : ''}"
                    ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
                    title="${item.description || item.title}"
                >
                    ${item.title}
                    ${item.external ? '<span class="ml-1 text-xs text-gray-400">↗</span>' : ''}
                </a>
                
                <!-- Server Tooltip -->
                <div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-800/95 text-amber-400 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-amber-400/20">
                    ${item.description || item.title}
                    <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800/95"></div>
                </div>
            </div>
        `).join('');
    }

    getServerMobileMenu() {
        return `
            <!-- Server Mobile Menu -->
            <div 
                id="mobile-menu" 
                class="md:hidden fixed inset-y-0 right-0 w-80 bg-gray-800/95 backdrop-blur-sm border-l border-red-500/30 transform translate-x-full transition-transform duration-300 ease-in-out"
                role="dialog"
                aria-labelledby="mobile-menu-toggle"
            >
                <div class="flex flex-col h-full">
                    <!-- Mobile Header -->
                    <div class="flex items-center justify-between p-6 border-b border-red-500/30">
                        <div class="flex flex-col">
                            <span class="text-red-400 font-bold text-xl font-mono">${this.config.logoText}</span>
                            <span class="text-amber-400 text-sm">${this.config.logoSubtitle}</span>
                        </div>
                        <button 
                            id="mobile-menu-close" 
                            class="p-2 hover:bg-red-500/20 rounded transition-colors"
                            aria-label="Close mobile menu"
                        >
                            ${this.getCloseIcon()}
                        </button>
                    </div>
                    
                    <!-- Mobile Navigation -->
                    <div class="flex-1 px-6 py-4 space-y-1">
                        ${this.renderMobileServerItems()}
                    </div>
                    
                    <!-- Mobile Server Controls -->
                    <div class="p-6 border-t border-red-500/30">
                        <div class="mb-4">
                            <h4 class="text-red-400 font-medium text-sm mb-3 font-mono">Server Controls</h4>
                            <div class="grid grid-cols-3 gap-3">
                                <button 
                                    class="flex flex-col items-center p-3 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg transition-colors text-center"
                                    onclick="window.openServerMonitor()"
                                >
                                    <span class="text-lg mb-1">📊</span>
                                    <span class="text-xs text-amber-400 font-mono">MONITOR</span>
                                </button>
                                <button 
                                    class="flex flex-col items-center p-3 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-center"
                                    onclick="window.openSecurityCenter()"
                                >
                                    <span class="text-lg mb-1">🛡️</span>
                                    <span class="text-xs text-red-400 font-mono">SECURITY</span>
                                </button>
                                <button 
                                    class="flex flex-col items-center p-3 bg-green-500/10 hover:bg-green-500/20 rounded-lg transition-colors text-center"
                                    onclick="window.openAdminPanel()"
                                >
                                    <span class="text-lg mb-1">⚙️</span>
                                    <span class="text-xs text-green-400 font-mono">ADMIN</span>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Security Status -->
                        <div class="text-center pt-4 border-t border-white/10">
                            <div class="flex items-center justify-center space-x-2 mb-2">
                                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span class="text-green-400 text-sm font-mono">SECURE CONNECTION</span>
                            </div>
                            <div class="flex items-center justify-center space-x-4 text-xs font-mono mb-2">
                                <span class="text-amber-400">SSL: ACTIVE</span>
                                <span class="text-green-400">FIREWALL: ON</span>
                            </div>
                            <p class="text-gray-400 text-xs font-mono">Enterprise Server Portal</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderMobileServerItems() {
        return this.config.items.map(item => `
            <a 
                href="${item.href}" 
                class="flex items-center justify-between p-3 text-white hover:text-amber-400 hover:bg-red-500/10 transition-all duration-200 rounded-lg ${this.isActiveLink(item.href) ? 'text-amber-400 bg-red-500/10' : ''}"
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

    setupSecurityMonitoring() {
        // Simulate security monitoring
        this.updateServerLoad = () => {
            const loadEl = document.getElementById('server-load');
            if (loadEl) {
                const loads = ['LOAD: LOW', 'LOAD: NORMAL', 'LOAD: HIGH'];
                const colors = ['text-green-400', 'text-amber-400', 'text-red-400'];
                const randomIndex = Math.floor(Math.random() * loads.length);
                
                loadEl.textContent = loads[randomIndex];
                loadEl.className = `${colors[randomIndex]} text-xs font-mono`;
            }
        };

        // Update load status every 45 seconds
        setInterval(this.updateServerLoad, 45000);
    }

    setupServerTools() {
        // Setup server management tools
        this.initializeServerManagement();
    }

    initializeServerManagement() {
        // Add server management functionality
        if (typeof window !== 'undefined') {
            window.openServerMonitor = () => {
                console.log('Opening server monitor...');
                // Future: Implement server monitoring modal
            };

            window.openSecurityCenter = () => {
                console.log('Opening security center...');
                // Future: Implement security dashboard
            };

            window.openAdminPanel = () => {
                console.log('Opening admin panel...');
                // Future: Implement admin interface
            };
        }
    }
}

// Server Domain specific configurations
const ServerNavbarConfig = {
    domain: 'server',
    securityMode: true,
    enterpriseFeatures: true
};

// Factory function for Server navbar
function createServerNavbar(config = {}) {
    return new ServerNavbar({ ...ServerNavbarConfig, ...config });
}

// Export for module systems
if (typeof window !== 'undefined') {
    window.ServerNavbar = ServerNavbar;
    window.createServerNavbar = createServerNavbar;
    window.ServerNavbarConfig = ServerNavbarConfig;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ServerNavbar, createServerNavbar, ServerNavbarConfig };
}