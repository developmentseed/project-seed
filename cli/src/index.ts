#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import { generateProject } from './generator.ts';
import pkg from '../package.json';

const program = new Command();

program.name(pkg.name).description(pkg.description).version(pkg.version);

program
  .argument('[project-name]', 'Name of the project to create')
  .option(
    '-c, --component-library <library>',
    'Component library to use (none, chakra, uswds)'
  )
  .option('-f, --force', 'Overwrite existing directory if it exists')
  .action(
    async (
      projectName: string | undefined,
      options: { componentLibrary?: string; force?: boolean }
    ) => {
      try {
        let finalProjectName = projectName;
        let componentLibrary = options.componentLibrary;

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

        // Check if directory exists and handle interactive confirmation
        const fs = await import('fs-extra');
        const path = await import('path');
        const targetDir = path.default.resolve(
          __dirname,
          '../generated',
          finalProjectName!
        );

        if (await fs.default.pathExists(targetDir)) {
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
          finalProjectName,
          componentLibrary,
          options.force,
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
