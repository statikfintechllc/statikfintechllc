/**
 * Main Website JavaScript
 * ======================
 * 
 * Handles dynamic content loading for www.sfti-ai.org
 * Integrates with shared API client and loads research papers
 */

import { apiClient } from '../shared/lib/apiClient.js';

// Project data (could be fetched from API in the future)
const projects = [
    {
        title: 'GremlinGPT',
        description: 'Autonomous recursive AI system with local deployment capabilities',
        image: '/docs/G.G.svg/assets/gremlingpt-card.svg',
        links: {
            github: 'https://github.com/statikfintechllc/GremlinGPT',
            demo: 'https://dev.sfti-ai.org/gremlingpt'
        }
    },
    {
        title: 'IB-G Scanner',
        description: 'Advanced trading scanner PWA with real-time market analysis',
        image: '/docs/IB.G.svg/assets/ib-g-scanner-card.svg',
        links: {
            pwa: 'https://dev.sfti-ai.org/ib-g-scanner',
            github: 'https://github.com/statikfintechllc/IB-G.Scanner'
        }
    },
    {
        title: 'Pilot Server',
        description: 'Multi-model AI chat interface with GitHub integration',
        image: '/docs/P.S.svg/assets/pilot-server-card.svg',
        links: {
            pwa: 'https://dev.sfti-ai.org/pilot-server',
            github: 'https://github.com/statikfintechllc/Pilot-Server'
        }
    },
    {
        title: 'Dragon Boot',
        description: 'Automated deployment and infrastructure management system',
        image: '/docs/D.B.svg/assets/dragon-boot-card.svg',
        links: {
            github: 'https://github.com/statikfintechllc/dragon-boot'
        }
    },
    {
        title: 'AscendNet',
        description: 'Decentralized network infrastructure for autonomous AI systems',
        image: '/docs/A.N.svg/assets/ascendnet-card.svg',
        links: {
            github: 'https://github.com/statikfintechllc/AscendNet'
        }
    },
    {
        title: 'Statik Server',
        description: 'High-performance server infrastructure for AI workloads',
        image: '/docs/S.S.svg/assets/statik-server-card.svg',
        links: {
            github: 'https://github.com/statikfintechllc/statik-server'
        }
    }
];

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // Load dynamic content
        await loadProjects();
        await loadResearchPapers();
        
        // Initialize navigation
        initializeNavigation();
        
        // Initialize mobile menu
        initializeMobileMenu();
        
        // Initialize scroll effects
        initializeScrollEffects();
        
        console.log('SFTi Main Website initialized successfully');
    } catch (error) {
        console.error('Failed to initialize main website:', error);
    }
}

async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = projects.map(project => `
        <div class="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors group">
            <div class="aspect-video bg-gray-700 flex items-center justify-center">
                <img src="${project.image}" 
                     alt="${project.title}" 
                     class="max-h-full max-w-full object-contain"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div class="hidden items-center justify-center text-gray-400">
                    <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                    </svg>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">${project.title}</h3>
                <p class="text-gray-400 mb-4">${project.description}</p>
                <div class="flex gap-2">
                    ${project.links.github ? `
                        <a href="${project.links.github}" 
                           class="bg-gray-700 hover:bg-primary text-white px-3 py-1 rounded text-sm transition-colors"
                           target="_blank" rel="noopener">
                            GitHub
                        </a>
                    ` : ''}
                    ${project.links.pwa ? `
                        <a href="${project.links.pwa}" 
                           class="bg-primary hover:bg-primary/80 text-white px-3 py-1 rounded text-sm transition-colors"
                           target="_blank" rel="noopener">
                            Launch PWA
                        </a>
                    ` : ''}
                    ${project.links.demo ? `
                        <a href="${project.links.demo}" 
                           class="bg-secondary hover:bg-secondary/80 text-white px-3 py-1 rounded text-sm transition-colors"
                           target="_blank" rel="noopener">
                            Demo
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

async function loadResearchPapers() {
    const researchContainer = document.getElementById('research-papers');
    if (!researchContainer) return;
    
    try {
        const response = await apiClient.getResearchPapers();
        const papers = response.papers || [];
        
        researchContainer.innerHTML = papers.map(paper => `
            <div class="bg-gray-800 rounded-lg p-6 hover:bg-gray-750 transition-colors group">
                <div class="mb-4">
                    <span class="inline-block bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
                        ${paper.type}
                    </span>
                </div>
                <h3 class="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    ${paper.title}
                </h3>
                <p class="text-gray-400 mb-4 line-clamp-3">
                    ${paper.description}
                </p>
                <div class="aspect-video bg-gray-700 rounded mb-4 flex items-center justify-center">
                    <img src="${paper.url}" 
                         alt="${paper.title}" 
                         class="max-h-full max-w-full object-contain rounded"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="hidden items-center justify-center text-gray-400">
                        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        </svg>
                    </div>
                </div>
                <a href="${paper.url}" 
                   class="inline-block bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded transition-colors"
                   target="_blank" rel="noopener">
                    Read Paper
                </a>
            </div>
        `).join('');
    } catch (error) {
        console.error('Failed to load research papers:', error);
        researchContainer.innerHTML = `
            <div class="col-span-full text-center text-gray-400">
                <p>Research papers will be available soon.</p>
            </div>
        `;
    }
}

function initializeNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            // Toggle mobile menu (implement if needed)
            console.log('Mobile menu toggle');
        });
    }
}

function initializeScrollEffects() {
    // Add scroll-based animations or effects
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Hide/show navigation on scroll
        const nav = document.querySelector('nav');
        if (nav) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });
}

// Export for global access
window.SFTiMain = {
    loadProjects,
    loadResearchPapers,
    apiClient
};