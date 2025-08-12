// docs/v.svg/scripts/build-pv.mjs
// Build a black (left) + dark-red (right) pill with live Komarev count.
// Left text: "PROFILE TRAFFIC". Right: the numeric count.
// Output: assets/pv-traffic.svg

import fs from "node:fs/promises";

const USER = process.env.USER_LOGIN || "statikfintechllc";
const H = 28;

// Colors
const BLACK = "#000000";
const RED   = "#8B0000";
const WHITE = "#ffffff";

// ---- 1) Fetch live count from Komarev -------------------------------------
const url  = `https://komarev.com/ghpvc/?username=${encodeURIComponent(USER)}&style=for-the-badge&t=${Date.now()}`;
const raw  = await fetch(url).then(r => r.text());
const nums = [...raw.matchAll(/>(\d+)</g)].map(m => m[1]);
if (!nums.length) {
  console.error("Could not parse Komarev count");
  process.exit(1);
}
const count = nums.at(-1);

// ---- 2) Quick width estimator (no canvas in Actions) ----------------------
// Slightly wider per-char for the left label, wider for digits on the right.
const px = (s, perChar, pad) => Math.max(40, pad * 2 + s.length * perChar);

const LEFT_TEXT   = "PROFILE TRAFFIC";
const LEFT_PAD    = 16;
const LEFT_CHAR_W = 9.1;   // tweak if you want a bit tighter/wider
const LEFT_W      = px(LEFT_TEXT, LEFT_CHAR_W, LEFT_PAD);

const RIGHT_PAD    = 12;
const RIGHT_CHAR_W = 12.0;
const RIGHT_W      = px(String(count), RIGHT_CHAR_W, RIGHT_PAD);

const TOTAL_W = LEFT_W + RIGHT_W;

// ---- 3) Helpers to draw left- and right- rounded rectangles ---------------
const roundedLeftPath = (x, y, w, h, r) => `
  M${x+r},${y}
  L${x+w},${y}
  L${x+w},${y+h}
  L${x+r},${y+h}
  Q${x},${y+h} ${x},${y+h-r}
  L${x},${y+r}
  Q${x},${y} ${x+r},${y}
  Z
`.trim();

const roundedRightPath = (x, y, w, h, r) => `
  M${x},${y}
  L${x+w-r},${y}
  Q${x+w},${y} ${x+w},${y+r}
  L${x+w},${y+h-r}
  Q${x+w},${y+h} ${x+w-r},${y+h}
  L${x},${y+h}
  Z
`.trim();

// ---- 4) Compose the SVG ----------------------------------------------------
const R = 14; // corner radius
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${TOTAL_W}" height="${H}"
     viewBox="0 0 ${TOTAL_W} ${H}" role="img" aria-label="Profile traffic: ${count}">
  <!-- Left (black) with rounded left corners -->
  <path d="${roundedLeftPath(0, 0, LEFT_W, H, R)}" fill="${BLACK}"/>
  <!-- Right (dark red) with rounded right corners -->
  <path d="${roundedRightPath(LEFT_W, 0, RIGHT_W, H, R)}" fill="${RED}"/>

  <!-- Left label -->
  <text x="${LEFT_W/2}" y="${H/2 + 5}" text-anchor="middle"
        font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Arial"
        font-size="14" font-weight="600" fill="${WHITE}" letter-spacing="1.5">
    ${LEFT_TEXT}
  </text>

  <!-- Right number -->
  <text x="${LEFT_W + RIGHT_W/2}" y="${H/2 + 5}" text-anchor="middle"
        font-family="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Arial"
        font-size="14" font-weight="700" fill="${WHITE}">
    ${count}
  </text>
</svg>`;

// ---- 5) Write it -----------------------------------------------------------
await fs.mkdir("assets", { recursive: true });
await fs.writeFile("assets/pv-traffic.svg", svg, "utf8");
console.log("Wrote assets/pv-traffic.svg with count:", count);
