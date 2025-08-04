import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Resolves a path from an import meta URL.
 *
 * @param metaUrl - The import meta URL to resolve from
 * @param segments - Path segments to be joined and resolved relative to the directory of the file represented by `metaUrl`
 * @returns The resolved path
 */
export function resolveFromImportMeta(metaUrl: string, ...segments: string[]) {
  const __dirname = path.dirname(fileURLToPath(metaUrl));
  return path.resolve(__dirname, ...segments);
}
