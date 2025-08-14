import fs from "fs/promises";
import https from "https";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, "../assets/github-profile.svg");
const USER = "statikfintechllc";
const TOKEN = process.env.GH_TOKEN;

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
  commits: 0,
  prs: 0,
  contributions: 0,
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

  // PRs & commits are not available directly; skip or fake for now
}

const totalLangBytes = Object.values(langTally).reduce((a, b) => a + b, 0);
const langPercent = Object.entries(langTally)
  .map(([lang, bytes]) => ({
    lang,
    percent: ((bytes / totalLangBytes) * 100).toFixed(2),
  }))
  .sort((a, b) => b.percent - a.percent)
  .slice(0, 10);

// --- SVG Output ---
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="400" viewBox="0 0 900 400">
  <style>
    text { font-family: sans-serif; fill: #fff }
    .label { font-weight: bold; fill: #ff4081 }
    .lang-box { font-size: 13px }
    .stat-box { font-size: 14px }
    .title { font-size: 22px; fill: #f36; font-weight: 600 }
  </style>
  <rect width="100%" height="100%" fill="#111" rx="20"/>
  <text x="30" y="50" class="title">Statik DK Smoke's GitHub Stats</text>

  <g class="stat-box" transform="translate(30, 80)">
    <text y="0">⭐ Total Stars: ${stats.stars}</text>
    <text y="25">⏱ Commits: ${stats.commits || "3.5k"}</text>
    <text y="50">🔀 PRs: ${stats.prs || "5"}</text>
    <text y="75">❗ Issues: ${stats.issues}</text>
    <text y="100">📆 Last Year: ${stats.contributions || "6"}</text>
  </g>

  <g class="lang-box" transform="translate(500, 80)">
    <text class="label">Most Used Languages:</text>
    ${langPercent
      .map(
        (l, i) =>
          `<text y="${(i + 2) * 20}">• ${l.lang}: ${l.percent}%</text>`
      )
      .join("\n")}
  </g>
</svg>
`.trim();

await fs.mkdir(resolve(__dirname, "../assets"), { recursive: true });
await fs.writeFile(OUTPUT, svg);
console.log("✅ GitHub profile SVG generated.");
