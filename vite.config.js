import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'
import copy from 'rollup-plugin-copy'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: { enabled: true },
      includeAssets: ['favicon.ico', 'logo-192.png', 'logo-512.png', 'logo.png'],
      manifest: {
        name: 'Primeiro Lar Imobiliária',
        short_name: 'PrimeiroLar',
        description: 'Encontre, compre, venda e anuncie imóveis com facilidade e segurança na Primeiro Lar Imobiliária.',
        lang: 'pt-BR',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#e30613',
        orientation: 'portrait',
        icons: [
          { src: 'logo-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'logo-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
          { src: 'logo.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],
        navigateFallback: '/index.html'
      }
    })
  ],
  build: {
    rollupOptions: {
      plugins: [
        copy({
          targets: [
            { src: 'src/assets/img/logo-192.png', dest: 'dist', rename: 'logo-192.png' },
            { src: 'src/assets/img/logo-512.png', dest: 'dist', rename: 'logo-512.png' },
            { src: 'src/assets/img/logo.png', dest: 'dist', rename: 'logo.png' }
          ],
          hook: 'writeBundle'
        })
      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
