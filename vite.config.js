import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

/**
* Vite configuration for React project
* Sets up React plugin and CSS processing with Tailwind and Autoprefixer
*/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
})