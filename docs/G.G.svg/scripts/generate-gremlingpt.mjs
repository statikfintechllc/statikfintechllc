import fs from "node:fs/promises";
import https from "https";
import path from "path";

const OUT = path.resolve("assets/gremlingpt-card.svg");
const USER = "statikfintechllc";
const REPO = "GremlinGPT";
const TOKEN = process.env.PAT_GITHUB;

function fetchGitHub(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        "User-Agent": "GitHubCardBot",
        "Authorization": `Bearer ${TOKEN}`,
      }
    }, res => {
      let data = "";
      res.on("data", chunk => (data += chunk));
      res.on("end", () => resolve(JSON.parse(data)));
      res.on("error", reject);
    });
  });
}

const langColor = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Shell: "#89e051",
  CSS: "#563d7c"
};

const GITHUB_ICONS = {
  star: `<path fill="#8abecf" d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.172L12 18.896l-7.336 3.863 1.402-8.172L.132 9.211l8.2-1.193z"/>`,
  fork: `<path fill="#8abecf" d="M5 3a3 3 0 1 1 2.83 2H11v2.18a3.001 3.001 0 0 1-1 5.82v3.09a3 3 0 1 1-2 0v-3.09a3.001 3.001 0 0 1-1-5.82V5H4.17A3 3 0 0 1 5 3z"/>`
};

function truncate(str, max = 90) {
  return str.length > max ? str.slice(0, max - 3) + "..." : str;
}

async function main() {
  const repo = await fetchGitHub(`https://api.github.com/repos/${USER}/${REPO}`);
  const langs = await fetchGitHub(`https://api.github.com/repos/${USER}/${REPO}/languages`);
  const totalBytes = Object.values(langs).reduce((a, b) => a + b, 0);

  const langBar = (() => {
    let x = 0;
    return Object.entries(langs).map(([lang, bytes]) => {
      const w = (bytes / totalBytes) * 440;
      const color = langColor[lang] || "#ccc";
      const rect = `<rect x="${x}" y="110" width="${w}" height="6" fill="${color}" />`;
      x += w;
      return rect;
    }).join("\n");
  })();

  const svg = `
<svg width="480" height="130" viewBox="0 0 480 130" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    .title { font: 600 16px sans-serif; fill: #ff4775; }
    .desc  { font: 13px sans-serif; fill: #8abecf; }
    .meta  { font: 12px sans-serif; fill: #8abecf; dominant-baseline: middle; }
  </style>

  <rect width="100%" height="100%" rx="10" fill="#0d1117"/>

  <!-- Repo Icon -->
  <rect x="20" y="16" width="20" height="20" rx="4" fill="#2f81f7"/>
  <path d="M24 20h12v12H24z" fill="#fff"/>

  <!-- Title -->
  <text x="48" y="31" class="title">${repo.name}</text>

  <!-- Description -->
  <text x="48" y="54" class="desc">${truncate(repo.description)}</text>

  <!-- Language + Stars + Forks Row -->
  <circle cx="48" cy="95" r="6" fill="${langColor[repo.language] || "#ccc"}"/>
  <text x="64" y="95" class="meta">${repo.language}</text>

  <g transform="translate(140, 88)">
    <svg viewBox="0 0 24 24" width="14" height="14">${GITHUB_ICONS.star}</svg>
  </g>
  <text x="160" y="95" class="meta">${repo.stargazers_count}</text>

  <g transform="translate(200, 88)">
    <svg viewBox="0 0 24 24" width="14" height="14">${GITHUB_ICONS.fork}</svg>
  </g>
  <text x="220" y="95" class="meta">${repo.forks_count}</text>

  <!-- Language bar -->
  <g transform="translate(20, 0)">
    ${langBar}
  </g>
</svg>
`.trim();

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, svg);
}

main().catch(err => {
  console.error("SVG generation failed:", err);
  process.exit(1);
});
