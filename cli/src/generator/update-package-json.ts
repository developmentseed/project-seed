import fs from 'fs-extra';
import path from 'path';
import { replaceInFile } from './replace-in-file';

/**
 * Updates the package.json file in the target directory to set the project name.
 * Uses regex replacement to update the "name" field while preserving the JSON structure.
 * Only processes the file if it exists in the target directory.
 *
 * @param targetDir - Directory containing the package.json file to update
 * @param projectName - New project name to set in the package.json
 */
export async function updatePackageJson(
  targetDir: string,
  projectName: string
): Promise<void> {
  const pkgPath = path.join(targetDir, 'package.json');
  if (await fs.pathExists(pkgPath)) {
    await replaceInFile(pkgPath, {
      '"name": *"[^"]+"': `"name": "${projectName}"`
    });
  }
}
