import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) return 'three'
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/gsap')) return 'animations'
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
})
