// build-cards.mjs
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const outputDir = "docs/Medium.papers.svg/";
mkdirSync(outputDir, { recursive: true });

const articles = [
  {
    title: "The GovSeverance Doctrine",
    url: "https://medium.com/@ascend.gremlin/the-govseverance-doctrine-70fa170a9e8f",
    description: "A framework for systematic separation from government control."
  },
  {
    title: "Burj Khalifa and the Resonant Lie",
    url: "https://medium.com/@ascend.gremlin/burj-khalifa-and-the-resonant-lie-429298865708",
    description: "Explores symbolism and control behind iconic architecture."
  },
  {
    title: "The Wealth Power Imbalance and Economic Servitude",
    url: "https://medium.com/@ascend.gremlin/the-wealth-power-imbalance-and-contemporary-forms-of-economic-servitude-bf2c2700d91632",
    description: "Analysis of modern economic control systems and solutions."
  },
  {
    title: "While Dubai Built Control, I Built an Autonomous Mind",
    url: "https://medium.com/@ascend.gremlin/while-dubai-was-building-control-systems-i-built-an-autonomous-mind-fb4c8c4c0dc1",
    description: "Contrasting centralized control with decentralized AI systems."
  },
  {
    title: "Self-Forking AI and the Mechanic from Kansas",
    url: "https://medium.com/@ascend.gremlin/self-forking-ai-and-the-mechanic-from-kansas-73d98685fda9",
    description: "How recursive AI development challenges traditional paradigms."
  },
  {
    title: "The Disappearance of the OpenAI MCP Repo",
    url: "https://medium.com/@ascend.gremlin/the-disappearance-of-the-openai-mcp-repo-a5419347be0b",
    description: "Investigation into corporate control over open development."
  },
  {
    title: "The Lessons I Am Learning",
    url: "https://medium.com/@ascend.gremlin/the-lessons-i-am-learning-b33dfe1df0b8",
    description: "Personal insights from building autonomous AI systems."
  },
  {
    title: "Designing GremlinGPT",
    url: "https://medium.com/@ascend.gremlin/designing-gremlingpt-8521fbdedcf8",
    description: "Technical deep-dive into recursive AI architecture."
  },
  {
    title: "Building an Autonomous AI-Driven IDE Pipeline",
    url: "https://medium.com/@ascend.gremlin/building-an-autonomous-ai-driven-ide-pipeline-f7c9faffbd2e",
    description: "Engineering self-modifying development environments."
  },
  {
    title: "GremlinGPT's Structural Extraction",
    url: "https://medium.com/@ascend.gremlin/gremlingpts-structural-extraction-c945b74971d3",
    description: "How AI systems can understand and modify their own code."
  },
  {
    title: "Open Isn't Open",
    url: "https://medium.com/@ascend.gremlin/open-isnt-open-2f4aaf98c19e",
    description: "Examining the illusion of open source in corporate AI."
  },
  {
    title: "The Pivot That Broke Product-Market Fit",
    url: "https://medium.com/@ascend.gremlin/the-pivot-that-broke-product-market-fit-e82dd8e9d868",
    description: "Why traditional startup metrics fail for revolutionary tech."
  },
  {
    title: "It's Not the AI, But the System",
    url: "https://medium.com/@ascend.gremlin/its-not-the-ai-but-the-system-3db4b0e142c5",
    description: "Understanding systemic challenges in AI development."
  },
  {
    title: "Breaking the Loop",
    url: "https://medium.com/@ascend.gremlin/breaking-the-loop-b8013cdedb0e",
    description: "Escaping cycles of technological dependence."
  },
  {
    title: "Capital Capture",
    url: "https://medium.com/@ascend.gremlin/capital-capture-a2a885ce3885",
    description: "How financial systems control technological innovation."
  }
];

function createSVGCard(article, index) {
  const fileName = article.title.toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-") + ".svg";

  const mediumLogoWidth = 130;
  const padding = 5;
  const remainingWidth = 700 - mediumLogoWidth - (padding * 3);
  const textStartX = mediumLogoWidth + (padding * 2);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="140" viewBox="0 0 700 140">
  <defs>
    <!-- Gradients for sparks and embers -->
    <radialGradient id="sparkGrad${index}" r="1">
      <stop offset="0%" stop-color="#ffd15a" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#ff3168" stop-opacity="0"/>
    </radialGradient>
    
    <radialGradient id="emberGrad${index}" r="1">
      <stop offset="0%" stop-color="#ff5a00" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#ff3168" stop-opacity="0"/>
    </radialGradient>
    
    <!-- Glow filters for sparks only -->
    <filter id="glow${index}" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Glowing animated border -->
    <linearGradient id="borderGrad${index}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff5a00">
        <animate attributeName="stop-color" values="#ff5a00;#ffd15a;#ff3168;#ff5a00" dur="6s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" stop-color="#ffd15a">
        <animate attributeName="stop-color" values="#ffd15a;#ff3168;#ff5a00;#ffd15a" dur="6s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>

    <!-- Subtle background wave pattern -->
    <pattern id="wavePattern${index}" patternUnits="userSpaceOnUse" width="40" height="40">
      <path d="M 0 20 Q 10 0, 20 20 T 40 20 V 40 H 0 Z" fill="#111"/>
    </pattern>
  </defs>
  
  <!-- Background with glowing border -->
  <rect x="0" y="0" width="700" height="140" rx="8" fill="url(#wavePattern${index})"
        stroke="url(#borderGrad${index})" stroke-width="2"/>
  
  <!-- Animated sparks and embers -->
  <g opacity="0.6">
    <circle fill="url(#sparkGrad${index})" cx="200" cy="30" r="2" filter="url(#glow${index})">
      <animate attributeName="cx" values="150;250;350;450;550;650" dur="8s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="30;35;25;40;20;35" dur="8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.8;0.6;0.9;0.4;0" dur="8s" repeatCount="indefinite"/>
    </circle>
    
    <circle fill="url(#emberGrad${index})" cx="300" cy="70" r="1.5" filter="url(#glow${index})">
      <animate attributeName="cx" values="200;300;400;500;600;700" dur="10s" begin="2s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="70;65;75;60;80;70" dur="10s" begin="2s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.7;0.5;0.8;0.3;0" dur="10s" begin="2s" repeatCount="indefinite"/>
    </circle>
    
    <circle fill="url(#sparkGrad${index})" cx="400" cy="110" r="2.5" filter="url(#glow${index})">
      <animate attributeName="cx" values="300;400;500;600;700;800" dur="12s" begin="4s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="110;105;115;100;120;110" dur="12s" begin="4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.9;0.5;0.7;0.2;0" dur="12s" begin="4s" repeatCount="indefinite"/>
    </circle>
    
    <circle fill="url(#emberGrad${index})" cx="500" cy="50" r="1" filter="url(#glow${index})">
      <animate attributeName="cx" values="400;500;600;700;800" dur="9s" begin="1s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="50;45;55;40;50" dur="9s" begin="1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.6;0.8;0.4;0" dur="9s" begin="1s" repeatCount="indefinite"/>
    </circle>
    
    <circle fill="url(#sparkGrad${index})" cx="600" cy="90" r="2" filter="url(#glow${index})">
      <animate attributeName="cx" values="500;600;700;800" dur="11s" begin="3s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="90;85;95;90" dur="11s" begin="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.8;0.6;0" dur="11s" begin="3s" repeatCount="indefinite"/>
    </circle>
    
    <circle fill="url(#sparkGrad${index})" cx="250" cy="100" r="1" filter="url(#glow${index})">
      <animate attributeName="cx" values="200;300;400;500;600" dur="7s" begin="0.5s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="100;95;105;90;110" dur="7s" begin="0.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.5;0.8;0.3;0" dur="7s" begin="0.5s" repeatCount="indefinite"/>
    </circle>
    
    <circle fill="url(#emberGrad${index})" cx="350" cy="25" r="1.2" filter="url(#glow${index})">
      <animate attributeName="cx" values="300;400;500;600;700" dur="9.5s" begin="1.5s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="25;20;30;15;25" dur="9.5s" begin="1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.7;0.4;0.9;0" dur="9.5s" begin="1.5s" repeatCount="indefinite"/>
    </circle>
  </g>
  
  <!-- Medium Logo (just the circle + M, no box) -->
  <g transform="translate(${padding},${padding})">
    <circle cx="65" cy="65" r="35" fill="#ffffff"/>
    <text x="65" y="78" text-anchor="middle" font-family="Georgia, serif" font-size="32" font-weight="700" fill="#000000">M</text>
  </g>
  
  <!-- Text Content (no glow filter applied to text) -->
  <g transform="translate(${textStartX},${padding})">
    <text x="${remainingWidth/2}" y="25" text-anchor="middle" 
          font-family="Inter, Arial, sans-serif" font-size="16" font-weight="700" 
          fill="#ffffff">${article.title}</text>
    
    <text x="${remainingWidth/2}" y="50" text-anchor="middle" 
          font-family="Inter, Arial, sans-serif" font-size="12" font-weight="500"
          fill="#ffd15a">Presented by: 🔱 StatikFinTech, LLC 🔱</text>
    
    <text x="${remainingWidth/2}" y="75" text-anchor="middle" 
          font-family="Inter, Arial, sans-serif" font-size="12" 
          fill="#e6e6e6" opacity="0.9">${article.description}</text>
    
    <text x="${remainingWidth/2}" y="100" text-anchor="middle" 
          font-family="Inter, Arial, sans-serif" font-size="10" 
          fill="#8abecf" opacity="0.7">${article.url}</text>
  </g>
</svg>`;

  return { svg, fileName };
}

// Write all SVGs
articles.forEach((article, i) => {
  const { svg, fileName } = createSVGCard(article, i);
  writeFileSync(join(outputDir, fileName), svg, "utf8");
  console.log(`✅ Wrote ${fileName} with sparks and embers`);
});

console.log(`\n🔥 Generated ${articles.length} Medium article cards with animated sparks!`);
console.log(`📁 Output directory: ${outputDir}`);
