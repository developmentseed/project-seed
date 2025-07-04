# project-seed CLI

Command line interface for generating new SPA projects based on the project-seed template.

## Installation

The CLI is part of the project-seed repository and can be used locally during development.

## Usage

```bash
# Generate a new project
node cli/dist/index.js my-project-name

# Show help
node cli/dist/index.js --help

# Show version
node cli/dist/index.js --version
```

## Development

### Setup

```bash
cd cli
pnpm install
```

### Build

```bash
pnpm build
```

The CLI is built using [tsup](https://github.com/egoist/tsup) and outputs to `dist/index.js`.

### Development Mode

```bash
pnpm dev
```

Runs tsup in watch mode, automatically rebuilding on file changes.

### Testing

```bash
pnpm test
```

### Linting

```bash
pnpm lint
```

## Generated Projects

Projects are generated in `cli/generated/` directory. This directory is gitignored to prevent generated projects from being committed.

### What Gets Generated

- Complete copy of the project-seed template
- Project name replaced in `package.json`
- Template placeholders replaced in `README.md`
- `.env` file with default Vite environment variables
- All development dependencies and configuration files

### Template Processing

The generator:

1. Copies all files from the root template (excluding CLI and generated directories)
2. Replaces project name in `package.json`
3. Processes `_README.md` template and renames it to `README.md`
4. Creates `.env` file with default environment variables
