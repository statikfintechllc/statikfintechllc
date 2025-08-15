#!/usr/bin/env node

import { mkdir, writeFile } from "fs/promises";

const base = "docs/M.M.svg";
const files = [
  `${base}/assets/mobile-mirror-card.svg`,
  `${base}/scripts/generate-mobile-mirror.mjs`,
  `${base}/package.json`,
  `.github/workflows/update-mobile-mirror-card.yml`
];

const dirs = [
  `${base}/assets`,
  `${base}/scripts`,
  `.github/workflows`
];

(async () => {
  for (const dir of dirs) await mkdir(dir, { recursive: true });
  for (const file of files) await writeFile(file, "");
  console.log("✅ M.M.svg structure ready");
})();
