# Pilot Server - AI Chat Interface with GitHub Integration

## Core Purpose & Success
- **Mission Statement**: A comprehensive multi-model AI chat interface with GitHub authentication, repository integration, and advanced features for developers and users.
- **Success Indicators**: Seamless GitHub authentication, multi-model AI access, file/image uploads, voice input, and persistent conversations.
- **Experience Qualities**: Professional, Secure, Feature-rich

## Project Classification & Approach
- **Complexity Level**: Complex Application (GitHub integration, multi-modal AI, advanced features)
- **Primary User Activity**: Interacting (AI conversations with GitHub context)

## Essential Features

### GitHub Authentication & Integration ✨ NEW
- **GitHub OAuth**: Secure authentication using GitHub accounts
- **User Profile**: Display GitHub avatar, username, stats (repos, followers, following)
- **Repository Access**: Browse and analyze user repositories
- **Multi-Model Access**: GitHub authentication unlocks additional AI models
- **Settings Management**: Comprehensive settings panel in both sidebars

### Advanced AI Model Support ✨ NEW
- **OpenAI Models**: GPT-4o, GPT-4o Mini (available without auth)
- **Anthropic Models**: Claude 3.5 Sonnet, Claude 3 Haiku (requires GitHub auth)
- **Google Models**: Gemini 1.5 Pro, Gemini 1.5 Flash (requires GitHub auth)
- **Model Features**: Vision support, function calling, varying context lengths
- **Smart Model Selection**: Visual indicators for capabilities and auth requirements

### Multi-Modal Input Support ✨ NEW
- **Image Upload**: Full image analysis capabilities with preview
- **File Upload**: Support for documents, code files, spreadsheets, archives
- **Voice Input**: Real-time speech-to-text with continuous recognition
- **Drag & Drop**: Intuitive file handling with visual feedback

### Core Chat Functionality
- **Message Editing**: Edit previous messages with version history (ChatGPT-style)
- **Professional Formatting**: Full markdown support with code syntax highlighting
- **No Length Limits**: Support for extremely long conversations and responses
- **Copy Functionality**: One-click copy for code blocks and messages
- **Smart Code Input**: Automatic formatting detection and font switching

### Theme System
- **Light Mode**: Clean interface with light grey backgrounds and deep green accents
- **Dark Mode**: Professional dark interface with deep red accents and buttons
- **System Mode**: Automatically follows user's system preference
- **Smooth Transitions**: 200ms ease-in-out transitions between themes

### Mobile Experience
- **Responsive Design**: Optimized for both mobile and desktop
- **Touch Targets**: Properly sized buttons and controls
- **Sidebar Management**: Collapsible sidebar with settings access
- **Safe Areas**: Proper handling of notches and dynamic islands

## Design Direction

### Visual Tone & Identity
- **Emotional Response**: Professional confidence with GitHub developer aesthetics
- **Design Personality**: Clean, modern, developer-focused but accessible
- **Visual Metaphors**: GitHub integration, floating model selector, conversation flow
- **Simplicity Spectrum**: Feature-rich interface with intuitive organization

### Color Strategy
- **Light Theme**: 
  - Background: Light grey (oklch(0.94 0.005 120))
  - Primary: Deep green (oklch(0.35 0.15 150))
  - Accent: Medium green (oklch(0.6 0.12 160))
- **Dark Theme**:
  - Background: Very dark (oklch(0.08 0.01 20))
  - Primary: Deep red (oklch(0.45 0.25 15))
  - Accent: Medium red (oklch(0.5 0.22 10))

### Authentication Flow
- **Landing Page**: Attractive sign-in screen showcasing features
- **Feature Preview**: Grid of capabilities (multi-model AI, file uploads, etc.)
- **Secure Sign-In**: GitHub OAuth with clear benefits explanation
- **Protected Routes**: All main features require authentication

## GitHub Integration Architecture

### Authentication System
- **Spark Runtime Integration**: Uses GitHub Spark user context
- **Persistent Sessions**: Auth state stored in KV storage
- **User Context**: GitHub profile data integration with AI responses
- **Security**: No token storage in localStorage, uses Spark runtime

### Model Access Control
- **Free Tier**: GPT-4o models available without authentication
- **Premium Features**: Advanced models (Claude, Gemini) require GitHub auth
- **Visual Indicators**: Clear UI showing which models need authentication
- **Graceful Fallback**: Automatic model switching if auth required

### Settings Management
- **Dual Access**: Settings available in both mobile and desktop sidebars
- **Comprehensive Panel**: User profile, available models, repositories
- **Real-time Updates**: Live connection status and model availability
- **Easy Sign-out**: One-click authentication management

## Implementation Considerations

### Performance Optimizations
- **ResizeObserver Management**: Advanced error suppression and debouncing
- **Lazy Loading**: Efficient component rendering and model loading
- **File Handling**: Smart file type detection and processing
- **Voice Recognition**: Optimized speech-to-text with error handling

### Security & Privacy
- **No Token Storage**: Leverages Spark runtime for secure auth
- **File Validation**: Comprehensive file type and size checking
- **Input Sanitization**: Secure handling of user inputs and uploads
- **Error Boundaries**: Graceful error handling throughout the app

## Recent Major Updates
- ✅ **GitHub Authentication System**: Complete OAuth flow with user profiles
- ✅ **Multi-Model AI Access**: 6 different AI models with capability indicators
- ✅ **File & Image Uploads**: Full support for various file types with previews
- ✅ **Voice Input**: Real-time speech-to-text functionality
- ✅ **Settings Management**: Comprehensive settings dialog in both sidebars
- ✅ **Auth Guard**: Beautiful landing page for unauthenticated users
- ✅ **Enhanced Security**: Secure authentication flow with Spark runtime integration