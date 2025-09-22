# 🔥 Contribution Streak Tracker

This directory contains the automated contribution streak tracking system that generates an animated SVG badge showing daily contribution consistency.

## 🎯 What This Does

The streak tracker monitors daily GitHub contributions and visualizes:
- **Current streak length** with flame animations
- **Longest streak achievement** for motivation
- **Streak status** with visual flame intensity
- **Professional badge design** with consistent branding

## 📊 Generated Output

### **Streak Badge**
<div align="center">
  <img src="https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/docs/s.svg/assets/streak.svg" alt="Contribution Streak" />
</div>

## 🔧 Technical Details

### **Automation**
- **Workflow**: `.github/workflows/update-profile-streak.yml`
- **Schedule**: Every 23 hours
- **Script**: `scripts/build-streak.mjs`
- **Output**: `assets/streak.svg`

### **Dependencies**
```json
{
  "dependencies": {
    "github-graphql-api": "^latest",
    "svg-generation": "^latest"
  }
}
```

### **Environment Variables**
- `PAT_GITHUB`: GitHub Personal Access Token
- `GH_USER`: GitHub username (default: statikfintechllc)

## 🎨 Features

### **Visual Elements**
- **Flame animations** that intensify with longer streaks
- **Color gradients** from orange to intense red
- **Smooth transitions** and SMIL animations
- **Professional typography** and layout

### **Data Integration**
- **GitHub GraphQL API** for contribution data
- **Real-time calculation** of current and longest streaks
- **Timezone handling** for accurate daily tracking
- **Error handling** for API rate limits

## 🚀 Usage in Profile

This streak badge is automatically embedded in:
- **Main profile README** as part of the stats section
- **Professional portfolio** presentations
- **GitHub profile** showcase

## 📈 Streak Calculation Logic

```javascript
// Simplified streak calculation
function calculateStreak(contributions) {
  let currentStreak = 0;
  let longestStreak = 0;
  
  for (const day of contributions.reverse()) {
    if (day.contributionCount > 0) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }
  
  return { currentStreak, longestStreak };
}
```

## 🔗 Related Components

- **[Trophies](../t.svg/)**: Achievement system complementing streaks
- **[Activity Graph](../c.svg/)**: Detailed contribution visualization
- **[Profile Views](../v.svg/)**: Traffic and engagement metrics
- **[GitHub Profile](../g.svg/)**: Complete profile aggregation

---

> **Note**: This component is part of the automated GitHub profile system. The SVG updates automatically via GitHub Actions to ensure real-time accuracy.