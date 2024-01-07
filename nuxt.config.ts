import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  // app: {
  //   head: {
  //     link: [{ rel: 'stylesheet', href: '/dark.css', media: "(prefers-color-scheme: dark)" }, 
  //     { rel: 'stylesheet', href: '/light.css', media: "(prefers-color-scheme: no-preference), (prefers-color-scheme: light)" }]
  //   },
  // },

  css: ['~/assets/scss/main.scss'],
  pinia: {
    autoImports: [
      'defineStore', "storeToRefs"
    ]
  },

  imports: {
    dirs: ['stores']
  },

  typescript: {
    shim: false
  },


  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtseo/module',
    'nuxt-simple-sitemap',
    'nuxt-simple-robots',
    '@pinia/nuxt',
  ],

  site: {
    name: 'Личный Кабинет',
    description: `Test Task for Webtronics`,
    defaultLocale: 'ru',
    url: 'localhost:3000'
  },
  robots: {
    disallow: [],
  },
  googleFonts: {
    families: {
      // Inter: [300, 400, 500]
      Commissioner: true
    },
    display: 'swap',
    overwriting: true,
    preload: true
  },

  devtools: {
    timeline: {
      enabled: true
    }
  }
})