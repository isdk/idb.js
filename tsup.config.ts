import process from 'node:process'

import { defineConfig } from 'tsup'

const env = process.env.NODE_ENV

export default defineConfig({
  splitting: true,
  // include all files under src
  entry: ['src/**/*.ts'],
  format: ['cjs', 'esm'],
  dts: true, // generate dts file for main module
  bundle: env === 'production',
  minify: env === 'production',
  watch: env === 'development',
  outDir: env === 'production' ? 'dist' : 'lib',
  skipNodeModulesBundle: true,
  target: 'es2020',
  sourcemap: env === 'prod', // source map is only available in prod
  clean: true, // rimraf disr
})
