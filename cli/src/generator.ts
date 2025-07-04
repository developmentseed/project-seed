import fs from 'fs-extra';
import path from 'path';

const EXCLUDE = [
  'cli',
  'cli/generated',
  'node_modules',
  'dist',
  '.git',
  'pnpm-lock.yaml',
  'package-lock.json',
  'yarn.lock',
  '.DS_Store'
];

async function copyProjectFiles(src: string, dest: string): Promise<void> {
  await fs.ensureDir(dest);

  const items = await fs.readdir(src);

  for (const item of items) {
    if (EXCLUDE.includes(item)) continue;

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

async function replaceInFile(
  filePath: string,
  replacements: Record<string, string>
): Promise<void> {
  let content = await fs.readFile(filePath, 'utf8');

  for (const [search, replace] of Object.entries(replacements)) {
    content = content.replace(new RegExp(search, 'g'), replace);
  }

  await fs.writeFile(filePath, content);
}

async function createEnvFile(
  targetDir: string,
  projectName: string
): Promise<void> {
  const envContent = `# Vite environment variables
# For local development, these can be left as defaults
# For production deployment, update these values

VITE_BASE_URL=
VITE_APP_TITLE=${projectName}
VITE_APP_DESCRIPTION=A web application built with Vite and React
`;
  await fs.writeFile(path.join(targetDir, '.env'), envContent);
}

async function processReadme(
  targetDir: string,
  projectName: string
): Promise<void> {
  const readmePath = path.join(targetDir, '_README.md');

  if (await fs.pathExists(readmePath)) {
    const projectTitle = projectName.replace(/(^|[-_])([a-z])/g, (s) =>
      s.toUpperCase()
    );

    await replaceInFile(readmePath, {
      '{{Project name}}': projectTitle,
      '{{Description}}': `A web application built with Vite and React for ${projectTitle}`
    });

    const finalReadme = path.join(targetDir, 'README.md');
    await fs.move(readmePath, finalReadme, { overwrite: true });
  }
}

async function updatePackageJson(
  targetDir: string,
  projectName: string
): Promise<void> {
  const pkgPath = path.join(targetDir, 'package.json');

  if (await fs.pathExists(pkgPath)) {
    await replaceInFile(pkgPath, {
      '"name": *"[^"]+"': `"name": "${projectName}"`
    });
  }
}

export async function generateProject(projectName?: string): Promise<void> {
  if (!projectName) {
    throw new Error('Project name is required');
  }

  const targetDir = path.resolve('cli/generated', projectName);

  if (await fs.pathExists(targetDir)) {
    throw new Error(`Target directory ${targetDir} already exists.`);
  }

  try {
    await copyProjectFiles(path.resolve('.'), targetDir);
    await updatePackageJson(targetDir, projectName);
    await processReadme(targetDir, projectName);
    await createEnvFile(targetDir, projectName);

    // eslint-disable-next-line no-console
    console.log(`Project generated at ${targetDir}`);
  } catch (error) {
    if (await fs.pathExists(targetDir)) {
      await fs.remove(targetDir);
    }
    throw error;
  }
}
