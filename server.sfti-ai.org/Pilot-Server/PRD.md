# Pilot Server - AI Chat Interface

A clean, modern web-based AI chat interface that demonstrates multi-model conversation capabilities with a focus on developer workflows.

**Experience Qualities**:
1. **Intuitive** - Chat interface feels natural and familiar, like messaging with a knowledgeable colleague
2. **Responsive** - Fast, smooth interactions with immediate visual feedback for all user actions
3. **Professional** - Clean, focused design that emphasizes content and functionality over decoration

**Complexity Level**: Light Application (multiple features with basic state)
- Provides chat interface with conversation history, model switching, and image upload capabilities while maintaining simplicity

## Essential Features

### Multi-Model Chat Interface
- **Functionality**: Switch between different AI models (GPT-4o, GPT-4o-mini) within conversations
- **Purpose**: Allows users to compare responses and choose the best model for specific tasks
- **Trigger**: Model selector dropdown in chat header
- **Progression**: Select model → Send message → Receive response → Context maintained across model switches
- **Success criteria**: Seamless conversation flow regardless of model changes

### Conversation History
- **Functionality**: Persistent chat history with ability to start new conversations
- **Purpose**: Maintains context and allows users to reference previous discussions
- **Trigger**: Automatic saving on message send, manual new chat creation
- **Progression**: Send message → Auto-save to history → Browse previous chats → Resume conversations
- **Success criteria**: No message loss, quick access to chat history

### Image Upload & Analysis
- **Functionality**: Upload images for AI analysis and discussion
- **Purpose**: Enables visual debugging, screenshot analysis, and multimodal interactions
- **Trigger**: Image upload button or drag-and-drop
- **Progression**: Select/drop image → Preview → Send with optional text → Receive analysis
- **Success criteria**: Images display properly and generate relevant AI responses

### Code-Focused Features
- **Functionality**: Syntax highlighting, code block formatting, copy functionality
- **Purpose**: Optimized for developer workflows and technical discussions
- **Trigger**: Automatic detection of code in responses, manual code insertion
- **Progression**: AI generates code → Syntax highlighting applied → Copy button available → Easy integration
- **Success criteria**: Code is readable, properly formatted, and easily copyable

## Edge Case Handling

- **Network Failures**: Retry mechanism with user feedback and offline indicator
- **Large Images**: Automatic compression and format validation before upload
- **Long Conversations**: Infinite scroll with virtualization for performance
- **Model Switching**: Graceful fallback if selected model is unavailable
- **Empty States**: Helpful prompts and examples for new users

## Design Direction

The interface should feel like a premium developer tool - clean, focused, and efficient. Modern glassmorphic elements with subtle depth, emphasizing content readability and minimal cognitive load. Prioritize function over form while maintaining visual appeal.

## Color Selection

Analogous color scheme using cool blues and teals to create a calming, professional atmosphere that reduces eye strain during long coding sessions.

- **Primary Color**: Deep Blue `oklch(0.4 0.15 240)` - Communicates trust, professionalism, and technical depth
- **Secondary Colors**: Muted Slate `oklch(0.6 0.05 240)` for backgrounds and Steel Blue `oklch(0.7 0.1 240)` for accents
- **Accent Color**: Bright Cyan `oklch(0.75 0.15 195)` - Attention-grabbing highlight for CTAs and active states
- **Foreground/Background Pairings**:
  - Background (Light Slate #F8FAFC): Dark Blue text (#1E293B) - Ratio 12.6:1 ✓
  - Card (White #FFFFFF): Dark Blue text (#1E293B) - Ratio 14.2:1 ✓
  - Primary (Deep Blue #334155): White text (#FFFFFF) - Ratio 8.9:1 ✓
  - Secondary (Muted Slate #64748B): White text (#FFFFFF) - Ratio 4.8:1 ✓
  - Accent (Bright Cyan #06B6D4): Dark Blue text (#1E293B) - Ratio 6.2:1 ✓

## Font Selection

Use Inter for its excellent readability at all sizes and technical feel that appeals to developers. JetBrains Mono for code blocks to ensure perfect character distinction.

- **Typographic Hierarchy**:
  - H1 (Chat Title): Inter Bold/24px/tight letter spacing
  - H2 (Message Headers): Inter Medium/18px/normal spacing  
  - Body (Messages): Inter Regular/16px/relaxed line height
  - Code (Inline): JetBrains Mono Regular/14px/normal spacing
  - Small (Timestamps): Inter Regular/12px/wide letter spacing

## Animations

Subtle, purposeful animations that enhance usability without distraction. Focus on smooth state transitions and gentle feedback that feels responsive and modern.

- **Purposeful Meaning**: Smooth message bubbles appearing from bottom, gentle hover states on interactive elements
- **Hierarchy of Movement**: Message sending gets priority animation, followed by model switching, then subtle hover effects

## Component Selection

- **Components**: 
  - Cards for message bubbles and chat containers
  - Button variants for send, model switch, and utility actions
  - Input for message composition with auto-resize
  - Dialog for image preview and settings
  - Dropdown for model selection
  - Scroll Area for chat history with smooth scrolling
- **Customizations**: Custom message bubble design with proper spacing and typography, floating action button for new chat
- **States**: Hover effects on all interactive elements, loading states for message sending, disabled states during API calls
- **Icon Selection**: Phosphor icons for clean, technical aesthetic (Send, Image, Settings, etc.)
- **Spacing**: Consistent 4px base unit with 16px message spacing and 24px section gaps
- **Mobile**: Stack elements vertically, larger touch targets, swipe gestures for navigation, responsive text sizing