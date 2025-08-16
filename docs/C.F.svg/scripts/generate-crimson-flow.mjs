#!/usr/bin/env node
import fs from 'fs';
const out = new URL('../assets/crimson-flow.svg', import.meta.url);
const content = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="420">\n  <!-- placeholder: crimson-flow -->\n</svg>\n`;
fs.mkdirSync(new URL('../assets/', import.meta.url), { recursive: true });
fs.writeFileSync(out, content);
console.log('Wrote', out.pathname);
