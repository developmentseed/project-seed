import fs from 'fs-extra';
import path from 'path';
import { mergePackageDependencies } from './merge-package-dependencies';
import { getTemplatePath } from './template-paths';

/**
 * Applies the selected component library template to the generated project.
 * Copies files from the component library template directory and merges dependencies
 * from the template's package.json into the main project's package.json.
 *
 * @param targetDir - Target directory where the project is being generated
 * @param componentLibrary - Name of the component library template to apply
 * @throws {Error} When the component library template directory is not found
 */
export async function applyComponentLibrary(
  targetDir: string,
  componentLibrary: string
): Promise<void> {
  const componentLibDir = await getTemplatePath(
    'component-library',
    componentLibrary
  );
  if (!(await fs.pathExists(componentLibDir))) {
    throw new Error(
      `Component library template not found: ${componentLibrary}`
    );
  }
  const items = await fs.readdir(componentLibDir);
  for (const item of items) {
    if (item === 'package.json') continue;
    const srcPath = path.join(componentLibDir, item);
    const destPath = path.join(targetDir, 'app', item);
    await fs.copy(srcPath, destPath);
  }
  const variantPackagePath = path.join(componentLibDir, 'package.json');
  await mergePackageDependencies(targetDir, variantPackagePath);
}
