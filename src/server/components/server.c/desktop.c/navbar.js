/** ServerNavbar - secure server portal navbar */
class ServerNavbar extends SFTiNavbar {
  constructor(config={}) {
    super({
      containerId:'navbar-container',
      logoText:'SFTi Server',
      logoSubtitle:'Secure Access',
      items:[
        { title:'Home', href:'https://www.sfti-ai.org', external:true },
        { title:'PWAs', href:'https://dev.sfti-ai.org', external:true },
        { title:'Docs', href:'#documentation' },
        { title:'Status', href:'#login-section' }
      ],
      ...config
    });
  }
  getTemplate(){
    return `
    <nav class="navbar fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur border-b border-green-500/30 h-12">
      <div class="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div class="flex flex-col leading-none select-none cursor-pointer" onclick="location.href='#login-section'">
          <span class="text-green-400 font-bold text-lg leading-tight">${this.config.logoText}</span>
          <span class="text-blue-400 text-[10px] leading-tight tracking-wide">${this.config.logoSubtitle}</span>
        </div>
        <div class="hidden md:flex items-center space-x-6">
          ${this.config.items.map(i=>`<a href="${i.href}" ${i.external?'target=\'_blank\' rel=\'noopener noreferrer\'':''} class="text-white hover:text-green-400 text-sm transition-colors">${i.title}${i.external?'<span class=\'ml-1 text-xs text-gray-400\'>↗</span>':''}</a>`).join('')}
        </div>
        <button id="mobile-menu-toggle" class="md:hidden p-2 h-8 w-8 flex items-center justify-center" aria-label="Open menu">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
      <div id="mobile-menu" class="md:hidden fixed inset-y-0 right-0 w-64 bg-black/95 backdrop-blur border-l border-green-500/30 transform translate-x-full transition-transform duration-300 ease-in-out">
        <div class="flex flex-col p-6 space-y-4 mt-6">
          <button id="mobile-menu-close" class="self-end p-2 mb-4" aria-label="Close menu">
            <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          ${this.config.items.map(i=>`<a href="${i.href}" ${i.external?'target=\'_blank\' rel=\'noopener noreferrer\'':''} class="text-white hover:text-green-400 text-base transition-colors">${i.title}${i.external?'<span class=\'ml-1 text-xs text-gray-400\'>↗</span>':''}</a>`).join('')}
        </div>
      </div>
    </nav>`;
  }
}
function createServerNavbar(cfg={}){ return new ServerNavbar(cfg); }
if (typeof window!=='undefined'){ window.ServerNavbar = ServerNavbar; window.createServerNavbar=createServerNavbar; }
if (typeof module!=='undefined'&&module.exports){ module.exports={ServerNavbar,createServerNavbar}; }