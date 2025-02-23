import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server :  {
    allowedHosts : ["ab6b-152-59-23-5.ngrok-free.app", '*']
  }
})


