import path from 'path';

/**
 * Gets the absolute path to the templates directory.
 * Handles both development mode (running from TypeScript source) and
 * production mode (running from compiled JavaScript).
 *
 * @returns The absolute path to the templates directory
 */
function getTemplatesDir(): string {
  // Check if we're running from source (development) or compiled (production)
  const isDev = __dirname.includes('/src/');
  const relativePath = isDev ? '../../templates' : '../templates';
  return path.resolve(__dirname, relativePath);
}

/**
 * Gets the absolute path to a specific template subdirectory.
 *
 * @param subdir - The subdirectory within templates (e.g., 'base', 'component-library', 'map')
 * @param name - Optional specific template name within the subdirectory
 * @returns The absolute path to the template directory
 */
export function getTemplatePath(subdir: string, name?: string): string {
  const templatesDir = getTemplatesDir();
  return name
    ? path.join(templatesDir, subdir, name)
    : path.join(templatesDir, subdir);
}
