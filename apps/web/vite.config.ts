import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/app'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/');
          if (!normalizedId.includes('node_modules')) return;

          if (normalizedId.includes('react-router')) return 'router';
          if (
            normalizedId.includes('/react-dom/') ||
            normalizedId.includes('/react/') ||
            normalizedId.includes('/scheduler/')
          ) {
            return 'react';
          }
          if (normalizedId.includes('lucide-react')) return 'icons';
          if (normalizedId.includes('firebase')) return 'firebase';
          if (normalizedId.includes('@radix-ui')) return 'radix-ui';
          if (normalizedId.includes('@mui')) return 'mui';
        },
      },
    },
  },
})
