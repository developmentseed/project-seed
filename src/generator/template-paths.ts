import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

/**
 * Finds the nearest ancestor directory (including the starting directory) that contains a package.json file.
 * Traverses up the directory tree from the given start directory.
 *
 * @param {string} startDir - The directory to start searching from.
 * @returns {string} The path to the directory containing package.json, or the original startDir if none is found.
 *
 * If no package.json is found in any ancestor directory, returns the original startDir.
 */
function findProjectRoot(startDir: string): string {
  let dir = startDir;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'package.json'))) return dir;
    dir = path.dirname(dir);
  }
  return startDir;
}

export function getTemplatePath(subdir: string, name?: string): string {
  const currentFile = fileURLToPath(import.meta.url);
  const root = findProjectRoot(path.dirname(currentFile));
  return path.join(root, 'templates', subdir, ...(name ? [name] : []));
}
