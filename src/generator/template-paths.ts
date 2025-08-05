import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

function findProjectRoot(startDir: string): string {
  let dir = startDir;
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'package.json'))) return dir;
    dir = path.dirname(dir);
  }
  return startDir;
}

export function getTemplatePath(subdir: string, name?: string): string {
  const currentFile = fileURLToPath(import.meta.url);
  const root = findProjectRoot(path.dirname(currentFile));
  return path.join(root, 'templates', subdir, ...(name ? [name] : []));
}
