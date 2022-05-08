import 'vuestic-ui/dist/vuestic-ui.css'
import 'jquery'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'

import VueMarkdownEditor from '@kangc/v-md-editor'
import enUS from '@kangc/v-md-editor/lib/lang/en-US'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import hljs from 'highlight.js'
import { createApp } from 'vue'
// import cors from 'cors'
import { VueCookieNext } from 'vue-cookie-next'
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
import { store } from './store'

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

VueMarkdownEditor.lang.use('en-US', enUS)
VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs,
  // extend(md) {
  //   // md is a markdown-it instance, you can modify the configuration here, and use plugin for syntax expansion
  //   // md.set(option).use(plugin);
  // },
})

const app = createApp(App)

// app.use(cors)
app.use(VueCookieNext)
app.use(store)
app.use(router)
app.use(createI18n(i18nConfig))
app.use(VueMarkdownEditor)
app.use(VuesticPlugin, vuesticGlobalConfig)
app.mount('#app')
