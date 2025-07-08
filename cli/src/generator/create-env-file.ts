import fs from 'fs-extra';
import path from 'path';

/**
 * Creates a .env file in the target directory with default Vite environment variables.
 * Sets the app title and description based on the project name.
 * Includes comments explaining the purpose of each variable for development guidance.
 *
 * @param targetDir - Directory where the .env file will be created
 * @param projectName - Project name to use for the app title and description
 */
export async function createEnvFile(
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
