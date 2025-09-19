import{a as n}from"../../apiClient/assets/apiClient-82a38a5f.js";const o=[{title:"GremlinGPT",description:"Autonomous recursive AI system with local deployment capabilities",image:"/docs/G.G.svg/assets/gremlingpt-card.svg",links:{github:"https://github.com/statikfintechllc/GremlinGPT",demo:"https://dev.sfti-ai.org/gremlingpt"}},{title:"IB-G Scanner",description:"Advanced trading scanner PWA with real-time market analysis",image:"/docs/IB.G.svg/assets/ib-g-scanner-card.svg",links:{pwa:"https://dev.sfti-ai.org/ib-g-scanner",github:"https://github.com/statikfintechllc/IB-G.Scanner"}},{title:"Pilot Server",description:"Multi-model AI chat interface with GitHub integration",image:"/docs/P.S.svg/assets/pilot-server-card.svg",links:{pwa:"https://dev.sfti-ai.org/pilot-server",github:"https://github.com/statikfintechllc/Pilot-Server"}},{title:"Dragon Boot",description:"Automated deployment and infrastructure management system",image:"/docs/D.B.svg/assets/dragon-boot-card.svg",links:{github:"https://github.com/statikfintechllc/dragon-boot"}},{title:"AscendNet",description:"Decentralized network infrastructure for autonomous AI systems",image:"/docs/A.N.svg/assets/ascendnet-card.svg",links:{github:"https://github.com/statikfintechllc/AscendNet"}},{title:"Statik Server",description:"High-performance server infrastructure for AI workloads",image:"/docs/S.S.svg/assets/statik-server-card.svg",links:{github:"https://github.com/statikfintechllc/statik-server"}}];document.addEventListener("DOMContentLoaded",function(){l()});async function l(){try{await r(),await a(),c(),d(),g(),console.log("SFTi Main Website initialized successfully")}catch(t){console.error("Failed to initialize main website:",t)}}async function r(){const t=document.getElementById("projects-grid");t&&(t.innerHTML=o.map(e=>`
        <div class="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors group">
            <div class="aspect-video bg-gray-700 flex items-center justify-center">
                <img src="${e.image}" 
                     alt="${e.title}" 
                     class="max-h-full max-w-full object-contain"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div class="hidden items-center justify-center text-gray-400">
                    <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">${e.title}</h3>
                <p class="text-gray-400 mb-4">${e.description}</p>
                <div class="flex gap-2">
                    ${e.links.github?`
                        <a href="${e.links.github}" 
                           class="bg-gray-700 hover:bg-primary text-white px-3 py-1 rounded text-sm transition-colors"
                           target="_blank" rel="noopener">
                            GitHub
                        </a>
                    `:""}
                    ${e.links.pwa?`
                        <a href="${e.links.pwa}" 
                           class="bg-primary hover:bg-primary/80 text-white px-3 py-1 rounded text-sm transition-colors"
                           target="_blank" rel="noopener">
                            Launch PWA
                        </a>
                    `:""}
                    ${e.links.demo?`
                        <a href="${e.links.demo}" 
                           class="bg-secondary hover:bg-secondary/80 text-white px-3 py-1 rounded text-sm transition-colors"
                           target="_blank" rel="noopener">
                            Demo
                        </a>
                    `:""}
                </div>
            </div>
        </div>
    `).join(""))}async function a(){const t=document.getElementById("research-papers");if(t)try{const i=(await n.getResearchPapers()).papers||[];t.innerHTML=i.map(s=>`
            <div class="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors group">
                <div class="mb-4">
                    <span class="inline-block bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
                        ${s.type}
                    </span>
                </div>
                <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    ${s.title}
                </h3>
                <p class="text-gray-400 mb-4 line-clamp-3">
                    ${s.description}
                </p>
                <div class="aspect-video bg-gray-700 rounded mb-4 flex items-center justify-center">
                    <img src="${s.url}" 
                         alt="${s.title}" 
                         class="max-h-full max-w-full object-contain rounded"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="hidden items-center justify-center text-gray-400">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        </svg>
                    </div>
                </div>
                <a href="${s.url}" 
                   class="inline-block bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded transition-colors"
                   target="_blank" rel="noopener">
                    Read Paper
                </a>
            </div>
        `).join("")}catch(e){console.error("Failed to load research papers:",e),t.innerHTML=`
            <div class="col-span-full text-center text-gray-400">
                <p>Research papers will be available soon.</p>
            </div>
        `}}function c(){document.querySelectorAll('a[href^="#"]').forEach(t=>{t.addEventListener("click",function(e){e.preventDefault();const i=document.querySelector(this.getAttribute("href"));i&&i.scrollIntoView({behavior:"smooth",block:"start"})})})}function d(){const t=document.getElementById("mobile-menu-button");document.getElementById("mobile-menu"),t&&t.addEventListener("click",function(){console.log("Mobile menu toggle")})}function g(){let t=window.scrollY;window.addEventListener("scroll",()=>{const e=window.scrollY,i=document.querySelector("nav");i&&(e>t&&e>100?i.style.transform="translateY(-100%)":i.style.transform="translateY(0)"),t=e},{passive:!0})}window.SFTiMain={loadProjects:r,loadResearchPapers:a,apiClient:n};
