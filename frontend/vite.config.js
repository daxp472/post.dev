import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server :  {
    allowedHosts : ["b1fa-2409-40c1-311e-34f3-7f7b-4e40-e4b7-d366.ngrok-free.app", '*']
  }
})


