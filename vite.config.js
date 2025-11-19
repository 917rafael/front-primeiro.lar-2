import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Primeiro Lar Imobiliária',
        short_name: 'PrimeiroLar',
        description: 'Encontre, compre, venda e anuncie imóveis com facilidade e segurança na Primeiro Lar Imobiliária.',
        lang: 'pt-BR',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#e30613',
        orientation: 'portrait',
        categories: ['imóveis', 'casa', 'apartamento', 'venda', 'aluguel', 'anúncio'],
        icons: [
          {
            src: 'src/assets/img/logo.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'src/assets/img/logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'src/assets/img/logo.png',
            sizes: '48x48',
            type: 'image/x-icon'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
