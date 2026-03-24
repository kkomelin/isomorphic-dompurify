import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    outDir: 'dist',
    external: ['dompurify', 'jsdom'],
  },
  {
    entry: { browser: 'src/browser.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    outDir: 'dist',
    external: ['dompurify'],
  },
])
