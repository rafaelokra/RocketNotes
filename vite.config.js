import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// vite.config.js
import { defineConfig } from 'vite';
import nodeResolve from '@rollup/plugin-node-resolve';

export default defineConfig({
  plugins: [],
  build: {
    rollupOptions: {
      plugins: [
        nodeResolve({
          // opções do plugin
        })
      ]
    }
  }
});
