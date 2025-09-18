# 🛠️ Builder Scripts - The SVG Factory

Welcome to the automation hub! This is where the magic happens - automated SVG card generation for publications and assets.

## 📋 What's Here

### `builder.script.mjs`
The main build automation script that generates publication cards for both academic papers and blog articles.

**Current Capabilities:**
- 📄 **Zenodo Research Cards** - Academic paper cards with DOI links
- ✍️ **Medium Article Cards** - Blog post cards with publication links
- 🎨 **Animated Effects** - Sparks, embers, and glowing borders
- 🔗 **Metadata Integration** - Automatic title and URL processing

## 🚀 Usage

**For Medium Papers**:
```
node builder.script/medium-builder.mjs
```
**Or**:
```
# Build only Medium articles
node builder.script/builder.script.mjs medium
```

**For Zenodo Papers**:
```
node builder.script/zenodo-builder.mjs
```
**Or**:
```
# Build only Zenodo papers  
node builder.script/builder.script.mjs zenodo
```

**Both At Once**:
```
# Build both (default)
node builder.script/builder.script.mjs all
```

## 🎨 Generated Card Features

### Zenodo Academic Cards
- **Academic Blue Theme** (`#3b82f6`, `#60a5fa`, `#1d4ed8`)
- **Zenodo Logo Integration** with circular design
- **DOI Link Formatting** for proper academic citation
- **Professional Typography** with research paper styling
- **Scholarly Animation** patterns

### Medium Publication Cards  
- **Fire Theme** (`#ff5a00`, `#ffd15a`, `#ff3168`)
- **Medium Logo Integration** with distinctive branding
- **Article Link Formatting** for blog post access
- **Creative Typography** with publication styling
- **Dynamic Spark Effects**

## 📁 Output Directories

Cards are automatically generated in:
- `../docs/Zenodo.papers.svg/` - Academic research papers
- `../docs/Medium.papers.svg/` - Blog articles and publications

## 🔧 Technical Architecture

### Card Structure
```svg
<!-- Background with animated border -->
<rect with animated gradients />

<!-- Floating particle system -->
<g with spark/ember animations />

<!-- Logo integration -->
<circle with brand colors />

<!-- Typography system -->
<text with proper hierarchy />

<!-- Glow effects -->
<filter for text and elements />
```

### Animation Timing
- **Border Cycles**: 6-second color transitions
- **Particle Movement**: 8-13 second paths
- **Opacity Fades**: Smooth in/out transitions
- **Performance**: 60fps optimized animations

## 🎯 Card Dimensions

- **Width**: 700px (standard publication card)
- **Height**: 140px (optimized for readability)
- **Aspect Ratio**: 5:1 (perfect for showcasing)
- **Format**: SVG with embedded CSS animations

## 🔗 Integration Points

### Repository Cards
Links to all repository card directories:
- [🧠 GremlinGPT](../docs/G.G.svg/)
- [🐉 Dragon Boot](../docs/D.B.svg/)
- [⚡ GodCore](../docs/G.C.svg/)
- [And many more...](../docs/README.md)

### Publication Collections
- [📄 Zenodo Papers](../docs/Zenodo.papers.svg/) - 3 research papers
- [✍️ Medium Articles](../docs/Medium.papers.svg/) - 15 blog posts

### Visual Assets
- [🎯 Badges Collection](../badges/README.md)
- [📁 Documentation Hub](../docs/README.md)

## 🚀 Future Enhancements

Planned features for the builder:
- **Automated GitHub Integration** - Pull repo data dynamically
- **Template System** - Custom card templates per project
- **Batch Processing** - Generate multiple cards simultaneously
- **Theme Variants** - Different animation styles per category
- **Metadata Parsing** - Extract data from various sources

## 💡 Development Notes

### Color Palettes
```javascript
// Zenodo Academic Theme
const zenodoColors = {
  primary: '#3b82f6',
  secondary: '#60a5fa', 
  accent: '#1d4ed8'
};

// Medium Publication Theme
const mediumColors = {
  primary: '#ff5a00',
  secondary: '#ffd15a',
  accent: '#ff3168'
};
```

### Animation Patterns
- **Consistent Timing** - All animations use mathematical progressions
- **Performance First** - Hardware-accelerated transforms only
- **Visual Hierarchy** - Animation intensity matches content importance

---

*Building the future, one SVG at a time* ⚡