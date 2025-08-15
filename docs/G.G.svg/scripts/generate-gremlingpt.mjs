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

async function main() {
  const repo = await fetchGitHub(`https://api.github.com/repos/${USER}/${REPO}`);
  const langs = await fetchGitHub(`https://api.github.com/repos/${USER}/${REPO}/languages`);

  const totalBytes = Object.values(langs).reduce((a, b) => a + b, 0);
  const langBar = Object.entries(langs).map(([lang, bytes], i) => {
    const width = ((bytes / totalBytes) * 100).toFixed(2);
    const color = langColor[lang] || "#ccc";
    return `<rect x="${i * 100}" y="75" width="${width}%" height="6" fill="${color}" />`;
  }).join("\n");

  const svg = `
<svg width="480" height="140" viewBox="0 0 480 140" fill="none" xmlns="http://www.w3.org/2000/svg">
  <style>
    .title { font: bold 16px sans-serif; fill: #ff4775; }
    .desc  { font: 13px sans-serif; fill: #8abecf; }
    .meta  { font: 12px monospace; fill: #8abecf; }
  </style>

  <rect width="100%" height="100%" rx="10" fill="#0d1117"/>

  <text x="20" y="30" class="title">📘 GremlinGPT</text>
  <text x="20" y="50" class="desc">${repo.description}</text>

  <g transform="translate(20, 100)">
    <circle r="6" fill="${langColor[repo.language] || "#ccc"}" />
    <text x="15" y="5" class="meta">${repo.language}</text>
    <text x="120" y="5" class="meta">⭐ ${repo.stargazers_count}</text>
    <text x="180" y="5" class="meta">🍴 ${repo.forks_count}</text>
  </g>

  <g transform="translate(20, 80)">
    ${langBar}
  </g>
</svg>
  `.trim();

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, svg);
}

main().catch(err => {
  console.error("Failed to generate GremlinGPT card:", err);
  process.exit(1);
});
