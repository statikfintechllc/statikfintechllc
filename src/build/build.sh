#!/bin/bash

# Build Tailwind CSS for each site with their own stylesheets
echo "Building Tailwind CSS per domain..."


# Main site - output to styles/main.tailwind.css
npx tailwindcss -i ./src/styles/main.css -o ./styles/main.tailwind.css --minify

# Dev site - output to styles/dev.tailwind.css
npx tailwindcss -i ./src/styles/dev.css -o ./dev.sfti-ai.org/styles/dev.tailwind.css --minify

# Server site - output to styles/server.tailwind.css
npx tailwindcss -i ./src/styles/server.css -o ./server.sfti-ai.org/styles/server.tailwind.css --minify

echo "Build complete! Each domain now has Tailwind + their own styles."