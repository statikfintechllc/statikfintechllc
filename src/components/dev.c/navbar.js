/**
 * DevNavbar (Domain: dev.sfti-ai.org)
 * ----------------------------------
 * Tailwind-based component that extends the base SFTiNavbar while supplying
 * domain‑specific styling, desktop + mobile layouts, and developer/status
 * indicators. No external index.html or stylesheet edits required.
 *
 * Requirements implemented:
 *  - Desktop: logo (blue/green), subtitle, horizontal nav items, dev/status pills, no ticker
 *  - Mobile: compact header (logo + hamburger) + slide-over menu + inline repo stats row
 *  - Ticker GIF remains separate (rendered by existing SFTiTicker into #ticker-container)
 *  - Pure Tailwind utility classes – component is self‑contained
 */

// Ensure base class exists
if (typeof window !== 'undefined' && !window.SFTiNavbar) {
  console.warn('[DevNavbar] Base SFTiNavbar missing – ensure global.c/navbar.js is loaded first.');
}

class DevNavbar extends SFTiNavbar {
  constructor(config = {}) {
    super({
      containerId: 'navbar-container',
      logoText: 'SFTi Dev',
      logoSubtitle: 'PWA Hub',
      items: [
        { title: 'Home', href: 'https://www.sfti-ai.org', external: true, description: 'Main site' },
        { title: 'Institute', href: 'https://www.sfti-ai.org#institute', external: true, description: 'Research division' },
        { title: 'Projects', href: 'https://www.sfti-ai.org#projects', external: true, description: 'Featured projects' },
        { title: 'Research', href: 'https://www.sfti-ai.org#research', external: true, description: 'Publications' },
        { title: 'PWAs', href: '#pwas', description: 'Application grid' },
        { title: 'Status', href: '#status', description: 'System status' },
        { title: 'Server', href: 'https://server.sfti-ai.org', external: true, description: 'Secure portal' }
      ],
      ...config
    });
  }

  // Active link detection (hash + pathname support)
  isActive(href) {
    if (!href || href.startsWith('http')) return false;
    const loc = window.location;
    return loc.hash === href || (href.startsWith('#') && loc.hash === href) || (href !== '#' && loc.pathname.endsWith(href.replace('#','')));
  }

  getTemplate() {
    return `
      <nav class="sfti-dev-navbar fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur supports-[backdrop-filter]:backdrop-blur border-b border-blue-500/20 h-12 font-sans">
        <div class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          <!-- Logo + Status (desktop) -->
          <div class="flex items-center space-x-6 h-full">
            <div class="flex flex-col leading-none cursor-pointer select-none" onclick="location.href='#home'">
              <span class="text-blue-400 font-bold text-lg leading-tight tracking-tight">${this.config.logoText}</span>
              <span class="text-green-400 text-xs leading-tight">${this.config.logoSubtitle}</span>
            </div>
            <div class="hidden lg:flex items-center space-x-4 pl-4 border-l border-white/10">
              <div class="flex items-center space-x-1">
                <span class="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span class="text-green-400 text-[10px] font-mono">DEV</span>
              </div>
              <div class="flex items-center space-x-1">
                <span class="text-blue-400 text-[10px] font-mono" id="build-status">BUILD: OK</span>
              </div>
            </div>
          </div>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center space-x-6 h-full">
            ${this.config.items.map(item => `
              <a href="${item.href}" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
                 class="relative text-sm font-mono transition-colors duration-200 ${this.isActive(item.href) ? 'text-green-400' : 'text-white hover:text-green-400'}">
                 ${item.title}${item.external ? '<span class=\'ml-1 text-xs text-gray-400\'>↗</span>' : ''}
                 <span class="${this.isActive(item.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-400 transition-opacity"></span>
              </a>
            `).join('')}
          </div>

          <!-- Mobile Toggle -->
          <button id="mobile-menu-toggle" aria-label="Open menu" aria-expanded="false" class="md:hidden p-2 rounded hover:bg-blue-500/20 transition-colors">
            <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>

        <!-- Slide-over Mobile Menu -->
        <div id="mobile-menu" class="md:hidden fixed inset-y-0 right-0 w-80 max-w-[80%] bg-black/95 backdrop-blur-sm border-l border-blue-500/30 transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col">
          <div class="flex items-center justify-between p-5 border-b border-blue-500/30">
            <div class="flex flex-col leading-none">
              <span class="text-blue-400 font-bold text-lg">${this.config.logoText}</span>
              <span class="text-green-400 text-xs">${this.config.logoSubtitle}</span>
            </div>
            <button id="mobile-menu-close" aria-label="Close menu" class="p-2 rounded hover:bg-blue-500/20 transition-colors">
              <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto px-5 py-4 space-y-1">
            ${this.config.items.map(item => `
              <a href="${item.href}" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
                 class="flex items-center justify-between px-3 py-2 rounded-lg transition-colors font-mono text-sm ${this.isActive(item.href) ? 'bg-blue-500/15 text-green-400' : 'text-white hover:text-green-400 hover:bg-blue-500/10'}">
                 <span>${item.title}</span>
                 <span class="text-gray-400 text-xs">${item.external ? '↗' : '→'}</span>
              </a>
            `).join('')}
          </div>
          <div class="p-5 border-t border-blue-500/30 space-y-3">
            <div class="grid grid-cols-3 gap-2 text-center">
              <div class="p-2 rounded bg-blue-500/10">
                <span class="block text-[10px] text-gray-400">Stars</span>
                <span class="text-green-400 text-xs font-mono" id="repo-stars">4</span>
              </div>
              <div class="p-2 rounded bg-blue-500/10">
                <span class="block text-[10px] text-gray-400">Issues</span>
                <span class="text-green-400 text-xs font-mono" id="repo-issues">0</span>
              </div>
              <div class="p-2 rounded bg-blue-500/10">
                <span class="block text-[10px] text-gray-400">PRs</span>
                <span class="text-green-400 text-xs font-mono" id="repo-prs">0</span>
              </div>
            </div>
            <div class="text-center pt-2 border-t border-white/10">
              <div class="flex items-center justify-center space-x-2 mb-1">
                <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span class="text-green-400 text-[10px] font-mono">ALL SYSTEMS OPERATIONAL</span>
              </div>
              <p class="text-gray-500 text-[10px] font-mono">PWA Development Environment</p>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  // Override parent attachEventListeners to add our logic while using base when possible
  attachEventListeners() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('mobile-menu-close');
    const menu = document.getElementById('mobile-menu');
    if (toggle) {
      toggle.addEventListener('click', () => {
        menu?.classList.remove('translate-x-full');
        this.mobileMenuOpen = true;
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeMobile());
    }
    document.addEventListener('click', (e) => {
      if (this.mobileMenuOpen && menu && !menu.contains(e.target) && !toggle?.contains(e.target)) {
        this.closeMobile();
      }
    });
    window.addEventListener('hashchange', () => this.highlightActive());
    this.highlightActive();
  }

  closeMobile() {
    const menu = document.getElementById('mobile-menu');
    menu?.classList.add('translate-x-full');
    this.mobileMenuOpen = false;
  }

  highlightActive() {
    const links = document.querySelectorAll('#navbar-container a[href]');
    links.forEach(l => {
      const el = l; // HTMLElement
      const href = el.getAttribute('href');
      if (href && !href.startsWith('http')) {
        if (this.isActive(href)) {
          el.classList.add('text-green-400');
        } else {
          el.classList.remove('text-green-400');
        }
      }
    });
  }
}

// Factory (for consistency with template naming)
function createDevNavbar(config = {}) {
  return new DevNavbar(config);
}

if (typeof window !== 'undefined') {
  window.DevNavbar = DevNavbar;
  window.createDevNavbar = createDevNavbar;
}

// CommonJS support (not required but keeps parity with existing template pattern)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DevNavbar, createDevNavbar };
}
