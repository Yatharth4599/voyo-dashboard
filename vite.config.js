// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/dashboard/', // 👈 crucial for assets to load under /dashboard
  plugins: [react()],
});
