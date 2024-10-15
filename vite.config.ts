import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/vectors/',
  server: {
    host: '0.0.0.0',
    port: 5137
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },  
  assetsInclude: ['**/*.woff', '**/*.woff2'],
})
