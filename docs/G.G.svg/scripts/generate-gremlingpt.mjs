import fs from "node:fs/promises";
import https from "https";
import path from "node:path";

const OUT = path.resolve("assets/gremlingpt-card.svg");
const USER = "statikfintechllc";
const REPO = "GremlinGPT";
const TOKEN = process.env.PAT_GITHUB;

function fetchGitHub(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        "User-Agent": "BadgeBuilder",
        "Authorization": `Bearer ${TOKEN}`
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
  TypeScript: "#3178c6"
};

const wrapText = (text, maxChars = 80) => {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars - 3) + "...";
};

const GITHUB_ICONS = {
  star: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#8abecf" viewBox="0 0 24 24"><path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
  fork: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#8abecf" viewBox="0 0 24 24"><path d="M6 3a3 3 0 0 0 0 6c.2 0 .39-.03.57-.07A3.007 3.007 0 0 0 9 11v2a3 3 0 0 0 3 3v3.09a3.001 3.001 0 1 0 2 0V16a3 3 0 0 0 3-3v-2a3.007 3.007 0 0 0 2.43-2.07c.18.04.37.07.57.07a3 3 0 1 0-3-3c0 .34.06.66.17.97A3.007 3.007 0 0 0 15 11v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a3.007 3.007 0 0 0-2.17-2.9A3.001 3.001 0 0 0 6 3z"/></svg>`
};

async function main() {
  const repo = await fetchGitHub(`https://api.github.com/repos/${USER}/${REPO}`);
  const langs = await fetchGitHub(`https://api.github.com/repos/${USER}/${REPO}/languages`);

  const totalBytes = Object.values(langs).reduce((a, b) => a + b, 0);
  let xOffset = 0;
  const langBar = Object.entries(langs).map(([lang, bytes]) => {
    const w = (bytes / totalBytes) * 440;
    const color = langColor[lang] || "#ccc";
    const rect = `<rect x="${xOffset}" y="94" width="${w}" height="6" fill="${color}" />`;
    xOffset += w;
    return rect;
  }).join("\n");

  const svg = `
<svg width="480" height="140" viewBox="0 0 480 140" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    .title { font: bold 16px sans-serif; fill: #ff4775; }
    .desc  { font: 13px sans-serif; fill: #8abecf; }
    .meta  { font: 12px sans-serif; fill: #8abecf; }
    .label { font: 12px sans-serif; fill: #8abecf; dominant-baseline: middle; }
  </style>

  <rect width="100%" height="100%" rx="10" fill="#0d1117"/>

  <text x="48" y="30" class="title">GremlinGPT</text>
  <text x="48" y="50" class="desc">${wrapText(repo.description)}</text>

  <!-- 📘 Repo icon -->
  <rect x="20" y="14" width="20" height="20" rx="3" fill="#2176d2"/>
  <path d="M23 17h10v10H23z" fill="#fff"/>

  <!-- Lang dot -->
  <circle cx="48" cy="105" r="6" fill="${langColor[repo.language] || "#ccc"}"/>
  <text x="60" y="105" class="label">${repo.language}</text>

  <!-- Star icon -->
  <g transform="translate(160, 99)">${GITHUB_ICONS.star}</g>
  <text x="180" y="105" class="label">${repo.stargazers_count}</text>

  <!-- Fork icon -->
  <g transform="translate(220, 99)">${GITHUB_ICONS.fork}</g>
  <text x="240" y="105" class="label">${repo.forks_count}</text>

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
