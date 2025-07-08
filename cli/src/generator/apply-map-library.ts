import fs from 'fs-extra';
import path from 'path';

export async function applyMapLibrary(
  targetDir: string,
  mapLibrary: string
): Promise<void> {
  // If no map library is selected, skip map library application
  if (mapLibrary === 'none') {
    return;
  }

  const mapLibDir = path.resolve(__dirname, '../../templates/map', mapLibrary);

  if (!(await fs.pathExists(mapLibDir))) {
    throw new Error(`Map library template not found: ${mapLibrary}`);
  }

  // Copy map components and other files (except main.tsx and package.json)
  const items = await fs.readdir(mapLibDir);

  for (const item of items) {
    if (item === 'package.json' || item === 'main.tsx') continue; // Handle these separately

    const srcPath = path.join(mapLibDir, item);
    const destPath = path.join(targetDir, 'app', item);
    const stat = await fs.stat(srcPath);

    if (stat.isDirectory()) {
      await fs.copy(srcPath, destPath);
    } else {
      await fs.copy(srcPath, destPath);
    }
  }

  // Merge package.json dependencies
  const packageJsonPath = path.join(targetDir, 'package.json');
  const variantPackagePath = path.join(mapLibDir, 'package.json');

  if (await fs.pathExists(variantPackagePath)) {
    const basePackage = await fs.readJson(packageJsonPath);
    const variantPackage = await fs.readJson(variantPackagePath);

    // Merge dependencies
    basePackage.dependencies = {
      ...basePackage.dependencies,
      ...variantPackage.dependencies
    };

    await fs.writeJson(packageJsonPath, basePackage, { spaces: 2 });
  }
}
