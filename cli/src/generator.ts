import fs from 'fs-extra';
import path from 'path';

async function copyBaseTemplateFiles(src: string, dest: string): Promise<void> {
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

async function applyComponentLibrary(
  targetDir: string,
  componentLibrary: string
): Promise<void> {
  const componentLibDir = path.resolve(
    __dirname,
    '../templates/component-library',
    componentLibrary
  );

  if (!(await fs.pathExists(componentLibDir))) {
    throw new Error(
      `Component library template not found: ${componentLibrary}`
    );
  }

  // Copy all files from component library variant (except package.json)
  const items = await fs.readdir(componentLibDir);

  for (const item of items) {
    if (item === 'package.json') continue; // Handle package.json separately

    const srcPath = path.join(componentLibDir, item);
    const destPath = path.join(targetDir, 'app', item);
    const stat = await fs.stat(srcPath);

    if (stat.isDirectory()) {
      await fs.copy(srcPath, destPath);
    } else {
      await fs.copy(srcPath, destPath);
    }
  }

  // Merge package.json dependencies
  const packageJsonPath = path.join(targetDir, 'package.json');
  const variantPackagePath = path.join(componentLibDir, 'package.json');

  if (await fs.pathExists(variantPackagePath)) {
    const basePackage = await fs.readJson(packageJsonPath);
    const variantPackage = await fs.readJson(variantPackagePath);

    // Merge dependencies
    basePackage.dependencies = {
      ...basePackage.dependencies,
      ...variantPackage.dependencies
    };

    await fs.writeJson(packageJsonPath, basePackage, { spaces: 2 });
  }
}

export async function generateProject(
  projectName?: string,
  componentLibrary: string = 'chakra'
): Promise<void> {
  if (!projectName) {
    throw new Error('Project name is required');
  }

  const targetDir = path.resolve(__dirname, '../generated', projectName);
  const baseTemplateDir = path.resolve(__dirname, '../templates/base');

  if (await fs.pathExists(targetDir)) {
    throw new Error(`Target directory ${targetDir} already exists.`);
  }

  try {
    // Copy base template files
    await copyBaseTemplateFiles(baseTemplateDir, targetDir);

    // Apply component library specific modifications
    await applyComponentLibrary(targetDir, componentLibrary);

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
