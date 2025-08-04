import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import * as path from 'path';

// Inline implementation of resolveFromImportMeta
function resolveFromImportMeta(metaUrl: string, importPath: string): string {
  const basePath = path.dirname(fileURLToPath(metaUrl));
  return path.resolve(basePath, importPath);
}
import vitePortScanner from './vite-plugin-port-scanner';
import pkg from './package.json';

const alias = Object.entries(pkg.alias).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: resolveFromImportMeta(import.meta.url, value.replace('~/', './'))
  };
}, {});


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePortScanner()],
  define: {
    APP_VERSION: JSON.stringify(pkg.version)
  },
  resolve: {
    alias
  }
});
