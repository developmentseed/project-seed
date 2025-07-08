import fs from 'fs-extra';
import path from 'path';

/**
 * Copies all files and directories from the base template source to the destination directory.
 * Ensures the destination exists and recursively copies all contents.
 *
 * @param src - Source directory path containing the base template files
 * @param dest - Destination directory path where files will be copied
 */
export async function copyBaseTemplateFiles(
  src: string,
  dest: string
): Promise<void> {
  await fs.ensureDir(dest);
  const items = await fs.readdir(src);
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = await fs.stat(srcPath);
    if (stat.isDirectory()) {
      await fs.copy(srcPath, destPath);
    } else {
      await fs.copy(srcPath, destPath);
    }
  }
}
