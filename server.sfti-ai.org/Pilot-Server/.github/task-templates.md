# Task Templates for Copilot

This file contains structured task templates that GitHub Copilot can use to approach common development activities in a systematic way.

## Feature Development Template

### Phase 1: Analysis and Planning
**Objective**: Understand requirements and plan implementation approach

**Checklist**:
- [ ] Read and understand feature requirements completely
- [ ] Identify all affected components and files
- [ ] Review existing similar features for patterns
- [ ] Check for potential breaking changes
- [ ] Identify required dependencies or updates
- [ ] Plan testing strategy (unit, integration, manual)
- [ ] Consider accessibility and responsive design needs
- [ ] Estimate complexity and potential risks

**Deliverables**:
- Requirements analysis document
- Implementation plan with file changes
- Testing strategy outline

### Phase 2: Implementation Setup
**Objective**: Prepare development environment and create scaffolding

**Checklist**:
- [ ] Create or update TypeScript interfaces
- [ ] Set up component scaffolding if needed
- [ ] Install any required dependencies
- [ ] Update configuration files if needed
- [ ] Create placeholder tests
- [ ] Set up development environment

**Deliverables**:
- Updated package.json if needed
- Component scaffolding
- Initial test files

### Phase 3: Core Implementation
**Objective**: Implement the main feature functionality

**Checklist**:
- [ ] Implement core component logic
- [ ] Add proper TypeScript typing
- [ ] Implement error handling
- [ ] Add loading states where appropriate
- [ ] Follow existing code patterns and conventions
- [ ] Ensure components are accessible
- [ ] Test basic functionality manually

**Deliverables**:
- Working feature implementation
- Proper error handling
- TypeScript compliance

### Phase 4: Testing and Quality Assurance
**Objective**: Verify feature works correctly and meets quality standards

**Checklist**:
- [ ] Run TypeScript compilation check
- [ ] Run ESLint and fix any issues
- [ ] Test feature manually in all scenarios
- [ ] Test responsive design on different screen sizes
- [ ] Test accessibility with keyboard navigation
- [ ] Test error scenarios and edge cases
- [ ] Verify no existing functionality is broken
- [ ] Check performance impact

**Deliverables**:
- Passing lint checks
- Manual testing results
- Performance verification

### Phase 5: Documentation and Cleanup
**Objective**: Document changes and clean up code

**Checklist**:
- [ ] Add or update component documentation
- [ ] Update README if needed
- [ ] Clean up any temporary code or comments
- [ ] Verify all imports are used
- [ ] Remove any unused dependencies
- [ ] Final code review

**Deliverables**:
- Updated documentation
- Clean, production-ready code

## Bug Fix Template

### Phase 1: Bug Reproduction
**Objective**: Understand and consistently reproduce the bug

**Checklist**:
- [ ] Read bug report completely
- [ ] Reproduce the bug in local development
- [ ] Identify exact steps to reproduce
- [ ] Document expected vs actual behavior
- [ ] Check browser console for errors
- [ ] Check network requests in DevTools
- [ ] Check server logs if applicable
- [ ] Determine severity and urgency

**Deliverables**:
- Detailed reproduction steps
- Error logs and screenshots
- Root cause hypothesis

### Phase 2: Root Cause Analysis
**Objective**: Identify the underlying cause of the bug

**Checklist**:
- [ ] Trace through the code path that leads to the bug
- [ ] Identify the specific line(s) causing the issue
- [ ] Understand why the code is behaving incorrectly
- [ ] Check if this is a regression or existing issue
- [ ] Identify if this affects other areas of the codebase
- [ ] Consider if this reveals a larger design issue

**Deliverables**:
- Root cause identification
- Impact assessment
- Fix strategy

### Phase 3: Fix Implementation
**Objective**: Implement a targeted fix for the bug

**Checklist**:
- [ ] Implement the minimal fix required
- [ ] Ensure fix doesn't break existing functionality
- [ ] Add or update tests to prevent regression
- [ ] Test the fix thoroughly
- [ ] Consider edge cases that might be affected
- [ ] Review code for similar patterns that might have the same bug

**Deliverables**:
- Targeted bug fix
- Regression tests
- Manual testing verification

### Phase 4: Verification and Cleanup
**Objective**: Verify the fix works and clean up

**Checklist**:
- [ ] Verify original bug is fixed
- [ ] Test all related functionality still works
- [ ] Run full test suite if available
- [ ] Check for any new TypeScript or lint errors
- [ ] Document the fix if it's non-obvious
- [ ] Consider if this fix should be applied elsewhere

**Deliverables**:
- Verified bug fix
- No regressions introduced
- Documentation if needed

## Refactoring Template

### Phase 1: Refactoring Analysis
**Objective**: Understand current code and plan refactoring approach

**Checklist**:
- [ ] Identify the code that needs refactoring
- [ ] Understand current functionality completely
- [ ] Identify all dependencies and consumers
- [ ] Plan the refactoring approach
- [ ] Identify potential breaking changes
- [ ] Consider backwards compatibility needs
- [ ] Plan testing strategy to ensure behavior preservation

**Deliverables**:
- Current code analysis
- Refactoring plan
- Risk assessment

### Phase 2: Test Coverage Setup
**Objective**: Ensure adequate test coverage before refactoring

**Checklist**:
- [ ] Add tests for current behavior if missing
- [ ] Verify all existing tests pass
- [ ] Add integration tests if needed
- [ ] Document expected behavior for complex cases
- [ ] Create test cases for edge cases

**Deliverables**:
- Comprehensive test coverage
- Baseline behavior documentation

### Phase 3: Incremental Refactoring
**Objective**: Refactor code in small, safe steps

**Checklist**:
- [ ] Make small, incremental changes
- [ ] Run tests after each change
- [ ] Verify functionality still works after each step
- [ ] Commit changes frequently
- [ ] Refactor one concern at a time
- [ ] Maintain backwards compatibility where possible

**Deliverables**:
- Incrementally improved code
- Preserved functionality
- Clean commit history

### Phase 4: Final Verification and Cleanup
**Objective**: Verify refactoring is complete and clean

**Checklist**:
- [ ] Run full test suite
- [ ] Verify all functionality still works
- [ ] Check performance hasn't degraded
- [ ] Update documentation if APIs changed
- [ ] Remove any dead code
- [ ] Verify TypeScript compliance
- [ ] Run linting and fix any issues

**Deliverables**:
- Refactored, clean code
- Preserved functionality
- Updated documentation

## MCP Server Integration Template

### Phase 1: MCP Server Analysis
**Objective**: Understand MCP server requirements and capabilities

**Checklist**:
- [ ] Identify which MCP server is needed (filesystem, git, npm, etc.)
- [ ] Review MCP server documentation and capabilities
- [ ] Understand the specific operations needed
- [ ] Plan error handling for MCP operations
- [ ] Consider timeout and retry strategies
- [ ] Plan integration with existing code

**Deliverables**:
- MCP server requirements analysis
- Integration plan
- Error handling strategy

### Phase 2: MCP Server Setup
**Objective**: Configure and test MCP server connection

**Checklist**:
- [ ] Install required MCP server packages
- [ ] Configure MCP server in copilot-config.json
- [ ] Test MCP server connectivity
- [ ] Verify MCP server capabilities
- [ ] Set up proper authentication if needed
- [ ] Configure timeout and retry settings

**Deliverables**:
- Working MCP server configuration
- Connection verification
- Capability testing

### Phase 3: Integration Implementation
**Objective**: Implement MCP server integration in application

**Checklist**:
- [ ] Create MCP client wrapper functions
- [ ] Implement proper error handling
- [ ] Add timeout and retry logic
- [ ] Integrate with existing application flow
- [ ] Add proper TypeScript typing for MCP responses
- [ ] Test all MCP operations thoroughly

**Deliverables**:
- MCP integration code
- Error handling implementation
- Integration testing

### Phase 4: Testing and Validation
**Objective**: Verify MCP integration works reliably

**Checklist**:
- [ ] Test all MCP operations work correctly
- [ ] Test error scenarios (network issues, timeouts)
- [ ] Test retry mechanisms work
- [ ] Verify performance is acceptable
- [ ] Test integration with rest of application
- [ ] Add monitoring/logging for MCP operations

**Deliverables**:
- Comprehensive MCP testing
- Performance validation
- Monitoring setup

## API Integration Template

### Phase 1: API Analysis
**Objective**: Understand API requirements and design integration

**Checklist**:
- [ ] Review API documentation thoroughly
- [ ] Understand authentication requirements
- [ ] Identify all endpoints that will be used
- [ ] Plan error handling for different HTTP status codes
- [ ] Consider rate limiting and throttling
- [ ] Plan data validation and sanitization

**Deliverables**:
- API integration plan
- Authentication strategy
- Error handling design

### Phase 2: API Client Implementation
**Objective**: Create robust API client with proper error handling

**Checklist**:
- [ ] Implement API client with proper typing
- [ ] Add authentication handling
- [ ] Implement request/response interceptors
- [ ] Add proper error handling for all scenarios
- [ ] Implement retry logic for transient failures
- [ ] Add request timeout handling
- [ ] Implement request deduplication if needed

**Deliverables**:
- Robust API client
- Comprehensive error handling
- Authentication implementation

### Phase 3: Integration and Testing
**Objective**: Integrate API client and test thoroughly

**Checklist**:
- [ ] Integrate API client with application components
- [ ] Add loading states for API calls
- [ ] Implement proper error display to users
- [ ] Test all API endpoints work correctly
- [ ] Test error scenarios (network failures, API errors)
- [ ] Test authentication flow
- [ ] Verify data validation works

**Deliverables**:
- Working API integration
- User feedback for API states
- Comprehensive testing

### Phase 4: Performance and Monitoring
**Objective**: Optimize performance and add monitoring

**Checklist**:
- [ ] Add caching where appropriate
- [ ] Implement request deduplication
- [ ] Add performance monitoring
- [ ] Implement proper logging for debugging
- [ ] Consider implementing background refresh
- [ ] Test performance under load

**Deliverables**:
- Optimized API performance
- Monitoring and logging
- Performance testing results

## General Guidelines for All Templates

### Code Quality Standards
- Always run TypeScript compilation check before committing
- Run ESLint and fix all errors before committing
- Ensure all imports are properly resolved
- Add proper error handling for all operations
- Use proper TypeScript typing throughout
- Follow existing code patterns and conventions

### Testing Standards
- Test manually in development environment
- Test error scenarios and edge cases
- Verify responsive design works
- Test accessibility with keyboard navigation
- Ensure no existing functionality is broken
- Test performance impact of changes

### Documentation Standards
- Update README if public APIs change
- Add inline documentation for complex logic
- Update type definitions if needed
- Document any new environment variables or configuration
- Keep documentation current and accurate

### Git Workflow Standards
- Make atomic commits with clear messages
- Keep commits focused on single concerns
- Test before committing
- Use meaningful branch names
- Create pull requests for code review

These templates provide a systematic approach to common development tasks while ensuring quality, testing, and proper documentation throughout the process.