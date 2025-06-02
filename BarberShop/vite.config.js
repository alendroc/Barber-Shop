import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'inicioMaquinilla.jpg',
        'tijeras.jpg',
        'victoryBarber.jpg',
        'favicon.svg',
        'robots.txt',
        'apple-touch-icon.png',
        'barber192.jpg',
        'barber512.jpg'
      ],
      manifest: {
        name: 'BarberShop',
        short_name: 'BarberShop',
        description: 'A PWA for booking barber appointments',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'barber192.jpg',
            sizes: '192x192',
            type: 'image/jpeg',
          },
          {
            src: 'barber512.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
          },
        ],
      },
    }),
  ],
})