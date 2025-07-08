import fs from 'fs-extra';
import path from 'path';
import { replaceInFile } from './replace-in-file';

/**
 * Processes the _README.md template file by replacing placeholders and renaming it to README.md.
 * Converts the project name to a title case format and creates a descriptive summary.
 * Uses regex replacement to update template placeholders with actual project information.
 *
 * @param targetDir - Directory containing the _README.md template file
 * @param projectName - Project name to use for title and description replacements
 */
export async function processReadme(
  targetDir: string,
  projectName: string
): Promise<void> {
  const readmePath = path.join(targetDir, '_README.md');
  if (await fs.pathExists(readmePath)) {
    const projectTitle = projectName.replace(/(^|[-_])([a-z])/g, (s) =>
      s.toUpperCase()
    );
    await replaceInFile(readmePath, {
      '{{Project name}}': projectTitle,
      '{{Description}}': `A web application built with Vite and React for ${projectTitle}`
    });
    const finalReadme = path.join(targetDir, 'README.md');
    await fs.move(readmePath, finalReadme, { overwrite: true });
  }
}
