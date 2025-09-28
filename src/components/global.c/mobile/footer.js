// @ts-nocheck
/**
 * Global Footer Component (Mobile Variant)
 * =======================================
 *
 * Wraps the desktop footer with a simplified layout optimised for
 * stacked mobile presentation.
 */

const BaseFooter = typeof SFTiFooter !== 'undefined'
    ? SFTiFooter
    : (typeof window !== 'undefined' ? window.SFTiFooter : undefined);

if (!BaseFooter) {
    throw new Error('SFTi Mobile Footer: desktop variant must be loaded first.');
}

class SFTiMobileFooter extends BaseFooter {
    getTemplate() {
        return `
            <footer class="sfti-footer bg-black border-t border-white/10 mt-auto">
                <div class="max-w-xl mx-auto px-4 py-10 space-y-8">
                    <div class="text-center space-y-3">
                        <h3 class="text-white font-bold text-lg ${this.getDomainAccent()}">${this.config.logoText}</h3>
                        <p class="text-gray-400 text-sm leading-relaxed">${this.config.tagline}</p>
                        <div class="flex items-center justify-center space-x-4">
                            ${this.renderSocialLinks()}
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-6 text-center">
                        <div>
                            <h4 class="text-white font-semibold mb-3">Quick Links</h4>
                            <ul class="space-y-2">
                                ${this.renderQuickLinks()}
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-white font-semibold mb-3">Domains</h4>
                            <ul class="space-y-2">
                                ${this.renderDomainLinks()}
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-white font-semibold mb-3">Legal</h4>
                            <ul class="space-y-2">
                                ${this.renderLegalLinks()}
                            </ul>
                        </div>
                    </div>

                    <div class="text-center text-sm text-gray-400 space-y-2">
                        <div>
                            &copy; ${this.config.copyright.year} ${this.config.copyright.entity}
                            ${this.config.copyright.allRights ? '· All rights reserved.' : ''}
                        </div>
                        <div>${this.config.contact.email} · ${this.config.contact.location}</div>
                        <div class="flex items-center justify-center space-x-2 text-gray-300">
                            <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span>System Status: Operational</span>
                            <span class="text-gray-500">|</span>
                            <span class="${this.getDomainAccent()}">${this.getDomainLabel()}</span>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

function createMobileSFTiFooter(config = {}) {
    return new SFTiMobileFooter({ ...config, responsive: true });
}

if (typeof window !== 'undefined') {
    window.SFTiMobileFooter = SFTiMobileFooter;
    window.createMobileSFTiFooter = createMobileSFTiFooter;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SFTiMobileFooter, createMobileSFTiFooter };
}
