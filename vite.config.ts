// 나중을 위한 세팅 다국어 처리용 (템플릿 예제가 i18n 으로 되어있음 서버 사용 다국어로 변경하기전까지 사용할 예정)
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, 'src'),
      // '~': path.resolve(__dirname, 'node_modules'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
    extensions: ['.js'],
  },
  plugins: [vue()],
})
