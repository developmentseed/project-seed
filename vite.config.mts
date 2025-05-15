import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

import vitePortScanner from './vite-plugin-port-scanner';
import pkg from './package.json';

const alias = Object.entries(pkg.alias).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: path.resolve(__dirname, value.replace('~/', './'))
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
