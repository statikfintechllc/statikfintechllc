#!/usr/bin/env node

/**
 * Unified Development Server for SFTi Web Templates
 * Serves all domains locally with hot reload and proper routing
 */

import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import cors from 'cors';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.DEV_PORT || 3333;

// Enable CORS and compression
app.use(cors());
app.use(compression());

// Store running processes
const processes = new Map();

// Utility function to start a process
function startProcess(name, command, args, cwd) {
  console.log(`🚀 Starting ${name}...`);
  const process = spawn(command, args, {
    cwd,
    stdio: 'inherit',
    shell: true
  });

  process.on('error', (err) => {
    console.error(`❌ Error starting ${name}:`, err);
  });

  process.on('exit', (code) => {
    console.log(`🔄 ${name} exited with code ${code}`);
    processes.delete(name);
  });

  processes.set(name, process);
  return process;
}

// Start development servers for each application
const startDevServers = () => {
  // Main site static server (port 5173) - serves the HTML site
  startProcess(
    'Main Site Server',
    'node',
    ['static-server.js'],
    __dirname
  );

  // Dev IB-G.Scanner (port 4174)
  startProcess(
    'Dev IB-G.Scanner',
    'npm',
    ['run', 'dev', '--', '--port', '4174', '--host', '0.0.0.0'],
    path.join(__dirname, 'dev.sfti-ai.org/IB-G.Scanner')
  );

  // Server IB-G.Scanner (port 4175) 
  startProcess(
    'Server IB-G.Scanner',
    'npm',
    ['run', 'dev', '--', '--port', '4175', '--host', '0.0.0.0'],
    path.join(__dirname, 'server.sfti-ai.org/IB-G.Scanner')
  );

  // API Server for IB-G.Scanner (port 3000)
  setTimeout(() => {
    startProcess(
      'IB-G.Scanner API',
      'npm',
      ['run', 'server'],
      path.join(__dirname, 'dev.sfti-ai.org/IB-G.Scanner')
    );
  }, 5000); // Wait for other servers to start first
};

// Domain routing configuration  
const domainRoutes = {
  'localhost': {
    target: 'http://localhost:5173', // Main site static server
    pathRewrite: { '^/': '/' }
  },
  'dev.localhost': {
    target: 'http://localhost:4174', // Dev IB-G.Scanner
    pathRewrite: { '^/': '/' }
  },
  'server.localhost': {
    target: 'http://localhost:4175', // Server IB-G.Scanner  
    pathRewrite: { '^/': '/' }
  },
  'api.localhost': {
    target: 'http://localhost:3000', // API Server
    pathRewrite: { '^/': '/' }
  }
};

// Set up proxy middleware based on hostname
app.use((req, res, next) => {
  const host = req.get('host')?.split(':')[0] || 'localhost';
  const route = domainRoutes[host];

  if (route) {
    const proxy = createProxyMiddleware({
      target: route.target,
      changeOrigin: true,
      pathRewrite: route.pathRewrite,
      ws: true, // Enable WebSocket proxying for HMR
      logLevel: 'silent',
      onError: (err, req, res) => {
        console.error(`❌ Proxy error for ${host}:`, err.message);
        res.status(503).send(`
          <html>
            <head><title>Service Unavailable</title></head>
            <body style="font-family: system-ui; padding: 2rem; background: #fee2e2;">
              <h1>🔧 Service Starting Up</h1>
              <p>The service for <strong>${host}</strong> is still starting. Please wait a moment and refresh.</p>
              <p><a href="/">← Back to main dashboard</a></p>
            </body>
          </html>
        `);
      }
    });
    
    return proxy(req, res, next);
  }

  next();
});

// Development dashboard for unknown hosts
app.use('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SFTi Development Server</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: system-ui, -apple-system, sans-serif; 
            margin: 0; 
            padding: 2rem; 
            background: linear-gradient(135deg, #f8fafc, #e2e8f0);
            min-height: 100vh;
          }
          .container { max-width: 800px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 3rem; }
          .logo { font-size: 3rem; margin-bottom: 1rem; }
          .title { font-size: 2rem; color: #1e293b; margin-bottom: 0.5rem; }
          .subtitle { color: #64748b; font-size: 1.1rem; }
          .services { 
            display: grid; 
            gap: 1rem; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            margin-bottom: 2rem;
          }
          .service { 
            background: white; 
            padding: 1.5rem; 
            border-radius: 12px; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            border: 1px solid #e2e8f0;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .service:hover { 
            transform: translateY(-2px); 
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          .service-icon { font-size: 2rem; margin-bottom: 1rem; }
          .service-title { font-weight: 600; color: #1e293b; margin-bottom: 0.5rem; }
          .service-desc { color: #64748b; font-size: 0.9rem; margin-bottom: 1rem; }
          .service-link { 
            display: inline-block;
            padding: 0.5rem 1rem;
            background: #3b82f6;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-size: 0.9rem;
            transition: background 0.2s;
          }
          .service-link:hover { background: #2563eb; }
          .info { 
            background: #f1f5f9; 
            padding: 1rem; 
            border-radius: 8px; 
            font-size: 0.9rem; 
            color: #475569;
            text-align: center;
          }
          .status { margin-top: 2rem; }
          .status-item { 
            display: flex; 
            justify-content: space-between; 
            padding: 0.5rem 0;
            border-bottom: 1px solid #e2e8f0;
          }
          .status-name { font-weight: 500; }
          .status-indicator { 
            width: 8px; 
            height: 8px; 
            border-radius: 50%; 
            background: #10b981;
            margin-left: 0.5rem;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🌐</div>
            <h1 class="title">SFTi Development Server</h1>
            <p class="subtitle">Unified local development environment</p>
          </div>

          <div class="services">
            <div class="service">
              <div class="service-icon">🏠</div>
              <div class="service-title">Main Website</div>
              <div class="service-desc">StatikFinTech corporate website with landing pages</div>
              <a href="http://localhost:${PORT}" class="service-link">Open Main Site</a>
            </div>

            <div class="service">
              <div class="service-icon">📊</div>
              <div class="service-title">Dev Stock Scanner</div>
              <div class="service-desc">Development version of IB-G.Scanner application</div>
              <a href="http://dev.localhost:${PORT}" class="service-link">Open Dev Scanner</a>
            </div>

            <div class="service">
              <div class="service-icon">🖥️</div>
              <div class="service-title">Server Stock Scanner</div>
              <div class="service-desc">Production version of IB-G.Scanner application</div>
              <a href="http://server.localhost:${PORT}" class="service-link">Open Server Scanner</a>
            </div>

            <div class="service">
              <div class="service-icon">⚡</div>
              <div class="service-title">API Server</div>
              <div class="service-desc">Backend API and WebSocket services</div>
              <a href="http://api.localhost:${PORT}" class="service-link">Open API</a>
            </div>
          </div>

          <div class="info">
            <strong>💡 Pro Tip:</strong> All services include hot reload for instant development feedback. 
            Edit any file and see changes immediately without pushing to repo!
          </div>

          <div class="status">
            <h3>Service Status</h3>
            <div class="status-item">
              <span class="status-name">Main Site (Vite)</span>
              <div><span class="status-indicator"></span>Running on :5173</div>
            </div>
            <div class="status-item">
              <span class="status-name">Dev Scanner</span>
              <div><span class="status-indicator"></span>Running on :4174</div>
            </div>
            <div class="status-item">
              <span class="status-name">Server Scanner</span>
              <div><span class="status-indicator"></span>Running on :4175</div>
            </div>
            <div class="status-item">
              <span class="status-name">API Server</span>
              <div><span class="status-indicator"></span>Running on :3000</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development server...');
  processes.forEach((proc, name) => {
    console.log(`📴 Stopping ${name}...`);
    proc.kill('SIGTERM');
  });
  process.exit(0);
});

// Start the development environment
console.log('🔧 Setting up SFTi Development Environment...');
startDevServers();

// Start the main proxy server
app.listen(PORT, '0.0.0.0', () => {
  console.log('\n✅ SFTi Development Server is ready!');
  console.log(`\n🌐 Development Dashboard: http://localhost:${PORT}`);
  console.log(`\n📱 Quick Access:`);
  console.log(`   Main Site:       http://localhost:${PORT}`);
  console.log(`   Dev Scanner:     http://dev.localhost:${PORT}`);
  console.log(`   Server Scanner:  http://server.localhost:${PORT}`);
  console.log(`   API Server:      http://api.localhost:${PORT}`);
  console.log(`\n🔥 Hot reload enabled for all applications`);
  console.log(`⏹️  Press Ctrl+C to stop all servers\n`);
});