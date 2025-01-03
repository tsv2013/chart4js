import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({ include: ['lib'] })
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'Chart4JS',
      formats: ['es', 'umd']
    }
  },
  resolve: { alias: { src: resolve('src/') } },
//   test: {
//     setupFiles: ['src/setupTests.ts'],
//     coverage: {
//       exclude: ['*.config.*', '*.d.ts'],
//     },
//   },  
})