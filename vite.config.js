import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
        react(),
    ],
    server: {
        allowedHosts: ["3b6c-103-184-238-25.ngrok-free.app"]
    }
})
