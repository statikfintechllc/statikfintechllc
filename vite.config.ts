import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  root: '.', 
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        // Multiple entry points for different domains
        www: resolve(__dirname, 'src/www/index.html'),
        dev: resolve(__dirname, 'src/dev/index.html'),
        server: resolve(__dirname, 'src/server/index.html'),
      },
      output: {
        // Separate outputs for each domain
        dir: 'dist',
        entryFileNames: '[name]/assets/[name]-[hash].js',
        chunkFileNames: '[name]/assets/[name]-[hash].js',
        assetFileNames: '[name]/assets/[name]-[hash].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/shared': resolve(__dirname, './src/shared'),
      '@/components': resolve(__dirname, './src/shared/components'),
      '@/lib': resolve(__dirname, './src/shared/lib'),
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