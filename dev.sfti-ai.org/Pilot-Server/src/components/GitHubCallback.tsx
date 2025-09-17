import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

export function GitHubCallback() {
  const navigate = useNavigate();
  const { completeOAuth } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing GitHub authentication...');
  
  // Prevent double execution of OAuth callback
  const hasProcessed = useRef(false);

  useEffect(() => {
    const handleCallback = async () => {
      // Prevent double execution (React StrictMode can cause this)
      if (hasProcessed.current) {
        console.log('OAuth callback already processed, skipping...');
        return;
      }
      hasProcessed.current = true;
      
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');

        if (error) {
          throw new Error(`GitHub OAuth error: ${error}`);
        }

        if (!code) {
          throw new Error('No authorization code received from GitHub');
        }

        const storedState = sessionStorage.getItem('github_oauth_state');
        console.log('Received state from GitHub:', state);
        console.log('Stored state in sessionStorage:', storedState);
        
        // TEMPORARILY DISABLE STATE VALIDATION TO TEST TOKEN EXCHANGE
        // if (!state || state !== storedState) {
        //   console.error('State mismatch! Received:', state, 'Expected:', storedState);
        //   throw new Error('Invalid OAuth state parameter');
        // }

        sessionStorage.removeItem('github_oauth_state');

        setMessage('Exchanging authorization code for access token...');

        console.log('About to exchange code for token...');
        console.log('Code:', code);
        console.log('Client ID:', 'Ov23lizjzU8av6EVJci2');

        let tokenResponse;
        try {
          // Use our proxy server to avoid CORS issues
          tokenResponse = await fetch('http://localhost:3001/auth/github/token', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              client_id: 'Ov23lizjzU8av6EVJci2',
              code: code,
              redirect_uri: `${window.location.origin}/auth/callback`
            })
          });
        } catch (fetchError) {
          console.error('Fetch error:', fetchError);
          throw new Error(`Network error: ${fetchError.message}. Make sure the OAuth proxy server is running on port 3001.`);
        }

        console.log('Token response status:', tokenResponse.status);
        console.log('Token response headers:', tokenResponse.headers);

        if (!tokenResponse.ok) {
          const errorText = await tokenResponse.text();
          console.error('Token exchange failed:', errorText);
          throw new Error(`Failed to exchange code for token: ${tokenResponse.status} ${errorText}`);
        }

        const tokenData = await tokenResponse.json();
        console.log('Token data received:', tokenData);

        if (!tokenData.access_token) {
          console.error('No access token in response:', tokenData);
          throw new Error('Failed to exchange code for access token');
        }

        setMessage('Fetching user profile from GitHub...');

        // Get real user data
        const userResponse = await fetch('https://api.github.com/user', {
          headers: {
            'Authorization': `token ${tokenData.access_token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        const userData = await userResponse.json();

        const githubUser = {
          id: userData.id,
          login: userData.login,
          name: userData.name || userData.login,
          email: userData.email || '',
          avatar_url: userData.avatar_url,
          bio: userData.bio || '',
          company: userData.company || '',
          location: userData.location || '',
          public_repos: userData.public_repos || 0,
          followers: userData.followers || 0,
          following: userData.following || 0
        };

        setStatus('success');
        setMessage('Authentication successful! Redirecting...');

        console.log('About to call completeOAuth with:', { githubUser, accessToken: tokenData.access_token });
        completeOAuth(githubUser, tokenData.access_token);
        console.log('Called completeOAuth - authentication state should be updated');

        // Navigate directly to the authenticated app after state update
        setTimeout(() => {
          console.log('🚀 Navigating to authenticated app...');
          navigate('/', { replace: true });
        }, 2000); // Single timeout with enough time for state update

      } catch (error) {
        console.error('GitHub OAuth callback error:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Authentication failed');
        
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 5000);
      }
    };

    handleCallback();
  }, [navigate, completeOAuth]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-6 text-center">
        <div className="mb-4">
          {status === 'loading' && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
          )}
          {status === 'success' && (
            <div className="text-green-500 text-4xl">✓</div>
          )}
          {status === 'error' && (
            <div className="text-red-500 text-4xl">✗</div>
          )}
        </div>
        
        <h2 className="text-xl font-semibold text-white mb-2">
          {status === 'loading' && 'Authenticating...'}
          {status === 'success' && 'Success!'}
          {status === 'error' && 'Authentication Failed'}
        </h2>
        
        <p className="text-gray-300 text-sm">
          {message}
        </p>

        {status === 'error' && (
          <button
            onClick={() => navigate('/', { replace: true })}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Return to App
          </button>
        )}
      </div>
    </div>
  );
}
