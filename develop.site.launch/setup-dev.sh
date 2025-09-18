#!/bin/bash

# SFTi Development Environment Setup Script
# Automates the setup and running of all development services

set -e

echo "🔧 SFTi Development Environment Setup"
echo "===================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ to continue.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18+ is required. Current version: $(node --version)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) detected${NC}"

# Install dependencies for all projects
echo -e "\n${BLUE}📦 Installing dependencies...${NC}"

echo "Installing root dependencies..."
npm install

echo "Installing dev IB-G.Scanner dependencies..."
cd dev.sfti-ai.org/IB-G.Scanner && npm install && cd ../..

echo "Installing server IB-G.Scanner dependencies..."  
cd server.sfti-ai.org/IB-G.Scanner && npm install && cd ../..

echo -e "${GREEN}✅ All dependencies installed${NC}"

# Build CSS files
echo -e "\n${BLUE}🎨 Building CSS files...${NC}"
chmod +x build.sh
./build.sh

echo -e "\n${GREEN}🚀 Setup complete! Ready to start development server.${NC}"
echo -e "\n${YELLOW}Run the following command to start all services:${NC}"
echo -e "${BLUE}npm run dev:all${NC}"
echo -e "\n${YELLOW}Or use individual commands:${NC}"
echo -e "  npm run dev:unified    # Start unified development server"
echo -e "  npm run build:all      # Build all projects"
echo -e "  npm run preview:all    # Preview all built projects"

echo -e "\n${YELLOW}Once started, access your applications at:${NC}"
echo -e "  🏠 Main Site:       http://localhost:3333"
echo -e "  📊 Dev Scanner:     http://dev.localhost:3333"
echo -e "  🖥️  Server Scanner:  http://server.localhost:3333"
echo -e "  ⚡ API Server:      http://api.localhost:3333"