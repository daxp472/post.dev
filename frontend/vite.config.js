import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server :  {
    allowedHosts : ["93e4-2409-40c1-3026-1e7e-973b-6dca-de55-54d8.ngrok-free.app"]
  }
})


