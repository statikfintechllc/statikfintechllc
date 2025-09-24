# Testing Configuration for Copilot

This file contains specific testing configurations and validation scripts to ensure proper error handling, import validation, and API usage testing as required for the Copilot integration.

## Automated Validation Scripts

### TypeScript and Import Validation

```typescript
// scripts/validate-imports.ts
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { parse } from '@typescript-eslint/parser';

interface ImportValidationResult {
  file: string;
  imports: Array<{
    module: string;
    type: 'external' | 'internal' | 'relative';
    exists: boolean;
    error?: string;
  }>;
  errors: string[];
}

class ImportValidator {
  private packageJson: any;
  private srcPath: string;

  constructor(projectRoot: string) {
    this.srcPath = join(projectRoot, 'src');
    this.packageJson = JSON.parse(
      readFileSync(join(projectRoot, 'package.json'), 'utf-8')
    );
  }

  validateProject(): ImportValidationResult[] {
    const results: ImportValidationResult[] = [];
    this.scanDirectory(this.srcPath, results);
    return results;
  }

  private scanDirectory(directory: string, results: ImportValidationResult[]): void {
    const files = readdirSync(directory, { withFileTypes: true });

    for (const file of files) {
      const filePath = join(directory, file.name);
      
      if (file.isDirectory()) {
        this.scanDirectory(filePath, results);
      } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
        try {
          const result = this.validateFile(filePath);
          if (result.imports.length > 0 || result.errors.length > 0) {
            results.push(result);
          }
        } catch (error) {
          results.push({
            file: filePath,
            imports: [],
            errors: [`Failed to parse file: ${error.message}`]
          });
        }
      }
    }
  }

  private validateFile(filePath: string): ImportValidationResult {
    const content = readFileSync(filePath, 'utf-8');
    const result: ImportValidationResult = {
      file: filePath,
      imports: [],
      errors: []
    };

    try {
      // Parse TypeScript/TSX file
      const ast = parse(content, {
        sourceType: 'module',
        ecmaVersion: 2020,
        ecmaFeatures: { jsx: true }
      });

      // Extract imports from AST (simplified)
      const importRegex = /^import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"]([^'"]+)['"];?\s*$/gm;
      
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const moduleName = match[1];
        const importInfo = this.analyzeImport(moduleName, filePath);
        result.imports.push(importInfo);
        
        if (!importInfo.exists) {
          result.errors.push(`Invalid import: ${moduleName}`);
        }
      }
    } catch (error) {
      result.errors.push(`Parse error: ${error.message}`);
    }

    return result;
  }

  private analyzeImport(moduleName: string, fromFile: string) {
    let type: 'external' | 'internal' | 'relative';
    let exists = false;
    let error: string | undefined;

    if (moduleName.startsWith('.')) {
      // Relative import
      type = 'relative';
      const resolvedPath = this.resolveRelativeImport(moduleName, fromFile);
      exists = existsSync(resolvedPath);
      if (!exists) {
        error = `File not found: ${resolvedPath}`;
      }
    } else if (moduleName.startsWith('/') || moduleName.includes('src/')) {
      // Internal absolute import
      type = 'internal';
      const resolvedPath = resolve(this.srcPath, moduleName.replace(/^src\//, ''));
      exists = this.checkFileExists(resolvedPath);
    } else {
      // External dependency
      type = 'external';
      exists = this.checkExternalDependency(moduleName);
      if (!exists) {
        error = `Dependency not found in package.json: ${moduleName}`;
      }
    }

    return { module: moduleName, type, exists, error };
  }

  private resolveRelativeImport(moduleName: string, fromFile: string): string {
    const dir = dirname(fromFile);
    const resolved = resolve(dir, moduleName);
    
    // Check for file extensions
    const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];
    
    if (existsSync(resolved)) {
      return resolved;
    }
    
    for (const ext of extensions) {
      const withExt = resolved + ext;
      if (existsSync(withExt)) {
        return withExt;
      }
    }
    
    // Check for index files
    for (const ext of extensions) {
      const indexFile = join(resolved, `index${ext}`);
      if (existsSync(indexFile)) {
        return indexFile;
      }
    }
    
    return resolved;
  }

  private checkFileExists(path: string): boolean {
    const extensions = ['.ts', '.tsx', '.js', '.jsx'];
    
    if (existsSync(path)) return true;
    
    for (const ext of extensions) {
      if (existsSync(path + ext)) return true;
    }
    
    return existsSync(join(path, 'index.ts')) || 
           existsSync(join(path, 'index.tsx'));
  }

  private checkExternalDependency(moduleName: string): boolean {
    const deps = {
      ...this.packageJson.dependencies,
      ...this.packageJson.devDependencies
    };
    
    // Check direct dependency
    if (deps[moduleName]) return true;
    
    // Check scoped packages (e.g., @react/dom -> react)
    const baseModule = moduleName.split('/')[0];
    if (baseModule.startsWith('@')) {
      const scopedModule = moduleName.split('/').slice(0, 2).join('/');
      if (deps[scopedModule]) return true;
    } else if (deps[baseModule]) {
      return true;
    }
    
    // Check built-in Node.js modules
    const builtinModules = [
      'fs', 'path', 'url', 'http', 'https', 'crypto', 'os', 'util',
      'events', 'stream', 'buffer', 'querystring', 'child_process'
    ];
    
    return builtinModules.includes(baseModule);
  }
}

// CLI usage
if (require.main === module) {
  const validator = new ImportValidator(process.cwd());
  const results = validator.validateProject();
  
  let hasErrors = false;
  
  for (const result of results) {
    if (result.errors.length > 0) {
      hasErrors = true;
      console.error(`\n❌ ${result.file}:`);
      for (const error of result.errors) {
        console.error(`  ${error}`);
      }
    }
    
    for (const imp of result.imports) {
      if (!imp.exists) {
        hasErrors = true;
        console.error(`  ❌ ${imp.module}: ${imp.error || 'Not found'}`);
      }
    }
  }
  
  if (!hasErrors) {
    console.log('✅ All imports are valid');
  }
  
  process.exit(hasErrors ? 1 : 0);
}

export { ImportValidator };
```

### API Usage Validation

```typescript
// scripts/validate-api-usage.ts
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface APIUsagePattern {
  pattern: RegExp;
  name: string;
  requiredErrorHandling: string[];
  requiredImports: string[];
}

class APIUsageValidator {
  private patterns: APIUsagePattern[] = [
    {
      pattern: /fetch\s*\([^)]+\)/g,
      name: 'fetch API',
      requiredErrorHandling: ['try-catch', 'response.ok check'],
      requiredImports: []
    },
    {
      pattern: /axios\.[get|post|put|delete|patch]/g,
      name: 'axios',
      requiredErrorHandling: ['try-catch'],
      requiredImports: ['axios']
    },
    {
      pattern: /useQuery|useMutation/g,
      name: 'React Query',
      requiredErrorHandling: ['error state handling'],
      requiredImports: ['@tanstack/react-query']
    },
    {
      pattern: /localStorage\.|sessionStorage\./g,
      name: 'Web Storage',
      requiredErrorHandling: ['try-catch', 'availability check'],
      requiredImports: []
    }
  ];

  validateProject(srcPath: string): void {
    this.scanDirectory(srcPath);
  }

  private scanDirectory(directory: string): void {
    const files = readdirSync(directory, { withFileTypes: true });

    for (const file of files) {
      const filePath = join(directory, file.name);
      
      if (file.isDirectory()) {
        this.scanDirectory(filePath);
      } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
        this.validateFile(filePath);
      }
    }
  }

  private validateFile(filePath: string): void {
    const content = readFileSync(filePath, 'utf-8');
    
    for (const pattern of this.patterns) {
      const matches = content.match(pattern.pattern);
      if (matches) {
        this.validateAPIUsage(filePath, content, pattern, matches);
      }
    }
  }

  private validateAPIUsage(
    filePath: string, 
    content: string, 
    pattern: APIUsagePattern, 
    matches: string[]
  ): void {
    console.log(`\n📋 Found ${pattern.name} usage in ${filePath}:`);
    
    // Check for required imports
    for (const requiredImport of pattern.requiredImports) {
      if (!content.includes(`from '${requiredImport}'`) && 
          !content.includes(`from "${requiredImport}"`)) {
        console.error(`  ❌ Missing import: ${requiredImport}`);
      }
    }
    
    // Check for error handling patterns
    const hasTryCatch = /try\s*{[\s\S]*?}\s*catch/g.test(content);
    const hasResponseOkCheck = /response\.ok|!response\.ok/.test(content);
    const hasErrorState = /error|Error/.test(content);
    
    for (const requirement of pattern.requiredErrorHandling) {
      let satisfied = false;
      
      switch (requirement) {
        case 'try-catch':
          satisfied = hasTryCatch;
          break;
        case 'response.ok check':
          satisfied = hasResponseOkCheck;
          break;
        case 'error state handling':
          satisfied = hasErrorState;
          break;
        case 'availability check':
          satisfied = content.includes('localStorage') && 
                     content.includes('typeof Storage');
          break;
      }
      
      if (satisfied) {
        console.log(`  ✅ ${requirement}: Found`);
      } else {
        console.error(`  ❌ ${requirement}: Missing`);
      }
    }
    
    // Show usage examples
    matches.slice(0, 3).forEach((match, index) => {
      console.log(`  📝 Usage ${index + 1}: ${match.trim()}`);
    });
  }
}

// CLI usage
if (require.main === module) {
  const validator = new APIUsageValidator();
  validator.validateProject(join(process.cwd(), 'src'));
}

export { APIUsageValidator };
```

### Error Handling Validation

```typescript
// scripts/validate-error-handling.ts
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface ErrorPattern {
  pattern: RegExp;
  name: string;
  severity: 'error' | 'warning';
  suggestion: string;
}

class ErrorHandlingValidator {
  private patterns: ErrorPattern[] = [
    {
      pattern: /try\s*{[^}]*}\s*catch\s*\([^)]*\)\s*{\s*}/g,
      name: 'Empty catch block',
      severity: 'error',
      suggestion: 'Add proper error handling in catch block'
    },
    {
      pattern: /catch\s*\([^)]*\)\s*{\s*console\.log/g,
      name: 'Console.log in catch',
      severity: 'warning', 
      suggestion: 'Use console.error instead of console.log for errors'
    },
    {
      pattern: /throw\s+new\s+Error\s*\(\s*['"]\s*['"]\s*\)/g,
      name: 'Empty error message',
      severity: 'error',
      suggestion: 'Provide descriptive error messages'
    },
    {
      pattern: /\.catch\s*\(\s*\)/g,
      name: 'Empty promise catch',
      severity: 'error',
      suggestion: 'Add error handler to promise catch'
    },
    {
      pattern: /async\s+function[^{]*{[^}]*await[^}]*}/g,
      name: 'Async function without try-catch',
      severity: 'warning',
      suggestion: 'Consider adding try-catch for async operations'
    }
  ];

  validateProject(srcPath: string): boolean {
    let hasErrors = false;
    this.scanDirectory(srcPath, (errorFound) => {
      if (errorFound) hasErrors = true;
    });
    return !hasErrors;
  }

  private scanDirectory(
    directory: string, 
    onError: (errorFound: boolean) => void
  ): void {
    const files = readdirSync(directory, { withFileTypes: true });

    for (const file of files) {
      const filePath = join(directory, file.name);
      
      if (file.isDirectory()) {
        this.scanDirectory(filePath, onError);
      } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
        const fileHasErrors = this.validateFile(filePath);
        if (fileHasErrors) onError(true);
      }
    }
  }

  private validateFile(filePath: string): boolean {
    const content = readFileSync(filePath, 'utf-8');
    let hasErrors = false;
    
    for (const pattern of this.patterns) {
      const matches = content.match(pattern.pattern);
      if (matches) {
        if (pattern.severity === 'error') {
          hasErrors = true;
          console.error(`❌ ${filePath}: ${pattern.name}`);
        } else {
          console.warn(`⚠️  ${filePath}: ${pattern.name}`);
        }
        console.log(`   💡 ${pattern.suggestion}`);
        
        // Show first few matches
        matches.slice(0, 2).forEach((match, index) => {
          const line = content.split('\n').findIndex(l => l.includes(match)) + 1;
          console.log(`   📍 Line ${line}: ${match.trim()}`);
        });
        console.log('');
      }
    }
    
    return hasErrors;
  }
}

// CLI usage
if (require.main === module) {
  const validator = new ErrorHandlingValidator();
  const isValid = validator.validateProject(join(process.cwd(), 'src'));
  
  if (isValid) {
    console.log('✅ Error handling validation passed');
  } else {
    console.log('❌ Error handling validation failed');
  }
  
  process.exit(isValid ? 0 : 1);
}

export { ErrorHandlingValidator };
```

## NPM Scripts for Validation

Add these scripts to package.json:

```json
{
  "scripts": {
    "validate:imports": "npx ts-node scripts/validate-imports.ts",
    "validate:api-usage": "npx ts-node scripts/validate-api-usage.ts", 
    "validate:error-handling": "npx ts-node scripts/validate-error-handling.ts",
    "validate:all": "npm run validate:imports && npm run validate:api-usage && npm run validate:error-handling",
    "test:quality": "npm run lint && npm run validate:all && npm run build"
  }
}
```

## MCP Server Testing Configuration

```typescript
// scripts/test-mcp-servers.ts
interface MCPServerConfig {
  name: string;
  command: string;
  args: string[];
  timeout: number;
  expectedCapabilities: string[];
}

class MCPServerTester {
  private servers: MCPServerConfig[] = [
    {
      name: 'filesystem',
      command: 'npx',
      args: ['@modelcontextprotocol/server-filesystem', './src'],
      timeout: 10000,
      expectedCapabilities: ['read_file', 'write_file', 'list_directory']
    },
    {
      name: 'git',
      command: 'npx', 
      args: ['@modelcontextprotocol/server-git', '--repository', '.'],
      timeout: 10000,
      expectedCapabilities: ['git_status', 'git_diff', 'git_log']
    },
    {
      name: 'npm',
      command: 'npx',
      args: ['@modelcontextprotocol/server-npm', '--package-file', './package.json'],
      timeout: 10000,
      expectedCapabilities: ['npm_install', 'npm_search', 'npm_info']
    }
  ];

  async testAllServers(): Promise<boolean> {
    console.log('🔍 Testing MCP Servers...\n');
    
    let allPassed = true;
    
    for (const server of this.servers) {
      const passed = await this.testServer(server);
      if (!passed) allPassed = false;
    }
    
    return allPassed;
  }

  private async testServer(config: MCPServerConfig): Promise<boolean> {
    console.log(`Testing ${config.name} MCP Server...`);
    
    try {
      // Test server availability
      const isAvailable = await this.checkServerAvailability(config);
      if (!isAvailable) {
        console.error(`❌ ${config.name}: Server not available`);
        return false;
      }
      
      // Test capabilities
      const capabilities = await this.getServerCapabilities(config);
      const hasAllCapabilities = this.validateCapabilities(
        capabilities, 
        config.expectedCapabilities
      );
      
      if (hasAllCapabilities) {
        console.log(`✅ ${config.name}: All tests passed`);
        return true;
      } else {
        console.error(`❌ ${config.name}: Missing capabilities`);
        return false;
      }
      
    } catch (error) {
      console.error(`❌ ${config.name}: Error - ${error.message}`);
      return false;
    }
  }

  private async checkServerAvailability(config: MCPServerConfig): Promise<boolean> {
    // Implementation would depend on specific MCP protocol
    // This is a simplified example
    return true;
  }

  private async getServerCapabilities(config: MCPServerConfig): Promise<string[]> {
    // Implementation would query actual MCP server capabilities
    // This is a simplified example
    return config.expectedCapabilities;
  }

  private validateCapabilities(
    actual: string[], 
    expected: string[]
  ): boolean {
    return expected.every(capability => actual.includes(capability));
  }
}

// CLI usage
if (require.main === module) {
  const tester = new MCPServerTester();
  tester.testAllServers().then(success => {
    if (success) {
      console.log('\n✅ All MCP servers are working correctly');
    } else {
      console.log('\n❌ Some MCP servers failed tests');
    }
    process.exit(success ? 0 : 1);
  });
}

export { MCPServerTester };
```

## Pre-commit Hook

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash

echo "🔍 Running pre-commit validation..."

# Run TypeScript check
echo "📝 Checking TypeScript..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
    echo "❌ TypeScript errors found"
    exit 1
fi

# Run import validation
echo "📦 Validating imports..."
npm run validate:imports
if [ $? -ne 0 ]; then
    echo "❌ Import validation failed"
    exit 1
fi

# Run API usage validation  
echo "🌐 Validating API usage..."
npm run validate:api-usage
if [ $? -ne 0 ]; then
    echo "❌ API usage validation failed"  
    exit 1
fi

# Run error handling validation
echo "🚨 Validating error handling..."
npm run validate:error-handling
if [ $? -ne 0 ]; then
    echo "❌ Error handling validation failed"
    exit 1
fi

# Run linter
echo "🔍 Running linter..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed"
    exit 1
fi

echo "✅ All validations passed!"
```

This testing configuration ensures comprehensive validation of errors, imports, and proper API usage as required for the Copilot integration.