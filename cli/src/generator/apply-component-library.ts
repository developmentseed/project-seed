import fs from 'fs-extra';
import path from 'path';

/**
 * Applies the selected component library template to the generated project.
 * Copies files from the component library template directory and merges dependencies
 * from the template's package.json into the main project's package.json.
 * Skips copying the template's package.json file to avoid conflicts.
 *
 * @param targetDir - Target directory where the project is being generated
 * @param componentLibrary - Name of the component library template to apply
 * @throws {Error} When the component library template directory is not found
 */
export async function applyComponentLibrary(
  targetDir: string,
  componentLibrary: string
): Promise<void> {
  const componentLibDir = path.resolve(
    __dirname,
    '../../templates/component-library',
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
  const packageJsonPath = path.join(targetDir, 'package.json');
  const variantPackagePath = path.join(componentLibDir, 'package.json');
  if (await fs.pathExists(variantPackagePath)) {
    const basePackage = await fs.readJson(packageJsonPath);
    const variantPackage = await fs.readJson(variantPackagePath);
    basePackage.dependencies = {
      ...basePackage.dependencies,
      ...variantPackage.dependencies
    };
    await fs.writeJson(packageJsonPath, basePackage, { spaces: 2 });
  }
}
