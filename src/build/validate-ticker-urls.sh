#!/bin/bash
# Validate that mobile navbar components use correct ticker.gif URL
set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

EXPECTED_URL="https://raw.githubusercontent.com/KDK-Grim/WorkFlowRepo-Mirror/master/docs/ticker-bot/ticker.gif"
OLD_URLS=(
    "crimson-flow.svg"
    "crimson-flow.gif"
    "github.com/statikfintechllc/statikfintechllc/blob/master/docs/c.svg"
)

echo -e "${GREEN}[validate]${NC} Checking mobile navbar components for correct ticker URL..."

FOUND_ERRORS=0

# Check all built mobile navbar components
for navbar_file in "${PROJECT_ROOT}/components/*/mobile/navbar.js"; do
    if [[ ! -f "$navbar_file" ]]; then
        continue
    fi
    
    # Check if file contains the expected URL
    if ! grep -q "$EXPECTED_URL" "$navbar_file"; then
        echo -e "${RED}[validate]${NC} ERROR: $navbar_file missing correct ticker URL"
        FOUND_ERRORS=$((FOUND_ERRORS + 1))
    fi
    
    # Check for old URLs
    for old_url in "${OLD_URLS[@]}"; do
        if grep -q "$old_url" "$navbar_file"; then
            echo -e "${RED}[validate]${NC} ERROR: $navbar_file contains old URL pattern: $old_url"
            FOUND_ERRORS=$((FOUND_ERRORS + 1))
        fi
    done
done

# Check the global template source
GLOBAL_TEMPLATE="${PROJECT_ROOT}/components/global.c/mobile/navbar.js"
if [[ -f "$GLOBAL_TEMPLATE" ]]; then
    if ! grep -q "$EXPECTED_URL" "$GLOBAL_TEMPLATE"; then
        echo -e "${RED}[validate]${NC} ERROR: Global template missing correct ticker URL"
        FOUND_ERRORS=$((FOUND_ERRORS + 1))
    fi
    
    for old_url in "${OLD_URLS[@]}"; do
        if grep -q "$old_url" "$GLOBAL_TEMPLATE"; then
            echo -e "${RED}[validate]${NC} ERROR: Global template contains old URL pattern: $old_url"
            FOUND_ERRORS=$((FOUND_ERRORS + 1))
        fi
    done
fi

if [[ $FOUND_ERRORS -gt 0 ]]; then
    echo -e "${RED}[validate]${NC} Found $FOUND_ERRORS error(s). Build validation failed!"
    exit 1
else
    echo -e "${GREEN}[validate]${NC} All mobile navbar components have correct ticker URL ✓"
    exit 0
fi
