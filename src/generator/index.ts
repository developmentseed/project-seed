import fs from 'fs-extra';
import path from 'path';
import { createEnvFile } from './create-env-file';
import { processReadme } from './process-readme';
import { applyComponentLibrary } from './apply-component-library';
import { applyMapLibrary } from './apply-map-library';

/**
 * Main project generation function that orchestrates the entire project creation process.
 * Copies base template files, applies component library modifications, applies map library
 * modifications, updates configuration files, and handles error cleanup if the generation fails.
 *
 * @param projectName - Name of the project to generate
 * @param componentLibrary - Component library template to apply (e.g., 'chakra', 'uswds', 'none')
 * @param mapLibrary - Map library template to apply (e.g., 'mapbox-gl', 'maplibre', 'none')
 * @param force - Whether to overwrite existing directory if it exists
 * @param targetDir - Target directory where the project will be generated
 * @throws {Error} When target directory exists and force is false, or when generation fails
 */
export async function generateProject(
  projectName: string,
  componentLibrary: string,
  mapLibrary: string,
  force: boolean,
  targetDir: string
): Promise<void> {
  const baseTemplateDir = path.resolve(__dirname, '../../templates/base');

  if (await fs.pathExists(targetDir)) {
    if (!force) {
      throw new Error(
        `Target directory ${targetDir} already exists. Use --force to overwrite.`
      );
    }
    // Remove existing directory if force is enabled
    await fs.remove(targetDir);
  }

  try {
    // Copy base template files
    await fs.copy(baseTemplateDir, targetDir);

    // Apply component library specific modifications
    await applyComponentLibrary(targetDir, componentLibrary);

    // Apply map library specific modifications
    await applyMapLibrary(targetDir, mapLibrary);

    // Update package.json with project name
    const pkgPath = path.join(targetDir, 'package.json');
    if (await fs.pathExists(pkgPath)) {
      const pkg = await fs.readJson(pkgPath);
      await fs.writeJson(pkgPath, { ...pkg, name: projectName }, { spaces: 2 });
    } else {
      throw new Error(
        'Template package.json not found. Please check the template directory.'
      );
    }

    await processReadme(targetDir, projectName);
    await createEnvFile(targetDir, projectName, mapLibrary);

    // eslint-disable-next-line no-console
    console.log(`Project generated at ${targetDir}`);
  } catch (error) {
    if (await fs.pathExists(targetDir)) {
      await fs.remove(targetDir);
    }
    throw error;
  }
}
