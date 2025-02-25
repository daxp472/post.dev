import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server :  {
    allowedHosts : ["37b8-2409-40c1-311e-34f3-bf94-9184-262c-f580.ngrok-free.app", '*']
  }
})


