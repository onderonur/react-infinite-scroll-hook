import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs', 'esm'],
  external: ['react'],
  // Clean output directory before each build
  clean: true,
  // Generate dts files
  dts: true,
  minify: true,
}));
