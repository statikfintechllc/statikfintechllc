# 📈 Crimson Flow - GitHub Activity Visualization

This directory contains the sophisticated activity graph generator that creates a smooth, animated visualization of GitHub contribution patterns over the last 30 days.

## 🎯 What This Does

Crimson Flow generates a beautiful activity chart featuring:
- **30-day contribution timeline** with smooth curves
- **Animated line graphs** with gradient fills
- **Grid system** with proper scaling and labels
- **Professional crimson theme** matching brand colors

## 📊 Generated Output

### **Activity Graph**
<div align="center">
  <img src="https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/docs/c.svg/assets/crimson-flow.svg" alt="GitHub Activity Graph" />
</div>

## 🔧 Technical Details

### **Automation**
- **Workflow**: `.github/workflows/update-crimson-flow.yml`
- **Schedule**: Every 12 hours
- **Script**: `scripts/generate-crimson-flow.mjs`
- **Output**: `assets/crimson-flow.svg`

### **Dependencies**
```json
{
  "dependencies": {
    "github-graphql-api": "^latest",
    "svg-path-generation": "^latest",
    "bezier-curves": "^latest"
  }
}
```

### **Environment Variables**
- `GH_TOKEN`: GitHub token for API access
- `GITHUB_TOKEN`: Alternative token variable
- `USER_LOGIN`: GitHub username (default: statikfintechllc)

## 🎨 Visual Features

### **Graph Elements**
- **Smooth bezier curves** for elegant line representation
- **Gradient fills** with crimson-to-red color scheme
- **Grid lines** with proper Y-axis scaling
- **Data point markers** for precise value indication
- **Animated transitions** using SMIL

### **Color Palette**
```css
--crimson-primary: #9b0e2a
--crimson-line: #c3193d
--crimson-soft: #7a0f26
--grid-color: #121821
--label-color: #ea384c
```

## 📈 Data Processing

### **GraphQL Query**
```graphql
query($login: String!, $from30: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributions30: contributionsCollection(from: $from30, to: $to) {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}
```

### **Bezier Path Generation**
```javascript
function bezierPath(points) {
  // Generates smooth curves between contribution data points
  // Uses control points for natural flow
  // Handles edge cases and data gaps
}
```

## 🚀 Integration Features

### **Responsive Design**
- **1200x420 viewBox** for optimal display
- **Scalable vector graphics** for all screen sizes
- **Professional layout** with proper margins
- **Accessibility labels** for screen readers

### **Performance Optimization**
- **Efficient path generation** for smooth rendering
- **Minimal DOM elements** for fast loading
- **Optimized animations** using SMIL
- **Compressed SVG output** for web performance

## 🔗 Usage Integration

This activity graph is featured in:
- **Main GitHub profile** as the primary activity visualization
- **Portfolio websites** for professional presentation
- **Documentation** as a live metrics showcase
- **Social media** for engagement tracking

## 📊 Data Analysis

### **Contribution Patterns**
- **Peak activity detection** for productivity insights
- **Trend analysis** over 30-day periods
- **Consistency metrics** for streak correlation
- **Weekly pattern recognition** for schedule optimization

## 🔗 Related Components

- **[Streak Tracker](../s.svg/)**: Daily contribution consistency
- **[Trophies](../t.svg/)**: Achievement milestones
- **[Repository Slide](../r.svg/)**: Project showcase carousel
- **[Profile Views](../v.svg/)**: Engagement analytics

---

> **Technical Note**: This component uses advanced SVG path generation with bezier curves to create smooth, professional-grade activity visualizations that update automatically via GitHub Actions.