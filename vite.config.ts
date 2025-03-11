import { defineConfig } from 'vite';
import { defineConfig as defineTestConfig } from 'vitest/config';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

const config = defineConfig({
  plugins: [dts({ include: ['lib'] })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'Chart4JS',
      formats: ['es', 'umd'],
    },
  },
  resolve: { alias: { src: resolve('src/') } },
  server: {
    port: 3000,
  },
});

const testConfig = defineTestConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/setupTests.ts'],
    include: [
      './lib/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      './src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      './src/config/**',
    ],
    coverage: {
      exclude: ['*.config.*', '*.d.ts'],
    },
  },
});

export default {
  ...config,
  ...testConfig,
};
