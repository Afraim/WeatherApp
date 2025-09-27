import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// replace `weather-app` with your GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: '/WeatherApp/'
})
