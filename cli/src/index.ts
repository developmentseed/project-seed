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
  .action(
    async (
      projectName: string | undefined,
      options: { componentLibrary?: string }
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

        await generateProject(finalProjectName, componentLibrary);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error generating project:', error);
        process.exit(1);
      }
    }
  );

program.parse();
