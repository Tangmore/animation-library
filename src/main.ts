import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// pinia
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist' //引入pinia数据持久化插件

import formCreate from '@form-create/element-ui'
import FcDesigner from '@form-create/designer'

import i18n from './locales'

import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

import '@/styles/base.scss'

const instance = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  instance.component(key, component)
}

instance
  .use(router)
  .use(ElementPlus, { locale })
  .use(store)
  .use(i18n)
  .use(formCreate)
  .use(FcDesigner)
  .use(createPinia().use(piniaPluginPersist))
  .mount('#app')
