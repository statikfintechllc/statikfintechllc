import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, "../assets/github-profile.svg");

// Hardcoded stats (since no API access)
const stats = {
  stars: 35,
  commits: "3.6k",
  prs: 5,
  issues: 18,
  contributions: 6,
};

// Language data with GitHub colors
const languages = [
  { name: "Python", percent: "36.61", color: "#3572A5" },
  { name: "Go", percent: "31.64", color: "#00ADD8" },
  { name: "Jupyter Notebook", percent: "11.64", color: "#DA5B0B" },
  { name: "TypeScript", percent: "8.41", color: "#2b7489" },
  { name: "Shell", percent: "4.92", color: "#89e051" },
  { name: "JavaScript", percent: "2.76", color: "#f1e05a" },
  { name: "HTML", percent: "1.63", color: "#e34c26" },
  { name: "Astro", percent: "1.13", color: "#ff5a03" },
  { name: "CSS", percent: "1.08", color: "#563d7c" },
  { name: "Nix", percent: "0.18", color: "#7e7eff" }
];

// GitHub SVG Icons
const icons = {
  star: `<path fill="none" stroke="#8b949e" stroke-width="1.5" d="M12 2.5l2.68 5.43 5.82.85-4.2 4.09.99 5.8L12 16.6 6.71 18.67l.99-5.8-4.2-4.09 5.82-.85L12 2.5z"/>`,
  commit: `<circle cx="12" cy="12" r="3" fill="none" stroke="#8b949e" stroke-width="1.5"/><path fill="none" stroke="#8b949e" stroke-width="1.5" d="M12 1v6m0 6v6"/>`,
  pr: `<path fill="none" stroke="#8b949e" stroke-width="1.5" d="M7 7h10m-10 10h10M17 4l3 3-3 3M7 14l-3 3 3 3"/>`,
  issue: `<circle cx="12" cy="12" r="10" fill="none" stroke="#8b949e" stroke-width="1.5"/><line x1="12" y1="8" x2="12" y2="12" stroke="#8b949e" stroke-width="1.5"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="#8b949e" stroke-width="1.5"/>`,
  calendar: `<rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="none" stroke="#8b949e" stroke-width="1.5"/><line x1="16" y1="2" x2="16" y2="6" stroke="#8b949e" stroke-width="1.5"/><line x1="8" y1="2" x2="8" y2="6" stroke="#8b949e" stroke-width="1.5"/><line x1="3" y1="10" x2="21" y2="10" stroke="#8b949e" stroke-width="1.5"/>`
};

// --- SVG Output ---
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="845" height="200" viewBox="0 0 845 200">
  <defs>
    <style>
      .header { fill: #e11d48; font: 600 18px 'Segoe UI', Ubuntu, system-ui; }
      .stat-label { fill: #8b949e; font: 400 14px 'Segoe UI', Ubuntu, system-ui; }
      .stat-value { fill: #f0f6fc; font: 600 14px 'Segoe UI', Ubuntu, system-ui; }
      .lang-label { fill: #f0f6fc; font: 400 12px 'Segoe UI', Ubuntu, system-ui; }
    </style>
    <pattern id="avatarPattern" patternUnits="objectBoundingBox" width="100%" height="100%">
      <image href="https://avatars.githubusercontent.com/u/200911899?v=4" x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"/>
    </pattern>
  </defs>
  
  <!-- Background -->
  <rect width="845" height="200" rx="6" fill="#0d1117" stroke="#30363d" stroke-width="1"/>
  
  <!-- Left Section: Stats -->
  <text x="32" y="35" class="header">Statik DK Smoke's GitHub Stats</text>
  
  <!-- Stats List -->
  <g transform="translate(32, 60)">
    <g>
      <svg x="0" y="-8" width="16" height="16" viewBox="0 0 24 24">${icons.star}</svg>
      <text x="22" y="6" class="stat-label">Total Stars Earned:</text>
      <text x="180" y="6" class="stat-value">${stats.stars}</text>
    </g>
    <g transform="translate(0, 25)">
      <svg x="0" y="-8" width="16" height="16" viewBox="0 0 24 24">${icons.commit}</svg>
      <text x="22" y="6" class="stat-label">Total Commits:</text>
      <text x="180" y="6" class="stat-value">${stats.commits}</text>
    </g>
    <g transform="translate(0, 50)">
      <svg x="0" y="-8" width="16" height="16" viewBox="0 0 24 24">${icons.pr}</svg>
      <text x="22" y="6" class="stat-label">Total PRs:</text>
      <text x="180" y="6" class="stat-value">${stats.prs}</text>
    </g>
    <g transform="translate(0, 75)">
      <svg x="0" y="-8" width="16" height="16" viewBox="0 0 24 24">${icons.issue}</svg>
      <text x="22" y="6" class="stat-label">Total Issues:</text>
      <text x="180" y="6" class="stat-value">${stats.issues}</text>
    </g>
    <g transform="translate(0, 100)">
      <svg x="0" y="-8" width="16" height="16" viewBox="0 0 24 24">${icons.calendar}</svg>
      <text x="22" y="6" class="stat-label">Contributed to (last year):</text>
      <text x="180" y="6" class="stat-value">${stats.contributions}</text>
    </g>
  </g>
  
  <!-- CENTER AVATAR -->
  <g transform="translate(375, 60)">
    <circle cx="35" cy="35" r="45" fill="#30363d" stroke="#e11d48" stroke-width="3"/>
    <circle cx="35" cy="35" r="42" fill="url(#avatarPattern)"/>
  </g>
  
  <!-- Right Section: Languages -->
  <g transform="translate(530, 35)">
    <!-- Languages Header -->
    <text x="0" y="0" class="header">Most Used Languages</text>
    
    <!-- Language List -->
    ${languages.map((lang, i) => `
    <g transform="translate(0, ${25 + i * 16})">
      <circle cx="6" cy="2" r="5" fill="${lang.color}"/>
      <text x="18" y="6" class="lang-label">${lang.name} ${lang.percent}%</text>
    </g>`).join('')}
  </g>
</svg>`.trim();

await fs.mkdir(resolve(__dirname, "../assets"), { recursive: true });
await fs.writeFile(OUTPUT, svg);
console.log("✅ GitHub profile SVG generated with embedded avatar!");
