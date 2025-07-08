#!/bin/bash

# Script to generate all component library and map library combinations for easy inspection

set -e # Exit on any error

# Load nvm and use the correct Node version
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"                   # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

# Use the Node version specified in .nvmrc if it exists
if [ -f ".nvmrc" ]; then
  nvm use
fi

echo "Generating all component library and map library combinations..."
echo ""

# Define the variants
component_libraries=("none" "chakra" "uswds")
map_libraries=("none" "mapbox-gl" "maplibre-gl")

# Counter for total projects
total_projects=0

# Generate each combination
for component_lib in "${component_libraries[@]}"; do
  for map_lib in "${map_libraries[@]}"; do
    # Create a descriptive project name
    if [ "$map_lib" = "none" ]; then
      project_name="project-seed-${component_lib}"
    else
      project_name="project-seed-${component_lib}-${map_lib}"
    fi

    echo "Generating $component_lib + $map_lib variant..."
    echo "Project name: $project_name"

    # Generate the project with both component library and map library
    pnpm start "$project_name" --component-library "$component_lib" --map-library "$map_lib" --force

    echo "✅ Generated $component_lib + $map_lib variant"
    echo ""

    ((total_projects++))
  done
done

echo "🎉 All combinations generated successfully!"
echo ""
echo "Generated projects ($total_projects total):"
echo ""

# List all generated projects
for component_lib in "${component_libraries[@]}"; do
  for map_lib in "${map_libraries[@]}"; do
    if [ "$map_lib" = "none" ]; then
      project_name="project-seed-${component_lib}"
      echo "  - $project_name ($component_lib component library, no map)"
    else
      project_name="project-seed-${component_lib}-${map_lib}"
      echo "  - $project_name ($component_lib component library + $map_lib map)"
    fi
  done
done
