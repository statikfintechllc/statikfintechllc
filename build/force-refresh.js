// Force refresh script - run this in browser console to clear cache
console.log('🔄 Force refreshing page and clearing cache...');

// Clear all storage
if (typeof(Storage) !== "undefined") {
    localStorage.clear();
    sessionStorage.clear();
}

// Clear service worker cache if available
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
        for(let registration of registrations) {
            registration.unregister();
        }
    });
}

// Clear browser cache (requires user permission)
if ('caches' in window) {
    caches.keys().then(function(names) {
        for (let name of names) {
            caches.delete(name);
        }
    });
}

// Force reload with cache bypass
setTimeout(() => {
    window.location.reload(true);
}, 1000);

console.log('✅ Cache clearing initiated. Page will reload in 1 second.');