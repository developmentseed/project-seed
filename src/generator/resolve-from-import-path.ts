import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Resolves a path from an import meta URL.
 *
 * @param metaUrl - The import meta URL to resolve from
 * @param segments - The segments to resolve the path from
 * @returns The resolved path
 */
export function resolveFromImportMeta(metaUrl: string, ...segments: string[]) {
  const __dirname = path.dirname(fileURLToPath(metaUrl));
  return path.resolve(__dirname, ...segments);
}
