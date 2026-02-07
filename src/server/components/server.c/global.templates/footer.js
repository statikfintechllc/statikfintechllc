/**
 * Server Domain Footer Component
 * ==============================
 * 
 * Secure portal footer with enterprise focus and security features.
 * Extends global footer with server-specific styling and monitoring.
 */

class ServerFooter extends SFTiFooter {
    constructor(config = {}) {
        const serverConfig = {
            domain: 'server',
            logoText: 'SFTi Server',
            tagline: 'Enterprise Security & Server Management Portal',
            security: {
                features: [
                    { title: 'SSL Encryption', status: 'active', icon: '🔒' },
                    { title: 'Firewall Protection', status: 'active', icon: '🛡️' },
                    { title: 'Intrusion Detection', status: 'active', icon: '👁️' },
                    { title: 'Access Control', status: 'active', icon: '🔐' }
                ],
                compliance: [
                    { title: 'SOC 2 Type II', href: '#soc2' },
                    { title: 'ISO 27001', href: '#iso27001' },
                    { title: 'PCI DSS', href: '#pci' },
                    { title: 'GDPR Compliant', href: '#gdpr' }
                ]
            },
            monitoring: {
                systems: [
                    { title: 'System Health', href: '#health', status: 'optimal' },
                    { title: 'Performance Metrics', href: '#metrics', status: 'normal' },
                    { title: 'Security Logs', href: '#logs', status: 'monitoring' },
                    { title: 'Backup Status', href: '#backup', status: 'verified' }
                ]
            },
            links: {
                main: [
                    { title: 'Home', href: 'index.html', external: true },
                    { title: 'Dashboard', href: '#dashboard' },
                    { title: 'Analytics', href: '#analytics' },
                    { title: 'Admin Panel', href: '#admin' }
                ]
            },
            contact: {
                email: 'admin@sfti-ai.org',
                security: 'security@sfti-ai.org',
                emergency: '24/7 Security Operations',
                location: 'Secure Data Center'
            },
            ...config
        };
        
        super(serverConfig);
    }

    getTemplate() {
        return `
            <footer class="sfti-footer sfti-server-footer bg-black border-t border-red-500/30 mt-auto">
                <div class="max-w-7xl mx-auto px-4 py-10">
                    <!-- Main Footer Content -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <!-- Brand & Security Status -->
                        <div class="lg:col-span-1">
                            <div class="mb-6">
                                <h3 class="text-red-400 font-bold text-xl mb-2 font-mono">${this.config.logoText}</h3>
                                <p class="text-gray-300 text-sm leading-relaxed font-mono">${this.config.tagline}</p>
                            </div>
                            
                            <!-- Security Status -->
                            <div class="bg-red-500/10 border border-red-500/30 rounded p-3 mb-4">
                                <h5 class="text-red-400 font-medium mb-2 font-mono">Security Status</h5>
                                <div class="space-y-1">
                                    ${this.renderSecurityFeatures()}
                                </div>
                            </div>
                        </div>

                        <!-- System Monitoring -->
                        <div class="lg:col-span-1">
                            <h4 class="text-red-400 font-semibold mb-4 font-mono">System Monitor</h4>
                            <ul class="space-y-2">
                                ${this.renderMonitoringSystems()}
                            </ul>
                        </div>

                        <!-- Compliance & Standards -->
                        <div class="lg:col-span-1">
                            <h4 class="text-red-400 font-semibold mb-4 font-mono">Compliance</h4>
                            <ul class="space-y-2">
                                ${this.renderComplianceStandards()}
                            </ul>
                        </div>

                        <!-- Navigation & Emergency Contact -->
                        <div class="lg:col-span-1">
                            <h4 class="text-red-400 font-semibold mb-4 font-mono">Server Access</h4>
                            <ul class="space-y-2 mb-6">
                                ${this.renderQuickLinks()}
                            </ul>
                            
                            <!-- Emergency Contact -->
                            <div class="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                                <h5 class="text-amber-400 font-medium mb-2 font-mono">Emergency Contact</h5>
                                <div class="text-sm text-gray-400 font-mono space-y-1">
                                    <p><a href="mailto:${this.config.contact.security}" class="hover:text-red-400 transition-colors">${this.config.contact.security}</a></p>
                                    <p class="text-amber-400">${this.config.contact.emergency}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Bottom Section -->
                    <div class="pt-6 border-t border-red-500/30">
                        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <!-- Copyright -->
                            <div class="text-gray-400 text-sm font-mono">
                                <span>&copy; ${this.config.copyright.year} ${this.config.copyright.entity}</span>
                                <span class="ml-4 text-red-400">Enterprise Server Portal</span>
                            </div>

                            <!-- Security Status -->
                            <div class="text-gray-400 text-sm flex items-center space-x-4 font-mono">
                                <span class="flex items-center">
                                    <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                                    SECURE: ACTIVE
                                </span>
                                <span class="hidden md:inline">|</span>
                                <span class="flex items-center">
                                    <span class="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                                    <span class="text-amber-400">ENTERPRISE GRADE</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }

    renderSecurityFeatures() {
        if (!this.config.security?.features) return '';
        
        return this.config.security.features.map(feature => `
            <div class="flex items-center justify-between text-xs font-mono">
                <span class="flex items-center">
                    <span class="mr-2">${feature.icon}</span>
                    ${feature.title}
                </span>
                <span class="text-green-400">✓</span>
            </div>
        `).join('');
    }

    renderMonitoringSystems() {
        if (!this.config.monitoring?.systems) return '';
        
        const statusColors = {
            'optimal': 'text-green-400',
            'normal': 'text-blue-400',
            'monitoring': 'text-yellow-400',
            'verified': 'text-green-400'
        };
        
        return this.config.monitoring.systems.map(system => `
            <li>
                <a 
                    href="${system.href}" 
                    class="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm font-mono flex items-center justify-between"
                >
                    <span>${system.title}</span>
                    <span class="${statusColors[system.status] || 'text-gray-400'} text-xs">●</span>
                </a>
            </li>
        `).join('');
    }

    renderComplianceStandards() {
        if (!this.config.security?.compliance) return '';
        
        return this.config.security.compliance.map(standard => `
            <li>
                <a 
                    href="${standard.href}" 
                    class="text-gray-400 hover:text-red-400 transition-colors duration-200 text-sm font-mono flex items-center justify-between"
                >
                    <span>${standard.title}</span>
                    <span class="text-green-400 text-xs">✓</span>
                </a>
            </li>
        `).join('');
    }
}

// Factory function for Server footer
function createServerFooter(config = {}) {
    return new ServerFooter(config);
}

// Export for module systems
if (typeof window !== 'undefined') {
    window.ServerFooter = ServerFooter;
    window.createServerFooter = createServerFooter;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ServerFooter, createServerFooter };
}