import fs from "fs/promises";
import https from "https";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, "../assets/github-profile.svg");
const USER = "statikfintechllc";
const TOKEN = process.env.GH_TOKEN;

// Language colors from GitHub
const LANG_COLORS = {
  Python: "#3572A5",
  Go: "#00ADD8",
  "Jupyter Notebook": "#DA5B0B",
  TypeScript: "#2b7489",
  Shell: "#89e051",
  Nix: "#7e7eff",
  JavaScript: "#f1e05a",
  CSS: "#563d7c",
  Astro: "#ff5a03",
  HTML: "#e34c26",
  Rust: "#dea584",
  "C++": "#f34b7d",
  Java: "#b07219"
};

// GitHub SVG Icons
const icons = {
  star: `<path fill="none" stroke="#8b949e" stroke-width="1.5" d="M12 2.5l2.68 5.43 5.82.85-4.2 4.09.99 5.8L12 16.6 6.71 18.67l.99-5.8-4.2-4.09 5.82-.85L12 2.5z"/>`,
  commit: `<circle cx="12" cy="12" r="3" fill="none" stroke="#8b949e" stroke-width="1.5"/><path fill="none" stroke="#8b949e" stroke-width="1.5" d="M12 1v6m0 6v6"/>`,
  pr: `<path fill="none" stroke="#8b949e" stroke-width="1.5" d="M7 7h10m-10 10h10M17 4l3 3-3 3M7 14l-3 3 3 3"/>`,
  issue: `<circle cx="12" cy="12" r="10" fill="none" stroke="#8b949e" stroke-width="1.5"/><line x1="12" y1="8" x2="12" y2="12" stroke="#8b949e" stroke-width="1.5"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="#8b949e" stroke-width="1.5"/>`,
  calendar: `<rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="none" stroke="#8b949e" stroke-width="1.5"/><line x1="16" y1="2" x2="16" y2="6" stroke="#8b949e" stroke-width="1.5"/><line x1="8" y1="2" x2="8" y2="6" stroke="#8b949e" stroke-width="1.5"/><line x1="3" y1="10" x2="21" y2="10" stroke="#8b949e" stroke-width="1.5"/>`
};

// --- GitHub API request ---
async function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, {
        headers: {
          "User-Agent": "GitHubProfileBot",
          Authorization: `Bearer ${TOKEN}`,
        },
      }, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(JSON.parse(data)));
      })
      .on("error", reject);
  });
}

// --- Main logic ---
const user = await fetchJSON(`https://api.github.com/users/${USER}`);
const repos = await fetchJSON(`https://api.github.com/users/${USER}/repos?per_page=100`);

let stats = {
  stars: 0,
  forks: 0,
  issues: 0,
  commits: "3.6k", // Hardcoded as API doesn't provide this easily
  prs: 5, // Hardcoded
  contributions: 6, // Hardcoded
};

const langTally = {};

for (const repo of repos) {
  stats.stars += repo.stargazers_count;
  stats.forks += repo.forks_count;
  stats.issues += repo.open_issues_count;

  // Fetch languages
  const langs = await fetchJSON(repo.languages_url);
  for (const [lang, bytes] of Object.entries(langs)) {
    langTally[lang] = (langTally[lang] || 0) + bytes;
  }
}

const totalLangBytes = Object.values(langTally).reduce((a, b) => a + b, 0);
const langPercent = Object.entries(langTally)
  .map(([lang, bytes]) => ({
    lang,
    percent: ((bytes / totalLangBytes) * 100).toFixed(1),
    color: LANG_COLORS[lang] || "#6e7681"
  }))
  .sort((a, b) => parseFloat(b.percent) - parseFloat(a.percent))
  .slice(0, 8);

// --- SVG Output ---
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="845" height="200" viewBox="0 0 845 200">
  <defs>
    <style>
      .header { fill: #e11d48; font: 600 18px 'Segoe UI', system-ui; }
      .stat-label { fill: #8b949e; font: 400 14px 'Segoe UI', system-ui; }
      .stat-value { fill: #f0f6fc; font: 600 14px 'Segoe UI', system-ui; }
      .lang-label { fill: #f0f6fc; font: 400 12px 'Segoe UI', system-ui; }
      .lang-percent { fill: #8b949e; font: 400 12px 'Segoe UI', system-ui; }
    </style>
    <pattern id="avatarPattern" patternUnits="objectBoundingBox" width="100%" height="100%">
      <image href="${user.avatar_url}" x="0" y="0" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"/>
    </pattern>
  </defs>
  
  <!-- Background -->
  <rect width="845" height="200" rx="6" fill="#0d1117" stroke="#30363d" stroke-width="1"/>
  
  <!-- Left Section: Stats -->
  <text x="32" y="40" class="header">Statik DK Smoke's GitHub Stats</text>
  
  <!-- Stats List -->
  <g transform="translate(32, 65)">
    <g>
      <svg x="0" y="-8" width="16" height="16" viewBox="0 0 24 24">${icons.star}</svg>
      <text x="20" y="6" class="stat-label">Total Stars Earned:</text>
      <text x="200" y="6" class="stat-value">${stats.stars}</text>
    </g>
    <g transform="translate(0, 22)">
      <svg x="0" y="-8" width="16" height="16" viewBox="0 0 24 24">${icons.commit}</svg>
      <text x="20" y="6" class="stat-label">Total Commits:</text>
      <text x="200" y="6" class="stat-value">${stats.commits}</text>
    </g>
    <g transform="translate(0, 44)">
      <svg x="0" y="-8" width="16" height="16" viewBox="0 0 24 24">${icons.pr}</svg>
      <text x="20" y="6" class="stat-label">Total PRs:</text>
      <text x="200" y="6" class="stat-value">${stats.prs}</text>
    </g>
    <g transform="translate(0, 66)">
      <svg x="0" y="-8" width="16" height="16" viewBox="0 0 24 24">${icons.issue}</svg>
      <text x="20" y="6" class="stat-label">Total Issues:</text>
      <text x="200" y="6" class="stat-value">${stats.issues}</text>
    </g>
    <g transform="translate(0, 88)">
      <svg x="0" y="-8" width="16" height="16" viewBox="0 0 24 24">${icons.calendar}</svg>
      <text x="20" y="6" class="stat-label">Contributed to (last year):</text>
      <text x="200" y="6" class="stat-value">${stats.contributions}</text>
    </g>
  </g>
  
  <!-- Right Section: Languages -->
  <g transform="translate(530, 40)">
    <!-- Languages Header -->
    <text x="0" y="0" class="header">Most Used Languages</text>
    
    <!-- Language List with Bars -->
    ${langPercent.map((lang, i) => `
    <g transform="translate(0, ${25 + i * 16})">
      <circle cx="6" cy="2" r="4" fill="${lang.color}"/>
      <text x="16" y="6" class="lang-label">${lang.lang} ${lang.percent}%</text>
    </g>`).join('')}
  </g>
  
  <!-- Avatar Circle - CENTER -->
  <g transform="translate(375, 70)">
    <circle cx="35" cy="35" r="40" fill="#30363d" stroke="#e11d48" stroke-width="3"/>
    <circle cx="35" cy="35" r="37" fill="url(#avatarPattern)"/>
  </g>
</svg>`.trim();

await fs.mkdir(resolve(__dirname, "../assets"), { recursive: true });
await fs.writeFile(OUTPUT, svg);
console.log("✅ GitHub profile SVG generated.");
