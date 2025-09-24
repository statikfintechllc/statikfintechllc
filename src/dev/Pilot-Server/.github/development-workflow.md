# Development Workflow and Testing Guide

This guide outlines the development workflows, testing procedures, and quality assurance processes for the Pilot Server project.

## Quick Start Development Workflow

### 1. Environment Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# In another terminal, start the backend (if needed)
node server.js
```

### 2. Development Commands
```bash
# Code quality checks
npm run lint                 # Check code style and errors
npm run lint --fix          # Auto-fix linting issues
npm run build               # Build for production
npm run preview             # Preview production build

# Development utilities
npm run kill                # Kill development server on port 5000
npm run optimize            # Optimize dependencies
```

## Testing Strategy

### Error Detection and Validation

#### 1. TypeScript Error Checking
```bash
# Run TypeScript compiler check
npx tsc --noEmit

# Check for type errors in specific files
npx tsc --noEmit src/components/ChatInterface.tsx
```

#### 2. Import Validation
- All imports must resolve successfully
- Check for circular dependencies
- Verify all required dependencies are in package.json
- Test import paths are correct (relative vs absolute)

#### 3. API Usage Testing
```typescript
// Example API testing pattern
const testApiEndpoint = async () => {
  try {
    const response = await fetch('/api/test');
    
    // Test response status
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    // Test response format
    const data = await response.json();
    console.log('API test successful:', data);
    
    return { success: true, data };
  } catch (error) {
    console.error('API test failed:', error);
    return { success: false, error: error.message };
  }
};
```

### Manual Testing Checklist

#### Frontend Testing
- [ ] Chat interface loads without errors
- [ ] Message sending and receiving works
- [ ] Model switching functions correctly  
- [ ] Image upload and preview works
- [ ] Responsive design works on mobile/tablet
- [ ] Dark/light theme switching works
- [ ] Error states display properly
- [ ] Loading states show correctly

#### Backend Testing
- [ ] Server starts without errors
- [ ] API endpoints respond correctly
- [ ] Authentication flow works
- [ ] File upload handling works
- [ ] Error handling returns proper status codes
- [ ] CORS configuration works for frontend

#### Integration Testing
- [ ] Frontend communicates with backend
- [ ] Authentication persists across sessions
- [ ] Chat history saves and loads
- [ ] Image processing works end-to-end
- [ ] Error boundaries catch and display errors

## Error Handling Patterns

### Frontend Error Patterns

#### 1. API Call Error Handling
```typescript
import { useState } from 'react';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useApiCall = <T>() => {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const callApi = async (url: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  return { ...state, callApi };
};
```

#### 2. Component Error Boundaries
```typescript
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details>
            {this.state.error?.message}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Backend Error Patterns

#### 1. Express Error Middleware
```typescript
import { Request, Response, NextFunction } from 'express';

interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error for debugging
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const statusCode = err.statusCode || 500;
  const message = isDevelopment 
    ? err.message 
    : statusCode === 500 
      ? 'Internal server error' 
      : err.message;

  res.status(statusCode).json({
    error: {
      message,
      ...(isDevelopment && { stack: err.stack })
    }
  });
};

export default errorHandler;
```

#### 2. Async Route Error Handling
```typescript
// Wrapper for async route handlers
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage
router.post('/api/chat', asyncHandler(async (req: Request, res: Response) => {
  const { message, model } = req.body;
  
  // Validate input
  if (!message) {
    const error = new Error('Message is required') as ApiError;
    error.statusCode = 400;
    throw error;
  }
  
  // Process request
  const result = await processChatMessage(message, model);
  res.json(result);
}));
```

## MCP Server Integration Testing

### 1. MCP Server Connection Testing
```typescript
interface MCPServerTest {
  name: string;
  endpoint: string;
  expectedCapabilities: string[];
}

const testMCPServers = async (): Promise<void> => {
  const servers: MCPServerTest[] = [
    {
      name: 'filesystem',
      endpoint: '/mcp/filesystem',
      expectedCapabilities: ['read', 'write', 'list']
    },
    {
      name: 'git',
      endpoint: '/mcp/git', 
      expectedCapabilities: ['status', 'diff', 'commit']
    }
  ];

  for (const server of servers) {
    try {
      console.log(`Testing MCP server: ${server.name}`);
      
      const response = await fetch(server.endpoint + '/capabilities');
      
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      const capabilities = await response.json();
      
      // Verify expected capabilities
      for (const capability of server.expectedCapabilities) {
        if (!capabilities.includes(capability)) {
          throw new Error(`Missing capability: ${capability}`);
        }
      }
      
      console.log(`✅ ${server.name} MCP server test passed`);
    } catch (error) {
      console.error(`❌ ${server.name} MCP server test failed:`, error);
    }
  }
};
```

### 2. MCP Operation Testing
```typescript
const testMCPOperations = async (): Promise<void> => {
  // Test file operations
  try {
    const listResponse = await fetch('/mcp/filesystem/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: './src' })
    });
    
    if (listResponse.ok) {
      console.log('✅ File listing operation works');
    }
  } catch (error) {
    console.error('❌ File listing failed:', error);
  }

  // Test git operations
  try {
    const statusResponse = await fetch('/mcp/git/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (statusResponse.ok) {
      console.log('✅ Git status operation works');
    }
  } catch (error) {
    console.error('❌ Git status failed:', error);
  }
};
```

## Code Quality Checks

### Pre-commit Quality Gate
```bash
#!/bin/bash
# Pre-commit hook script

echo "Running pre-commit quality checks..."

# TypeScript compilation check
echo "Checking TypeScript..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ TypeScript errors found"
  exit 1
fi

# ESLint check
echo "Running ESLint..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Linting errors found"
  exit 1
fi

# Build check
echo "Testing build..."
npm run build
if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

echo "✅ All quality checks passed"
```

### Import Dependency Validation
```typescript
// Script to check for missing dependencies
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const validateImports = (directory: string): void => {
  const files = readdirSync(directory, { withFileTypes: true });
  
  for (const file of files) {
    if (file.isDirectory()) {
      validateImports(join(directory, file.name));
    } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
      const content = readFileSync(join(directory, file.name), 'utf-8');
      const imports = content.match(/^import .+ from ['"](.+)['"];?$/gm) || [];
      
      for (const importLine of imports) {
        const match = importLine.match(/from ['"](.+)['"]$/);
        if (match) {
          const importPath = match[1];
          // Check if import exists (simplified check)
          if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
            // External dependency - check package.json
            console.log(`External import found: ${importPath} in ${file.name}`);
          }
        }
      }
    }
  }
};
```

## Performance Testing

### Bundle Size Monitoring
```bash
# Check bundle size after build
npm run build

# Analyze bundle with specific tools
npx vite-bundle-analyzer dist/

# Check for large dependencies
npx bundle-analyzer dist/assets/*.js
```

### Runtime Performance Testing
```typescript
// Performance monitoring utilities
const measurePerformance = (name: string, fn: () => void): void => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

// React component performance testing
const ComponentWithPerfMonitoring: React.FC = () => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log('Performance entry:', entry);
      });
    });
    
    observer.observe({ entryTypes: ['measure'] });
    
    return () => observer.disconnect();
  }, []);

  return <div>Component content</div>;
};
```

This testing guide ensures comprehensive error detection, proper import validation, and robust API usage testing throughout the development process.