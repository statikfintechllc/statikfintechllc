// @ts-nocheck
/**
 * SFTi Navbar Component (Mobile Variant)
 * =====================================
 *
 * Extends the desktop navbar with an immersive mobile drawer experience.
 */

const BaseNavbar = typeof SFTiNavbar !== 'undefined'
    ? SFTiNavbar
    : (typeof window !== 'undefined' ? window.SFTiNavbar : undefined);

if (!BaseNavbar) {
    throw new Error('SFTi Mobile Navbar: desktop variant must be loaded first.');
}

class SFTiMobileNavbar extends BaseNavbar {
    getTemplate() {
        return `
            <style>
                /* Ensure translate-y-full works even without Tailwind CDN processing */
                #mobile-menu.translate-y-full {
                    transform: translateY(100%) !important;
                }
                #mobile-menu.translate-y-0 {
                    transform: translateY(0) !important;
                }
            </style>
            <div class="fixed top-0 left-0 right-0 z-50">
                <!-- Main navbar -->
                <nav class="bg-black/95 backdrop-blur-xl border-b border-white/10">
                    <div class="px-4 h-14 flex items-center justify-between">
                        <div class="flex flex-col leading-tight">
                            <span class="text-red-500 font-bold text-base">${this.config.logoText}</span>
                            <span class="text-yellow-400 text-[10px] uppercase tracking-wide">
                                ${this.config.logoSubtitle}
                            </span>
                        </div>

                        <button id="mobile-menu-toggle" class="p-2 rounded-md border border-white/10">
                            <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>

                    <div id="mobile-menu" class="fixed left-0 right-0 bg-black/95 backdrop-blur-xl transform translate-y-full transition-transform duration-300 ease-in-out" style="top: 14rem; bottom: 0; z-index: 40;">
                        <div class="h-full flex flex-col">
                            <div class="flex items-center justify-between px-4 h-14 border-b border-white/10">
                                <div class="text-sm text-gray-300">Navigation</div>
                                <button id="mobile-menu-close" class="p-2 rounded-md border border-white/10">
                                    <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            </div>

                            <div class="flex-1 overflow-y-auto px-6 py-8 space-y-4">
                                ${this.config.items.map(item => `
                                    <a href="${item.href}"
                                       class="block text-lg font-medium text-white/90 bg-white/5 border border-white/10 rounded-xl px-4 py-3 active:bg-white/10 touch-manipulation"
                                       ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
                                        ${item.title}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </nav>
                
                <!-- Integrated ticker at bottom of navbar stack -->
                <div id="navbar-ticker" class="bg-black/95 backdrop-blur-xl border-b border-white/10" style="position: relative; z-index: 50;">
                    <div class="max-w-lg mx-auto px-4 py-3 flex items-center justify-center">
                        <img src="${this.config.tickerGifUrl || 'https://raw.githubusercontent.com/KDK-Grim/WorkFlowRepo-Mirror/master/docs/ticker-bot/ticker.gif'}" 
                             alt="Repo Ticker Stats"
                             class="h-10 w-auto object-contain mix-blend-screen"
                             onerror="this.style.display='none';" />
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Ensure menu is hidden on init (force it!)
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            // Force hide the menu by setting inline style
            mobileMenu.style.transform = 'translateY(100%)';
        }

        const toggleButton = document.getElementById('mobile-menu-toggle');
        const closeButton = document.getElementById('mobile-menu-close');

        if (toggleButton) {
            toggleButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeMobileMenu();
            });
        }

        // Close menu when clicking a link
        if (mobileMenu) {
            const links = mobileMenu.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.mobileMenuOpen && mobileMenu && toggleButton) {
                if (!mobileMenu.contains(e.target) && !toggleButton.contains(e.target)) {
                    this.closeMobileMenu();
                }
            }
        });
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu) return;
        
        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        if (this.mobileMenuOpen) {
            mobileMenu.classList.remove('translate-y-full');
            mobileMenu.style.transform = 'translateY(0)';
        } else {
            mobileMenu.classList.add('translate-y-full');
            mobileMenu.style.transform = 'translateY(100%)';
        }
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (!mobileMenu) return;
        
        this.mobileMenuOpen = false;
        mobileMenu.classList.add('translate-y-full');
        mobileMenu.style.transform = 'translateY(100%)';
    }
}

function createMobileSFTiNavbar(config) {
    return new SFTiMobileNavbar(config);
}

if (typeof window !== 'undefined') {
    window.SFTiMobileNavbar = SFTiMobileNavbar;
    window.createMobileSFTiNavbar = createMobileSFTiNavbar;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SFTiMobileNavbar, createMobileSFTiNavbar };
}
