import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, "../assets/github-profile.svg");

function generateGitHubProfileSVG() {
  const avatarUrl = 'https://avatars.githubusercontent.com/u/179090350?v=4';
  
  return `<svg viewBox="0 0 823 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .background { fill: #0d1117; }
      .title { fill: #e11d48; font-family: 'Segoe UI', sans-serif; font-size: 18px; font-weight: 600; }
      .stat-label { fill: #7d8590; font-family: 'Segoe UI', sans-serif; font-size: 14px; }
      .stat-value { fill: #e6edf3; font-family: 'Segoe UI', sans-serif; font-size: 14px; font-weight: 600; }
      .lang-name { fill: #e6edf3; font-family: 'Segoe UI', sans-serif; font-size: 12px; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="823" height="200" class="background" rx="10"/>

  <!-- Left Section: GitHub Stats -->
  <text x="25" y="25" class="title">Statik DK Smoke's GitHub Stats</text>
  
  <!-- Stats with icons -->
  <g transform="translate(25, 50)">
    <g transform="translate(0, 10)">
      <svg x="0" y="-8" width="20" height="16" viewBox="0 0 24 24">
        <g stroke="#e11d48" stroke-width="1.5" fill="none">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
        </g>
      </svg>
      <text x="30" y="5" class="stat-label">Total Stars Earned:</text>
      <text x="200" y="5" class="stat-value">35</text>
    </g>
    
    <g transform="translate(0, 35)">
      <svg x="0" y="-8" width="20" height="16" viewBox="0 0 24 24">
        <g stroke="#e11d48" stroke-width="1.5" fill="none">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6"/>
        </g>
      </svg>
      <text x="30" y="5" class="stat-label">Total Commits:</text>
      <text x="200" y="5" class="stat-value">3.6k</text>
    </g>
    
    <g transform="translate(0, 60)">
      <svg x="0" y="-8" width="20" height="16" viewBox="0 0 24 24">
        <g stroke="#e11d48" stroke-width="1.5" fill="none">
          <circle cx="18" cy="18" r="3"/>
          <circle cx="6" cy="6" r="3"/>
          <path d="M13 6h3a2 2 0 0 1 2 2v7"/>
          <path d="M6 9v9"/>
        </g>
      </svg>
      <text x="30" y="5" class="stat-label">Total PRs:</text>
      <text x="200" y="5" class="stat-value">5</text>
    </g>
    
    <g transform="translate(0, 85)">
      <svg x="0" y="-8" width="20" height="16" viewBox="0 0 24 24">
        <g stroke="#e11d48" stroke-width="1.5" fill="none">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4"/>
          <path d="M12 16h.01"/>
        </g>
      </svg>
      <text x="30" y="5" class="stat-label">Total Issues:</text>
      <text x="200" y="5" class="stat-value">18</text>
    </g>
    
    <g transform="translate(0, 110)">
      <svg x="0" y="-8" width="20" height="16" viewBox="0 0 24 24">
        <g stroke="#e11d48" stroke-width="1.5" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <path d="M16 2v4"/>
          <path d="M8 2v4"/>
          <path d="M3 10h18"/>
        </g>
      </svg>
      <text x="30" y="5" class="stat-label">Contributed to (last year):</text>
      <text x="200" y="5" class="stat-value">6</text>
    </g>
  </g>

  <!-- Center: Avatar with GitHub logo -->
  <g transform="translate(350, 50)">
    <!-- Outer ring -->
    <circle cx="40" cy="50" r="42" fill="none" stroke="#e11d48" stroke-width="3"/>
    <!-- Avatar -->
    <defs>
      <clipPath id="avatar-clip">
        <circle cx="40" cy="50" r="38"/>
      </clipPath>
    </defs>
    <image href="${avatarUrl}" x="2" y="12" width="76" height="76" clip-path="url(#avatar-clip)"/>
  </g>

  <!-- Right Section: Languages -->
  <text x="505" y="25" class="title">Most Used Languages</text>
  
  <!-- Language progress bar -->
  <g transform="translate(505, 45)">
    <rect x="0" y="0" width="290" height="8" fill="#21262d" rx="4"/>
    <!-- Python 36.61% -->
    <rect x="0" y="0" width="106" height="8" fill="#3572A5" rx="4"/>
    <!-- Go 31.64% -->
    <rect x="106" y="0" width="92" height="8" fill="#00ADD8"/>
    <!-- Jupyter 11.64% -->
    <rect x="198" y="0" width="34" height="8" fill="#DA5B0B"/>
    <!-- TypeScript 8.41% -->
    <rect x="232" y="0" width="24" height="8" fill="#3178C6"/>
    <!-- Shell 4.92% -->
    <rect x="256" y="0" width="14" height="8" fill="#89E051"/>
    <!-- JavaScript 2.76% -->
    <rect x="270" y="0" width="8" height="8" fill="#F1E05A"/>
    <!-- HTML 1.63% -->
    <rect x="278" y="0" width="5" height="8" fill="#E34C26"/>
    <!-- Astro 1.13% -->
    <rect x="283" y="0" width="3" height="8" fill="#FF5D01"/>
    <!-- CSS 1.08% -->
    <rect x="286" y="0" width="4" height="8" fill="#563D7C" rx="4"/>
  </g>

  <!-- Language dots and labels -->
  <g transform="translate(505, 70)">
    <!-- Column 1 -->
    <g transform="translate(0, 0)">
      <circle cx="5" cy="5" r="4" fill="#3572A5"/>
      <text x="15" y="9" class="lang-name">Python 36.61%</text>
    </g>
    
    <g transform="translate(0, 20)">
      <circle cx="5" cy="5" r="4" fill="#00ADD8"/>
      <text x="15" y="9" class="lang-name">Go 31.64%</text>
    </g>
    
    <g transform="translate(0, 40)">
      <circle cx="5" cy="5" r="4" fill="#DA5B0B"/>
      <text x="15" y="9" class="lang-name">Jupyter Notebook 11.64%</text>
    </g>
    
    <g transform="translate(0, 60)">
      <circle cx="5" cy="5" r="4" fill="#3178C6"/>
      <text x="15" y="9" class="lang-name">TypeScript 8.41%</text>
    </g>
    
    <g transform="translate(0, 80)">
      <circle cx="5" cy="5" r="4" fill="#89E051"/>
      <text x="15" y="9" class="lang-name">Shell 4.92%</text>
    </g>

    <!-- Column 2 -->
    <g transform="translate(150, 0)">
      <circle cx="5" cy="5" r="4" fill="#F1E05A"/>
      <text x="15" y="9" class="lang-name">JavaScript 2.76%</text>
    </g>
    
    <g transform="translate(150, 20)">
      <circle cx="5" cy="5" r="4" fill="#E34C26"/>
      <text x="15" y="9" class="lang-name">HTML 1.63%</text>
    </g>
    
    <g transform="translate(150, 40)">
      <circle cx="5" cy="5" r="4" fill="#FF5D01"/>
      <text x="15" y="9" class="lang-name">Astro 1.13%</text>
    </g>
    
    <g transform="translate(150, 60)">
      <circle cx="5" cy="5" r="4" fill="#563D7C"/>
      <text x="15" y="9" class="lang-name">CSS 1.08%</text>
    </g>
    
    <g transform="translate(150, 80)">
      <circle cx="5" cy="5" r="4" fill="#8e44ad"/>
      <text x="15" y="9" class="lang-name">Nix 0.18%</text>
    </g>
  </g>
</svg>`;
}

(async () => {
  const svg = generateGitHubProfileSVG();
  console.log('Generated SVG length:', svg.length);
  await fs.writeFile(OUTPUT, svg);
  console.log("✅ GitHub profile SVG generated exactly matching screenshot!");
  console.log('Output file:', OUTPUT);
})();
