#!/usr/bin/env node

import { Command } from 'commander';
import { generateProject } from './generator.ts';
import pkg from '../package.json';

const program = new Command();

program.name(pkg.name).description(pkg.description).version(pkg.version);

program
  .argument('[project-name]', 'Name of the project to create')
  .action(async (projectName: string | undefined) => {
    try {
      await generateProject(projectName);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error generating project:', error);
      process.exit(1);
    }
  });

program.parse();
