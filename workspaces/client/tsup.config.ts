import path from 'node:path';

import { polyfillNode } from 'esbuild-plugin-polyfill-node';
import findPackageDir from 'pkg-dir';
import { defineConfig } from 'tsup';
import type { Options } from 'tsup';

export default defineConfig(async (): Promise<Options[]> => {
  const PACKAGE_DIR = (await findPackageDir(process.cwd()))!;

  const OUTPUT_DIR = path.resolve(PACKAGE_DIR, './dist');


  return [
    {
      bundle: true,
      clean: true,
      dts: true,
      entry: {
        client: path.resolve(PACKAGE_DIR, './src/index.tsx'),
        serviceworker: path.resolve(PACKAGE_DIR, './src/serviceworker/index.ts'),
      },
      env: {
        API_URL: '',
        NODE_ENV: 'production',
      },
      esbuildOptions(options) {
        options.define = {
          ...options.define,
          global: 'globalThis',
        };
        options.publicPath = '/';
        options.chunkNames = 'chunks/[name]-[hash]';
      },
      esbuildPlugins: [
        polyfillNode({
          globals: {
            process: false,
          },
          polyfills: {
            events: true,
            fs: true,
            path: true,
          },
        }),
      ],
      external: ['react', 'react-dom', 'react-router-dom', 'swr'],
      format: 'iife',
      loader: {
        '.json?file': 'file',
        '.wasm': 'binary',
      },
      metafile: true,
      outDir: OUTPUT_DIR,
      platform: 'browser',
      skipNodeModulesBundle: true,
      sourcemap: false,
      splitting: true,
      target: 'es2020',
    },
  ];
});