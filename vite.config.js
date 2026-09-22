import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Relative asset paths for seamless hosting (GitHub Pages or local)
  server: {
    port: 5173,
    open: false
  }
});
