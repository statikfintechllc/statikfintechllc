/**
 * SFTi Unified API Client
 * ======================
 * 
 * Central API client for communication with server.sfti-ai.org
 * Used across all domains for authentication and data requests
 */

const API_BASE_URL = 'https://server.sfti-ai.org';

export class SFTiApiClient {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.token = this.getStoredToken();
  }

  // Token management
  getStoredToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sfti_auth_token');
    }
    return null;
  }

  setToken(token) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sfti_auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sfti_auth_token');
    }
  }

  // Base request method
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async signup(userData) {
    return this.request('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    const response = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async logout() {
    try {
      await this.request('/api/auth/logout', {
        method: 'POST',
      });
    } finally {
      this.clearToken();
    }
  }

  // User profile endpoints
  async getUserProfile() {
    return this.request('/api/user/profile');
  }

  async updateUserProfile(profileData) {
    return this.request('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Usage tracking
  async trackUsage(eventData) {
    return this.request('/api/usage/track', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  // Email updates
  async subscribeToUpdates(email) {
    return this.request('/api/email/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async unsubscribeFromUpdates(email) {
    return this.request('/api/email/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // Research papers endpoint (for www domain)
  async getResearchPapers() {
    return this.request('/api/research/papers');
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health');
  }
}

// Export singleton instance
export const apiClient = new SFTiApiClient();

// Export for different environments
export default SFTiApiClient;