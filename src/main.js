import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import Explorer from '@/api/explorer'

import '@/styles/index.scss' // global css
import '@/styles/iconfont/iconfont.css'

import App from './App'
import router from './router'
import store from './store'
import { installFilter } from '@/service/filter'

import '@/icons' // icon
import '@/permission' // permission control

Vue.prototype.$Api = {
  Explorer
}

installFilter(Vue)
Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  render: h => h(App)
})
