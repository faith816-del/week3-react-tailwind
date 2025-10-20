import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/week3-react-tailwind/' // This must exactly match your repo name
})
