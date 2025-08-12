/**
 * Animated Repo Cards (2-up carousel, SMIL-only)
 * Data:
 *   - If REPOS is set (comma list: "owner/name,owner/name,..."), use that
 *   - else pinned items (top 6), else top by stargazers (non-archived)
 * Shows:
 *   - Repo name, short description
 *   - Stars, forks
 *   - Language bar (stacked by bytes) + legend
 * Loop:
 *   - Slides 2 at a time with enter/hold/exit easing
 */

import fs from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(process.cwd(), "assets/repo-slide.svg");
const GH_TOKEN = process.env.PAT_GITHUB;
const GH_USER  = process.env.GH_USER || "statikfintechllc";
const REPOS_ENV = (process.env.REPOS || "").trim();
const PAGE_SEC  = Number(process.env.REPO_PAGE_SEC || 6);
const HOLD_FRAC = 0.55; // centered dwell portion
const EASE = "0.25 0.1 0.25 1; 0.25 0.1 0.25 1; 0.42 0 0.58 1"; // out,hold,in

if (!GH_TOKEN) throw new Error("PAT_GITHUB env missing");

const gql = async (query, variables = {}, attempt = 1) => {
  const r = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${GH_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "ggpt-boost-repos"
    },
    body: JSON.stringify({ query, variables })
  });
  if (r.status >= 500 && attempt < 5) {
    await new Promise(res => setTimeout(res, attempt * 400));
    return gql(query, variables, attempt + 1);
  }
  if (!r.ok) throw new Error(`GraphQL ${r.status}: ${await r.text()}`);
  const j = await r.json();
  if (j.errors) throw new Error(JSON.stringify(j.errors));
  return j.data;
};

const qPinned = `
query($login:String!){
  user(login:$login){
    pinnedItems(first:12, types:[REPOSITORY]){
      nodes{
        ... on Repository { nameWithOwner name description stargazerCount forkCount isArchived }
      }
    }
  }
}`;

const qTop = `
query($login:String!){
  user(login:$login){
    repositories(first:50, ownerAffiliations:[OWNER], isFork:false, orderBy:{field:STARGAZERS, direction:DESC}){
      nodes{ nameWithOwner name description stargazerCount forkCount isArchived }
    }
  }
}`;

const qRepo = `
query($owner:String!, $name:String!){
  repository(owner:$owner, name:$name){
    nameWithOwner
    name
    description
    stargazerCount
    forkCount
    primaryLanguage{ name color }
    languages(first:25, orderBy:{field:SIZE, direction:DESC}){
      totalSize
      edges{ size node{ name color } }
    }
  }
}`;

const parseEnvRepos = (raw) => raw
  .split(",")
  .map(s => s.trim())
  .filter(Boolean)
  .map(s => {
    if (s.includes("/")) {
      const [owner, name] = s.split("/");
      return { owner, name };
    }
    return { owner: GH_USER, name: s };
  });

const xmlEsc = (s="") => s
  .replace(/&/g,"&amp;")
  .replace(/</g,"&lt;")
  .replace(/>/g,"&gt;")
  .replace(/"/g,"&quot;")
  .replace(/'/g,"&apos;");

const takeRepos = async () => {
  if (REPOS_ENV) return parseEnvRepos(REPOS_ENV);

  // try pinned
  const p = await gql(qPinned, { login: GH_USER });
  const pins = (p.user?.pinnedItems?.nodes || [])
    .filter(n => n && !n.isArchived)
    .slice(0, 12)
    .map(n => {
      const [owner, ...rest] = n.nameWithOwner.split("/");
      return { owner, name: rest.join("/") };
    });

  if (pins.length >= 2) return pins.slice(0, 12);

  // fallback to top by stargazers
  const t = await gql(qTop, { login: GH_USER });
  const tops = (t.user?.repositories?.nodes || [])
    .filter(n => !n.isArchived)
    .slice(0, 12)
    .map(n => {
      const [owner, ...rest] = n.nameWithOwner.split("/");
      return { owner, name: rest.join("/") };
    });

  return tops.slice(0, 12);
};

const fetchRepoDetails = async (lst) => {
  const out = [];
  for (const { owner, name } of lst) {
    const d = await gql(qRepo, { owner, name });
    const r = d.repository;
    if (!r) continue;
    const langs = r.languages?.edges || [];
    const total = r.languages?.totalSize || 0;
    // build normalized segments (cap tiny ones to ensure visibility)
    const segs = langs.map(e => {
      const w = total ? e.size / total : 0;
      return { name: e.node.name, color: e.node.color || "#374151", weight: w };
    }).filter(s => s.weight > 0);

    // ensure at least 1 segment exists
    if (segs.length === 0) segs.push({ name: r.primaryLanguage?.name || "Other", color: r.primaryLanguage?.color || "#6b7280", weight: 1 });

    out.push({
      owner, name: r.name, full: r.nameWithOwner,
      desc: r.description || "",
      stars: r.stargazerCount || 0,
      forks: r.forkCount || 0,
      segments: segs.slice(0, 8) // cap legend size
    });
  }
  return out;
};

// ---------- Build SVG ----------
const W = 880, H = 250, CW = 400, CH = 200, G = 40;
const x0 = (W - (2 * CW + G)) / 2;
const TITLE = (s) => xmlEsc(s.length > 45 ? s.slice(0,42) + "…" : s);
const DESC  = (s) => {
  const clean = xmlEsc(s.replace(/\s+/g," ").trim());
  return clean.length > 150 ? clean.slice(0, 147) + "…" : clean;
};

const card = (repo, x) => {
  // Move language bar to bottom for better balance
  const px = 20, py = 160, pw = CW - 40, ph = 12;
  let acc = 0;
  const minw = 0.04; // 4% min width visibility
  const totalWeight = repo.segments.reduce((a,b)=>a+b.weight,0) || 1;
  const segs = repo.segments.map(s => ({...s, weight: s.weight / totalWeight}));

  // distribute min widths then renormalize leftover
  const hard = segs.map(s => Math.max(s.weight, minw));
  const hardSum = hard.reduce((a,b)=>a+b,0);
  const norm = hard.map(v => v / hardSum);

  const bars = norm.map((w, i) => {
    const wpx = Math.round(w * pw);
    const xseg = px + acc;
    acc += wpx;
    const s = segs[i];
    return `<rect x="${xseg}" y="${py}" width="${i === norm.length-1 ? (px+pw - xseg) : wpx}" height="${ph}" fill="${s.color}" />`;
  }).join("");

  // Position legends at the very bottom in a more compact layout
  const legends = segs.slice(0,4).map((s,i)=> {
    const x = px + (i % 2) * 190; // Two columns
    const y = py + 20 + Math.floor(i / 2) * 14; // Two rows
    return `<rect x="${x}" y="${y-9}" width="10" height="10" rx="2" fill="${s.color}"/><text x="${x+16}" y="${y}" class="legend">${xmlEsc(s.name)}</text>`;
  }).join("");

  // Improved description wrapping with better character limits
  const descText = DESC(repo.desc);
  const descLines = [];
  const maxCharsPerLine = 60; // Reduced for better fitting
  const maxLines = 3; // Allow up to 3 lines
  
  if (descText.length > maxCharsPerLine) {
    const words = descText.split(' ');
    let lines = [''];
    let currentLine = 0;
    
    for (const word of words) {
      const testLine = lines[currentLine] + (lines[currentLine] ? ' ' : '') + word;
      
      if (testLine.length <= maxCharsPerLine) {
        lines[currentLine] = testLine;
      } else if (currentLine < maxLines - 1) {
        currentLine++;
        lines[currentLine] = word;
      } else {
        // Truncate with ellipsis if we exceed max lines
        lines[currentLine] = lines[currentLine].slice(0, maxCharsPerLine - 3) + '…';
        break;
      }
    }
    
    lines.forEach((line, i) => {
      if (line.trim()) {
        descLines.push(`<text x="20" y="${54 + i * 18}" class="desc">${line}</text>`);
      }
    });
  } else {
    descLines.push(`<text x="20" y="54" class="desc">${descText}</text>`);
  }

  return `
  <g transform="translate(${x},20)" opacity="0.0">
    <rect x="0" y="0" rx="14" ry="14" width="${CW}" height="${CH}" fill="#0b1220" stroke="#1f2937"/>
    <text x="20" y="30" class="name">${TITLE(repo.name)}</text>
    ${descLines.join('\n    ')}

    <g class="badges">
      <g transform="translate(${CW-180},28)">
        <rect x="0" y="-16" rx="10" ry="10" width="78" height="24" fill="#111827" stroke="#1f2937"/>
        <text x="10" y="0" class="pill">⭐ ${repo.stars.toLocaleString()}</text>
      </g>
      <g transform="translate(${CW-90},28)">
        <rect x="0" y="-16" rx="10" ry="10" width="78" height="24" fill="#111827" stroke="#1f2937"/>
        <text x="10" y="0" class="pill">🍴 ${repo.forks.toLocaleString()}</text>
      </g>
    </g>

    ${bars}
    ${legends}

    <!-- glow pulse -->
    <g>
      <rect x="0" y="0" rx="14" ry="14" width="${CW}" height="${CH}" fill="none" stroke="#e11d48" opacity="0.0">
        <animate attributeName="opacity" values="0;0.35;0" dur="2.8s" repeatCount="indefinite"/>
      </rect>
    </g>

    <!-- fade in/out per slide -->
    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="${PAGE_SEC}s" repeatCount="1" fill="freeze"/>
  </g>`;
};

const build = (repos) => {
  // chunk 2 per page
  const pages = [];
  for (let i=0;i<repos.length;i+=2) pages.push(repos.slice(i,i+2));

  const enterK = ((1 - HOLD_FRAC) / 2).toFixed(4);
  const exitK  = (1 - (1 - HOLD_FRAC) / 2).toFixed(4);
  const keyTimes = `0;${enterK};${exitK};1`;
  
  // Calculate total cycle duration for proper looping
  const totalDuration = pages.length * PAGE_SEC;

  let slides = "";
  pages.forEach((pg,i)=>{
    slides += `
    <g class="slide" transform="translate(${W},0)" clip-path="url(#frame)">
      ${card(pg[0], x0)}${pg[1] ? card(pg[1], x0+CW+G) : ""}
      <animateTransform attributeName="transform" type="translate"
        values="${W};0;0;${-W}"
        keyTimes="${keyTimes}"
        keySplines="${EASE}"
        calcMode="spline"
        dur="${PAGE_SEC}s"
        begin="${(i * PAGE_SEC).toFixed(2)}s"
        repeatCount="indefinite"
        repeatDur="${totalDuration}s"/>
    </g>`;
  });

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root{ color-scheme: dark; }
    .name{ font:800 18px system-ui; fill:#e5e7eb }
    .desc{ font:400 13px system-ui; fill:#9ca3af }
    .pill{ font:700 12px system-ui; fill:#e5e7eb }
    .legend{ font:600 12px system-ui; fill:#cbd5e1 }
  </style>
  <defs>
    <clipPath id="frame"><rect x="0" y="0" width="${W}" height="${H}" rx="8" ry="8"/></clipPath>
  </defs>
  ${slides}
</svg>`;
  return svg;
};

(async () => {
  const list = await takeRepos();
  if (!list.length) throw new Error("No repositories selected");
  const details = await fetchRepoDetails(list.slice(0, 12));
  const svg = build(details);
  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, svg, "utf8");
  console.log("wrote", OUT);
})();
