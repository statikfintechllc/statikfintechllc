#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";

const OUTPUT = path.resolve("assets/my-trades-card.svg");

async function fetchAvatarAsBase64() {
  try {
    const response = await fetch('https://avatars.githubusercontent.com/u/200911899?v=4');
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.log('Failed to fetch avatar, using fallback');
    return 'https://avatars.githubusercontent.com/u/200911899?v=4';
  }
}

async function main() {
  const avatarUrl = await fetchAvatarAsBase64();
  
  // Generate unique ID for this SVG to avoid conflicts
  const uniqueId = 'my-trades';
  
  const svg = `
<svg width="480" height="230" viewBox="0 0 480 230" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <clipPath id="avatar-clip-${uniqueId}">
      <rect x="20" y="16" width="20" height="20" rx="4"/>
    </clipPath>
    <!-- Embedded avatar pattern as fallback -->
    <pattern id="avatar-pattern-${uniqueId}" x="20" y="16" width="20" height="20" patternUnits="userSpaceOnUse">
      <image x="0" y="0" width="20" height="20" 
             href="${avatarUrl}"
             preserveAspectRatio="xMidYMid slice"/>
    </pattern>
  </defs>
  <style>
    .title { font: 600 16px sans-serif; fill: #ff4775; }
    .meta  { font: 12px sans-serif; fill: #8abecf; dominant-baseline: middle; }
    .cta   { font: 600 20px sans-serif; fill: #FFD700; }
    .desc  { font: 14px sans-serif; fill: #8abecf; }
  </style>

  <rect width="100%" height="100%" rx="10" fill="#0d1117"/>

  <!-- User Avatar with fallback -->
  <rect x="20" y="16" width="20" height="20" rx="4" fill="url(#avatar-pattern-${uniqueId})"/>
  
  <!-- Alternative: Direct image with xlink namespace -->
  <image x="20" y="16" width="20" height="20" 
         xlink:href="${avatarUrl}" 
         clip-path="url(#avatar-clip-${uniqueId})"
         preserveAspectRatio="xMidYMid slice"/>

  <!-- Title -->
  <text x="48" y="31" class="title">My Trades</text>

  <!-- Main Call-to-Action -->
  <text x="240" y="100" class="cta" text-anchor="middle">Check out my Trades</text>

  <!-- Description -->
  <foreignObject x="48" y="120" width="380" height="70">
    <div xmlns="http://www.w3.org/1999/xhtml"
         style="color:#8abecf;font:13px sans-serif;line-height:1.4;text-align:center;white-space:normal;overflow:hidden;">
      View real-time trading strategies, market analysis, and performance insights powered by AI-driven financial technology and algorithmic trading systems.
    </div>
  </foreignObject>

  <!-- Decorative accent bar -->
  <rect x="20" y="195" width="440" height="6" fill="#ff4775" rx="3"/>
</svg>
`.trim();

  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.writeFile(OUTPUT, svg);
  console.log("✅ my-trades-card.svg generated");
}

main().catch(err => {
  console.error("SVG generation failed:", err);
  process.exit(1);
});
