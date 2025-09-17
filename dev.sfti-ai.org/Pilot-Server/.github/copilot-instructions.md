# Copilot Instructions for Pilot Server

This repository contains a modern AI Chat Interface built with React, TypeScript, Vite, and Express.js. These instructions will help GitHub Copilot provide optimal assistance for development, testing, and maintenance of this codebase.

## Project Overview

**Pilot Server** is a clean, modern web-based AI chat interface that demonstrates multi-model conversation capabilities with a focus on developer workflows. The application features:

- Multi-model chat interface (GPT-4o, GPT-4o-mini)
- Conversation history and persistence  
- Image upload and analysis capabilities
- Code syntax highlighting and developer-focused features
- Modern glassmorphic UI with Radix UI components and Tailwind CSS

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite 6.3.5
- **Backend**: Express.js 5.1.0, Node.js
- **UI Framework**: Radix UI components, Tailwind CSS 4.1.11
- **Styling**: CSS-in-JS with Tailwind, Inter & JetBrains Mono fonts
- **Build Tools**: Vite, TypeScript, ESLint 9.28.0
- **State Management**: React hooks, TanStack React Query 5.87.1
- **Authentication**: Custom auth system with GitHub integration

## Development Guidelines

### Code Style and Quality

1. **TypeScript Best Practices**
   - Use strict TypeScript configurations
   - Avoid `any` types - use proper typing
   - Implement proper error handling with typed errors
   - Use const assertions where appropriate
   - Prefer interfaces over types for object shapes

2. **React Patterns**
   - Use functional components with hooks
   - Implement proper error boundaries
   - Follow React best practices for state management
   - Use React.memo() for performance optimization where needed
   - Implement proper cleanup in useEffect hooks

3. **Import/Export Standards**
   - Use named exports for components and utilities
   - Use default exports only for main component files
   - Group imports: external libraries, then internal modules
   - Use absolute imports from src/ directory when configured
   - Verify all imports resolve correctly before suggesting code

### Testing Requirements

#### MCP Server Integration Testing

When implementing MCP (Model Context Protocol) server functionality:

1. **Connection Testing**
   - Test MCP server connectivity before making requests
   - Implement proper timeout handling (5-10 seconds)
   - Test error scenarios (network failures, invalid responses)
   - Validate MCP server capabilities and supported operations

2. **API Integration Testing**
   - Test all API endpoints with proper error handling
   - Validate request/response schemas
   - Test authentication and authorization flows
   - Implement rate limiting considerations

3. **Import Validation**
   - Always verify imports exist and are properly typed
   - Test that all dependencies are installed in package.json
   - Check for circular dependency issues
   - Validate that imported modules export expected functions/types

#### Error Handling Standards

1. **Frontend Error Handling**
   ```typescript
   try {
     // API calls or risky operations
   } catch (error) {
     console.error('Operation failed:', error);
     // Show user-friendly error message
     // Log error for debugging
   }
   ```

2. **Backend Error Handling**
   ```typescript
   // Express error middleware
   app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
     console.error(err.stack);
     res.status(500).json({ error: 'Internal server error' });
   });
   ```

3. **Async Operation Error Handling**
   - Always wrap async operations in try-catch
   - Implement proper loading states
   - Show user feedback for error states
   - Implement retry mechanisms where appropriate

### Tasking System Guidelines

#### Feature Development Tasks

1. **Planning Phase**
   - Understand the feature requirements completely
   - Identify affected components and files
   - Plan testing strategy before implementation
   - Consider accessibility and responsive design

2. **Implementation Phase**
   - Create minimal, focused changes
   - Follow existing code patterns and conventions
   - Implement proper TypeScript typing
   - Add error handling and loading states

3. **Testing Phase**
   - Test the feature manually in development
   - Verify responsive design works
   - Test error scenarios and edge cases
   - Ensure accessibility standards are met

4. **Integration Phase**
   - Test integration with existing features
   - Verify no regressions are introduced
   - Update documentation if needed
   - Consider performance implications

#### Debugging Tasks

1. **Error Investigation**
   - Check browser console for errors
   - Verify network requests in DevTools
   - Check server logs for backend issues
   - Use TypeScript compiler for type errors

2. **Performance Issues**
   - Use React DevTools profiler
   - Check bundle size and chunking
   - Analyze runtime performance
   - Monitor memory usage

### Component Architecture

#### UI Components Structure
```
src/components/
├── ui/           # Reusable UI primitives (Radix UI components)
├── chat/         # Chat-specific components
├── auth/         # Authentication components
└── shared/       # Shared business logic components
```

#### Component Guidelines
- Keep components focused and single-purpose
- Use composition over inheritance
- Implement proper prop validation with TypeScript
- Follow the established design system (analogous blue/teal colors)
- Ensure components are accessible (ARIA attributes, keyboard navigation)

### API Integration Guidelines

#### Frontend API Calls
```typescript
// Use proper error handling and loading states
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const handleApiCall = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await fetch('/api/endpoint');
    if (!response.ok) throw new Error('API call failed');
    const data = await response.json();
    // Handle success
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Unknown error');
  } finally {
    setLoading(false);
  }
};
```

#### Backend API Routes
```typescript
// Express route with proper error handling
router.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, model } = req.body;
    // Validate input
    if (!message || !model) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    // Process request
    const result = await processChatMessage(message, model);
    res.json(result);
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### MCP Server Configuration

#### Required MCP Servers for Development

1. **File System MCP Server**
   - For reading/writing project files
   - Configuration: Read-only access to src/ directory
   - Write access only to designated output directories

2. **Git MCP Server**
   - For version control operations
   - Configuration: Standard git operations (status, diff, commit)
   - Branch management and merge operations

3. **Package Manager MCP Server**
   - For npm/dependency management
   - Configuration: Install, update, audit packages
   - Lock file management

4. **Testing MCP Server**
   - For running tests and collecting results
   - Configuration: Jest/Vitest integration
   - Coverage reporting and analysis

#### MCP Server Integration Examples

```typescript
// Example MCP server communication
interface MCPRequest {
  method: string;
  params: Record<string, unknown>;
}

interface MCPResponse {
  result?: unknown;
  error?: { code: number; message: string };
}

async function callMCPServer(request: MCPRequest): Promise<MCPResponse> {
  try {
    const response = await fetch('/api/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    
    if (!response.ok) {
      throw new Error(`MCP call failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    return {
      error: {
        code: -1,
        message: error instanceof Error ? error.message : 'Unknown error'
      }
    };
  }
}
```

### Build and Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint --fix   # Fix auto-fixable issues

# Server Management
npm run kill         # Kill development server on port 5000
node server.js       # Start Express backend
```

### Environment Configuration

#### Required Environment Variables
```env
# Authentication
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# API Configuration
OPENAI_API_KEY=your_openai_api_key
API_BASE_URL=http://localhost:5000

# Development
NODE_ENV=development
PORT=5000
```

### Security Considerations

1. **Input Validation**
   - Sanitize all user inputs
   - Validate file uploads (type, size limits)
   - Implement proper CORS policies

2. **Authentication**
   - Use secure session management
   - Implement proper logout functionality
   - Validate tokens on each request

3. **API Security**
   - Rate limiting on API endpoints
   - Input validation and sanitization
   - Proper error messages (don't leak sensitive info)

### Performance Guidelines

1. **Bundle Optimization**
   - Use dynamic imports for code splitting
   - Optimize images and assets
   - Implement proper caching strategies

2. **React Performance**
   - Use React.memo for expensive components
   - Implement proper dependency arrays in hooks
   - Avoid unnecessary re-renders

3. **Network Optimization**
   - Implement request deduplication
   - Use proper loading states
   - Cache API responses where appropriate

## Common Issues and Solutions

### TypeScript Issues
- **Unused variables**: Remove or prefix with underscore for intentionally unused params
- **Any types**: Replace with proper typing, use unknown for truly unknown types
- **Missing dependencies**: Add to useEffect dependency arrays or use useCallback

### Build Issues
- **Import errors**: Verify all imports exist and are properly exported
- **Type errors**: Check TypeScript configuration and resolve type conflicts
- **Bundle size**: Use dynamic imports and code splitting

### Runtime Issues
- **Network errors**: Implement proper error boundaries and retry mechanisms
- **State issues**: Check React DevTools and component lifecycle
- **Memory leaks**: Ensure proper cleanup in useEffect hooks

Remember: Always test your code changes thoroughly, implement proper error handling, and maintain the existing code style and architecture patterns.