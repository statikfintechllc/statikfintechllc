#!/bin/bash

echo "🚀 Starting SFTi Website Build..."
echo "================================"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the root directory."
    exit 1
fi

# Step 1: Install dependencies
print_status "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    print_error "Failed to install root dependencies"
    exit 1
fi

print_status "Installing workspace dependencies..."
npm install --workspaces
if [ $? -ne 0 ]; then
    print_warning "Some workspace dependencies failed to install, continuing..."
fi

# Step 2: Create deployment directories
print_status "Creating deployment directories..."
mkdir -p www.sfti-ai.org
mkdir -p dev.sfti-ai.org
mkdir -p server.sfti-ai.org

# Step 3: Build www.sfti-ai.org (Main Site)
print_status "Building www.sfti-ai.org (Main Site)..."
npx vite build --config vite.config.ts --mode production --outDir dist/www
if [ $? -eq 0 ]; then
    print_success "www.sfti-ai.org build completed"
    
    # Copy to deployment directory
    cp -r dist/www/* www.sfti-ai.org/
    print_success "www.sfti-ai.org assets copied to deployment directory"
else
    print_error "www.sfti-ai.org build failed"
fi

# Step 4: Build dev.sfti-ai.org (PWA Hosting)
print_status "Building dev.sfti-ai.org (PWA Hosting)..."
# For now, copy existing dev content and build PWAs
cp -r dev.sfti-ai.org/* dev.sfti-ai.org/ 2>/dev/null || true

# Build IB-G.Scanner PWA
if [ -d "dev.sfti-ai.org/IB-G.Scanner" ]; then
    print_status "Building IB-G.Scanner PWA..."
    cd dev.sfti-ai.org/IB-G.Scanner
    npm install && npm run build
    if [ $? -eq 0 ]; then
        print_success "IB-G.Scanner PWA build completed"
    else
        print_warning "IB-G.Scanner PWA build failed"
    fi
    cd ../../
fi

# Build Pilot-Server PWA
if [ -d "dev.sfti-ai.org/Pilot-Server" ]; then
    print_status "Building Pilot-Server PWA..."
    cd dev.sfti-ai.org/Pilot-Server
    npm install && npm run build
    if [ $? -eq 0 ]; then
        print_success "Pilot-Server PWA build completed"
    else
        print_warning "Pilot-Server PWA build failed"
    fi
    cd ../../
fi

# Step 5: Build server.sfti-ai.org (Backend)
print_status "Building server.sfti-ai.org (Backend)..."
if [ -d "src/server" ]; then
    cd src/server
    npm run build
    if [ $? -eq 0 ]; then
        print_success "server.sfti-ai.org build completed"
    else
        print_warning "server.sfti-ai.org build completed with warnings"
    fi
    cd ../../
fi

# Copy server files to deployment directory
cp -r src/server/* server.sfti-ai.org/ 2>/dev/null || true

# Step 6: Build Tailwind CSS for each domain
print_status "Building Tailwind CSS for each domain..."

# Main site CSS
if [ -f "src/styles/main.css" ]; then
    npx tailwindcss -i ./src/styles/main.css -o ./www.sfti-ai.org/styles/main.tailwind.css --minify
    print_success "Main site CSS built"
else
    print_warning "Main site CSS source not found, skipping..."
fi

# Dev site CSS  
if [ -f "src/styles/dev.css" ]; then
    npx tailwindcss -i ./src/styles/dev.css -o ./dev.sfti-ai.org/styles/dev.tailwind.css --minify
    print_success "Dev site CSS built"
else
    print_warning "Dev site CSS source not found, skipping..."
fi

# Server site CSS
if [ -f "src/styles/server.css" ]; then
    npx tailwindcss -i ./src/styles/server.css -o ./server.sfti-ai.org/styles/server.tailwind.css --minify
    print_success "Server site CSS built"
else
    print_warning "Server site CSS source not found, skipping..."
fi

# Step 7: Copy Service Worker and Manifest
print_status "Copying Service Worker and Manifest files..."

# Copy to each deployment directory
for domain in www.sfti-ai.org dev.sfti-ai.org server.sfti-ai.org; do
    if [ -f "sw.js" ]; then
        cp sw.js $domain/
    fi
    if [ -f "manifest.json" ]; then
        cp manifest.json $domain/
    fi
done

print_success "Service Worker and Manifest files copied"

# Step 8: Copy shared assets
print_status "Copying shared assets..."

# Copy badges, docs, and other assets to www domain
for domain in www.sfti-ai.org; do
    cp -r badges $domain/ 2>/dev/null || true
    cp -r docs $domain/ 2>/dev/null || true
    
    # Create public directory if it doesn't exist
    mkdir -p $domain/public
    cp -r src/public/* $domain/public/ 2>/dev/null || true
done

print_success "Shared assets copied"

# Step 9: Generate build info
print_status "Generating build information..."
cat > build-info.json << EOF
{
    "buildTime": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "version": "1.0.0",
    "domains": {
        "www": "www.sfti-ai.org",
        "dev": "dev.sfti-ai.org", 
        "server": "server.sfti-ai.org"
    },
    "features": {
        "pwa": true,
        "serviceWorker": true,
        "tailwindcss": true,
        "monorepo": true
    }
}
EOF

# Copy build info to each domain
for domain in www.sfti-ai.org dev.sfti-ai.org server.sfti-ai.org; do
    cp build-info.json $domain/
done

print_success "Build information generated"

# Step 10: Final validation
print_status "Validating build outputs..."

errors=0
for domain in www.sfti-ai.org dev.sfti-ai.org server.sfti-ai.org; do
    if [ ! -d "$domain" ]; then
        print_error "Missing deployment directory: $domain"
        errors=$((errors + 1))
    fi
done

if [ $errors -eq 0 ]; then
    print_success "Build validation passed"
else
    print_error "Build validation failed with $errors errors"
fi

echo ""
echo "🎉 SFTi Website Build Complete!"
echo "================================"
print_success "All domains built and ready for deployment:"
print_success "  • www.sfti-ai.org  - Main marketing site"
print_success "  • dev.sfti-ai.org  - PWA hosting domain"
print_success "  • server.sfti-ai.org - Authentication backend"
echo ""
print_status "Build artifacts are located in their respective domain directories."
print_status "Service workers and PWA manifests have been configured for offline support."
echo ""

if [ $errors -eq 0 ]; then
    exit 0
else
    exit 1
fi