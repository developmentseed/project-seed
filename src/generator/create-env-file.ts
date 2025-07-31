import fs from 'fs-extra';
import path from 'path';

/**
 * Creates a .env file in the target directory with default Vite environment variables.
 * Sets the app title and description based on the project name.
 * Includes comments explaining the purpose of each variable for development guidance.
 * Shows warning for Mapbox token when mapbox-gl is selected.
 *
 * @param targetDir - Directory where the .env file will be created
 * @param projectName - Project name to use for the app title and description
 * @param mapLibrary - Map library being used (e.g., 'mapbox-gl', 'maplibre', 'none')
 */
export async function createEnvFile(
  targetDir: string,
  projectName: string,
  mapLibrary: string
): Promise<void> {
  // Show warning for Mapbox token if mapbox-gl is selected
  if (mapLibrary === 'mapbox-gl') {
    // eslint-disable-next-line no-console
    console.log('⚠️  Note: Mapbox GL requires an access token.');
    // eslint-disable-next-line no-console
    console.log(
      '   Please set VITE_MAPBOX_ACCESS_TOKEN in your .env file after generation.'
    );
  }

  const envContent = `# Vite environment variables
# For local development, these can be left as defaults
# For production deployment, update these values

VITE_BASE_URL=
VITE_APP_TITLE=${projectName}
VITE_APP_DESCRIPTION=A web application built with Vite and React
`;

  await fs.writeFile(path.join(targetDir, '.env'), envContent);

  // Create .env.example file with placeholder for Mapbox token
  let exampleContent = `# Vite environment variables
# For local development, these can be left as defaults
# For production deployment, update these values

VITE_BASE_URL=
VITE_APP_TITLE=${projectName}
VITE_APP_DESCRIPTION=A web application built with Vite and React
`;

  // Always add Mapbox token placeholder to .env.example
  exampleContent += `\n# Mapbox API Token (required for Mapbox maps)\nVITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here\n`;

  await fs.writeFile(path.join(targetDir, '.env.example'), exampleContent);
}
