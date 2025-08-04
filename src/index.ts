#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import { generateProject } from './generator/index.ts';
import pkg from '../package.json';
import fs from 'fs-extra';
import { resolveFromImportMeta } from './generator/resolve-from-import-path.ts';

const program = new Command();

program.name(pkg.name).description(pkg.description).version(pkg.version);

program
  .argument('[project-name]', 'Name of the project to create')
  .option(
    '-c, --component-library <library>',
    'Component library to use (none, chakra, uswds)'
  )
  .option('-m, --map', 'Include map functionality')
  .option(
    '-l, --map-library <library>',
    'Map library to use (mapbox-gl, maplibre)'
  )
  .option('-f, --force', 'Overwrite existing directory if it exists')
  .action(
    async (
      projectName: string | undefined,
      options: {
        componentLibrary?: string;
        map?: boolean;
        mapLibrary?: string;
        force?: boolean;
      }
    ) => {
      try {
        let finalProjectName = projectName;
        let componentLibrary = options.componentLibrary;
        let mapLibrary = options.mapLibrary;

        // If project name is not provided, prompt for it
        if (!finalProjectName) {
          const { name } = await inquirer.prompt([
            {
              type: 'input',
              name: 'name',
              message: 'What is the name of your project?',
              validate: (input: string) => {
                if (!input.trim()) {
                  return 'Project name is required';
                }
                if (!/^[a-z0-9-]+$/.test(input)) {
                  return 'Project name must contain only lowercase letters, numbers, and hyphens';
                }
                return true;
              }
            }
          ]);
          finalProjectName = name;
        }

        // Ensure we have a valid project name
        if (!finalProjectName || !finalProjectName.trim()) {
          throw new Error('Project name is required');
        }

        // If component library is not provided, prompt for it
        if (!componentLibrary) {
          const { library } = await inquirer.prompt([
            {
              type: 'list',
              name: 'library',
              message: 'Which component library would you like to use?',
              choices: [
                { name: 'No component library (plain React)', value: 'none' },
                { name: 'Chakra UI', value: 'chakra' },
                { name: 'React USWDS', value: 'uswds' }
              ]
            }
          ]);
          componentLibrary = library;
        }

        // Ensure we have a valid component library
        if (!componentLibrary) {
          throw new Error('Component library is required');
        }

        // If map library is not provided, prompt for it
        if (!mapLibrary) {
          const { mapChoice } = await inquirer.prompt([
            {
              type: 'list',
              name: 'mapChoice',
              message: 'Would you like to add a map to your project?',
              choices: [
                { name: 'No map', value: 'none' },
                { name: 'Mapbox GL', value: 'mapbox-gl' },
                { name: 'MapLibre (open source)', value: 'maplibre' }
              ],
              default: 'none'
            }
          ]);
          mapLibrary = mapChoice;
        }

        // Check if directory exists and handle interactive confirmation
        const targetDir = resolveFromImportMeta(
          import.meta.url,
          '../generated',
          finalProjectName!
        );

        if (await fs.pathExists(targetDir)) {
          if (options.force) {
            // Force is set, proceed with overwrite
          } else {
            // Force is not set, ask user for confirmation
            const { overwrite } = await inquirer.prompt([
              {
                type: 'confirm',
                name: 'overwrite',
                message: `Directory '${finalProjectName}' already exists. Do you want to overwrite it?`,
                default: false
              }
            ]);

            if (!overwrite) {
              // eslint-disable-next-line no-console
              console.log('Project generation cancelled.');
              return;
            }

            // Set force to true if user confirms overwrite
            options.force = true;
          }
        }

        await generateProject(
          finalProjectName!,
          componentLibrary,
          mapLibrary || 'none',
          options.force || false,
          targetDir
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error generating project:', error);
        process.exit(1);
      }
    }
  );

program.parse();
