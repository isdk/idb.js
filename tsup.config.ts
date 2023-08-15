import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/bn.ts', 'src/native.ts'],
  format: ['cjs', 'esm'],
  // splitting: true,
  // sourcemap: true,
  // clean: true,
})
