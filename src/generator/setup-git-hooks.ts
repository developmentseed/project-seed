import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

/**
 * Initializes git repository and sets up husky git hooks for the generated project.
 * This ensures that git hooks work properly when the user runs pnpm install.
 *
 * @param targetDir - The target directory where the project was generated
 */
export async function setupGitHooks(targetDir: string): Promise<void> {
  try {
    // Initialize git repository if it doesn't exist
    const gitDir = path.join(targetDir, '.git');
    if (!(await fs.pathExists(gitDir))) {
      execSync('git init', { cwd: targetDir, stdio: 'inherit' });
    }

    // Set git hooks path to .husky directory
    execSync('git config core.hooksPath .husky', {
      cwd: targetDir,
      stdio: 'inherit'
    });

    // Make sure hook files are executable
    const huskyDir = path.join(targetDir, '.husky');
    if (await fs.pathExists(huskyDir)) {
      const hookFiles = await fs.readdir(huskyDir);
      for (const file of hookFiles) {
        // Skip directories and special files
        if (file.startsWith('.') || file === '_') continue;

        const hookPath = path.join(huskyDir, file);
        const stats = await fs.stat(hookPath);
        if (stats.isFile()) {
          // Make the hook file executable
          execSync(`chmod +x "${hookPath}"`, { stdio: 'inherit' });
        }
      }
    }

    // eslint-disable-next-line no-console
    console.log('Git hooks configured successfully');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('Warning: Failed to set up git hooks:', error);
    // Don't throw error - this is not critical for project generation
  }
}
