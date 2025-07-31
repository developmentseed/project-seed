import fs from 'fs-extra';
import path from 'path';

/**
 * Merges dependencies from a variant package.json into the main project's package.json.
 * This function reads the variant package.json file and merges its dependencies
 * into the target project's package.json file.
 *
 * @param targetDir - Target directory where the project is being generated
 * @param variantPackagePath - Path to the variant package.json file to merge
 */
export async function mergePackageDependencies(
  targetDir: string,
  variantPackagePath: string
): Promise<void> {
  if (await fs.pathExists(variantPackagePath)) {
    const packageJsonPath = path.join(targetDir, 'package.json');
    const basePackage = await fs.readJson(packageJsonPath);
    const variantPackage = await fs.readJson(variantPackagePath);

    basePackage.dependencies = {
      ...basePackage.dependencies,
      ...variantPackage.dependencies
    };

    await fs.writeJson(packageJsonPath, basePackage, { spaces: 2 });
  }
}
