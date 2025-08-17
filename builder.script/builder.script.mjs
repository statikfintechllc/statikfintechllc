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
  <rect x="0" y="0" width="700" height="140" rx="8" fill="#000000"/>
  <g transform="translate(${padding},${padding})">
    <rect x="0" y="0" width="${mediumLogoWidth}" height="130" rx="6" fill="#0a0a0a" stroke="#333" stroke-width="1"/>
    <circle cx="65" cy="65" r="35" fill="#ffffff"/>
    <text x="65" y="78" text-anchor="middle" font-family="Georgia, serif" font-size="32" font-weight="700" fill="#000000">M</text>
  </g>
  <g transform="translate(${textStartX},${padding})">
    <text x="${remainingWidth/2}" y="25" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="700" fill="#ffffff">${article.title}</text>
    <text x="${remainingWidth/2}" y="50" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="12" fill="#ffd15a">Presented by: 🔱 StatikFinTech, LLC 🔱</text>
    <text x="${remainingWidth/2}" y="75" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="12" fill="#e6e6e6" opacity="0.9">${article.description}</text>
    <text x="${remainingWidth/2}" y="100" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="10" fill="#8abecf" opacity="0.7">${article.url}</text>
  </g>
</svg>`;

  return { svg, fileName };
}

// Write all SVGs
articles.forEach((article, i) => {
  const { svg, fileName } = createSVGCard(article, i);
  writeFileSync(join(outputDir, fileName), svg, "utf8");
  console.log(`✅ Wrote ${fileName}`);
});
