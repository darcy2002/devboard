import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const sharedUiUrl = env.VITE_SHARED_UI_URL || 'http://localhost:5003';
  return {
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'mfeDashboard',
      filename: 'remoteEntry.js',
      remotes: {
        sharedUi: `${sharedUiUrl}/assets/remoteEntry.js`,
      },
      exposes: {
        './App': './src/App.tsx',
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
    port: 5002,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
});
