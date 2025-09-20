#!/bin/bash

# SFTi Web Templates - Master Build Script
# ========================================
# 
# Builds all domains and components in the proper order
# Handles dependencies, PWA builds, and deployment preparation

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="$PROJECT_ROOT/dist"
TEMP_DIR="$PROJECT_ROOT/.build-tmp"

# Build modes
CLEAN_BUILD=${CLEAN_BUILD:-false}
BUILD_PWA=${BUILD_PWA:-true}
BUILD_STATIC=${BUILD_STATIC:-true}
OPTIMIZE=${OPTIMIZE:-true}

log_info "Starting SFTi Web Templates build process..."
log_info "Project root: $PROJECT_ROOT"
log_info "Build directory: $BUILD_DIR"

# Function to check dependencies
check_dependencies() {
    log_info "Checking build dependencies..."
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js is required but not installed"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        log_error "npm is required but not installed"
        exit 1
    fi
    
    log_success "Dependencies check passed"
}

# Function to clean previous builds
clean_build() {
    if [ "$CLEAN_BUILD" = true ]; then
        log_info "Cleaning previous build artifacts..."
        rm -rf "$BUILD_DIR"
        rm -rf "$TEMP_DIR"
        rm -rf "$PROJECT_ROOT/node_modules/.cache"
        log_success "Build artifacts cleaned"
    fi
}

# Function to install dependencies
install_dependencies() {
    log_info "Installing root dependencies..."
    cd "$PROJECT_ROOT"
    npm install --silent
    
    if [ "$BUILD_PWA" = true ]; then
        # Install PWA dependencies
        if [ -d "$PROJECT_ROOT/dev.sfti-ai.org/IB-G.Scanner" ]; then
            log_info "Installing IB-G.Scanner dependencies..."
            cd "$PROJECT_ROOT/dev.sfti-ai.org/IB-G.Scanner"
            npm install --silent
        fi
        
        if [ -d "$PROJECT_ROOT/dev.sfti-ai.org/Pilot-Server" ]; then
            log_info "Installing Pilot-Server dependencies..."
            cd "$PROJECT_ROOT/dev.sfti-ai.org/Pilot-Server"
            npm install --silent
        fi
    fi
    
    cd "$PROJECT_ROOT"
    log_success "Dependencies installed"
}

# Function to build component system
build_components() {
    log_info "Building component system..."
    
    # Create temporary directory for component builds
    mkdir -p "$TEMP_DIR/components"
    
    # Copy component files
    cp -r "$PROJECT_ROOT/src/components/"* "$TEMP_DIR/components/"
    
    # Process component files (could add minification, etc.)
    if [ "$OPTIMIZE" = true ]; then
        log_info "Optimizing component files..."
        # Add optimization logic here if needed
    fi
    
    log_success "Component system built"
}

# Function to build static sites
build_static_sites() {
    if [ "$BUILD_STATIC" = true ]; then
        log_info "Building static sites with Vite..."
        cd "$PROJECT_ROOT"
        
        # Build with Vite
        npm run build
        
        log_success "Static sites built"
    fi
}

# Function to build PWAs
build_pwas() {
    if [ "$BUILD_PWA" = true ]; then
        log_info "Building PWA applications..."
        
        # Build IB-G.Scanner
        if [ -d "$PROJECT_ROOT/dev.sfti-ai.org/IB-G.Scanner" ]; then
            log_info "Building IB-G.Scanner PWA..."
            cd "$PROJECT_ROOT/dev.sfti-ai.org/IB-G.Scanner"
            npm run build
            
            # Copy built PWA to main dist
            mkdir -p "$BUILD_DIR/dev.sfti-ai.org/IB-G.Scanner"
            cp -r dist/* "$BUILD_DIR/dev.sfti-ai.org/IB-G.Scanner/" 2>/dev/null || log_warning "IB-G.Scanner build output not found"
        fi
        
        # Build Pilot-Server
        if [ -d "$PROJECT_ROOT/dev.sfti-ai.org/Pilot-Server" ]; then
            log_info "Building Pilot-Server PWA..."
            cd "$PROJECT_ROOT/dev.sfti-ai.org/Pilot-Server"
            npm run build
            
            # Copy built PWA to main dist
            mkdir -p "$BUILD_DIR/dev.sfti-ai.org/Pilot-Server"
            cp -r dist/* "$BUILD_DIR/dev.sfti-ai.org/Pilot-Server/" 2>/dev/null || log_warning "Pilot-Server build output not found"
        fi
        
        cd "$PROJECT_ROOT"
        log_success "PWA applications built"
    fi
}

# Function to copy assets
copy_assets() {
    log_info "Copying static assets..."
    
    # Ensure build directory exists
    mkdir -p "$BUILD_DIR"
    
    # Copy badges
    if [ -d "$PROJECT_ROOT/badges" ]; then
        cp -r "$PROJECT_ROOT/badges" "$BUILD_DIR/"
        log_info "Badges copied"
    fi
    
    # Copy docs SVGs
    if [ -d "$PROJECT_ROOT/docs" ]; then
        mkdir -p "$BUILD_DIR/docs"
        cp -r "$PROJECT_ROOT/docs/"* "$BUILD_DIR/docs/"
        log_info "Documentation SVGs copied"
    fi
    
    # Copy src/public assets
    if [ -d "$PROJECT_ROOT/src/public" ]; then
        mkdir -p "$BUILD_DIR/src/public"
        cp -r "$PROJECT_ROOT/src/public/"* "$BUILD_DIR/src/public/"
        log_info "Public assets copied"
    fi
    
    # Copy manifest and service worker
    cp "$PROJECT_ROOT/manifest.json" "$BUILD_DIR/" 2>/dev/null || log_warning "manifest.json not found"
    cp "$PROJECT_ROOT/sw.js" "$BUILD_DIR/" 2>/dev/null || log_warning "sw.js not found"
    
    log_success "Static assets copied"
}

# Function to optimize build
optimize_build() {
    if [ "$OPTIMIZE" = true ]; then
        log_info "Optimizing build output..."
        
        # Remove source maps in production
        find "$BUILD_DIR" -name "*.map" -delete 2>/dev/null || true
        
        # Compress SVGs if available
        if command -v svgo &> /dev/null; then
            find "$BUILD_DIR" -name "*.svg" -exec svgo {} \; 2>/dev/null || true
            log_info "SVGs optimized"
        fi
        
        log_success "Build optimization completed"
    fi
}

# Function to validate build
validate_build() {
    log_info "Validating build output..."
    
    local errors=0
    
    # Check if main files exist
    required_files=(
        "$BUILD_DIR/index.html"
        "$BUILD_DIR/www.sfti-ai.org/index.html"
        "$BUILD_DIR/dev.sfti-ai.org/index.html"
        "$BUILD_DIR/server.sfti-ai.org/index.html"
        "$BUILD_DIR/manifest.json"
        "$BUILD_DIR/sw.js"
    )
    
    for file in "${required_files[@]}"; do
        if [ ! -f "$file" ]; then
            log_error "Required file missing: $file"
            ((errors++))
        fi
    done
    
    # Check if assets exist
    if [ ! -d "$BUILD_DIR/badges" ]; then
        log_warning "Badges directory missing"
    fi
    
    if [ ! -d "$BUILD_DIR/docs" ]; then
        log_warning "Docs directory missing"
    fi
    
    if [ $errors -eq 0 ]; then
        log_success "Build validation passed"
        return 0
    else
        log_error "Build validation failed with $errors errors"
        return 1
    fi
}

# Function to generate build report
generate_report() {
    log_info "Generating build report..."
    
    local report_file="$BUILD_DIR/build-report.txt"
    
    cat > "$report_file" << EOF
SFTi Web Templates Build Report
===============================
Build Date: $(date)
Build Mode: $([ "$OPTIMIZE" = true ] && echo "Production" || echo "Development")
PWA Build: $([ "$BUILD_PWA" = true ] && echo "Enabled" || echo "Disabled")
Static Build: $([ "$BUILD_STATIC" = true ] && echo "Enabled" || echo "Disabled")

Build Structure:
$(find "$BUILD_DIR" -type f | head -20)

Build Size:
$(du -sh "$BUILD_DIR" 2>/dev/null || echo "Unknown")

Components:
- Root launcher: $([ -f "$BUILD_DIR/index.html" ] && echo "✓" || echo "✗")
- Main site: $([ -f "$BUILD_DIR/www.sfti-ai.org/index.html" ] && echo "✓" || echo "✗")
- Dev hub: $([ -f "$BUILD_DIR/dev.sfti-ai.org/index.html" ] && echo "✓" || echo "✗")
- Server portal: $([ -f "$BUILD_DIR/server.sfti-ai.org/index.html" ] && echo "✓" || echo "✗")
- IB-G.Scanner: $([ -d "$BUILD_DIR/dev.sfti-ai.org/IB-G.Scanner" ] && echo "✓" || echo "✗")
- Pilot-Server: $([ -d "$BUILD_DIR/dev.sfti-ai.org/Pilot-Server" ] && echo "✓" || echo "✗")

Assets:
- Badges: $([ -d "$BUILD_DIR/badges" ] && echo "✓" || echo "✗")
- SVG Docs: $([ -d "$BUILD_DIR/docs" ] && echo "✓" || echo "✗")
- Public Assets: $([ -d "$BUILD_DIR/src/public" ] && echo "✓" || echo "✗")
- Service Worker: $([ -f "$BUILD_DIR/sw.js" ] && echo "✓" || echo "✗")
- Manifest: $([ -f "$BUILD_DIR/manifest.json" ] && echo "✓" || echo "✗")
EOF

    log_success "Build report generated: $report_file"
}

# Function to cleanup
cleanup() {
    if [ -d "$TEMP_DIR" ]; then
        rm -rf "$TEMP_DIR"
        log_info "Temporary files cleaned"
    fi
}

# Main build process
main() {
    local start_time=$(date +%s)
    
    # Set up trap for cleanup
    trap cleanup EXIT
    
    # Run build steps
    check_dependencies
    clean_build
    install_dependencies
    build_components
    build_static_sites
    build_pwas
    copy_assets
    optimize_build
    
    # Validate and report
    if validate_build; then
        generate_report
        
        local end_time=$(date +%s)
        local duration=$((end_time - start_time))
        
        log_success "Build completed successfully in ${duration}s"
        log_info "Build output: $BUILD_DIR"
        
        # Show quick stats
        if command -v du &> /dev/null; then
            log_info "Build size: $(du -sh "$BUILD_DIR" | cut -f1)"
        fi
        
        log_info "Build artifacts:"
        find "$BUILD_DIR" -maxdepth 2 -type f -name "*.html" | sed 's|^|  - |'
        
        return 0
    else
        log_error "Build failed validation"
        return 1
    fi
}

# Handle command line arguments
case "${1:-}" in
    "clean")
        CLEAN_BUILD=true
        ;;
    "pwa-only")
        BUILD_STATIC=false
        BUILD_PWA=true
        ;;
    "static-only")
        BUILD_STATIC=true
        BUILD_PWA=false
        ;;
    "dev")
        OPTIMIZE=false
        ;;
    "help"|"-h"|"--help")
        echo "SFTi Web Templates Build Script"
        echo ""
        echo "Usage: $0 [command]"
        echo ""
        echo "Commands:"
        echo "  clean      - Clean build with full rebuild"
        echo "  pwa-only   - Build only PWA applications"
        echo "  static-only - Build only static sites"
        echo "  dev        - Development build (no optimization)"
        echo "  help       - Show this help message"
        echo ""
        echo "Environment Variables:"
        echo "  CLEAN_BUILD - Force clean build (true/false)"
        echo "  BUILD_PWA   - Build PWA apps (true/false)"
        echo "  BUILD_STATIC - Build static sites (true/false)"
        echo "  OPTIMIZE    - Optimize output (true/false)"
        exit 0
        ;;
esac

# Run main build process
main "$@"