# SFTi Local Development Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed
- Terminal/Command Prompt

### One-Command Setup
```bash
# Clone and setup (if you haven't already)
git clone https://github.com/statikfintechllc/SFTi-Web.Templates.git
cd SFTi-Web.Templates

# Run the automated setup
./setup-dev.sh

# Start all development servers
npm run dev:all
```

### Manual Setup (Alternative)
```bash
# Install all dependencies
npm run install:all

# Build CSS files
./build.sh

# Start unified development server
npm run dev:unified
```

## 🌐 Development URLs

Once the development server is running, access your applications at:

| Application | URL | Description |
|-------------|-----|-------------|
| **Main Site** | http://localhost:3333 | Corporate website |
| **Dev Scanner** | http://dev.localhost:3333 | Development IB-G.Scanner |
| **Server Scanner** | http://server.localhost:3333 | Production IB-G.Scanner |
| **API Server** | http://api.localhost:3333 | Backend API endpoints |
| **Dashboard** | http://localhost:3333 | Development dashboard (fallback) |

## 🔥 Hot Reload Features

### What Gets Hot Reloaded
- ✅ **React Components** - Instant updates without page refresh
- ✅ **CSS/TailwindCSS** - Style changes appear immediately
- ✅ **JavaScript/TypeScript** - Code changes reload automatically
- ✅ **HTML Files** - Static HTML updates on save
- ✅ **API Endpoints** - Server restarts automatically

### File Watching
The development server monitors these directories:
- `src/` - Main site source files
- `dev.sfti-ai.org/IB-G.Scanner/src/` - Dev scanner source
- `server.sfti-ai.org/IB-G.Scanner/src/` - Server scanner source
- `styles/` - CSS and TailwindCSS files
- `components/` - Shared components

## 🛠️ Available Development Commands

### Root Project Commands
```bash
# Start unified development environment
npm run dev:all
npm run dev:unified

# Build all projects
npm run build:all

# Preview all built projects
npm run preview:all

# Install dependencies for all projects
npm run install:all

# Lint all projects
npm run lint
```

### Individual Project Commands
```bash
# Main site only
npm run dev
npm run build
npm run preview

# Dev IB-G.Scanner only
cd dev.sfti-ai.org/IB-G.Scanner
npm run dev
npm run start:full  # Includes API server

# Server IB-G.Scanner only
cd server.sfti-ai.org/IB-G.Scanner
npm run dev
npm run start:full  # Includes API server
```

## 📁 Project Structure

```
SFTi-Web.Templates/
├── 📄 dev-server.js           # Unified development server
├── 📄 setup-dev.sh            # Automated setup script
├── 📁 dev.sfti-ai.org/
│   └── 📁 IB-G.Scanner/       # Development scanner app
├── 📁 server.sfti-ai.org/
│   └── 📁 IB-G.Scanner/       # Production scanner app
├── 📁 src/                    # Main site source
├── 📁 components/             # Shared UI components
├── 📁 styles/                 # CSS and TailwindCSS
└── 📄 index.html              # Main site entry
```

## 🔧 Configuration

### Environment Variables
Create `.env.local` files in each project directory:

**Root `.env.local`:**
```env
DEV_PORT=3333
VITE_API_URL=http://localhost:3000
```

**IB-G.Scanner `.env.local`:**
```env
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3001
VITE_IBKR_HOST=127.0.0.1
VITE_IBKR_PORT=7497
```

### Port Configuration
Default ports (customizable via environment variables):
- **3333** - Development proxy server
- **5173** - Main site Vite server
- **4174** - Dev IB-G.Scanner
- **4175** - Server IB-G.Scanner
- **3000** - API Server
- **3001** - WebSocket Server

## 🧪 Testing Changes Locally

### Frontend Changes
1. Edit any file in `src/` or component directories
2. Save the file
3. Browser automatically refreshes with changes
4. No need to push to repository!

### API Changes
1. Edit files in `dev.sfti-ai.org/IB-G.Scanner/scripts/`
2. Server automatically restarts
3. Frontend reconnects automatically

### CSS/Styling Changes
1. Edit TailwindCSS classes in any file
2. Run `./build.sh` to rebuild CSS (or use watch mode)
3. Changes appear immediately

### Adding New Features
1. Create new components in appropriate directories
2. Import and use in your applications
3. Test across all domains using the development URLs
4. Everything works locally without pushing!

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Kill processes on specific ports
npx kill-port 3333 4174 4175 3000 5173

# Or use the convenience scripts
npm run kill  # In IB-G.Scanner directories
```

### Dependencies Issues
```bash
# Clean install everything
rm -rf node_modules package-lock.json
rm -rf dev.sfti-ai.org/IB-G.Scanner/node_modules
rm -rf server.sfti-ai.org/IB-G.Scanner/node_modules
npm run install:all
```

### Build Issues
```bash
# Rebuild CSS files
./build.sh

# Clear Vite cache
rm -rf .vite
rm -rf dev.sfti-ai.org/IB-G.Scanner/.vite
rm -rf server.sfti-ai.org/IB-G.Scanner/.vite
```

### Domain Resolution Issues
If `dev.localhost` doesn't work, you may need to add entries to your hosts file:

**Windows:** `C:\Windows\System32\drivers\etc\hosts`
**Mac/Linux:** `/etc/hosts`

Add these lines:
```
127.0.0.1 dev.localhost
127.0.0.1 server.localhost
127.0.0.1 api.localhost
```

## 🎯 Best Practices

### Development Workflow
1. **Start with setup:** Run `./setup-dev.sh` once
2. **Daily development:** Use `npm run dev:all`
3. **Test changes:** Use the local URLs, not production
4. **Before committing:** Run `npm run build:all` to ensure everything builds
5. **Push when ready:** Only push after local testing confirms everything works

### Performance Tips
- Keep the development server running between sessions
- Use browser dev tools for debugging
- Monitor console output for errors
- Use the network tab to debug API calls

### Code Organization
- Put shared components in `/components`
- Keep domain-specific code in respective directories
- Use TypeScript for better development experience
- Follow existing code style and patterns

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Express.js Documentation](https://expressjs.com/)

---

**🎉 Happy coding! No more waiting for deployments to test your changes!**