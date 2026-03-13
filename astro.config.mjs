import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
// 1. IMPORTAMOS EL ADAPTADOR DE VERCEL
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'server',
  // 2. USAMOS VERCEL COMO MOTOR
  adapter: vercel(),
});