import fs from 'fs-extra';
import path from 'path';
import { mergePackageDependencies } from './merge-package-dependencies';
import { getTemplatePath } from './template-paths';

/**
 * Applies the selected map library template to the generated project.
 * Copies files from the map library template directory and merges dependencies
 * from the template's package.json into the main project's package.json.
 *
 * @param targetDir - Target directory where the project is being generated
 * @param mapLibrary - Name of the map library template to apply
 * @throws {Error} When the map library template directory is not found
 */
export async function applyMapLibrary(
  targetDir: string,
  mapLibrary: string
): Promise<void> {
  if (mapLibrary === 'none') {
    return;
  }

  const mapLibDir = getTemplatePath('map', mapLibrary);

  if (!(await fs.pathExists(mapLibDir))) {
    throw new Error(`Map library template not found: ${mapLibrary}`);
  }

  const items = await fs.readdir(mapLibDir);

  for (const item of items) {
    if (item === 'package.json' || item === 'main.tsx') continue;

    const srcPath = path.join(mapLibDir, item);
    const destPath = path.join(targetDir, 'app', item);
    await fs.copy(srcPath, destPath);
  }

  const variantPackagePath = path.join(mapLibDir, 'package.json');
  await mergePackageDependencies(targetDir, variantPackagePath);
}
