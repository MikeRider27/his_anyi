import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';

export default defineConfig({
  plugins: [vue()],
  // Relative base so the build works from any sub-path
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    // Components are imported without the .vue extension
    extensions: ['.mjs', '.js', '.json', '.vue']
  },
  build: {
    rollupOptions: {
      output: {
        // Split large libraries into their own cacheable chunks
        manualChunks: {
          vue: ['vue', 'vue-router', 'vuex', 'vue-resource'],
          element: ['element-ui']
        }
      }
    }
  },
  server: {
    port: 8080,
    host: true,
    proxy: {
      '/static': {
        target: process.env.API_PROXY_TARGET || 'http://localhost:3000',
        changeOrigin: true
      },
      '/api': {
        target: process.env.API_PROXY_TARGET || 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
