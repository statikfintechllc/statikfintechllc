// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initAnimations();
    initStatusUpdates();
    updateMetrics();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    function closeMobileMenu() {
        if (navLinks) navLinks.classList.remove('mobile-active');
        if (hamburger) hamburger.classList.remove('active');
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    if (navLinks) {
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target instanceof Node && !hamburger?.contains(target) && !navLinks?.contains(target)) {
            closeMobileMenu();
        }
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar && navbar instanceof HTMLElement) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            }
        }
    });
}

// PWA Launch functionality
function launchPWA(appName) {
    const modal = document.getElementById('launch-modal');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Show launch modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Reset loading bar
    loadingProgress.style.width = '0%';
    
    // Simulate launch process
    setTimeout(() => {
        loadingProgress.style.animation = 'loading 3s ease-in-out forwards';
    }, 100);
    
    // App-specific launch logic
    setTimeout(() => {
        closeModal();
        handleAppLaunch(appName);
    }, 3500);
}

function handleAppLaunch(appName) {
    const appUrls = {
        'ib-g-scanner': '/apps/ib-g-scanner/',
        'pilot-server': '/apps/pilot-server/',
        'gremlin-shadtail': '/apps/gremlin-shadtail/'
    };
    
    const appUrl = appUrls[appName];
    if (appUrl) {
        // In a real implementation, this would launch the PWA
        // For now, we'll show a placeholder
        showLaunchSuccess(appName);
    } else {
        showLaunchError(appName);
    }
}

function showLaunchSuccess(appName) {
    const notification = createNotification(`${formatAppName(appName)} launched successfully!`, 'success');
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

function showLaunchError(appName) {
    const notification = createNotification(`Failed to launch ${formatAppName(appName)}. Please try again.`, 'error');
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 5000);
}

function createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : '❌'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    return notification;
}

// App Details functionality
function showAppDetails(appName) {
    const modal = document.getElementById('app-modal');
    const detailsContent = document.getElementById('app-details');
    
    const appDetails = {
        'ib-g-scanner': {
            name: 'IB-G.Scanner',
            version: '2.1.4',
            description: 'Advanced market scanning and analysis tool designed for Interactive Brokers trading platform.',
            features: [
                'Real-time market data streaming',
                'Pattern recognition algorithms',
                'Automated alert system',
                'Risk management tools',
                'Portfolio optimization',
                'Backtesting capabilities'
            ],
            requirements: [
                'Interactive Brokers account',
                'TWS or IB Gateway',
                'Minimum 4GB RAM',
                'Stable internet connection'
            ],
            status: 'Online',
            lastUpdate: '2024-01-15'
        },
        'pilot-server': {
            name: 'Pilot-Server',
            version: '1.8.2',
            description: 'Autonomous server management and deployment system for cloud infrastructure.',
            features: [
                'Automated scaling',
                'Real-time monitoring',
                'Deployment pipelines',
                'Resource optimization',
                'Security scanning',
                'Performance analytics'
            ],
            requirements: [
                'Cloud provider access',
                'Docker support',
                'Kubernetes cluster',
                'Administrative privileges'
            ],
            status: 'Online',
            lastUpdate: '2024-01-12'
        },
        'gremlingpt': {
            name: 'GremlinGPT',
            version: '0.9.1-beta',
            description: 'Recursive autonomous AI system with self-evolution capabilities and local processing.',
            features: [
                'Recursive learning algorithms',
                'Self-modifying code',
                'Local model training',
                'Privacy-focused design',
                'Adaptive behavior',
                'Multi-modal processing'
            ],
            requirements: [
                'NVIDIA GPU (RTX 3080+)',
                'Minimum 16GB RAM',
                'Python 3.9+',
                'CUDA 11.8+'
            ],
            status: 'In Development',
            lastUpdate: '2024-01-10'
        },
        'gremlin-shadtail': {
            name: 'Gremlin-ShadTail-Trader',
            version: '3.2.1',
            description: 'Autonomous trading system with AI-driven decision making and risk management.',
            features: [
                'AI-powered trading algorithms',
                'Dynamic risk management',
                'Multi-asset support',
                'Profit optimization',
                'Market sentiment analysis',
                'Automated position sizing'
            ],
            requirements: [
                'Trading account with API access',
                'Minimum $10,000 capital',
                'Stable internet connection',
                'Risk tolerance assessment'
            ],
            status: 'Online',
            lastUpdate: '2024-01-14'
        }
    };
    
    const app = appDetails[appName];
    if (app) {
        detailsContent.innerHTML = `
            <div class="app-details">
                <div class="app-header">
                    <h2>${app.name}</h2>
                    <span class="version-badge">v${app.version}</span>
                </div>
                <div class="app-status">
                    <span class="status-dot ${app.status === 'Online' ? 'active' : 'developing'}"></span>
                    <span>${app.status}</span>
                    <span class="last-update">Last updated: ${app.lastUpdate}</span>
                </div>
                <div class="app-description">
                    <h3>Description</h3>
                    <p>${app.description}</p>
                </div>
                <div class="app-features">
                    <h3>Features</h3>
                    <ul>
                        ${app.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="app-requirements">
                    <h3>Requirements</h3>
                    <ul>
                        ${app.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>
                </div>
                <div class="app-actions">
                    ${app.status === 'Online' 
                        ? `<button class="btn btn-primary" onclick="launchPWA('${appName}')">Launch Application</button>`
                        : `<button class="btn btn-disabled" disabled>Coming Soon</button>`
                    }
                    <a href="https://github.com/statikfintechllc/${appName}" class="btn btn-secondary" target="_blank">View Source</a>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Format app name for display
function formatAppName(appName) {
    const nameMap = {
        'ib-g-scanner': 'IB-G.Scanner',
        'pilot-server': 'Pilot-Server',
        'gremlingpt': 'GremlinGPT',
        'gremlin-shadtail': 'Gremlin-ShadTail-Trader'
    };
    return nameMap[appName] || appName;
}

// Modal close functionality
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Close modals when clicking close button or outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('close')) {
        closeModal();
    }
    if (e.target.classList.contains('modal')) {
        closeModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const elementsToAnimate = document.querySelectorAll('.pwa-card, .status-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Status updates simulation
function initStatusUpdates() {
    // Simulate real-time status updates
    setInterval(() => {
        updateSystemStatus();
    }, 5000); // Update every 5 seconds
}

function updateSystemStatus() {
    // Simulate response time fluctuation
    const responseTimeElement = document.querySelector('.metric-value');
    if (responseTimeElement && responseTimeElement.textContent.includes('ms')) {
        const newResponseTime = Math.floor(Math.random() * 50) + 30; // 30-80ms
        responseTimeElement.textContent = `${newResponseTime}ms`;
    }
    
    // Simulate CPU usage changes
    const cpuElements = document.querySelectorAll('.metric-value');
    if (cpuElements.length > 2) {
        const cpuElement = cpuElements[2];
        if (cpuElement.textContent.includes('%')) {
            const newCpuUsage = Math.floor(Math.random() * 40) + 20; // 20-60%
            cpuElement.textContent = `${newCpuUsage}%`;
        }
    }
    
    // Update timestamp for trading systems
    const timestampElements = document.querySelectorAll('.metric-value');
    timestampElements.forEach(element => {
        if (element.textContent.includes('ago')) {
            const seconds = Math.floor(Math.random() * 10) + 1;
            element.textContent = `${seconds}s ago`;
        }
    });
}

// Update metrics with real-time data simulation
function updateMetrics() {
    // Simulate training progress for AI systems
    const progressElement = document.querySelector('.metric-value');
    if (progressElement && progressElement.textContent.includes('%')) {
        let currentProgress = parseInt(progressElement.textContent);
        if (currentProgress < 100) {
            setInterval(() => {
                if (currentProgress < 95) {
                    currentProgress += Math.random() * 2;
                    progressElement.textContent = `${Math.floor(currentProgress)}%`;
                }
            }, 30000); // Update every 30 seconds
        }
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add custom styles for notifications and app details
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 3000;
        background: var(--glass-bg);
        backdrop-filter: blur(15px);
        border: 1px solid var(--glass-border);
        border-radius: 8px;
        padding: 1rem;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    }
    
    .notification.success {
        border-color: var(--primary-color);
        box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);
    }
    
    .notification.error {
        border-color: var(--accent-color);
        box-shadow: 0 0 15px rgba(255, 107, 0, 0.3);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-message {
        color: var(--text-light);
        font-family: 'Consolas', monospace;
        font-size: 0.9rem;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .app-details h2 {
        color: var(--primary-color);
        font-family: 'Consolas', monospace;
        margin-bottom: 1rem;
    }
    
    .app-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .version-badge {
        background: rgba(0, 255, 136, 0.2);
        color: var(--primary-color);
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-family: 'Consolas', monospace;
    }
    
    .app-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--border-color);
    }
    
    .last-update {
        margin-left: auto;
        color: var(--text-gray);
        font-size: 0.8rem;
    }
    
    .app-details h3 {
        color: var(--secondary-color);
        margin: 1.5rem 0 1rem 0;
        font-family: 'Consolas', monospace;
    }
    
    .app-details ul {
        color: var(--text-gray);
        padding-left: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .app-details li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }
    
    .app-actions {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        padding-top: 1rem;
        border-top: 1px solid var(--border-color);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(10, 10, 10, 0.95);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: right 0.3s ease;
        }
        
        .nav-links.active {
            right: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .app-actions {
            flex-direction: column;
        }
        
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;
document.head.appendChild(style);