/**
 * Animated Streak — REAL FIRE (GitHub-safe SVG/SMIL)
 * - Jagged, randomized flame tongues (no bubbles)
 * - Flame crown ring + rising edge flames + sparks
 * - Accurate data (same GraphQL as before)
 */

import fs from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(process.cwd(), "assets/streak.svg");
const GH_TOKEN = process.env.PAT_GITHUB;
const USER = process.env.GH_USER || "statikfintechllc";
if (!GH_TOKEN) throw new Error("PAT_GITHUB env missing");

// ---------------- GraphQL ----------------
const gql = async (query, variables = {}, attempt = 1) => {
  const r = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${GH_TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "ggpt-boost-streak"
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

const qUser = `query($login:String!){ user(login:$login){ createdAt } }`;
const qCal = `query($login:String!, $from:DateTime!, $to:DateTime!){
  user(login:$login){
    contributionsCollection(from:$from, to:$to){
      contributionCalendar{ weeks{ contributionDays{ date contributionCount } } }
    }
  }
}`;

// ---------------- Data ----------------
const who = await gql(qUser, { login: USER });
const createdAt = new Date(who.user.createdAt);
const now = new Date();
const addDays = (d, n) => { const t = new Date(d); t.setUTCDate(t.getUTCDate() + n); return t; };

let cursor = new Date(Date.UTC(
  createdAt.getUTCFullYear(),
  createdAt.getUTCMonth(),
  createdAt.getUTCDate()
));

const allDays = [];
while (cursor < now) {
  const to = addDays(cursor, 365);
  const winFrom = cursor.toISOString();
  const winTo = (to < now ? to : now).toISOString();
  const data = await gql(qCal, { login: USER, from: winFrom, to: winTo });
  const days = data.user.contributionsCollection.contributionCalendar.weeks
    .flatMap(w => w.contributionDays)
    .map(d => ({ date: d.date, count: d.contributionCount }));
  allDays.push(...days);
  cursor = to;
}

const byDate = new Map();
for (const d of allDays) byDate.set(d.date, (byDate.get(d.date) || 0) + d.count);
const days = [...byDate.entries()]
  .map(([date, count]) => ({ date, count }))
  .sort((a, b) => new Date(a.date) - new Date(b.date));

let run = 0;
const timeline = days.map(d => ({ date: d.date, total: (run += d.count) }));

// ---- current streak (end at most recent non-zero day, not strictly "today") ----
let cs = 0;
if (days.length) {
  // index at last day that is <= now
  let i = days.length - 1;
  while (i >= 0 && new Date(days[i].date) > now) i--;

  // skip trailing zero-contribution days (e.g., no commit yet today)
  while (i >= 0 && days[i].count === 0) i--;

  // count consecutive >0 days backward
  while (i >= 0 && days[i].count > 0) { cs++; i--; }
}

const streaks = [];
let cur = 0, start = null;
for (let i = 0; i < days.length; i++) {
  const d = days[i];
  if (d.count > 0) {
    if (cur === 0) start = d.date;
    cur++;
  } else if (cur > 0) {
    streaks.push({ start, end: days[i - 1].date, len: cur });
    cur = 0; start = null;
  }
}
if (cur > 0) streaks.push({ start, end: days.at(-1).date, len: cur });
const top = [...streaks].sort((a, b) => b.len - a.len).slice(0, 3);

// sample to limit frame count
const MAX_FRAMES = 80;
const sample = (() => {
  if (timeline.length <= MAX_FRAMES) return timeline;
  const step = (timeline.length - 1) / (MAX_FRAMES - 1);
  return Array.from({ length: MAX_FRAMES }, (_, i) => timeline[Math.round(i * step)]);
})();

// ---------------- Layout ----------------
const W = 760, H = 178;
const L_X = 150, C_X = 380, R_X = 610;
const TITLE_Y = 34, NUM_Y = 102, SUB_Y = 126;

// ---------------- Carousels ----------------
const LEFT_FRAMES = sample.length;
const FLOW_DUR = +(LEFT_FRAMES * 0.08).toFixed(2);   // flow speed
const HOLD = 3.0;                                    // seconds to hold start + end
const LEFT_DUR = +(FLOW_DUR + HOLD * 2).toFixed(2);  // total cycle duration

const mkLeft = sample.map((p, i) => {
  const keyTimes = [];
  const values = [];

  // Build timeline in 3 zones: hold-start, flow, hold-end
  for (let k = 0; k < LEFT_FRAMES; k++) {
    let t;
    if (k === 0) {
      // first commit: start at 0, hold until HOLD / LEFT_DUR
      keyTimes.push((0).toFixed(6));
      values.push(i === 0 ? 1 : 0);
      keyTimes.push((HOLD / LEFT_DUR).toFixed(6));
      values.push(i === 0 ? 1 : 0);
    }

    // flow portion: scale position into (HOLD..HOLD+FLOW_DUR)
    const flowT = HOLD + (k / (LEFT_FRAMES - 1)) * FLOW_DUR;
    t = (flowT / LEFT_DUR).toFixed(6);
    keyTimes.push(t);
    values.push(i === k ? 1 : 0);

    if (k === LEFT_FRAMES - 1) {
      // last commit: hold through end
      keyTimes.push("1");
      values.push(i === LEFT_FRAMES - 1 ? 1 : 0);
    }
  }

  return `
  <g>
    <text x="${L_X}" y="${NUM_Y}" class="leftLabel" text-anchor="middle">${p.total.toLocaleString()}</text>
    <text x="${L_X}" y="${SUB_Y}" class="leftSub"   text-anchor="middle">${p.date}</text>
    <animate attributeName="opacity"
             values="${values.join(";")}"
             keyTimes="${keyTimes.join(";")}"
             dur="${LEFT_DUR}s"
             repeatCount="indefinite"/>
  </g>`;
}).join("");

const RIGHT_FRAMES = Math.max(1, top.length);
const RIGHT_DUR = +(RIGHT_FRAMES * 2.4).toFixed(2);
const mkRight = top.map((s, i) => {
  const keyTimes = [], values = [];
  for (let k = 0; k <= RIGHT_FRAMES; k++) {
    keyTimes.push((k / RIGHT_FRAMES).toFixed(6));
    values.push((k === i || k === i + 1) ? 1 : 0);
  }
  return `
  <g>
    <text x="${R_X}" y="${NUM_Y}" class="rightLabel" text-anchor="middle">${s.len} days</text>
    <text x="${R_X}" y="${SUB_Y}" class="rightSub"   text-anchor="middle">${s.start} → ${s.end}</text>
    <animate attributeName="opacity" values="${values.join(";")}" keyTimes="${keyTimes.join(";")}" dur="${RIGHT_DUR}s" repeatCount="indefinite"/>
  </g>`;
}).join("");

// ---------------- Deterministic RNG ----------------
let seed = 0x9e3779b9 ^ (USER.length << 16) ^ (createdAt.getUTCFullYear() << 1);
const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0, seed / 0x100000000);
const r = (a, b) => a + (b - a) * rnd();

// ---------------- Flame path generator ----------------
function flamePath(w, h, teeth) {
  // Build a jagged tongue: left edge up with random insets, tip, right edge down
  const segments = Math.max(4, teeth | 0);
  const step = h / segments;
  let dL = `M${-w/2},0 `;
  let y = 0;
  for (let i = 0; i < segments; i++) {
    const nx = -r(w * 0.35, w * 0.65);
    const ny = y - step;
    const cx = -r(w * 0.15, w * 0.45);
    dL += `C ${cx},${y - step * 0.35} ${nx},${y - step * 0.7} ${nx},${ny} `;
    y = ny;
  }
  const tipX = 0, tipY = -h - r(2, 6);
  // right edge back
  let dR = `L ${tipX},${tipY} `;
  y = -h;
  for (let i = segments - 1; i >= 0; i--) {
    const nx = r(w * 0.35, w * 0.65);
    const ny = y + step;
    const cx = r(w * 0.15, w * 0.45);
    dR += `C ${cx},${y + step * 0.35} ${nx},${y + step * 0.7} ${nx},${ny} `;
    y = ny;
  }
  dR += `L ${w/2},0 Z`;
  return `${dL}${dR}`;
}

// create N alternative shapes for d-attribute animation
function flameDVariants(w, h, teeth, n = 3) {
  return Array.from({ length: n }, () => flamePath(w, h, teeth)).join(";");
}

// ---------------- Ring flames (no circles) ----------------
const RING_R = 44;
const RING_COUNT = 60;

function buildRing() {
  let crown = "";
  for (let i = 0; i < RING_COUNT; i++) {
    const angle = (i / RING_COUNT) * 360;
    const rr = RING_R + 6;
    const rad = (angle - 90) * Math.PI / 180;
    const x = (rr * Math.cos(rad)).toFixed(2);
    const y = (rr * Math.sin(rad)).toFixed(2);
    const w = r(6, 12);
    const h = r(15, 25);
    const teeth = r(3, 6) | 0;
    const dVals = flameDVariants(w, h, teeth, 4);
    const dur = r(0.9, 1.8).toFixed(2);
    const sc0 = r(0.75, 0.95).toFixed(2);
    const sc1 = (parseFloat(sc0) + r(0.22, 0.36)).toFixed(2);
    const delay = (i * 0.05).toFixed(2);
    const lean = (i % 2 ? -r(2, 4) : r(2, 4)).toFixed(1);

    crown += `
    <g transform="translate(${x},${y}) rotate(${angle + +lean})" filter="url(#fWobble)">
      <!-- glow copy -->
      <path d="${dVals.split(";")[0]}" fill="url(#gFlame)" opacity="0.55" filter="url(#fGlow)">
        <animate attributeName="d" values="${dVals}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.45;0.85;0.55" dur="${(dur*1.2).toFixed(2)}s" begin="${delay}s" repeatCount="indefinite"/>
      </path>
      <!-- main flame -->
      <path d="${dVals.split(";")[0]}" fill="url(#gFlame)">
        <animate attributeName="d" values="${dVals}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" additive="sum" type="scale" values="${sc0};${sc1};${sc0}" keyTimes="0;0.5;1" dur="${(dur*0.9).toFixed(2)}s" begin="${delay}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;1;0.85" dur="${(dur*0.8).toFixed(2)}s" begin="${delay}s" repeatCount="indefinite"/>
      </path>
    </g>`;
  }
  return crown;
}

function buildEmbers() {
  let embers = "";
  for (let i = 0; i < 20; i++) {
    const angle = r(0, 360);
    const rad = angle * Math.PI / 180;
    const dist = r(RING_R - 5, RING_R + 5);
    const x = (dist * Math.cos(rad)).toFixed(2);
    const y = (dist * Math.sin(rad)).toFixed(2);
    const rs = r(1, 3).toFixed(2);
    const dur = r(1.5, 3.5).toFixed(2);
    const delay = r(0, 2).toFixed(2);
    embers += `
    <circle cx="${x}" cy="${y}" r="${rs}" fill="#ff4500" opacity="0" filter="url(#fGlow)">
      <animate attributeName="opacity" values="0;0.6;0" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
      <animate attributeName="r" values="${rs};${(rs * 1.3).toFixed(2)};${rs}" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
    </circle>`;
  }
  return embers;
}

// ---------------- Edge flames + sparks ----------------
const EDGE_W = 76;
const EDGE_FLAMES = 30;
function buildEdge(side) {
  const x0 = side === "left" ? 0 : W - EDGE_W;
  const mirror = side === "left" ? 1 : -1;
  const baseDelay = side === "left" ? 0 : 0.35;
  let g = `
  <clipPath id="clip-${side}"><rect x="${x0}" y="0" width="${EDGE_W}" height="${H}"/></clipPath>
  <g clip-path="url(#clip-${side})">`;

  for (let i = 0; i < EDGE_FLAMES; i++) {
    const lane = i % 6;
    const sx = x0 + 8 + lane * ((EDGE_W - 16) / 5) + (i % 2 ? -3 : 3);
    const y0 = H + 30 + (i % 12) * 6;
    const y1 = -80;
    const w = r(6, 10);
    const h = r(15, 30);
    const teeth = r(3, 6) | 0;
    const dVals = flameDVariants(w, h, teeth, 3);
    const dur = r(2.5, 4.0).toFixed(2);
    const delay = (baseDelay + (i % 11) * 0.15).toFixed(2);
    const sc0 = r(0.7, 0.95).toFixed(2);
    const sc1 = (parseFloat(sc0) + r(0.15, 0.28)).toFixed(2);
    const jitter = (mirror * r(-1.5, 1.5)).toFixed(2);

    g += `
    <g transform="translate(${sx},${y0}) scale(${mirror},1)" filter="url(#fWobble)">
      <path d="${dVals.split(";")[0]}" fill="url(#gFlame)" opacity="0.9">
        <animate attributeName="d" values="${dVals}" dur="${(dur*0.9).toFixed(2)}s" begin="${delay}s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" additive="sum" type="scale" values="${sc0};${sc1};${sc0}" keyTimes="0;0.5;1" dur="${(dur*0.6).toFixed(2)}s" begin="${delay}s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.65;1;0.75" dur="${(dur*0.7).toFixed(2)}s" begin="${delay}s" repeatCount="indefinite"/>
      </path>
      <animateTransform attributeName="transform" type="translate"
        values="${sx},${y0}; ${(+sx + +jitter).toFixed(2)},${y1}"
        dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
    </g>`;
  }

  // sparks
  for (let i = 0; i < 15; i++) {
    const sx = x0 + r(8, EDGE_W - 8);
    const y0 = H + r(10, 40);
    const dur = r(1.5, 2.5).toFixed(2);
    const delay = r(0, 1.0).toFixed(2);
    const pathLen = r(50, 90).toFixed(1);
    g += `
    <path d="M${sx},${y0} q ${r(-5,5).toFixed(1)},-${(pathLen/2).toFixed(1)} ${r(-6,6).toFixed(1)},-${pathLen}"
          stroke="#ffd15a" stroke-width="1.0" stroke-linecap="round" opacity="0.0" filter="url(#fGlow)">
      <animate attributeName="opacity" values="0;0.8;0" keyTimes="0;0.4;1" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/>
    </path>`;
  }

  g += `</g>`;
  return g;
}

// ---------------- SVG ----------------
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"
     xmlns="http://www.w3.org/2000/svg">
  <style>
    :root{ color-scheme: dark; }
    .title{ font:700 18px system-ui; fill:url(#hdrGrad); filter:url(#hdrGlow) }
    .leftLabel,.rightLabel{ font:800 22px system-ui; fill:#60a5fa }
    .leftSub,.rightSub{ font:12px system-ui; fill:#9ca3af }
    .centerNum{ font:900 28px system-ui; fill:#ff5a00 }
  </style>

  <defs>
    <!-- Flame gradient -->
    <linearGradient id="gFlame" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%"  stop-color="#4a0000"/>
      <stop offset="20%" stop-color="#cc1100"/>
      <stop offset="55%" stop-color="#ff6a00"/>
      <stop offset="78%" stop-color="#ffb300"/>
      <stop offset="100%" stop-color="#fff7bf"/>
    </linearGradient>

    <!-- wobble (turbulent displacement) -->
    <filter id="fWobble" x="-120%" y="-120%" width="340%" height="340%">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="11" result="n">
        <animate attributeName="baseFrequency" values="0.7;1.1;0.8;0.7" dur="1.0s" repeatCount="indefinite"/>
        <animate attributeName="seed" values="11;14;16;11" dur="2.4s" repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="6">
        <animate attributeName="scale" values="3;10;5;8;3" dur="1.1s" repeatCount="indefinite"/>
      </feDisplacementMap>
    </filter>

    <!-- glow -->
    <filter id="fGlow" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="5" result="b1"/>
      <feGaussianBlur stdDeviation="12" in="SourceGraphic" result="b2"/>
      <feMerge><feMergeNode in="b1"/><feMergeNode in="b2"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>

    <linearGradient id="hdrGrad" x1="0" x2="1">
      <stop offset="0%"  stop-color="#d1d5db" stop-opacity=".85"/>
      <stop offset="100%" stop-color="#9ca3af" stop-opacity=".75"/>
    </linearGradient>
    <filter id="hdrGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="1.2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Edge flames (no bubbles) -->
  ${buildEdge("left")}
  ${buildEdge("right")}

  <text x="${L_X}" y="${TITLE_Y}" class="title" text-anchor="middle">Total Contributions</text>
  ${mkLeft}

  <text x="${C_X}" y="${TITLE_Y}" class="title" text-anchor="middle">Current Streak</text>

  <!-- Ring base (dark seat) -->
  <g transform="translate(${C_X},110)">
    <path d="M -${RING_R},0
             a ${RING_R},${RING_R} 0 1,0 ${RING_R*2},0
             a ${RING_R},${RING_R} 0 1,0 -${RING_R*2},0 Z"
          fill="none" stroke="#200000" stroke-width="15" opacity="1" filter="url(#fGlow) url(#fWobble)"/>
  </g>

  <!-- Flame crown (jagged tongues) -->
  <g transform="translate(${C_X},110)">
    <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="60s" repeatCount="indefinite" additive="sum"/>
    ${buildRing()}
    ${buildEmbers()}
  </g>

  <!-- Center number with heavy glow -->
  <g transform="translate(${C_X},110)">
    <text class="centerNum" text-anchor="middle" dy="10" filter="url(#fGlow)">${cs}</text>
  </g>

  <text x="${R_X}" y="${TITLE_Y}" class="title" text-anchor="middle">Longest Streaks</text>
  ${mkRight}
</svg>`;

await fs.mkdir(path.dirname(OUT), { recursive: true });
await fs.writeFile(OUT, svg, "utf8");
console.log("wrote", OUT);
