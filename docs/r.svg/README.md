# 🎠 Repository Showcase Carousel

This directory contains the repository slide system that generates an animated carousel showcasing featured repositories with live statistics and language analysis.

## 🎯 What This Does

The repository slide creates an engaging carousel displaying:
- **Featured repository cards** with 2-up layout
- **Live GitHub statistics** (stars, forks, language breakdown)
- **Animated transitions** between repository sets
- **Professional project presentation** with clickable links

## 📊 Generated Output

### **Repository Carousel**
<div align="center">
  <img src="https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/docs/r.svg/assets/repo-slide.svg" alt="Repository Showcase" />
</div>

## 🔧 Technical Details

### **Automation**
- **Workflow**: `.github/workflows/update-repo-slide.yml`
- **Schedule**: Every 12 hours
- **Script**: `scripts/generate-repo-slide.mjs`
- **Output**: `assets/repo-slide.svg`

### **Featured Repositories**
```javascript
const REPOS = [
  "statikfintechllc/GremlinGPT",
  "statikfintechllc/Gremlin-ShadTail-Trader", 
  "statikfintechllc/statik-server",
  "statikfintechllc/AscendDocs-of-GovSeverance",
  "statikfintechllc/dragon-boot",
  "statikfintechllc/Gremlin-MCP-Scrap"
];
```

### **Dependencies**
```json
{
  "dependencies": {
    "github-graphql-api": "^latest",
    "svg-animation": "^latest",
    "language-colors": "^latest"
  }
}
```

### **Environment Variables**
- `PAT_GITHUB`: GitHub Personal Access Token
- `GH_USER`: GitHub username (default: statikfintechllc)
- `REPOS`: Comma-separated list of repositories to showcase

## 🎨 Carousel Features

### **Card Layout**
- **2-up display** showing two repositories per slide
- **Seamless looping** animation with smooth transitions
- **Repository cards** with comprehensive information display
- **Language bar** showing technology stack breakdown
- **Statistics badges** for stars, forks, and metrics

### **Animation System**
```javascript
// Slide timing configuration
const PAGE_SEC = 6;        // Seconds per slide
const HOLD_FRAC = 0.55;    // Fraction of time showing content
const totalDur = pages.length * PAGE_SEC;

// Bezier easing curves
const EASE_IN = "0.25 0.1 0.25 1";
const EASE_HOLD = "0.25 0.1 0.25 1";
const EASE_OUT = "0.42 0 0.58 1";
```

### **Visual Elements**
- **Repository titles** with clickable links
- **Description text** for project context
- **Star and fork counts** with GitHub-style icons
- **Language usage bars** with authentic GitHub colors
- **Professional card styling** with consistent branding

## 📊 Data Integration

### **GraphQL Repository Query**
```graphql
query($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    name
    nameWithOwner
    description
    stargazerCount
    forkCount
    url
    primaryLanguage {
      name
      color
    }
    languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
      edges {
        size
        node {
          name
          color
        }
      }
      totalSize
    }
  }
}
```

### **Language Analysis**
- **Percentage calculation** for each language
- **Color mapping** using GitHub's official language colors
- **Visual language bars** proportional to usage
- **Primary language highlighting** for quick identification

## 🚀 Animation Implementation

### **SMIL-Based Transitions**
- **Transform animations** for smooth sliding
- **Infinite looping** with proper timing
- **Spline interpolation** for natural motion
- **Global synchronization** across all elements

### **Performance Optimization**
- **Pure SVG animations** (no JavaScript dependencies)
- **Efficient rendering** for smooth playback
- **Minimal DOM complexity** for fast loading
- **Responsive design** scaling to container size

## 🔗 Repository Selection

### **Curation Strategy**
- **Featured projects** representing diverse skills
- **Active repositories** with recent commits
- **Technology showcase** across different languages
- **Professional portfolio** items for maximum impact

### **Automatic Updates**
- **Live statistics** refresh every 12 hours
- **Repository metadata** sync with GitHub
- **Language analysis** updates with code changes
- **URL links** maintained for navigation

## 🎯 Integration Features

### **Professional Presentation**
- **Portfolio showcase** for potential collaborators
- **Technology demonstration** across multiple languages
- **Project navigation** with direct GitHub links
- **Professional branding** consistent with profile theme

### **User Experience**
- **Engaging animation** keeps viewers interested
- **Information density** balanced with readability
- **Quick scanning** for project overview
- **Interactive elements** for deeper exploration

## 🔗 Related Components

- **[Individual Project Cards](../G.G.svg/)**: Detailed single-project showcases
- **[GitHub Profile](../g.svg/)**: Complete profile with repository overview
- **[Activity Graph](../c.svg/)**: Contribution patterns across projects
- **[Trophies](../t.svg/)**: Achievement metrics from repository work

---

> **Note**: The repository carousel automatically cycles through featured projects, providing an engaging way to showcase the breadth and depth of development work while maintaining visual interest through smooth animations.