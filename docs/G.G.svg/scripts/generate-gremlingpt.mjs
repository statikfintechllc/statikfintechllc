import fs from "fs/promises";
import https from "https";
import path from "path";

const OUTPUT = path.resolve("assets/gremlingpt-card.svg");
const USER = "statikfintechllc";
const REPO = "GremlinGPT";
const TOKEN = process.env.PAT_GITHUB;

function fetchGitHub(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        "User-Agent": "BadgeBot",
        Authorization: `Bearer ${TOKEN}`,
      },
    }, (res) => {
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
  CSS: "#563d7c",
};

// ⬡ GitHub-style HOLLOW STAR (SVG ⌀)
const starIcon = `
<path fill="none" stroke="#8abecf" stroke-width="2"
  d="M12 2.5l2.68 5.43 5.82.85-4.2 4.09.99 5.8L12 16.6 6.71 18.67l.99-5.8-4.2-4.09 5.82-.85L12 2.5z"/>
`;

// 🍴 GitHub-style Fork
const forkIcon = `
<path fill="#8abecf"
  d="M5 3.09C4.41 3.55 4 4.24 4 5a2 2 0 0 0 1 1.73V8c0 .66.26 1.26.68 1.7a5.07 5.07 0 0 0 1.57 1.06c-.13.31-.2.65-.2 1 0 .75.3 1.43.8 1.93a2.74 2.74 0 0 0 2.4.76A3 3 0 0 0 12 14v-2.09c0-.5-.14-.98-.4-1.39a3.98 3.98 0 0 0-1.6-1.36A3 3 0 0 0 10 8V6.73A2 2 0 0 0 11 5a2 2 0 1 0-3.86-1.07A2 2 0 0 0 5 3.09z"/>
`;

async function main() {
  const repo = await fetchGitHub(`https://api.github.com/repos/${USER}/${REPO}`);
  const langs = await fetchGitHub(`https://api.github.com/repos/${USER}/${REPO}/languages`);
  const total = Object.values(langs).reduce((a, b) => a + b, 0);

  let x = 0;
  const langBar = Object.entries(langs).map(([lang, bytes]) => {
    const w = (bytes / total) * 440;
    const color = langColor[lang] || "#ccc";
    const rect = `<rect x="${x}" y="195" width="${w}" height="6" fill="${color}" />`;
    x += w;
    return rect;
  }).join("\n");

  const svg = `
<svg width="480" height="230" viewBox="0 0 480 230" xmlns="http://www.w3.org/2000/svg">
  <style>
    .title { font: 600 16px sans-serif; fill: #ff4775; }
    .meta  { font: 12px sans-serif; fill: #8abecf; dominant-baseline: middle; }
  </style>

  <rect width="100%" height="100%" rx="10" fill="#0d1117"/>

  <!-- Repo Icon -->
  <rect x="20" y="16" width="20" height="20" rx="4" fill="#2f81f7"/>
  <path d="M24 20h12v12H24z" fill="#fff"/>

  <!-- Title -->
  <text x="48" y="31" class="title">${repo.name}</text>

  <!-- Description -->
  <foreignObject x="48" y="40" width="400" height="120">
    <div xmlns="http://www.w3.org/1999/xhtml"
         style="color:#8abecf;font:13px sans-serif;line-height:1.4;white-space:normal;overflow:hidden;">
      ${repo.description}
    </div>
  </foreignObject>

  <!-- Language Dot + Label -->
  <circle cx="48" cy="180" r="6" fill="${langColor[repo.language] || "#ccc"}"/>
  <text x="64" y="180" class="meta">${repo.language}</text>

  <!-- Star Icon + Count -->
  <g transform="translate(140, 170)">
    <svg viewBox="0 0 24 24" width="14" height="14">${starIcon}</svg>
  </g>
  <text x="160" y="180" class="meta">${repo.stargazers_count}</text>

  <!-- Fork Icon + Count -->
  <g transform="translate(200, 170)">
    <svg viewBox="0 0 24 24" width="14" height="14">${forkIcon}</svg>
  </g>
  <text x="220" y="180" class="meta">${repo.forks_count}</text>

  <!-- Language Usage Bar -->
  <g transform="translate(20, 0)">
    ${langBar}
  </g>
</svg>
`.trim();

  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.writeFile(OUTPUT, svg);
}

main().catch(err => {
  console.error("SVG generation failed:", err);
  process.exit(1);
});
