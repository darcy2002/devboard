import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'sharedUi',
      filename: 'remoteEntry.js',
      exposes: {
        './Spinner': './src/components/Spinner.tsx',
        './Badge': './src/components/Badge.tsx',
        './Button': './src/components/Button.tsx',
        './Card': './src/components/Card.tsx',
        './Modal': './src/components/Modal.tsx',
        './EmptyState': './src/components/EmptyState.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    port: 5003,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});
