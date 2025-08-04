import path from 'path';
import { resolveFromImportMeta } from './resolve-from-import-path';

/**
 * Gets the absolute path to the templates directory.
 * Handles both development mode (running from TypeScript source) and
 * production mode (running from compiled JavaScript).
 *
 * @returns The absolute path to the templates directory
 */
function getTemplatesDir(): string {
  // Check if we're running from source (development) or compiled (production)
  const isDev = import.meta.url.includes('/src/');
  const relativePath = isDev ? '../../templates' : '../templates';
  return resolveFromImportMeta(import.meta.url, relativePath);
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
