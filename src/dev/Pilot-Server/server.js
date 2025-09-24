import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;

// Enable CORS for your frontend
app.use(cors({
  origin: ['http://localhost:5174', 'http://127.0.0.1:5174', 'http://localhost:4174', 'http://127.0.0.1:4174']
}));

app.use(express.json());

// Proxy endpoint for GitHub OAuth token exchange
app.post('/auth/github/token', async (req, res) => {
  try {
    const { code, client_id, redirect_uri } = req.body;

    console.log('Token exchange request:', { code, client_id, redirect_uri });

    // Read client secret from environment variable
    const client_secret = process.env.VITE_GITHUB_CLIENT_SECRET || 'd3bad76c2097ce9bd288bb1e89c8853e85b3d19a';

    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Pilot-Server-GitHub-App'
      },
      body: new URLSearchParams({
        client_id,
        client_secret,
        code,
        redirect_uri
      })
    });

    const data = await response.json();
    console.log('GitHub response:', data);

    if (data.access_token) {
      res.json({ access_token: data.access_token });
    } else {
      console.error('No access token in response:', data);
      res.status(400).json({ error: 'Failed to get access token', details: data });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GitHub OAuth callback handler
app.get('/auth/callback', (req, res) => {
  const { code, state } = req.query;
  
  console.log('OAuth callback received:', { code, state });
  
  if (!code) {
    console.error('No authorization code received');
    return res.redirect('http://localhost:5174?error=no_code');
  }
  
  // Redirect back to the main app with the code
  const redirectUrl = new URL('http://localhost:5174');
  redirectUrl.searchParams.set('code', code);
  if (state) redirectUrl.searchParams.set('state', state);
  
  console.log('Redirecting to:', redirectUrl.toString());
  res.redirect(redirectUrl.toString());
});

app.listen(PORT, () => {
  console.log(`OAuth proxy server running on http://localhost:${PORT}`);
});
