// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMatrixEffect();
    initAuthentication();
    initModal();
    initDashboard();
    checkAuthStatus();
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
}

// Matrix background effect
function initMatrixEffect() {
    const matrixContainer = document.getElementById('matrix');
    
    // Create matrix rain effect
    function createMatrixRain() {
        const chars = '01';
        const columns = Math.floor(window.innerWidth / 20);
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        function draw() {
            // Clear previous content
            matrixContainer.innerHTML = '';
            
            // Create matrix characters
            for (let i = 0; i < columns; i++) {
                if (Math.random() > 0.98) {
                    const char = document.createElement('span');
                    char.textContent = chars[Math.floor(Math.random() * chars.length)];
                    char.style.position = 'absolute';
                    char.style.left = i * 20 + 'px';
                    char.style.top = drops[i] * 20 + 'px';
                    char.style.color = `rgba(255, 0, 128, ${Math.random() * 0.5 + 0.1})`;
                    char.style.fontSize = '14px';
                    char.style.fontFamily = 'Courier New, monospace';
                    char.style.animation = 'fadeOut 2s linear forwards';
                    
                    matrixContainer.appendChild(char);
                    
                    drops[i]++;
                    
                    if (drops[i] * 20 > window.innerHeight && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                }
            }
        }
        
        setInterval(draw, 100);
    }
    
    createMatrixRain();
    
    // Add fadeOut animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Authentication system
function initAuthentication() {
    const loginForm = document.getElementById('login-form');
    const loginBtn = loginForm.querySelector('.login-btn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoader = loginBtn.querySelector('.btn-loader');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const mfaCode = document.getElementById('mfa-code').value;
        const rememberMe = document.getElementById('remember-me').checked;
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
        loginBtn.disabled = true;
        
        // Simulate authentication
        setTimeout(() => {
            authenticateUser(username, password, mfaCode, rememberMe);
        }, 2000);
    });
}

function authenticateUser(username, password, mfaCode, rememberMe) {
    const loginBtn = document.querySelector('.login-btn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoader = loginBtn.querySelector('.btn-loader');
    
    // Demo credentials (in production, this would be server-side)
    const validCredentials = {
        'admin': 'secure123',
        'developer': 'dev456',
        'operator': 'ops789'
    };
    
    if (validCredentials[username] === password) {
        // Successful authentication
        showNotification('Authentication successful! Redirecting...', 'success');
        
        // Store authentication status
        const authData = {
            username: username,
            authenticated: true,
            timestamp: Date.now(),
            rememberMe: rememberMe
        };
        
        if (rememberMe) {
            localStorage.setItem('sfti_auth', JSON.stringify(authData));
        } else {
            sessionStorage.setItem('sfti_auth', JSON.stringify(authData));
        }
        
        setTimeout(() => {
            showDashboard(username);
        }, 1500);
    } else {
        // Failed authentication
        showNotification('Invalid credentials. Please try again.', 'error');
        
        // Reset button state
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        loginBtn.disabled = false;
        
        // Add shake animation to form
        const loginContainer = document.querySelector('.login-form-container');
        loginContainer.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            loginContainer.style.animation = '';
        }, 500);
        
        // Clear password field
        document.getElementById('password').value = '';
        
        // Log security event
        logSecurityEvent('Failed login attempt', username);
    }
}

function showDashboard(username) {
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const userNameElement = document.getElementById('user-name');
    
    // Hide login section and show dashboard
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'block';
    
    // Update user info
    userNameElement.textContent = `Welcome, ${username}`;
    
    // Start dashboard updates
    startDashboardUpdates();
    
    // Log successful login
    logSecurityEvent('Successful login', username);
}

function logout() {
    // Clear authentication data
    localStorage.removeItem('sfti_auth');
    sessionStorage.removeItem('sfti_auth');
    
    // Reset UI
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const loginForm = document.getElementById('login-form');
    
    dashboardSection.style.display = 'none';
    loginSection.style.display = 'flex';
    
    // Reset form
    loginForm.reset();
    const loginBtn = document.querySelector('.login-btn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoader = loginBtn.querySelector('.btn-loader');
    
    btnText.style.display = 'block';
    btnLoader.style.display = 'none';
    loginBtn.disabled = false;
    
    showNotification('Logged out successfully', 'info');
    logSecurityEvent('User logout', 'Unknown');
}

function checkAuthStatus() {
    const authData = JSON.parse(localStorage.getItem('sfti_auth') || sessionStorage.getItem('sfti_auth') || 'null');
    
    if (authData && authData.authenticated) {
        // Check if session is still valid (24 hours for remember me, 1 hour for session)
        const maxAge = authData.rememberMe ? 24 * 60 * 60 * 1000 : 60 * 60 * 1000;
        const isValid = Date.now() - authData.timestamp < maxAge;
        
        if (isValid) {
            showDashboard(authData.username);
        } else {
            // Session expired
            localStorage.removeItem('sfti_auth');
            sessionStorage.removeItem('sfti_auth');
            showNotification('Session expired. Please login again.', 'warning');
        }
    }
}

// Password toggle functionality
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.password-toggle');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = '👁️';
    }
}

// Dashboard functionality
function initDashboard() {
    // Initialize dashboard components
    updateSystemMetrics();
    loadSecurityLogs();
}

function startDashboardUpdates() {
    // Update metrics every 5 seconds
    setInterval(updateSystemMetrics, 5000);
    
    // Update logs every 10 seconds
    setInterval(loadSecurityLogs, 10000);
}

function updateSystemMetrics() {
    // Simulate real-time metrics
    const cpuUsage = document.getElementById('cpu-usage');
    const memoryUsage = document.getElementById('memory-usage');
    
    if (cpuUsage) {
        const newCpu = Math.floor(Math.random() * 50) + 15; // 15-65%
        cpuUsage.textContent = `${newCpu}%`;
        
        // Change color based on usage
        if (newCpu > 80) {
            cpuUsage.style.color = 'var(--danger-color)';
        } else if (newCpu > 60) {
            cpuUsage.style.color = 'var(--warning-color)';
        } else {
            cpuUsage.style.color = 'var(--accent-color)';
        }
    }
    
    if (memoryUsage) {
        const newMemory = Math.floor(Math.random() * 40) + 30; // 30-70%
        memoryUsage.textContent = `${newMemory}%`;
        
        // Change color based on usage
        if (newMemory > 80) {
            memoryUsage.style.color = 'var(--danger-color)';
        } else if (newMemory > 60) {
            memoryUsage.style.color = 'var(--warning-color)';
        } else {
            memoryUsage.style.color = 'var(--accent-color)';
        }
    }
}

function loadSecurityLogs() {
    const logsContainer = document.getElementById('security-logs');
    if (!logsContainer) return;
    
    // Add new log entry occasionally
    if (Math.random() > 0.7) {
        const logTypes = ['INFO', 'SUCCESS', 'WARN'];
        const messages = [
            'System health check completed',
            'Backup process initiated',
            'API request processed',
            'Service restart completed',
            'Security scan finished'
        ];
        
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        
        const time = new Date().toLocaleTimeString();
        const level = logTypes[Math.floor(Math.random() * logTypes.length)];
        const message = messages[Math.floor(Math.random() * messages.length)];
        
        logEntry.innerHTML = `
            <span class="log-time">${time}</span>
            <span class="log-level ${level.toLowerCase()}">${level}</span>
            <span class="log-message">${message}</span>
        `;
        
        // Add to top of logs
        logsContainer.insertBefore(logEntry, logsContainer.firstChild);
        
        // Keep only last 10 entries
        while (logsContainer.children.length > 10) {
            logsContainer.removeChild(logsContainer.lastChild);
        }
    }
}

function refreshLogs() {
    const refreshBtn = document.querySelector('.refresh-btn');
    refreshBtn.style.transform = 'rotate(360deg)';
    
    setTimeout(() => {
        refreshBtn.style.transform = '';
        loadSecurityLogs();
        showNotification('Security logs refreshed', 'info');
    }, 500);
}

function logSecurityEvent(event, user) {
    const logsContainer = document.getElementById('security-logs');
    if (!logsContainer) return;
    
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    
    const time = new Date().toLocaleTimeString();
    const level = event.includes('Failed') ? 'WARN' : 'INFO';
    const message = `${event} for user: ${user}`;
    
    logEntry.innerHTML = `
        <span class="log-time">${time}</span>
        <span class="log-level ${level.toLowerCase()}">${level}</span>
        <span class="log-message">${message}</span>
    `;
    
    logsContainer.insertBefore(logEntry, logsContainer.firstChild);
    
    // Keep only last 10 entries
    while (logsContainer.children.length > 10) {
        logsContainer.removeChild(logsContainer.lastChild);
    }
}

function performAction(action) {
    const actionMessages = {
        'restart-services': 'Restarting all services...',
        'backup-system': 'Creating system backup...',
        'update-system': 'Updating system packages...',
        'emergency-shutdown': 'Initiating emergency shutdown...'
    };
    
    const confirmMessages = {
        'restart-services': 'Are you sure you want to restart all services? This may cause temporary downtime.',
        'backup-system': 'Are you sure you want to create a system backup? This may take several minutes.',
        'update-system': 'Are you sure you want to update the system? This may require a restart.',
        'emergency-shutdown': 'Are you sure you want to perform an emergency shutdown? This will stop all services immediately.'
    };
    
    const message = confirmMessages[action];
    if (!confirm(message)) {
        return;
    }
    
    showNotification(actionMessages[action], 'info');
    
    // Simulate action execution
    setTimeout(() => {
        const successMessages = {
            'restart-services': 'All services restarted successfully',
            'backup-system': 'System backup completed successfully',
            'update-system': 'System updated successfully',
            'emergency-shutdown': 'Emergency shutdown completed'
        };
        
        showNotification(successMessages[action], 'success');
        logSecurityEvent(`Action performed: ${action}`, 'Current User');
        
        if (action === 'emergency-shutdown') {
            setTimeout(logout, 2000);
        }
    }, 3000);
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('access-modal');
    const accessForm = document.getElementById('access-form');
    const closeBtn = document.querySelector('.close');
    
    // Open modal when request access link is clicked
    document.addEventListener('click', function(e) {
        if (e.target.getAttribute('href') === '#request-access') {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Close modal
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle access request form
    accessForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(accessForm);
        const requestData = {
            name: formData.get('name'),
            email: formData.get('email'),
            company: formData.get('company'),
            reason: formData.get('reason'),
            duration: formData.get('duration'),
            timestamp: new Date().toISOString()
        };
        
        // Simulate sending request
        showNotification('Access request submitted successfully. You will receive a response within 24 hours.', 'success');
        
        // Close modal and reset form
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        accessForm.reset();
        
        // Log the request
        console.log('Access request:', requestData);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icons[type]}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 5000);
}

// Add shake animation style
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
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
        max-width: 350px;
        animation: slideInRight 0.3s ease-out;
        font-family: 'Courier New', monospace;
    }
    
    .notification.success {
        border-color: var(--success-color);
        box-shadow: 0 0 15px rgba(0, 255, 128, 0.3);
    }
    
    .notification.error {
        border-color: var(--danger-color);
        box-shadow: 0 0 15px rgba(255, 64, 64, 0.3);
    }
    
    .notification.warning {
        border-color: var(--warning-color);
        box-shadow: 0 0 15px rgba(255, 176, 0, 0.3);
    }
    
    .notification.info {
        border-color: var(--primary-color);
        box-shadow: 0 0 15px rgba(255, 0, 128, 0.3);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-icon {
        font-size: 1.2rem;
    }
    
    .notification-message {
        color: var(--text-light);
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;
document.head.appendChild(shakeStyle);

// Security enhancements
document.addEventListener('keydown', function(e) {
    // Disable F12 (Developer Tools)
    if (e.key === 'F12') {
        e.preventDefault();
        showNotification('Developer tools access is restricted', 'warning');
        return false;
    }
    
    // Disable Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        showNotification('Developer tools access is restricted', 'warning');
        return false;
    }
    
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        showNotification('Source view is restricted', 'warning');
        return false;
    }
});

// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showNotification('Right-click is disabled for security', 'warning');
    return false;
});

// Monitor for suspicious activity
let suspiciousActivity = 0;
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.altKey || e.metaKey) {
        suspiciousActivity++;
        if (suspiciousActivity > 10) {
            showNotification('Suspicious activity detected. Session will be terminated.', 'error');
            setTimeout(logout, 3000);
        }
    }
});

// Reset suspicious activity counter periodically
setInterval(() => {
    suspiciousActivity = Math.max(0, suspiciousActivity - 1);
}, 60000);