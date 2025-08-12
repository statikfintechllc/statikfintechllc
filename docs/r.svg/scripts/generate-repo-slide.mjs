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

  const p = await gql(qPinned, { login: GH_USER });
  const pins = (p.user?.pinnedItems?.nodes || [])
    .filter(n => n && !n.isArchived)
    .slice(0, 12)
    .map(n => {
      const [owner, ...rest] = n.nameWithOwner.split("/");
      return { owner, name: rest.join("/") };
    });

  if (pins.length >= 2) return pins.slice(0, 12);

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

    const segs = langs.map(e => {
      const w = total ? e.size / total : 0;
      return { name: e.node.name, color: e.node.color || "#374151", weight: w };
    }).filter(s => s.weight > 0);

    if (segs.length === 0) segs.push({ name: r.primaryLanguage?.name || "Other", color: r.primaryLanguage?.color || "#6b7280", weight: 1 });

    out.push({
      owner, name: r.name, full: r.nameWithOwner,
      desc: r.description || "",
      stars: r.stargazerCount || 0,
      forks: r.forkCount || 0,
      segments: segs.slice(0, 8)
    });
  }
  return out;
};

// ---------- Build SVG ----------
const W = 880, H = 250, CW = 420, CH = 200, G = 40;
const x0 = (W - (2 * CW + G)) / 2;
const TITLE = (s) => xmlEsc(s);
// No content truncation here; wrapping logic will fit it
const DESC  = (s) => xmlEsc((s || "").replace(/\s+/g," ").trim());

// ===== text wrapping that never spills =====
function wrapTextToBox(text, boxWidthPx, boxHeightPx, options = {}) {
  const baseFont = options.fontSize || 13;      // starting font size
  const minFont  = options.minFontSize || 11;   // do not go below
  const linePad  = options.linePad || 3;        // pixels added to font size for line height
  const avgChar  = options.avgChar || 0.58;     // ~em width for system-ui @ normal weight

  const words = text.split(" ");
  let font = baseFont;

  while (font >= minFont) {
    const lineHeight = font + linePad;
    const maxLines = Math.max(1, Math.floor(boxHeightPx / lineHeight));
    const charsPerLine = Math.max(8, Math.floor(boxWidthPx / (font * avgChar)));

    const lines = [];
    let cur = "";

    for (const w of words) {
      const candidate = cur ? (cur + " " + w) : w;
      if (candidate.length <= charsPerLine) {
        cur = candidate;
      } else {
        lines.push(cur);
        cur = w;
        if (lines.length === maxLines) break;
      }
    }
    if (lines.length < maxLines && cur) lines.push(cur);

    const allWordsFit = (lines.join(" ").split(" ").length >= words.length);

    if (allWordsFit || font === minFont) {
      // If we still overflow at minFont, clamp last line with ellipsis
      if (!allWordsFit && lines.length) {
        const lastIdx = lines.length - 1;
        const need = words.length - lines.join(" ").split(" ").length;
        if (need > 0) {
          let last = lines[lastIdx];
          if (last.length > 3) last = last.slice(0, Math.max(0, charsPerLine - 1)) + "…";
          lines[lastIdx] = last;
        }
      }
      return { lines, font, lineHeight, maxLines };
    }
    font -= 1; // try smaller font
  }
  return { lines: [text.slice(0, 40) + "…"], font: minFont, lineHeight: minFont + linePad, maxLines: 1 };
}

// slidePrime: true for slide 0 (static preview visible)
const card = (repo, x, slideId, slidePrime=false) => {
  const px = 20, pw = CW - 40;

  // Language bar baseline
  const py = 160, ph = 12;

  // Language segments with min width
  let acc = 0;
  const minw = 0.04;
  const totalWeight = repo.segments.reduce((a,b)=>a+b.weight,0) || 1;
  const segs = repo.segments.map(s => ({...s, weight: s.weight / totalWeight}));
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

  const legends = segs.slice(0,4).map((s,i)=> {
    const lx = px + (i % 2) * 190;
    const ly = py + 20 + Math.floor(i / 2) * 14;
    return `<rect x="${lx}" y="${ly-9}" width="10" height="10" rx="2" fill="${s.color}"/><text x="${lx+16}" y="${ly}" class="legend">${xmlEsc(s.name)}</text>`;
  }).join("");

  // Title (≤2 lines)
  const titleText = TITLE(repo.name);
  const titleLines = [];
  const maxTitleCharsPerLine = 40;
  const maxTitleLines = 2;
  if (titleText.length > maxTitleCharsPerLine) {
    const words = titleText.split(/[\s-]+/);
    let current = "";
    for (const w of words) {
      const t = current ? current + " " + w : w;
      if (t.length <= maxTitleCharsPerLine) current = t;
      else { titleLines.push(current); current = w; if (titleLines.length === maxTitleLines - 1) break; }
    }
    if (current && titleLines.length < maxTitleLines) titleLines.push(current.length > maxTitleCharsPerLine ? (current.slice(0, maxTitleCharsPerLine - 1) + "…") : current);
  } else {
    titleLines.push(titleText);
  }
  const titleSvg = titleLines.map((line,i)=>`<text x="${px}" y="${30 + i*20}" class="name">${line}</text>`).join("");

  // Description block sizing (fits fully within box; no spill)
  const descTop = titleLines.length > 1 ? 70 : 54;
  const descBottom = 130; // must stay above badges (135) with small buffer
  const descHeight = Math.max(14, descBottom - descTop);
  const wrap = wrapTextToBox(DESC(repo.desc), pw, descHeight, { fontSize:13, minFontSize:11, linePad:3, avgChar:0.58 });

  const descSvg = wrap.lines.map((line, i) =>
    `<text x="${px}" y="${descTop + i * wrap.lineHeight}" style="font:400 ${wrap.font}px system-ui" class="desc">${line}</text>`
  ).join("");

  return `
  <g transform="translate(${x},20)" opacity="${slidePrime ? '1.0' : '0.0'}">
    <rect x="0" y="0" rx="14" ry="14" width="${CW}" height="${CH}" fill="#0b1220" stroke="#1f2937"/>
    ${titleSvg}
    ${descSvg}

    <!-- Stars and forks -->
    <g class="badges" transform="translate(0,135)">
      <g transform="translate(${CW-180},0)">
        <rect x="0" y="-12" rx="10" ry="10" width="78" height="20" fill="#111827" stroke="#1f2937"/>
        <text x="10" y="2" class="pill">⭐ ${repo.stars.toLocaleString()}</text>
      </g>
      <g transform="translate(${CW-90},0)">
        <rect x="0" y="-12" rx="10" ry="10" width="78" height="20" fill="#111827" stroke="#1f2937"/>
        <text x="10" y="2" class="pill">🍴 ${repo.forks.toLocaleString()}</text>
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

    <!-- fade tied to this slide's transform -->
    <animate attributeName="opacity"
             values="0;1;1;0"
             keyTimes="0;0.1;0.9;1"
             dur="${PAGE_SEC}s"
             begin="${slidePrime ? 'master.begin+0s; master.repeatEvent+0s; ' : ''}${slideId}-anim.begin; ${slideId}-anim.repeatEvent"
             fill="remove"/>
  </g>`;
};

const build = (repos) => {
  // chunk 2 per page
  const pages = [];
  for (let i=0;i<repos.length;i+=2) pages.push(repos.slice(i,i+2));

  const enterK = ((1 - HOLD_FRAC) / 2).toFixed(4);
  const exitK  = (1 - (1 - HOLD_FRAC) / 2).toFixed(4);
  const keyTimes = `0;${enterK};${exitK};1`;
  const totalDur = Math.max(1, pages.length) * PAGE_SEC;

  let slides = "";
  pages.forEach((pg,i)=>{
    const slideId = `s${i}`;
    const isFirst = i === 0;
    const startX = isFirst ? 0 : W;

    slides += `
    <g id="${slideId}" class="slide" transform="translate(${startX},0)" clip-path="url(#frame)">
      ${card(pg[0], x0, slideId, isFirst)}${pg[1] ? card(pg[1], x0+CW+G, slideId, isFirst) : ""}
      <animateTransform id="${slideId}-anim" attributeName="transform" type="translate"
        values="${W} 0; 0 0; 0 0; ${-W} 0"
        keyTimes="${keyTimes}"
        keySplines="${EASE}"
        calcMode="spline"
        dur="${PAGE_SEC}s"
        begin="master.begin+${(i * PAGE_SEC).toFixed(2)}s; master.repeatEvent+${(i * PAGE_SEC).toFixed(2)}s"
        repeatCount="1"/>
    </g>`;
  });

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    :root{ color-scheme: dark; }
    .name{ font:800 18px system-ui; fill:#e5e7eb }
    .desc{ fill:#9ca3af } /* size set inline for dynamic fit */
    .pill{ font:700 12px system-ui; fill:#e5e7eb }
    .legend{ font:600 12px system-ui; fill:#cbd5e1 }
  </style>
  <defs>
    <clipPath id="frame"><rect x="0" y="0" width="${W}" height="${H}" rx="8" ry="8"/></clipPath>
  </defs>

  <!-- master clock to synchronize all slides across cycles -->
  <rect id="clock" width="0" height="0" opacity="0">
    <animate id="master" attributeName="x" from="0" to="0" dur="${totalDur}s" repeatCount="indefinite"/>
  </rect>

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
