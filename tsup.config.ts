import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  platform: 'node',
  target: 'node18',
  outDir: 'dist',
  clean: true,
  outExtension() {
    return {
      js: '.js'
    };
  },
  external: ['inquirer']
});
