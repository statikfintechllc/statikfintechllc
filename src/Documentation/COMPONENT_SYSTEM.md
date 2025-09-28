# SFTi Component System Documentation
## Complete Infrastructure Overhaul & Scalable Template System

### 🏗️ **NEW ARCHITECTURE OVERVIEW**

The SFTi Web Templates project has been completely restructured into a scalable, component-based system that powers all three domains with consistent, maintainable code.

### 📁 **FOLDER STRUCTURE**

```
/home/statiksmoke8/builds/SFTi-Web.Templates/
├── src/                           # All frontend UI components and assets
│   ├── components/                # Component system
│   │   ├── sfti-component-system.js    # Base component framework
│   │   ├── global.c/              # Universal components for all domains
│   │   │   ├── navbar.js          # Global navigation component
│   │   │   ├── card.js            # Universal card component
│   │   │   └── ...                # Other global components
│   │   ├── www.c/                 # Main website specific components
│   │   ├── dev.c/                 # Dev domain specific components
│   │   └── server.c/              # Server domain specific components
│   ├── styles/                    # Shared styles and utilities
│   └── lib/                       # Utility functions and helpers
├── build/                         # All build tools and configuration
├── docs/                          # SVG repo cards (git workflow managed)
├── badges/                        # Static badges/stickers/emblems
├── styles/                        # Main domain styles
├── dev.sfti-ai.org/
│   └── styles/                    # Dev domain styles
└── server.sfti-ai.org/
    └── styles/                    # Server domain styles
```

### 🌐 **DOMAIN SYSTEM**

#### **Main Domain** (`www.sfti-ai.org`)
- **Purpose**: Marketing/business website
- **Components**: `src/components/www.c/`
- **Styles**: `styles/`
- **Theme**: Red primary, gold secondary

#### **Dev Domain** (`dev.sfti-ai.org`)
- **Purpose**: PWA hub and development tools
- **Components**: `src/components/dev.c/`
- **Styles**: `dev.sfti-ai.org/styles/`
- **Theme**: Blue primary, green secondary

#### **Server Domain** (`server.sfti-ai.org`)
- **Purpose**: Secure access portal and documentation
- **Components**: `src/components/server.c/`
- **Styles**: `server.sfti-ai.org/styles/`
- **Theme**: Purple primary, orange secondary

### 🧩 **COMPONENT SYSTEM**

#### **Base Component Class**
```javascript
// src/components/sfti-component-system.js
class SFTiComponent {
    constructor(type, domain = 'global')
    init()
    applyTheme()
    attachEventListeners()
    render(container)
}
```

#### **Component Types**
1. **Navigation** - Navbar, menus, breadcrumbs
2. **Cards** - Project, feature, repo, contact cards
3. **Forms** - Login, signup, contact forms
4. **Layout** - Headers, footers, containers
5. **Interactive** - Modals, dropdowns, carousels

#### **Global Components** (`src/components/global.c/`)
- **navbar.js** - Universal navigation system
- **card.js** - Flexible card component with multiple variants
- **carousel.js** - Horizontal scrolling carousels
- **modal.js** - Modal dialogs and overlays
- **form.js** - Form components with validation

### 🎨 **STYLING SYSTEM**

#### **Tailwind CSS Integration**
- CDN loaded on all pages for consistency
- Domain-specific CSS files for customizations
- Utility-first approach with component-level styling

#### **Theme System**
```javascript
const SFTiThemes = {
    global: { primary: '#FF0000', secondary: '#FFD700' },
    www: { accent: '#E11D48', highlight: '#FCD34D' },
    dev: { accent: '#3B82F6', highlight: '#10B981' },
    server: { accent: '#8B5CF6', highlight: '#F59E0B' }
};
```

### 🔗 **LINKING SYSTEM**

#### **Internal Links**
- **Hash anchors**: `#section` - Smooth scroll to page sections
- **Relative paths**: `/dashboard`, `/sign-up` - Same-domain navigation
- **Cross-domain**: `https://dev.sfti-ai.org/app` - Inter-domain linking

#### **External Links**
- **GitHub**: `https://github.com/statikfintechllc`
- **Social**: LinkedIn, Medium, etc.
- **Documentation**: External docs and resources

### 📱 **RESPONSIVE DESIGN**

#### **Mobile-First Approach**
- Base styles for mobile (320px+)
- Tablet breakpoint (768px+)
- Desktop breakpoint (1024px+)
- Large desktop (1440px+)

#### **Component Responsiveness**
- **Navbar**: Hamburger menu on mobile, full nav on desktop
- **Cards**: Stack on mobile, grid on desktop
- **Carousels**: Touch-friendly mobile, mouse-friendly desktop

### 🛠️ **DEVELOPMENT WORKFLOW**

#### **Adding New Components**
1. Create base component in `src/components/global.c/`
2. Extend in domain-specific folders if needed
3. Add to component registry
4. Document usage and examples
5. Test across all domains

#### **Modifying Existing Components**
1. Update global component first
2. Test domain-specific overrides
3. Ensure backward compatibility
4. Update documentation

### 🚀 **IMPLEMENTATION STATUS**

#### ✅ **Completed**
- [x] New folder structure created
- [x] Component system architecture
- [x] Global navbar component
- [x] Global card component
- [x] Path restructuring for all domains
- [x] Theme system implementation

#### 🔄 **In Progress**
- [ ] Build system integration
- [ ] Component documentation
- [ ] Mobile template optimization
- [ ] Asset management system

#### 📋 **Next Steps**
- [ ] Carousel component system
- [ ] Form component templates
- [ ] Modal component system
- [ ] Badge integration system
- [ ] Deployment pipeline

### 📖 **USAGE EXAMPLES**

#### **Creating a Navbar**
```javascript
// Load component system
<script src="src/components/sfti-component-system.js"></script>
<script src="src/components/global.c/desktop/navbar.js"></script>
<script src="src/components/global.c/mobile/navbar.js"></script>

// Initialize for specific domain
createSFTiNavbar(SFTiNavbarConfigs.www);  // Main domain
createSFTiNavbar(SFTiNavbarConfigs.dev);  // Dev domain
createSFTiNavbar(SFTiNavbarConfigs.server); // Server domain
```

#### **Creating Cards**
```javascript
// Project card
const projectCard = createProjectCard({
    title: 'GremlinGPT',
    subtitle: 'AI Assistant',
    description: 'Autonomous coding assistant',
    image: 'docs/G.G.svg/assets/gremlingpt-card.svg',
    link: 'https://github.com/statikfintechllc/GremlinGPT',
    external: true
});

// Feature card
const featureCard = createFeatureCard({
    title: 'Real-time Analytics',
    icon: '📊',
    description: 'Live data visualization'
});
```

### 🔧 **CONFIGURATION**

#### **Component Configuration**
Each component accepts a configuration object that can override defaults:
```javascript
{
    domain: 'www|dev|server|global',
    theme: 'custom_theme_object',
    size: 'small|medium|large',
    variant: 'glass|solid|outline|gradient',
    interactive: true|false,
    mobile: { /* mobile-specific settings */ }
}
```

### 🎯 **GOALS ACHIEVED**

1. **✅ Scalable Architecture** - Component-based system supports growth
2. **✅ Domain Separation** - Each domain has its own styling and components
3. **✅ Code Reusability** - Global components shared across domains
4. **✅ Maintainability** - Clear structure and documentation
5. **✅ Mobile Responsive** - All components work on mobile and desktop
6. **✅ Theme Consistency** - Unified color and styling system
7. **✅ Link Management** - Proper internal/external link handling

This new system provides a solid foundation for building and maintaining the SFTi web presence across all domains with consistency, scalability, and maintainability.

<!-- markdownlint-disable -->