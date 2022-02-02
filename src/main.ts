import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VuesticPlugin, useGlobalConfig } from 'vuestic-ui';
import vuesticGlobalConfig from './services/vuestic-ui/global-config'
import { createGtm } from 'vue-gtm'
import { createI18n } from 'vue-i18n'
import en from './i18n/en.json'
import ch from './i18n/cn.json'
import es from './i18n/es.json'
import ir from './i18n/ir.json'
import br from './i18n/br.json'


const i18nConfig = {
    // legacy: true,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en: en,
      ch: ch,
      es: es,
      ir: ir,
      br: br
    }
}

const app = createApp(App)

app.use(store)
app.use(router)
app.use(createI18n(i18nConfig))
app.use(VuesticPlugin, vuesticGlobalConfig)
app.mount('#app')
