import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import vitePortScanner from './vite-plugin-port-scanner';

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 9000
  },
  plugins: [react(), vitePortScanner()]
});
