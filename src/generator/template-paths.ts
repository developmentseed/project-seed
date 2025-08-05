import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

/**
 * Finds the nearest ancestor directory (including the starting directory) that contains a package.json file.
 * Traverses up the directory tree from the given start directory.
 *
 * @param {string} startDir - The directory to start searching from.
 * @returns {Promise<string>} The path to the directory containing package.json.
 * @throws {Error} When no package.json is found in any parent directory.
 */
async function findProjectRoot(startDir: string): Promise<string> {
  let dir = startDir;
  while (dir !== path.dirname(dir)) {
    try {
      await fs.access(path.join(dir, 'package.json'));
      return dir;
    } catch {
      // package.json not found in this directory, continue searching up
    }
    dir = path.dirname(dir);
  }
  throw new Error(
    `Could not find project root from starting directory: ${startDir}. No package.json found in any parent directory.`
  );
}

/**
 * Gets the absolute path to a specific template subdirectory.
 *
 * @param subdir - The subdirectory within templates (e.g., 'base', 'component-library', 'map')
 * @param name - Optional specific template name within the subdirectory
 * @returns The absolute path to the template directory
 */
export async function getTemplatePath(
  subdir: string,
  name?: string
): Promise<string> {
  const currentFile = fileURLToPath(import.meta.url);
  const root = await findProjectRoot(path.dirname(currentFile));
  return name
    ? path.join(root, 'templates', subdir, name)
    : path.join(root, 'templates', subdir);
}
