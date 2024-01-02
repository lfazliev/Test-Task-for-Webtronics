import { createVuetify } from 'vuetify'
import 'vuetify/styles'
export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true
  })
  app.vueApp.use(vuetify)
})
