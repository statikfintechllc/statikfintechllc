/**
 * SFTi Backend Server
 * ==================
 * 
 * Express server providing authentication, user management,
 * and API endpoints for all SFTi domains
 */

import express from 'express';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(compression());
app.use(cors({
  origin: [
    'https://www.sfti-ai.org',
    'https://dev.sfti-ai.org',
    'https://server.sfti-ai.org',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic in-memory storage (replace with database in production)
const users = new Map();
const sessions = new Map();

// Middleware to verify JWT token (placeholder)
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // In production, verify JWT token properly
  const session = sessions.get(token);
  if (!session) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  req.user = session.user;
  next();
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'SFTi Backend Server'
  });
});

// Authentication routes
app.post('/api/auth/signup', (req, res) => {
  const { email, password, name } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  if (users.has(email)) {
    return res.status(409).json({ error: 'User already exists' });
  }
  
  // In production, hash password with bcrypt
  const user = {
    id: Date.now().toString(),
    email,
    name,
    password, // Should be hashed
    createdAt: new Date().toISOString(),
    lastLogin: null
  };
  
  users.set(email, user);
  
  // Create session token (in production, use JWT)
  const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessions.set(token, { user: { ...user, password: undefined }, createdAt: Date.now() });
  
  res.status(201).json({
    message: 'User created successfully',
    token,
    user: { ...user, password: undefined }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }
  
  const user = users.get(email);
  if (!user || user.password !== password) { // In production, use bcrypt.compare
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Update last login
  user.lastLogin = new Date().toISOString();
  
  // Create session token
  const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessions.set(token, { user: { ...user, password: undefined }, createdAt: Date.now() });
  
  res.json({
    message: 'Login successful',
    token,
    user: { ...user, password: undefined }
  });
});

app.post('/api/auth/logout', authenticate, (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  sessions.delete(token);
  
  res.json({ message: 'Logout successful' });
});

// User profile routes
app.get('/api/user/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});

app.put('/api/user/profile', authenticate, (req, res) => {
  const { name, bio, company } = req.body;
  const user = users.get(req.user.email);
  
  if (user) {
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (company) user.company = company;
    user.updatedAt = new Date().toISOString();
    
    users.set(req.user.email, user);
    
    res.json({
      message: 'Profile updated successfully',
      user: { ...user, password: undefined }
    });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Usage tracking
app.post('/api/usage/track', authenticate, (req, res) => {
  const { event, data } = req.body;
  
  // In production, save to database
  console.log(`Usage tracking: ${req.user.email} - ${event}`, data);
  
  res.json({ message: 'Usage tracked successfully' });
});

// Email subscription endpoints
app.post('/api/email/subscribe', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  
  // In production, integrate with email service
  console.log(`Email subscription: ${email}`);
  
  res.json({ message: 'Subscription successful' });
});

app.post('/api/email/unsubscribe', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  
  // In production, integrate with email service
  console.log(`Email unsubscription: ${email}`);
  
  res.json({ message: 'Unsubscription successful' });
});

// Research papers endpoint (for www domain)
app.get('/api/research/papers', (req, res) => {
  // In production, fetch from database or file system
  const papers = [
    {
      id: 'economic-sovereignty',
      title: 'Economic Sovereignty Through Decentralized AI',
      type: 'Zenodo',
      description: 'A comprehensive analysis of achieving economic independence through decentralized AI systems.',
      url: '/docs/Zenodo.papers.svg/economic-sovereignty-through-decentralized-ai.svg'
    },
    {
      id: 'gremlingpt-architecture',
      title: 'The GremlinGPT Architecture: Localized Recursive AI',
      type: 'Zenodo', 
      description: 'Technical specification of the GremlinGPT recursive AI architecture.',
      url: '/docs/Zenodo.papers.svg/the-gremlingpt-architecture-localized-recursive-ai.svg'
    },
    {
      id: 'designing-gremlingpt',
      title: 'Designing GremlinGPT',
      type: 'Medium',
      description: 'Design philosophy and implementation details of the GremlinGPT system.',
      url: '/docs/Medium.papers.svg/designing-gremlingpt.svg'
    }
  ];
  
  res.json({ papers });
});

// Serve static files for development
app.use(express.static(path.join(__dirname, '../../../public')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`SFTi Backend Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;