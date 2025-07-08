import fs from 'fs-extra';

/**
 * Replaces all occurrences of given patterns in a file with provided replacements.
 * Reads the file content, applies regex-based replacements, and writes the result back.
 * Uses global regex matching to replace all instances of each pattern.
 *
 * @param filePath - Path to the file to be processed
 * @param replacements - Object mapping search patterns to replacement strings
 */
export async function replaceInFile(
  filePath: string,
  replacements: Record<string, string>
): Promise<void> {
  let content = await fs.readFile(filePath, 'utf8');
  for (const [search, replace] of Object.entries(replacements)) {
    content = content.replace(new RegExp(search, 'g'), replace);
  }
  await fs.writeFile(filePath, content);
}
