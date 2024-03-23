import path from 'node:path';

import reactRefresh from '@vitejs/plugin-react-refresh';
import findPackageDir from 'pkg-dir';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import wasm from "vite-plugin-wasm";


export default async () => {
  const PACKAGE_DIR = (await findPackageDir(process.cwd()))!;
  const OUTPUT_DIR = path.resolve(PACKAGE_DIR, './dist');

  return defineConfig({
    build: {
      minify: true,
      outDir: OUTPUT_DIR,
      rollupOptions: {
        external: ['@jsquash/jxl/codec/dec/jxl_dec.wasm'],
        input: {
          client: path.resolve(PACKAGE_DIR, './src/index.tsx'),
          serviceworker: path.resolve(PACKAGE_DIR, './src/serviceworker/index.ts'),
        },
      },
      sourcemap: false,
      target: 'es2020',
    },
    plugins: [nodePolyfills({
      exclude: [
        'fs', 
      ],
      globals: {
        Buffer: true, 
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
    wasm(), splitVendorChunkPlugin(), reactRefresh()],
    resolve: {
      alias: {
      },
    },
    server: {
      fs: {
        allow: [PACKAGE_DIR], // パッケージディレクトリへのアクセスを許可
      },
    }
  });
};