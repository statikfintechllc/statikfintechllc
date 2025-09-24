import { useState, useCallback, useEffect } from 'react';

// localStorage utility functions
const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setStoredValue = useCallback((newValue: T) => {
    try {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key]);

  return [value, setStoredValue] as const;
};

export interface GitHubUser {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  bio?: string;
  company?: string;
  location?: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: GitHubUser | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface GitHubModel {
  id: string;
  name: string;
  publisher: string;
  registry: string;
  summary: string;
  html_url: string;
  version: string;
  capabilities: string[];
  limits: {
    max_input_tokens: number;
    max_output_tokens: number;
  };
  rate_limit_tier: string;
  supported_input_modalities: string[];
  supported_output_modalities: string[];
  tags: string[];
}

// Real GitHub Models organized by pricing tiers
// Daily-Dose: Budget-friendly models for everyday tasks
// Power-Ball: Premium models with enhanced capabilities and multipliers
export const AVAILABLE_GITHUB_MODELS: GitHubModel[] = [
  // Daily-Dose
  {
    id: 'gpt-4.1',
    name: 'GPT-4.1',
    publisher: 'OpenAI',
    registry: 'azure-openai',
    summary: 'Latest GPT-4.1 model with enhanced capabilities for daily tasks.',
    html_url: 'https://github.com/marketplace/models/azure-openai/gpt-4.1',
    version: '2024-12-01',
    capabilities: ['streaming', 'tool-calling'],
    limits: { max_input_tokens: 128000, max_output_tokens: 4096 },
    rate_limit_tier: 'low',
    supported_input_modalities: ['text', 'image'],
    supported_output_modalities: ['text'],
    tags: ['daily-dose']
  },
  {
    id: 'gpt-4o',
    name: 'GPT 4o',
    publisher: 'OpenAI',
    registry: 'azure-openai',
    summary: 'Optimized GPT-4 model for general-purpose tasks.',
    html_url: 'https://github.com/marketplace/models/azure-openai/gpt-4o',
    version: '2024-05-13',
    capabilities: ['streaming', 'tool-calling'],
    limits: { max_input_tokens: 128000, max_output_tokens: 4096 },
    rate_limit_tier: 'low',
    supported_input_modalities: ['text', 'image'],
    supported_output_modalities: ['text'],
    tags: ['daily-dose']
  },
  {
    id: 'gpt-5-mini',
    name: 'GPT-5 mini',
    publisher: 'OpenAI',
    registry: 'azure-openai',
    summary: 'Compact GPT-5 model for efficient everyday computing.',
    html_url: 'https://github.com/marketplace/models/azure-openai/gpt-5-mini',
    version: '2024-11-01',
    capabilities: ['streaming', 'tool-calling'],
    limits: { max_input_tokens: 64000, max_output_tokens: 2048 },
    rate_limit_tier: 'low',
    supported_input_modalities: ['text'],
    supported_output_modalities: ['text'],
    tags: ['daily-dose']
  },
  {
    id: 'grok-code-fast-1',
    name: 'Grok Code Fast 1',
    publisher: 'xAI',
    registry: 'xai',
    summary: 'Fast coding assistant optimized for rapid development tasks.',
    html_url: 'https://github.com/marketplace/models/xai/grok-code-fast-1',
    version: '1.0',
    capabilities: ['streaming', 'tool-calling'],
    limits: { max_input_tokens: 32000, max_output_tokens: 4096 },
    rate_limit_tier: 'low',
    supported_input_modalities: ['text'],
    supported_output_modalities: ['text'],
    tags: ['daily-dose']
  },
  
  // Power-Ball
  {
    id: 'claude-opus-4-x10',
    name: 'Claude Opus 4(x10)',
    publisher: 'Anthropic',
    registry: 'anthropic',
    summary: 'Most powerful Claude model with 10x enhanced reasoning capabilities.',
    html_url: 'https://github.com/marketplace/models/anthropic/claude-opus-4',
    version: '4.0',
    capabilities: ['streaming', 'tool-calling', 'advanced-reasoning'],
    limits: { max_input_tokens: 500000, max_output_tokens: 16384 },
    rate_limit_tier: 'premium',
    supported_input_modalities: ['text', 'image', 'document'],
    supported_output_modalities: ['text'],
    tags: ['power-ball']
  },
  {
    id: 'claude-opus-4.1-x10',
    name: 'Claude Opus 4.1(x10)',
    publisher: 'Anthropic',
    registry: 'anthropic',
    summary: 'Enhanced Claude Opus with 10x reasoning capabilities.',
    html_url: 'https://github.com/marketplace/models/anthropic/claude-opus-4.1',
    version: '4.1',
    capabilities: ['streaming', 'tool-calling', 'advanced-reasoning'],
    limits: { max_input_tokens: 500000, max_output_tokens: 16384 },
    rate_limit_tier: 'premium',
    supported_input_modalities: ['text', 'image', 'document'],
    supported_output_modalities: ['text'],
    tags: ['power-ball']
  },
  {
    id: 'claude-sonnet-3.5-x1',
    name: 'Claude Sonnet 3.5(x1)',
    publisher: 'Anthropic',
    registry: 'anthropic',
    summary: 'Balanced Claude Sonnet 3.5 with standard performance.',
    html_url: 'https://github.com/marketplace/models/anthropic/claude-sonnet-3.5',
    version: '3.5',
    capabilities: ['streaming', 'tool-calling'],
    limits: { max_input_tokens: 200000, max_output_tokens: 8192 },
    rate_limit_tier: 'medium',
    supported_input_modalities: ['text', 'image'],
    supported_output_modalities: ['text'],
    tags: ['power-ball']
  },
  {
    id: 'claude-sonnet-3.7-x1',
    name: 'Claude Sonnet 3.7(x1)',
    publisher: 'Anthropic',
    registry: 'anthropic',
    summary: 'Advanced Claude Sonnet 3.7 with standard performance.',
    html_url: 'https://github.com/marketplace/models/anthropic/claude-sonnet-3.7',
    version: '3.7',
    capabilities: ['streaming', 'tool-calling'],
    limits: { max_input_tokens: 200000, max_output_tokens: 8192 },
    rate_limit_tier: 'medium',
    supported_input_modalities: ['text', 'image'],
    supported_output_modalities: ['text'],
    tags: ['power-ball']
  },
  {
    id: 'claude-sonnet-3.7-thinking-x1.25',
    name: 'Claude Sonnet 3.7 Thinking(x1.25)',
    publisher: 'Anthropic',
    registry: 'anthropic',
    summary: 'Claude Sonnet 3.7 with enhanced thinking capabilities.',
    html_url: 'https://github.com/marketplace/models/anthropic/claude-sonnet-3.7-thinking',
    version: '3.7-thinking',
    capabilities: ['streaming', 'tool-calling', 'thinking'],
    limits: { max_input_tokens: 200000, max_output_tokens: 8192 },
    rate_limit_tier: 'medium',
    supported_input_modalities: ['text', 'image'],
    supported_output_modalities: ['text'],
    tags: ['power-ball']
  },
  {
    id: 'claude-sonnet-4-x1',
    name: 'Claude Sonnet 4(x1)',
    publisher: 'Anthropic',
    registry: 'anthropic',
    summary: 'Latest Claude Sonnet 4 with standard performance.',
    html_url: 'https://github.com/marketplace/models/anthropic/claude-sonnet-4',
    version: '4.0',
    capabilities: ['streaming', 'tool-calling'],
    limits: { max_input_tokens: 200000, max_output_tokens: 16384 },
    rate_limit_tier: 'high',
    supported_input_modalities: ['text', 'image'],
    supported_output_modalities: ['text'],
    tags: ['power-ball']
  },
  {
    id: 'gemini-2.0-flash-x0.25',
    name: 'Gemini 2.0 Flash(x0.25)',
    publisher: 'Google',
    registry: 'google',
    summary: 'Next-generation Gemini 2.0 Flash with quarter-speed performance.',
    html_url: 'https://github.com/marketplace/models/google/gemini-2.0-flash',
    version: '2.0',
    capabilities: ['streaming', 'tool-calling', 'multimodal'],
    limits: { max_input_tokens: 2000000, max_output_tokens: 16384 },
    rate_limit_tier: 'high',
    supported_input_modalities: ['text', 'image', 'audio', 'video'],
    supported_output_modalities: ['text'],
    tags: ['power-ball']
  },
  {
    id: 'gemini-2.5-pro-x1',
    name: 'Gemini 2.5 Pro(x1)',
    publisher: 'Google',
    registry: 'google',
    summary: 'Professional Gemini 2.5 Pro with standard performance.',
    html_url: 'https://github.com/marketplace/models/google/gemini-2.5-pro',
    version: '2.5',
    capabilities: ['streaming', 'tool-calling', 'multimodal'],
    limits: { max_input_tokens: 1000000, max_output_tokens: 8192 },
    rate_limit_tier: 'medium',
    supported_input_modalities: ['text', 'image', 'audio'],
    supported_output_modalities: ['text'],
    tags: ['power-ball']
  },
  {
    id: 'gpt-5-x1',
    name: 'GPT-5(x1)',
    publisher: 'OpenAI',
    registry: 'azure-openai',
    summary: 'Full GPT-5 model with standard performance multiplier.',
    html_url: 'https://github.com/marketplace/models/azure-openai/gpt-5',
    version: '5.0',
    capabilities: ['streaming', 'tool-calling', 'advanced-reasoning'],
    limits: { max_input_tokens: 256000, max_output_tokens: 8192 },
    rate_limit_tier: 'high',
    supported_input_modalities: ['text', 'image'],
    supported_output_modalities: ['text'],
    tags: ['power-ball']
  },
  {
    id: 'o3-x1',
    name: 'o3(x1)',
    publisher: 'OpenAI',
    registry: 'azure-openai',
    summary: 'Advanced reasoning model with standard performance.',
    html_url: 'https://github.com/marketplace/models/azure-openai/o3',
    version: '3.0',
    capabilities: ['advanced-reasoning', 'streaming'],
    limits: { max_input_tokens: 256000, max_output_tokens: 32768 },
    rate_limit_tier: 'premium',
    supported_input_modalities: ['text'],
    supported_output_modalities: ['text'],
    tags: ['power-ball']
  },
  {
    id: 'o3-mini-x0.33',
    name: 'o3-mini(x0.33)',
    publisher: 'OpenAI',
    registry: 'azure-openai',
    summary: 'Compact o3 model with third-speed performance.',
    html_url: 'https://github.com/marketplace/models/azure-openai/o3-mini',
    version: '3.0-mini',
    capabilities: ['reasoning', 'streaming'],
    limits: { max_input_tokens: 128000, max_output_tokens: 16384 },
    rate_limit_tier: 'high',
    supported_input_modalities: ['text'],
    supported_output_modalities: ['text'],
    tags: ['power-ball']
  },
  {
    id: 'o4-mini-x0.33',
    name: 'o4-mini(x0.33)',
    publisher: 'OpenAI',
    registry: 'azure-openai',
    summary: 'Compact o4 model with third-speed performance.',
    html_url: 'https://github.com/marketplace/models/azure-openai/o4-mini',
    version: '4.0-mini',
    capabilities: ['reasoning', 'streaming'],
    limits: { max_input_tokens: 128000, max_output_tokens: 16384 },
    rate_limit_tier: 'high',
    supported_input_modalities: ['text'],
    supported_output_modalities: ['text'],
    tags: ['power-ball']
  }
];

// GitHub Models API Constants
export const GITHUB_MODELS_API_BASE = 'https://models.github.ai';
export const GITHUB_MODELS_ENDPOINT = `${GITHUB_MODELS_API_BASE}/catalog/models`;

// Authentication helper functions
export const createGitHubToken = (token: string) => ({
  'Authorization': `Bearer ${token}`,
  'X-GitHub-Api-Version': '2022-11-28',
  'Accept': 'application/vnd.github+json'
});

// Rate limits by tier (as defined in GitHub Models documentation)
export const RATE_LIMITS = {
  'low': {
    requests_per_minute: 15,
    requests_per_day: 150,
    tokens_per_request: { input: 8000, output: 4000 },
    concurrent_requests: 5
  },
  'high': {
    requests_per_minute: 10,
    requests_per_day: 50,
    tokens_per_request: { input: 8000, output: 4000 },
    concurrent_requests: 2
  },
  'reasoning': {
    requests_per_minute: 1,
    requests_per_day: 8,
    tokens_per_request: { input: 4000, output: 4000 },
    concurrent_requests: 1
  }
};

export function useAuth() {
  const [authState, setAuthState] = useLocalStorage<AuthState>('pilot-auth-state', {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    isLoading: false,
    error: null,
  });
  
  const [availableModels, setAvailableModels] = useLocalStorage<GitHubModel[]>('pilot-available-models', []);  // Fetch available models from GitHub Models API
  const fetchAvailableModels = useCallback(async () => {
    try {
      if (!authState.accessToken) {
        // Only basic models available without auth
        const basicModels = AVAILABLE_GITHUB_MODELS.slice(0, 5); // First 5 models
        setAvailableModels(basicModels);
        return;
      }

      // Try to fetch models from the real GitHub Models API
      try {
        const response = await fetch(GITHUB_MODELS_ENDPOINT, {
          headers: createGitHubToken(authState.accessToken)
        });

        if (response.ok) {
          const models = await response.json();
          setAvailableModels(models);
        } else {
          // Fallback to our static list if API fails
          setAvailableModels(AVAILABLE_GITHUB_MODELS);
        }
      } catch (apiError) {
        console.warn('GitHub Models API not available, using static models:', apiError);
        setAvailableModels(AVAILABLE_GITHUB_MODELS);
      }
    } catch (error) {
      console.error('Error fetching available models:', error);
      // Fallback to basic models
      const fallbackModels = AVAILABLE_GITHUB_MODELS.slice(0, 5);
      setAvailableModels(fallbackModels);
    }
  }, [authState.accessToken, setAvailableModels]);

  // Initialize authentication - check localStorage first for persistent auth
  useEffect(() => {
    const initAuth = async () => {
      try {
        // First, check if we have stored GitHub auth that bypasses the guard
        const storedAuth = localStorage.getItem('github_auth');
        if (storedAuth) {
          try {
            const parsedAuth = JSON.parse(storedAuth);
            // Check if stored auth is still valid (not older than 30 days)
            const isValid = parsedAuth.timestamp && (Date.now() - parsedAuth.timestamp) < (30 * 24 * 60 * 60 * 1000);
            
            if (isValid && parsedAuth.isAuthenticated && parsedAuth.user && parsedAuth.accessToken) {
              console.log('🔥 FOUND STORED GITHUB AUTH - BYPASSING LOGIN!');
              setAuthState({
                isAuthenticated: true,
                user: parsedAuth.user,
                accessToken: parsedAuth.accessToken,
                isLoading: false,
                error: null
              });
              
              // Fetch available models with the stored token
              await fetchAvailableModels();
              return; // Exit early - user is already authenticated
            } else {
              console.log('Stored auth expired or invalid, clearing...');
              localStorage.removeItem('github_auth');
            }
          } catch (error) {
            console.error('Error parsing stored auth:', error);
            localStorage.removeItem('github_auth');
          }
        }

        // If no valid stored auth, try Spark authentication (legacy)
        if (typeof window !== 'undefined' && window.spark) {
          try {
            const sparkUser = await spark.user();
            if (sparkUser && sparkUser.login) {
              // Convert Spark user to our GitHubUser format
              const githubUser: GitHubUser = {
                id: sparkUser.id || 0,
                login: sparkUser.login,
                name: sparkUser.name || sparkUser.login,
                email: sparkUser.email || '',
                avatar_url: sparkUser.avatarUrl || '',
                bio: sparkUser.bio || '',
                company: sparkUser.company || '',
                location: sparkUser.location || '',
                public_repos: sparkUser.publicRepos || 0,
                followers: sparkUser.followers || 0,
                following: sparkUser.following || 0
              };

              setAuthState(prev => ({
                ...prev,
                isAuthenticated: true,
                user: githubUser,
                accessToken: sparkUser.accessToken || 'spark-runtime-token',
                error: null
              }));

              // Fetch available models after authentication
              await fetchAvailableModels();
            } else {
              // Not authenticated, set basic models
              await fetchAvailableModels();
            }
          } catch (sparkError) {
            console.log('Spark authentication not available:', sparkError);
          }
        }

        // For non-Spark environments, just load the models without authentication
        console.log('Running in standalone mode - authentication required for GitHub Models access');
        await fetchAvailableModels();
        
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: null
        }));

      } catch (error) {
        console.error('Authentication initialization failed:', error);
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Authentication initialization failed'
        }));
      }
    };

    initAuth();
  }, [fetchAvailableModels]);

  const signIn = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Check if we're in a Spark environment first
      if (typeof window !== 'undefined' && window.spark) {
        const sparkUser = await spark.user();
        if (sparkUser && sparkUser.login) {
          const githubUser: GitHubUser = {
            id: sparkUser.id || 0,
            login: sparkUser.login,
            name: sparkUser.name || sparkUser.login,
            email: sparkUser.email || '',
            avatar_url: sparkUser.avatarUrl || '',
            bio: sparkUser.bio || '',
            company: sparkUser.company || '',
            location: sparkUser.location || '',
            public_repos: sparkUser.publicRepos || 0,
            followers: sparkUser.followers || 0,
            following: sparkUser.following || 0
          };

          setAuthState(prev => ({
            ...prev,
            isAuthenticated: true,
            user: githubUser,
            accessToken: sparkUser.accessToken || 'spark-runtime-token',
            isLoading: false,
            error: null
          }));

          // Fetch available models after successful sign in
          await fetchAvailableModels();
          return true;
        }
      }

      // Simple OAuth redirect - WORKS WITH YOUR GITHUB OAUTH APP
      console.log('Redirecting to GitHub OAuth...');
      
      // YOUR ACTUAL CLIENT ID FROM GITHUB OAUTH APP
      const clientId = 'Ov23lizjzU8av6EVJci2'; // Your GitHub OAuth App Client ID
      const redirectUri = 'http://localhost:3001/auth/callback'; // OAuth proxy server
      const scope = 'read:user user:email public_repo';
      const state = Math.random().toString(36);

      sessionStorage.setItem('github_oauth_state', state);
      
      // Build URL without encoding issues that confuse GitHub
      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: scope,
        state: state,
        allow_signup: 'true'
      });
      
      const githubAuthUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
      
      console.log('Redirecting to:', githubAuthUrl);
      console.log('Expected redirect_uri:', redirectUri);

      // REDIRECT TO GITHUB NOW
      window.location.href = githubAuthUrl;

      // REDIRECT TO GITHUB NOW
      window.location.href = githubAuthUrl;
      
      return false;

    } catch (error) {
      console.error('Sign in error:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Authentication failed'
      }));
      return false;
    }
  }, [setAuthState, fetchAvailableModels]);

  const signOut = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      isLoading: false,
      error: null
    });
    
    // Clear the auth bypass from localStorage
    localStorage.removeItem('github_auth');
    console.log('🔥 AUTH CLEARED - User signed out');
    
    // Reset to basic models when signed out
    const basicModels = AVAILABLE_GITHUB_MODELS.slice(0, 5);
    setAvailableModels(basicModels);
  }, [setAuthState, setAvailableModels]);

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, [setAuthState]);

  const completeOAuth = useCallback((user: GitHubUser, accessToken: string) => {
    const newAuthState = {
      isAuthenticated: true,
      user,
      accessToken,
      isLoading: false,
      error: null
    };
    
    setAuthState(prev => ({
      ...prev,
      ...newAuthState
    }));
    
    // STORE IN LOCALSTORAGE TO BYPASS AUTHGUARD FOREVER
    localStorage.setItem('github_auth', JSON.stringify({
      isAuthenticated: true,
      user,
      accessToken,
      timestamp: Date.now()
    }));
    
    console.log('🔥 AUTH STORED IN LOCALSTORAGE - GUARD BYPASSED!');
    
    // Fetch available models after successful OAuth completion
    fetchAvailableModels();
  }, [setAuthState, fetchAvailableModels]);

  // Get user repositories using GitHub API
  const getUserRepos = useCallback(async () => {
    if (!authState.isAuthenticated || !authState.user || !authState.accessToken) {
      throw new Error('User not authenticated');
    }

    try {
      const response = await fetch(`https://api.github.com/users/${authState.user.login}/repos?sort=updated&per_page=10`, {
        headers: createGitHubToken(authState.accessToken)
      });

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching repositories:', error);
      // Return mock data as fallback
      return [
        {
          id: 1,
          name: 'pilot-server-github',
          full_name: `${authState.user.login}/pilot-server-github`,
          description: 'AI Chat Interface with GitHub Models Integration',
          private: false,
          html_url: `https://github.com/${authState.user.login}/pilot-server-github`,
          language: 'TypeScript',
          stargazers_count: 0,
          forks_count: 0,
          updated_at: new Date().toISOString()
        }
      ];
    }
  }, [authState.isAuthenticated, authState.user, authState.accessToken]);

  // Test GitHub Models API connection
  const testModelsAPI = useCallback(async () => {
    if (!authState.accessToken) {
      throw new Error('No access token available');
    }

    try {
      const response = await fetch(GITHUB_MODELS_ENDPOINT, {
        headers: createGitHubToken(authState.accessToken)
      });

      if (!response.ok) {
        throw new Error(`GitHub Models API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        modelsCount: Array.isArray(data) ? data.length : 0,
        firstModel: Array.isArray(data) && data.length > 0 ? data[0] : null
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }, [authState.accessToken]);

  // Initialize authentication state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        setAuthState(prev => ({ ...prev, isLoading: true }));

        // 🔥 CHECK LOCALSTORAGE FIRST TO BYPASS GUARD
        const storedAuth = localStorage.getItem('github_auth');
        if (storedAuth) {
          try {
            const authData = JSON.parse(storedAuth);
            if (authData.isAuthenticated && authData.user && authData.accessToken) {
              console.log('🔥 FOUND STORED AUTH - BYPASSING GUARD!', authData.user.login);
              setAuthState(prev => ({
                ...prev,
                isAuthenticated: true,
                user: authData.user,
                accessToken: authData.accessToken,
                isLoading: false,
                error: null
              }));
              // Fetch models for authenticated user
              fetchAvailableModels();
              return; // Skip other auth checks
            }
          } catch (e) {
            console.log('Invalid stored auth, clearing...');
            localStorage.removeItem('github_auth');
          }
        }

        // Check for existing Spark authentication
        if (typeof window !== 'undefined' && window.spark) {
          try {
            const sparkUser = await spark.user();
            if (sparkUser && sparkUser.login) {
              const githubUser: GitHubUser = {
                id: sparkUser.id || 0,
                login: sparkUser.login,
                name: sparkUser.name || sparkUser.login,
                email: sparkUser.email || '',
                avatar_url: sparkUser.avatarUrl || '',
                bio: sparkUser.bio || '',
                company: sparkUser.company || '',
                location: sparkUser.location || '',
                public_repos: sparkUser.publicRepos || 0,
                followers: sparkUser.followers || 0,
                following: sparkUser.following || 0
              };

              setAuthState(prev => ({
                ...prev,
                isAuthenticated: true,
                user: githubUser,
                accessToken: sparkUser.accessToken || 'spark-runtime-token',
                isLoading: false,
                error: null
              }));

              // Fetch available models after successful initialization
              await fetchAvailableModels();
              return;
            }
          } catch (sparkError) {
            console.log('Spark authentication not available:', sparkError);
          }
        }

        // For non-Spark environments, just load the models without authentication
        console.log('Running in standalone mode - authentication required for GitHub Models access');
        await fetchAvailableModels();
        
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: null
        }));

      } catch (error) {
        console.error('Authentication initialization failed:', error);
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Authentication initialization failed'
        }));
      }
    };

    initAuth();
  }, [fetchAvailableModels]);

  return {
    authState,
    availableModels,
    signIn,
    signOut,
    clearError,
    completeOAuth,
    getUserRepos,
    fetchAvailableModels,
    testModelsAPI,
    // Helper methods
    getRateLimits: (tier: string) => RATE_LIMITS[tier as keyof typeof RATE_LIMITS],
    getModelById: (id: string) => availableModels.find(model => model.id === id),
    getModelsByPublisher: (publisher: string) => availableModels.filter(model => model.publisher === publisher),
    getModelsByCapability: (capability: string) => availableModels.filter(model => model.capabilities.includes(capability))
  };
}
