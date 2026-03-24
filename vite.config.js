import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
   server: {
   proxy: {
      "/api": {
        target: "https://sherlyn-vigorous-pattie.ngrok-free.dev",
        changeOrigin: true,
        secure: false,
        headers: {
          "ngrok-skip-browser-warning": "true"
        }
      },
      "/api/remotion": {
        target: "https://kaylee-biangular-devotedly.ngrok-free.dev",
        changeOrigin: true,
        secure: false,
      }
    },
    allowedHosts:["kaylee-biangular-devotedly.ngrok-free.dev"]
},
 resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
