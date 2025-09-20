import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  root: '.', // Use root directory
  publicDir: 'src/public', // Point to public assets
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        www: resolve(__dirname, 'www.sfti-ai.org/index.html'),
        dev: resolve(__dirname, 'dev.sfti-ai.org/index.html'),
        server: resolve(__dirname, 'server.sfti-ai.org/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './components'),
      '@/lib': resolve(__dirname, './lib'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: false,
  },
  css: {
    postcss: {},
  },
})