import path from 'node:path';

import reactRefresh from '@vitejs/plugin-react-refresh';
import findPackageDir from 'pkg-dir';
import { defineConfig, splitVendorChunkPlugin } from 'vite';

export default async () => {
  const PACKAGE_DIR = (await findPackageDir(process.cwd()))!;
  const OUTPUT_DIR = path.resolve(PACKAGE_DIR, './dist');

  return defineConfig({
    build: {
      minify: true,
      outDir: OUTPUT_DIR,
      rollupOptions: {
        input: {
          server: path.resolve(PACKAGE_DIR, 'src/server.tsx'),
        },
        output: {
          assetFileNames: '[name]-[hash][extname]',
          chunkFileNames: '[name]-[hash].js',
          entryFileNames: '[name].js',
          format: 'cjs',
        }
      },
      sourcemap: false,
      target: 'esnext',
    },
    plugins: [splitVendorChunkPlugin(), reactRefresh()],
  });
};