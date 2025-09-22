<div align="center">
  <a href="https://statikfintechllc.github.io/Ascend-Institute/">
    <img src="https://img.shields.io/badge/SFTi's-darkred?style=for-the-badge&logo=dragon&logoColor=gold"/>
  <a href="https://statikfintechllc.github.io/Ascend-Institute/">
    <img src="https://img.shields.io/badge/Home%20Page-black?style=for-the-badge&logo=ghost&logoColor=gold"/>
  </a><br>
</div> 
<div align="center">
  <a href="https://github.com/sponsors/statikfintechllc">
    <img src="https://skillicons.dev/icons?i=python,bash,linux,anaconda,tailwind,css,react,nodejs,electron,go,typescript,javascript,html,astro,nix&theme=dark" alt="Skill icons">
  </a><br>
  <a href="https://github.com/sponsors/statikfintechllc">
    <img src="https://raw.githubusercontent.com/KDK-Grim/WorkFlowRepo-Mirror/master/docs/ticker-bot/ticker.gif" alt="Repo Ticker Stats" height="36">
  </a>

# Pilot Server 
**A GitHub Powered AI Chat Interface**

</div>

*A modern, professional AI chat interface built with React and TypeScript that provides seamless multi-model conversations with GitHub OAuth authentication.*

*Designed specifically for developers and technical professionals who need a clean, efficient way to interact with AI models.*

## ✨ Features

### 🤖 Multi-Model AI Chat
- **Model Switching**: Seamlessly switch between GPT-4o and GPT-4o-mini within conversations
- **Context Preservation**: Maintain conversation context across model changes
- **Real-time Responses**: Fast, responsive chat experience with immediate feedback

### 🔐 Secure Authentication
- **GitHub OAuth**: Secure authentication using your GitHub account
- **Token Management**: Safe handling of authentication tokens with proxy server
- **Session Persistence**: Stay logged in across browser sessions

### 💬 Advanced Chat Features
- **Conversation History**: Persistent chat history with ability to create new conversations
- **Message Management**: Edit messages and switch between different response versions
- **Image Upload**: Upload and analyze images with AI (drag-and-drop support)
- **Code Highlighting**: Syntax highlighting for code blocks with copy functionality

### 🎨 Professional UI/UX
- **Clean Design**: Modern, glassmorphic interface optimized for long coding sessions
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes for comfortable viewing
- **Sidebar Navigation**: Collapsible sidebar for efficient screen space usage

## 🛠️ Technology Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Radix UI** for accessible component primitives
- **Framer Motion** for smooth animations
- **React Router** for navigation

### Backend
- **Express.js** server for OAuth proxy
- **CORS** enabled for secure cross-origin requests
- **GitHub OAuth** integration

### Development Tools
- **ESLint** for code linting
- **TypeScript** for type safety
- **Vite** for hot module replacement

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn** package manager
- **GitHub OAuth App** (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/statikfintechllc/Pilot-Server.git
   cd Pilot-Server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # GitHub OAuth Configuration
   VITE_GITHUB_CLIENT_ID=your_github_client_id
   VITE_GITHUB_CLIENT_SECRET=your_github_client_secret
   VITE_GITHUB_REDIRECT_URI=http://localhost:3001/auth/callback
   ```

4. **Start the development servers**
   
   **Terminal 1** - Start the OAuth proxy server:
   ```bash
   node server.js
   ```
   
   **Terminal 2** - Start the frontend development server:
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5174 (or auto-assigned port)
   - OAuth Server: http://localhost:3001

## 🔧 Configuration

### GitHub OAuth Setup

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App with:
   - **Application name**: Pilot Server
   - **Homepage URL**: http://localhost:5174
   - **Authorization callback URL**: http://localhost:3001/auth/callback
3. Copy the Client ID and Client Secret to your `.env` file

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GITHUB_CLIENT_ID` | GitHub OAuth Client ID | Yes |
| `VITE_GITHUB_CLIENT_SECRET` | GitHub OAuth Client Secret | Yes |
| `VITE_GITHUB_REDIRECT_URI` | OAuth callback URL | Yes |

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   OAuth Proxy    │    │    GitHub       │
│   (React App)   │    │   (Express.js)   │    │    OAuth        │
│   Port: 5174    │◄──►│   Port: 3001     │◄──►│    Server       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Key Components

- **Frontend (React)**: User interface and chat functionality
- **OAuth Proxy (Express)**: Secure token exchange with GitHub
- **GitHub OAuth**: Authentication and authorization

### Data Flow

1. User initiates GitHub OAuth login
2. GitHub redirects to OAuth proxy server
3. Proxy exchanges code for access token
4. Frontend receives token and authenticates user
5. User can now access chat functionality

## 📱 Usage

### Starting a Chat
1. **Authenticate**: Log in with your GitHub account
2. **Select Model**: Choose between GPT-4o or GPT-4o-mini using the model selector
3. **Start Chatting**: Type your message and press Enter or click Send

### Advanced Features
- **New Conversation**: Click the "New Chat" button to start fresh
- **Upload Images**: Drag and drop images or click the upload button
- **Copy Code**: Use the copy button on code blocks for easy integration
- **Switch Models**: Change AI models mid-conversation while preserving context

## 🔨 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run optimize` | Optimize dependencies |

### Building for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

### Linting and Code Quality

```bash
# Run ESLint
npm run lint

# Fix linting issues automatically
npm run lint -- --fix
```

## 🚦 Troubleshooting

### Common Issues

1. **OAuth Authentication Fails**
   - Verify GitHub OAuth app configuration
   - Check environment variables are set correctly
   - Ensure callback URL matches OAuth app settings

2. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check Node.js version compatibility (18+)

3. **CORS Issues**
   - Verify both servers are running on correct ports
   - Check CORS configuration in server.js

4. **Port Conflicts**
   - Change ports in vite.config.ts (frontend) or server.js (backend)
   - Kill existing processes: `npm run kill`

### Performance Optimization

- Large bundle warning is expected due to comprehensive UI components
- Consider code splitting for production deployments
- Use `npm run optimize` to optimize dependencies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the existing code style
4. Run tests and linting: `npm run lint`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About

Developed by [Statik Fintech LLC](https://github.com/statikfintechllc) - Creating modern, professional tools for developers and technical professionals.

---

**Need help?** Open an issue or check our [troubleshooting guide](#-troubleshooting) above.

<div align="center">
  <a href="https://github.com/sponsors/statikfintechllc">
    <img src="https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/badges/L.W.badge.svg" alt="Like my work?" />
  </a>
</div>
<div align="center">
<a href="https://github.com/sponsors/statikfintechllc">
  <img src="https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/badges/git.sponsor.svg">
</a><br>
<a href="https://ko-fi.com/statikfintech_llc">
  <img src="https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/badges/kofi.sponsor.svg">
</a><br>
<a href="https://patreon.com/StatikFinTech_LLC">
  <img src="https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/badges/patreon.sponsor.svg">
</a><br>
<a href="https://cash.app/$statikmoney8">
  <img src="https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/badges/cashapp.sponsor.svg">
</a><br>
<a href="https://paypal.me/statikmoney8">
  <img src="https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/badges/paypal.sponsor.svg">
</a><br>
<a href="https://www.blockchain.com/explorer/addresses/btc/bc1qarsr966ulmcs3mlcvae7p63v4j2y2vqrw74jl8">
  <img src="https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/badges/bitcoin.sponsor.svg">
</a><br>
<a href="https://etherscan.io/address/0xC2db50A0fc6c95f36Af7171D8C41F6998184103F">
  <img src="https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/badges/ethereum.sponsor.svg">
</a><br>
<a href="https://www.chime.com">
  <img src="https://raw.githubusercontent.com/statikfintechllc/statikfintechllc/master/badges/chime.sponsor.svg">
</a>
</div>

 **Want to See you're own ideas built, or to sponsor hardware directly? Reach Out to:**
- **Email:** [ascend.gremlin@gmail.com](mailto:ascend.gremlin@gmail.com) | [ascend.help@gmail.com](mailto:ascend.help@gmail.com)
- **Call Us:** [+1 (620) 266-9837](sms:+16202669837)  
- **Text Us:** [+1 (785) 443-6288](sms:+17854436288)  
- **DM:**  
  - a) [LinkedIn: StatikFinTech, LLC](https://www.linkedin.com/in/statikfintech-llc-780804368/)
  - b) [X: @GremlinsForge](https://twitter.com/GremlinsForge)  

**See Our [Open Funding Proposal](https://github.com/statikfintechllc/Ascend-Institute/blob/master/About%20Us/OPEN_FUNDING_PROPOSAL.md)**

<div align="center">

  <br/> [© 2025 StatikFinTech, LLC](https://www.github.com/statikfintechllc/GremlinGPT/blob/master/LICENSE.md)

  <a href="https://github.com/statikfintechllc">
    <img src="https://img.shields.io/badge/-000000?logo=github&logoColor=white&style=flat-square" alt="GitHub">
  </a>
  <a href="https://www.linkedin.com/in/daniel-morris-780804368">
    <img src="https://img.shields.io/badge/In-e11d48?logo=linkedin&logoColor=white&style=flat-square" alt="LinkedIn">
  </a>
  <a href="mailto:ascend.gremlin@gmail.com">
    <img src="https://img.shields.io/badge/-D14836?logo=gmail&logoColor=white&style=flat-square" alt="Email">
  </a>
  <a href="https://www.youtube.com/@Gremlins_Forge">
    <img src="https://img.shields.io/badge/-FF0000?logo=youtube&logoColor=white&style=flat-square" alt="YouTube">
  </a>
  <a href="https://x.com/GremlinsForge">
    <img src="https://img.shields.io/badge/-000000?logo=x&logoColor=white&style=flat-square" alt="X">
  </a>
  <a href="https://medium.com/@ascend.gremlin">
    <img src="https://img.shields.io/badge/-000000?logo=medium&logoColor=white&style=flat-square" alt="Medium">
  </a>  
</div>
