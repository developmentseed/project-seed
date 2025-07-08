#!/bin/bash

# Script to generate all component library variants for easy inspection

set -e # Exit on any error

# Load nvm and use the correct Node version
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"                   # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

# Use the Node version specified in .nvmrc if it exists
if [ -f ".nvmrc" ]; then
  nvm use
fi

echo "Generating all component library variants..."
echo ""

# Define the variants
variants=("none" "chakra" "uswds")

# Generate each variant
for variant in "${variants[@]}"; do
  echo "Generating $variant variant..."
  pnpm start "project-seed-$variant" --component-library "$variant" --force
  echo "✅ Generated $variant variant"
  echo ""
done

echo "🎉 All variants generated successfully!"
echo ""
echo "Generated projects:"
for variant in "${variants[@]}"; do
  echo "  - project-seed-$variant ($variant variant)"
done
echo ""
echo "All projects are located in: generated/"
