import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, "../assets/github-profile.svg");

// GitHub API configuration
const GITHUB_USERNAME = "statikfintechllc";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional: for higher rate limits

// Official GitHub language colors
const GITHUB_LANG_COLORS = {
  "TypeScript": "#3178c6",
  "Python": "#3572A5", 
  "Go": "#00ADD8",
  "JavaScript": "#f1e05a",
  "CSS": "#563d7c",
  "HTML": "#e34c26",
  "Jupyter Notebook": "#DA5B0B",
  "Shell": "#89e051",
  "Rust": "#dea584",
  "Java": "#b07219",
  "C++": "#f34b7d",
  "C": "#555555",
  "PHP": "#4F5D95",
  "Ruby": "#701516",
  "Swift": "#fa7343",
  "Kotlin": "#A97BFF",
  "Dart": "#00B4AB",
  "C#": "#239120",
  "Scala": "#c22d40",
  "Haskell": "#5e5086",
  "Lua": "#000080",
  "R": "#198CE7",
  "MATLAB": "#e16737",
  "Perl": "#0298c3",
  "Objective-C": "#438eff",
  "Vue": "#41b883",
  "Astro": "#ff5d01",
  "Svelte": "#ff3e00",
  "Nix": "#7e7eff"
};

async function fetchGitHubData() {
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'GitHub-Profile-Generator'
  };
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  try {
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
    const userData = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, { headers });
    const repos = await reposResponse.json();

    // Calculate language statistics
    const languageStats = {};
    let totalBytes = 0;

    for (const repo of repos) {
      if (repo.fork) continue; // Skip forked repos
      
      try {
        const langResponse = await fetch(repo.languages_url, { headers });
        const languages = await langResponse.json();
        
        for (const [lang, bytes] of Object.entries(languages)) {
          languageStats[lang] = (languageStats[lang] || 0) + bytes;
          totalBytes += bytes;
        }
      } catch (error) {
        console.log(`Failed to fetch languages for ${repo.name}`);
      }
    }

    // Convert to percentages and sort
    const languagePercentages = Object.entries(languageStats)
      .map(([lang, bytes]) => ({
        name: lang,
        percentage: (bytes / totalBytes) * 100,
        color: GITHUB_LANG_COLORS[lang] || '#858585' // Default color for unknown languages
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 10); // Top 10 languages

    return {
      user: userData,
      languages: languagePercentages,
      stats: {
        totalRepos: repos.length,
        totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
        totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0)
      }
    };
  } catch (error) {
    console.error('Failed to fetch GitHub data:', error);
    // Return fallback data
    return {
      user: { login: GITHUB_USERNAME, public_repos: 0 },
      languages: [],
      stats: { totalRepos: 0, totalStars: 0, totalForks: 0 }
    };
  }
}

async function fetchAvatarAsBase64(avatarUrl) {
  try {
    const response = await fetch(avatarUrl);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:image/png;base64,${base64}`;
  } catch (error) {
    console.log('Failed to fetch avatar, using fallback');
    return avatarUrl;
  }
}

function generateLanguageBar(languages, width = 290) {
  let currentX = 0;
  let segments = '';
  
  for (const lang of languages) {
    const segmentWidth = Math.max(1, Math.round((lang.percentage / 100) * width));
    if (currentX + segmentWidth > width) break;
    
    segments += `  <!-- ${lang.name} ${lang.percentage.toFixed(2)}% -->\n`;
    segments += `  <rect x="${currentX}" y="0" width="${segmentWidth}" height="8" fill="${lang.color}"${currentX === 0 ? ' rx="4"' : ''}${currentX + segmentWidth >= width ? ' rx="4"' : ''}/>\n`;
    currentX += segmentWidth;
  }
  
  return segments;
}

function generateLanguageDots(languages) {
  let dots = '';
  const itemsPerColumn = 5;
  
  languages.slice(0, 10).forEach((lang, index) => {
    const column = Math.floor(index / itemsPerColumn);
    const row = index % itemsPerColumn;
    const x = column * 180;
    const y = row * 20;
    
    dots += `    <g transform="translate(${x}, ${y})">\n`;
    dots += `      <circle cx="5" cy="5" r="4" fill="${lang.color}"/>\n`;
    dots += `      <text x="15" y="9" class="lang-name">${lang.name} ${lang.percentage.toFixed(2)}%</text>\n`;
    dots += `    </g>\n    \n`;
  });
  
  return dots;
}

async function generateGitHubProfileSVG() {
  console.log('Fetching GitHub data...');
  const data = await fetchGitHubData();
  console.log(`Found ${data.languages.length} languages`);
  
  const avatarUrl = await fetchAvatarAsBase64(data.user.avatar_url || `https://avatars.githubusercontent.com/u/200911899?v=4`);
  
  const languageBar = generateLanguageBar(data.languages);
  const languageDots = generateLanguageDots(data.languages);
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
      <text x="200" y="5" class="stat-value">${data.stats.totalStars}</text>
    </g>
    
    <g transform="translate(0, 35)">
      <svg x="0" y="-8" width="20" height="16" viewBox="0 0 24 24">
        <g stroke="#e11d48" stroke-width="1.5" fill="none">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6"/>
        </g>
      </svg>
      <text x="30" y="5" class="stat-label">Public Repositories:</text>
      <text x="200" y="5" class="stat-value">${data.user.public_repos || 0}</text>
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
      <text x="30" y="5" class="stat-label">Total Forks:</text>
      <text x="200" y="5" class="stat-value">${data.stats.totalForks}</text>
    </g>
    
    <g transform="translate(0, 85)">
      <svg x="0" y="-8" width="20" height="16" viewBox="0 0 24 24">
        <g stroke="#e11d48" stroke-width="1.5" fill="none">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4"/>
          <path d="M12 16h.01"/>
        </g>
      </svg>
      <text x="30" y="5" class="stat-label">Followers:</text>
      <text x="200" y="5" class="stat-value">${data.user.followers || 0}</text>
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
      <text x="30" y="5" class="stat-label">Following:</text>
      <text x="200" y="5" class="stat-value">${data.user.following || 0}</text>
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
    <image href="${avatarUrl}" x="2" y="12" width="76" height="76" clip-path="url(#avatar-clip)" preserveAspectRatio="xMidYMid slice"/>
  </g>

  <!-- Right Section: Languages -->
  <text x="505" y="25" class="title">Most Used Languages</text>
  
  <!-- Language progress bar -->
  <g transform="translate(505, 45)">
    <rect x="0" y="0" width="290" height="8" fill="#21262d" rx="4"/>
${languageBar}  </g>

  <!-- Language dots and labels -->
  <g transform="translate(505, 70)">
${languageDots}  </g>
</svg>`;
}

(async () => {
  const svg = await generateGitHubProfileSVG();
  console.log('Generated SVG length:', svg.length);
  await fs.writeFile(OUTPUT, svg);
  console.log("✅ GitHub profile SVG generated with embedded base64 avatar!");
  console.log('Output file:', OUTPUT);
})();
