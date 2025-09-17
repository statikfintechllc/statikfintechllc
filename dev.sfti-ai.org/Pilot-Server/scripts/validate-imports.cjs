#!/usr/bin/env node

/**
 * Simple import validation script for Copilot integration
 * Validates that all imports can be resolved and dependencies exist
 */

const fs = require('fs');
const path = require('path');

class SimpleImportValidator {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.srcPath = path.join(projectRoot, 'src');
    
    try {
      this.packageJson = JSON.parse(
        fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf-8')
      );
    } catch (error) {
      console.error('❌ Could not read package.json');
      process.exit(1);
    }
  }

  validateProject() {
    console.log('🔍 Validating imports...');
    
    const results = [];
    this.scanDirectory(this.srcPath, results);
    
    let hasErrors = false;
    
    for (const result of results) {
      if (result.errors.length > 0) {
        hasErrors = true;
        console.error(`\n❌ ${path.relative(this.projectRoot, result.file)}:`);
        for (const error of result.errors) {
          console.error(`  ${error}`);
        }
      }
    }
    
    if (!hasErrors) {
      console.log('✅ All imports are valid');
    }
    
    return !hasErrors;
  }

  scanDirectory(directory, results) {
    if (!fs.existsSync(directory)) {
      return;
    }

    const files = fs.readdirSync(directory, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(directory, file.name);
      
      if (file.isDirectory()) {
        this.scanDirectory(filePath, results);
      } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
        try {
          const result = this.validateFile(filePath);
          if (result.errors.length > 0) {
            results.push(result);
          }
        } catch (error) {
          results.push({
            file: filePath,
            errors: [`Failed to parse file: ${error.message}`]
          });
        }
      }
    }
  }

  validateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const result = {
      file: filePath,
      errors: []
    };

    // Improved regex to find all import statements, including type-only and side-effect imports
    const importRegex = /^import(?:\s+type)?(?:[\s\S]*?from)?\s*['"]([^'"]+)['"];?/gm;
    
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const moduleName = match[1];
      const error = this.validateImport(moduleName, filePath);
      
      if (error) {
        result.errors.push(`Invalid import "${moduleName}": ${error}`);
      }
    }

    return result;
  }

  validateImport(moduleName, fromFile) {
    if (moduleName.startsWith('.')) {
      // Relative import
      const resolvedPath = this.resolveRelativeImport(moduleName, fromFile);
      if (!fs.existsSync(resolvedPath)) {
        return `File not found: ${resolvedPath}`;
      }
    } else if (moduleName.startsWith('@/')) {
      // TypeScript path alias (@/ -> src/)
      const relativePath = moduleName.replace('@/', '');
      const resolvedPath = path.join(this.srcPath, relativePath);
      if (!this.checkFileExists(resolvedPath)) {
        return `File not found: ${resolvedPath}`;
      }
    } else if (!moduleName.startsWith('/') && !moduleName.includes('src/')) {
      // External dependency
      if (!this.checkExternalDependency(moduleName)) {
        return `Dependency not found in package.json`;
      }
    }

    return null;
  }

  resolveRelativeImport(moduleName, fromFile) {
    const dir = path.dirname(fromFile);
    const resolved = path.resolve(dir, moduleName);
    
    // Check for file extensions
    const extensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];
    
    if (fs.existsSync(resolved)) {
      return resolved;
    }
    
    for (const ext of extensions) {
      const withExt = resolved + ext;
      if (fs.existsSync(withExt)) {
        return withExt;
      }
    }
    
    // Check for index files
    for (const ext of extensions) {
      const indexFile = path.join(resolved, `index${ext}`);
      if (fs.existsSync(indexFile)) {
        return indexFile;
      }
    }
    
    return resolved;
  }

  checkFileExists(filePath) {
    const extensions = ['.ts', '.tsx', '.js', '.jsx'];
    
    if (fs.existsSync(filePath)) return true;
    
    for (const ext of extensions) {
      if (fs.existsSync(filePath + ext)) return true;
    }
    
    return fs.existsSync(path.join(filePath, 'index.ts')) || 
           fs.existsSync(path.join(filePath, 'index.tsx'));
  }

  checkExternalDependency(moduleName) {
    const deps = {
      ...this.packageJson.dependencies || {},
      ...this.packageJson.devDependencies || {}
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
  const validator = new SimpleImportValidator(process.cwd());
  const isValid = validator.validateProject();
  process.exit(isValid ? 0 : 1);
}

module.exports = { SimpleImportValidator };