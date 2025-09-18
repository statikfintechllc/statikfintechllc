#!/usr/bin/env node

/**
 * Simple static server for the main HTML site
 * Fallback when Vite doesn't work for the static HTML
 */

import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5173;

// Serve static files
app.use(express.static(__dirname));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/public_html', express.static(path.join(__dirname, 'public_html')));
app.use('/ZMB.svg', express.static(path.join(__dirname, 'ZMB.svg')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`📄 Static HTML server running on http://localhost:${PORT}`);
});