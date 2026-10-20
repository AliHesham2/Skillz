import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
export default defineConfig({plugins:[react(),tailwindcss()],build:{outDir:'packages/ui/dist',lib:{entry:resolve('packages/ui/src/index.ts'),formats:['es'],fileName:'forma-ui',cssFileName:'forma-ui'},rollupOptions:{external:['react','react-dom','react/jsx-runtime','gsap']}}});
