/* Generate docs/svg/crimson-flow.svg from live GitHub stats (animated, with real axis ticks) */
import fs from "node:fs/promises";
import path from "node:path";

// force-diff tag so commits happen even when data is unchanged
const BUILD_TAG = process.env.BUILD_TAG || new Date().toISOString();

const USER  = process.env.USER_LOGIN || "statikfintechllc";
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
if (!TOKEN) {
  console.error("Missing GH_TOKEN/GITHUB_TOKEN");
  process.exit(1);
}

// ---------- helpers ----------
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const isoStartUTC = (d) =>
  new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0, 0)).toISOString();
const isoNowUTC = () => new Date().toISOString();

async function gql(query, variables = {}) {
  const r = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "crimson-flow",
    },
    body: JSON.stringify({ query, variables }),
  });
  const j = await r.json();
  if (!r.ok || j.errors) {
    console.error("GraphQL error:", j.errors || r.statusText);
    process.exit(1);
  }
  return j.data;
}

// Catmull–Rom → Bezier
function bezierPath(points) {
  if (points.length < 2) return "";
  const p = [];
  p.push(`M${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`);
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const s = 0.2;
    const c1x = p1.x + (p2.x - p0.x) * s, c1y = p1.y + (p2.y - p0.y) * s;
    const c2x = p2.x - (p3.x - p1.x) * s, c2y = p2.y - (p3.y - p1.y) * s;
    p.push(`C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`);
  }
  return p.join(" ");
}

// “nice” tick step (1/2/5 × 10^k)
function niceStep(max, targetTicks = 5) {
  const raw = max / targetTicks;
  const pow10 = Math.pow(10, Math.floor(Math.log10(raw)));
  const base = raw / pow10;
  const niceBase = base <= 1 ? 1 : base <= 2 ? 2 : base <= 5 ? 5 : 10;
  return niceBase * pow10;
}

// ---------- fetch ----------
const now = new Date();
const start30  = new Date(now);  start30.setUTCDate(now.getUTCDate() - 30);
const start365 = new Date(now);  start365.setUTCDate(now.getUTCDate() - 365);

const query = `
query($login:String!, $from30:DateTime!, $to:DateTime!, $from365:DateTime!){
  user(login:$login){
    contributions30: contributionsCollection(from:$from30, to:$to){
      contributionCalendar{ weeks{ contributionDays{ date contributionCount } } }
    }
    contributions365: contributionsCollection(from:$from365, to:$to){
      contributionCalendar{ weeks{ contributionDays{ date contributionCount } } }
    }
  }
}`;

const data = await gql(query, {
  login: USER,
  from30:  isoStartUTC(start30),
  from365: isoStartUTC(start365),
  to:      isoNowUTC(),
});

function flattenDays(cc) {
  const days = [];
  for (const w of cc.contributionCalendar.weeks) {
    for (const d of w.contributionDays) days.push({ date: d.date, count: d.contributionCount });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  return days;
}

const days30  = flattenDays(data.user.contributions30).slice(-30);
const days365 = flattenDays(data.user.contributions365).slice(-365);

// ---------- geometry ----------
const W = 1200, H = 420;
const plot = { x: 70, y: 60, w: 1080, h: 260 }; // leave room for y labels at left

const maxCount = Math.max(1, ...days30.map(d => d.count));
const yStep = niceStep(maxCount, 5);
const yMax = Math.ceil(maxCount / yStep) * yStep;

const pts = days30.map((d, i) => {
  const x = plot.x + (plot.w * i) / Math.max(1, days30.length - 1);
  const y = plot.y + plot.h - (plot.h * clamp(d.count, 0, yMax)) / yMax;
  return { x, y };
});

const dPath   = bezierPath(pts);
const areaPath = `${dPath} L ${plot.x + plot.w},${plot.y + plot.h} L ${plot.x},${plot.y + plot.h} Z`;

// X tick labels (show every 5th day; format M/D)
const xTickEvery = 5;
const xTicks = days30.map((d, i) => ({ i, d: new Date(d.date) }))
  .filter(({ i }) => (i % xTickEvery === 0) || i === days30.length - 1)
  .map(({ i, d }) => {
    const x = plot.x + (plot.w * i) / Math.max(1, days30.length - 1);
    const label = `${d.getUTCMonth()+1}/${d.getUTCDate()}`;
    return { x, label };
  });

// Y tick labels (0..yMax)
const yTicks = [];
for (let v = 0; v <= yMax + 1e-9; v += yStep) {
  const y = plot.y + plot.h - (plot.h * v) / yMax;
  yTicks.push({ v, y });
}

// ---------- SVG ----------
const RED      = "#9b0e2a";
const RED_LINE = "#c3193d";
const RED_SOFT = "#7a0f26";
const GRID     = "#121821";
const LABEL    = "#ea384c";

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<!-- build:${BUILD_TAG} user:${USER} points:${pts.length} yMax:${yMax} -->
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Contribution's Graph">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a0d12"/><stop offset="100%" stop-color="#070a0d"/>
    </linearGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="3" result="b1"/><feMerge><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${RED}" stop-opacity="0"/>
      <stop offset="50%" stop-color="${RED}" stop-opacity=".14"/>
      <stop offset="100%" stop-color="${RED}" stop-opacity="0"/>
      <animateTransform attributeName="gradientTransform" type="translate" from="-1 0" to="1 0" dur="9s" repeatCount="indefinite"/>
    </linearGradient>
  </defs>

  <!-- BG -->
  <rect width="${W}" height="${H}" fill="url(#bgGrad)"/>

  <!-- Plot frame -->
  <rect x="${plot.x}" y="${plot.y}" width="${plot.w}" height="${plot.h}" fill="none" stroke="${GRID}" stroke-width="1"/>

  <!-- Y grid + labels -->
  <g font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Arial" font-size="12">
    ${yTicks.map(t => `
      <path d="M${plot.x},${t.y.toFixed(1)} H${(plot.x+plot.w)}" stroke="${GRID}" stroke-width="1" opacity="0.6"/>
      <text x="${plot.x-10}" y="${(t.y+4).toFixed(1)}" text-anchor="end" fill="${LABEL}">${t.v}</text>
    `).join("")}
    <text x="${plot.x-40}" y="${plot.y-16}" fill="${LABEL}" font-size="13">Contributions</text>
  </g>

  <!-- X ticks + labels -->
  <g font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Arial" font-size="12">
    ${xTicks.map(t => `
      <path d="M${t.x.toFixed(1)},${(plot.y+plot.h)} V${(plot.y+plot.h+6)}" stroke="${GRID}" stroke-width="1"/>
      <text x="${t.x.toFixed(1)}" y="${(plot.y+plot.h+20)}" text-anchor="middle" fill="${LABEL}">${t.label}</text>
    `).join("")}
    <text x="${plot.x+plot.w/2}" y="${plot.y+plot.h+38}" text-anchor="middle" fill="${LABEL}" font-size="13">Last 30 days</text>
  </g>

  <!-- Fancy sheen over plot area -->
  <rect x="${plot.x}" y="${plot.y}" width="${plot.w}" height="${plot.h}" fill="url(#sheen)"/>

  <!-- Title -->
  <text x="${W/2}" y="40" text-anchor="middle"
        font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Arial"
        font-size="22" fill="${LABEL}" opacity=".95">Statik DK Smoke’s Contribution's</text>

  <!-- Area under curve -->
  <path d="${areaPath}" fill="${RED_SOFT}" opacity=".13">
    <animate attributeName="opacity" values=".10;.17;.10" dur="6s" repeatCount="indefinite"/>
  </path>

  <!-- Neon curve -->
  <path id="curve" d="${dPath}" fill="none" stroke="${RED_LINE}" stroke-width="5"
        stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 14" filter="url(#glow)">
    <animate attributeName="stroke-dashoffset" values="0;-220" dur="4.8s" repeatCount="indefinite"/>
  </path>

  <!-- Particles -->
  <g fill="#ffd1db">
    <circle r="4"><animateMotion dur="7s" rotate="auto" repeatCount="indefinite"><mpath href="#curve"/></animateMotion><animate attributeName="opacity" values="1;.3;1" dur="2.2s" repeatCount="indefinite"/></circle>
    <circle r="3" fill="#ffffff"><animateMotion dur="8.2s" begin="1s" rotate="auto" repeatCount="indefinite"><mpath href="#curve"/></animateMotion><animate attributeName="opacity" values=".7;.2;.7" dur="2.4s" repeatCount="indefinite"/></circle>
    <circle r="3" fill="#ffc7d3"><animateMotion dur="6s" begin="2s" rotate="auto" repeatCount="indefinite"><mpath href="#curve"/></animateMotion><animate attributeName="opacity" values=".8;.3;.8" dur="2s" repeatCount="indefinite"/></circle>
  </g>
</svg>`;

// write
const outPath = path.join(process.cwd(), "docs", "c.svg", "assets", "crimson-flow.svg");
await fs.mkdir(path.dirname(outPath), { recursive: true });
await fs.writeFile(outPath, svg, "utf8");
const stat = await fs.stat(outPath);
console.log(`Wrote ${outPath} (${stat.size} bytes)`);

console.log("Wrote", outPath);
