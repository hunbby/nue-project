import 'vuestic-ui/dist/vuestic-ui.css'
import 'jquery'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { VuesticPlugin } from 'vuestic-ui'

import App from './App.vue'
import br from './i18n/br.json'
import ch from './i18n/cn.json'
import en from './i18n/en.json'
import es from './i18n/es.json'
import ir from './i18n/ir.json'
import router from './router'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'
import store from './store'

const i18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: en,
    ch: ch,
    es: es,
    ir: ir,
    br: br,
  },
}

const app = createApp(App)

app.use(store)
app.use(router)
app.use(createI18n(i18nConfig))
app.use(VuesticPlugin, vuesticGlobalConfig)
app.mount('#app')
