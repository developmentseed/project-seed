# project-seed CLI

Command line interface for scaffolding web map applications.

## Installation

The CLI is part of the project-seed repository and can be used locally during development.

## Usage

### Option 1: Run Directly from Source (Development)

For development and testing, you can run the CLI directly from the TypeScript source:

```bash
# Install dependencies first
cd cli
pnpm install

# Run using the convenience script
pnpm start

# Generate with specific project name and component library
pnpm start my-project-name --component-library chakra

# Generate with specific project name, component library, and map library
pnpm start my-project-name --component-library chakra --map-library mapbox-gl

# Show help
pnpm start --help

# Show version
pnpm start --version
```

### Option 2: Build and Run (Production)

For production use or when you want to run the compiled version:

```bash
# Build the CLI
cd cli
pnpm build

# Run the built version
node ./dist/index.js

# Generate with specific project name and component library
node ./dist/index.js my-project-name --component-library chakra

# Generate with specific project name, component library, and map library
node ./dist/index.js my-project-name --component-library chakra --map-library mapbox-gl

# Show help
node ./dist/index.js --help

# Show version
node ./dist/index.js --version
```

### Component Library Options

The CLI supports three component library variants:

- **`none`** - Plain React with minimal dependencies
- **`chakra`** - Chakra UI with theme and provider (default)
- **`uswds`** - USWDS design system with government styling

### Map Library Options

The CLI supports three map library variants:

- **`none`** - No map functionality (default)
- **`mapbox-gl`** - Mapbox GL JS for interactive maps
- **`maplibre-gl`** - MapLibre GL JS (open source alternative)

### Interactive Mode

When run without arguments, the CLI will prompt for:

1. Project name (with validation)
2. Component library selection
3. Map library selection

## Development

### Setup

```bash
cd cli
pnpm install
```

### Development Mode

```bash
pnpm dev
```

Runs tsup in watch mode, automatically rebuilding on file changes.

### Generate All Combinations

For testing and development purposes, you can generate all possible combinations of component libraries and map libraries:

```bash
pnpm generate-all
```

This generates all the projects in the `cli/generated/` directory with descriptive names like `project-seed-chakra-mapbox-gl`. Useful for testing template combinations and QA.

### Linting

```bash
pnpm lint
```

### Type Checking

```bash
pnpm type-check
```

## Generated Projects

Projects are generated in `cli/generated/` directory. This directory is gitignored to prevent generated projects from being committed.

### What Gets Generated

- Complete copy of the base template
- Component library specific files and dependencies
- Project name replaced in `package.json`
- Template placeholders replaced in `README.md`
- `.env` file with default Vite environment variables
- All development dependencies and configuration files

### Template Structure

The CLI uses a modular template system:

```
cli/templates/
├── base/                    # Base template (core project files)
│   ├── app/
│   ├── public/
│   ├── package.json         # Core dependencies only
│   └── ...
├── component-library/       # Component library variants
│   ├── none/
│   │   ├── main.tsx         # Plain React
│   │   └── package.json     # Empty dependencies
│   ├── chakra/
│   │   ├── main.tsx         # Chakra UI provider
│   │   ├── styles/          # Theme files
│   │   └── package.json     # Chakra UI dependencies
│   └── uswds/
│       ├── main.tsx         # USWDS components
│       └── package.json     # USWDS dependencies
└── map/                     # Map library variants
    ├── mapbox-gl/
    │   ├── app.tsx          # Mapbox GL map component
    │   └── package.json     # Mapbox GL dependencies
    └── maplibre-gl/
        ├── app.tsx          # MapLibre GL map component
        └── package.json     # MapLibre GL dependencies
```

### Template Processing

The generator:

1. Copies all files from the base template
2. Applies component library variant (main.tsx + package.json mixin)
3. Applies map library variant (app.tsx + package.json mixin)
4. Replaces project name in `package.json`
5. Processes `_README.md` template and renames it to `README.md`
6. Creates `.env` file with default environment variables

### Adding New Component Libraries

To add a new component library variant:

1. Create a new folder in `cli/templates/component-library/`
2. Add `main.tsx` with the component library setup
3. Add `package.json` with component library dependencies
4. Update the CLI choices in `cli/src/index.ts`
5. Test the new variant

### Adding New Map Libraries

To add a new map library variant:

1. Create a new folder in `cli/templates/map/`
2. Add `app.tsx` with the map library setup
3. Add `package.json` with map library dependencies
4. Update the CLI choices in `cli/src/index.ts`
5. Test the new variant
