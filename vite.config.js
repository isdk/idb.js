import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['./test/vitest.setup.ts']
  },
})
