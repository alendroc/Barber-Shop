import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'BarberShop',
        short_name: 'BarberShop',
        description: 'Barberia Victorino',
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        theme_color: '#212121',
        background_color: '#D8D8D8',
        start_url: '/',
        icons: [
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
      },
      registerType: 'autoUpdate',
      includeAssets: [
        'inicioMaquinilla.jpg',
        'tijeras.jpg',
        'victoryBarber.jpg',
        'favicon.svg',
        'robots.txt',
        'apple-touch-icon.png',
        'favicon.ico',
        'web-app-manifest-192x192.png',
        'web-app-manifest-512x512.png',
        'favicon-96x96'
      ],
    }),
  ],
})