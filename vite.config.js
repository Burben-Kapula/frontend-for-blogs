import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3003',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist'
  },
  define: {
    'process.env.API_URL': JSON.stringify(process.env.VITE_API_URL || 'http://localhost:3003')
  }
})