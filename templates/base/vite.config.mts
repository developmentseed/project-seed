import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import * as path from 'path';

import pkg from './package.json';

const alias = Object.entries(pkg.alias).reduce((acc, [key, value]) => {
  // Resolve the alias path relative to the current file
  const basePath = path.dirname(fileURLToPath(import.meta.url));
  return {
    ...acc,
    [key]: path.resolve(basePath, value.replace('~/', './'))
  };
}, {});


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    APP_VERSION: JSON.stringify(pkg.version)
  },
  server: {
    port: 9000
  },
  resolve: {
    alias
  }
});
