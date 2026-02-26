import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import federation from '@originjs/vite-plugin-federation';

// Strip trailing slashes so we never get double slashes in asset URLs
const mfeTasksUrl = (process.env.VITE_MFE_TASKS_URL || 'http://localhost:5001').replace(/\/+$/, '');
const mfeDashboardUrl = (process.env.VITE_MFE_DASHBOARD_URL || 'http://localhost:5002').replace(/\/+$/, '');

export default defineConfig({
  server: {
    port: 5173,
    strictPort: false,
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'shell',
      remotes: {
        mfeTasks: `${mfeTasksUrl}/assets/remoteEntry.js`,
        mfeDashboard: `${mfeDashboardUrl}/assets/remoteEntry.js`,
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
    port: 5000,
    strictPort: true,
  },
});
