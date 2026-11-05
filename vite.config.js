import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import seoFallback from './seo-fallback.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoFallback()],
})
