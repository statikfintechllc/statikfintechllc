#!/usr/bin/env node

/**
 * Simple API usage validation script for Copilot integration
 * Validates proper error handling and patterns in API usage
 */

const fs = require('fs');
const path = require('path');

class SimpleAPIValidator {
  constructor() {
    this.patterns = [
      {
        pattern: /fetch\s*\([^)]+\)/g,
        name: 'fetch API',
        requiredPatterns: [
          { pattern: /try\s*{[\s\S]*?}\s*catch/g, name: 'try-catch block' },
          { pattern: /response\.ok|!response\.ok/g, name: 'response.ok check' }
        ]
      },
      {
        pattern: /axios\.(get|post|put|delete|patch)/g,
        name: 'axios',
        requiredPatterns: [
          { pattern: /try\s*{[\s\S]*?}\s*catch/g, name: 'try-catch block' }
        ]
      },
      {
        pattern: /localStorage\.|sessionStorage\./g,
        name: 'Web Storage',
        requiredPatterns: [
          { pattern: /try\s*{[\s\S]*?}\s*catch/g, name: 'try-catch block' }
        ]
      }
    ];
  }

  validateProject(srcPath) {
    console.log('🌐 Validating API usage patterns...');
    
    let hasIssues = false;
    this.scanDirectory(srcPath, (issueFound) => {
      if (issueFound) hasIssues = true;
    });
    
    if (!hasIssues) {
      console.log('✅ API usage validation passed');
    }
    
    return !hasIssues;
  }

  scanDirectory(directory, onIssue) {
    if (!fs.existsSync(directory)) {
      return;
    }

    const files = fs.readdirSync(directory, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.join(directory, file.name);
      
      if (file.isDirectory()) {
        this.scanDirectory(filePath, onIssue);
      } else if (file.name.endsWith('.ts') || file.name.endsWith('.tsx')) {
        const fileHasIssues = this.validateFile(filePath);
        if (fileHasIssues) onIssue(true);
      }
    }
  }

  validateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    let hasIssues = false;
    
    for (const apiPattern of this.patterns) {
      const matches = content.match(apiPattern.pattern);
      if (matches) {
        console.log(`\n📋 Found ${apiPattern.name} usage in ${path.basename(filePath)}:`);
        
        // Check for required patterns
        for (const required of apiPattern.requiredPatterns) {
          const hasPattern = required.pattern.test(content);
          
          if (hasPattern) {
            console.log(`  ✅ ${required.name}: Found`);
          } else {
            console.error(`  ❌ ${required.name}: Missing`);
            hasIssues = true;
          }
        }
        
        // Show usage examples
        matches.slice(0, 2).forEach((match, index) => {
          console.log(`  📝 Usage ${index + 1}: ${match.trim()}`);
        });
      }
    }
    
    return hasIssues;
  }
}

// CLI usage
if (require.main === module) {
  const validator = new SimpleAPIValidator();
  const srcPath = path.join(process.cwd(), 'src');
  const isValid = validator.validateProject(srcPath);
  process.exit(isValid ? 0 : 1);
}

module.exports = { SimpleAPIValidator };