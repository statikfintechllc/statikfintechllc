# ⚙️ GitHub Actions Workflows

Welcome to the automation heart of StatikFinTech LLC! This directory contains all the GitHub Actions workflows that power our sophisticated SVG generation and repository automation system.

## 🔄 Automated Workflow Categories

### **📊 Git Stats Automation**
| Workflow | Schedule | Purpose | Output |
|----------|----------|---------|---------|
| `update-profile-streak.yml` | Every 23 hours | Contribution streak tracking | `docs/s.svg/assets/streak.svg` |
| `update-profile-trophies.yml` | Every 12 hours | Achievement badges | `docs/t.svg/assets/trophies.svg` |
| `update-profile-views.yml` | Every 6 hours | Profile analytics | `docs/v.svg/assets/pv-traffic.svg` |
| `update-crimson-flow.yml` | Every 12 hours | Activity visualization | `docs/c.svg/assets/crimson-flow.svg` |
| `update-github-profile.yml` | Every 8 hours | Complete profile card | `docs/g.svg/assets/github-profile.svg` |

### **📁 Repository Stats Automation**
| Workflow | Schedule | Purpose | Output |
|----------|----------|---------|---------|
| `update-repo-slide.yml` | Every 12 hours | Repository showcase carousel | `docs/r.svg/assets/repo-slide.svg` |

### **🛠️ Project Showcase Automation**
| Workflow | Purpose | Output |
|----------|---------|---------|
| `update-gremlingpt-card.yml` | GremlinGPT project card | `docs/G.G.svg/assets/gremlingpt-card.svg` |
| `update-dragon-boot-card.yml` | Dragon Boot project card | `docs/D.B.svg/assets/dragon-boot-card.svg` |
| `update-godcore-card.yml` | GodCore project card | `docs/G.C.svg/assets/godcore-card.svg` |
| `update-statik-server-card.yml` | Statik Server project card | `docs/S.S.svg/assets/statik-server-card.svg` |
| `update-ib-g-scanner-card.yml` | IB-G Scanner project card | `docs/IB.G.svg/assets/ib-g-scanner-card.svg` |
| `update-pilot-server-card.yml` | Pilot Server project card | `docs/P.S.svg/assets/pilot-server-card.svg` |
| `update-gremlin-mcp-scrap-card.yml` | MCP Scrap project card | `docs/G.M.svg/assets/gremlin-mcp-scrap-card.svg` |
| `update-gremlin-shadtail-trader-card.yml` | ShadTail Trader card | `docs/G.S.svg/assets/gremlin-shadtail-trader-card.svg` |
| `update-mobile-mirror-card.yml` | Mobile Mirror project card | `docs/M.M.svg/assets/mobile-mirror-card.svg` |
| `update-ascend-institute-card.yml` | Ascend Institute card | `docs/A.I.svg/assets/ascend-institute-card.svg` |
| `update-ascendnet-card.yml` | AscendNet project card | `docs/A.N.svg/assets/ascendnet-card.svg` |
| `update-ascenddocs-of-govseverance-card.yml` | AscendDocs card | `docs/A.D.svg/assets/ascenddocs-of-govseverance-card.svg` |

### **📚 Publication Automation**
| Workflow | Schedule | Purpose | Output |
|----------|----------|---------|---------|
| `update-build-dates.yml` | Every 24 hours | Publication card generation | `docs/Medium.papers.svg/`, `docs/Zenodo.papers.svg/` |

## 🔧 Technical Implementation

### **Core Technologies**
- **GitHub Actions** with scheduled cron triggers
- **Node.js + ES Modules** for script execution
- **GitHub GraphQL API** for data retrieval
- **PAT_GITHUB token** for authenticated API access
- **SMIL animations** for SVG effects

### **Common Workflow Pattern**
```yaml
on:
  schedule:
    - cron: "0 */X * * *"  # Every X hours
  workflow_dispatch:       # Manual trigger

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
      - name: Install dependencies
        working-directory: docs/[component].svg
        run: npm ci
      - name: Generate SVG
        env:
          PAT_GITHUB: ${{ secrets.PAT_GITHUB }}
        working-directory: docs/[component].svg
        run: node scripts/[generator].mjs
      - name: Commit and push
        run: |
          git add .
          git commit -m "Update [component]"
          git push
```

## 🎯 Automation Benefits

### **Real-time Updates**
- **Live statistics** from GitHub API
- **Automatic content refresh** without manual intervention
- **Professional presentation** with consistent branding

### **Scalable System**
- **Modular workflow design** for easy maintenance
- **Independent scheduling** for optimal performance
- **Error handling** and retry mechanisms

### **Professional Portfolio**
- **Dynamic project showcases** with live metrics
- **Automated publication cards** for academic and blog content
- **Consistent visual branding** across all generated assets

## 🔗 Integration Points

- **Main Profile README**: All SVGs are embedded automatically
- **Badge System**: Complements workflow-generated content
- **Website Integration**: Cards displayed on portfolio sites
- **API Rate Limiting**: Workflows scheduled to respect GitHub limits

---

> **Important**: All workflows use the `PAT_GITHUB` secret for API authentication. Ensure this token has appropriate permissions for repository access and GraphQL queries.