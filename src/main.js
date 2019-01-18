import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import App from './App'

Vue.use(ElementUI)

import 'normalize.css/normalize.css'
import '@/styles/index.css'
import '@/styles/iconfont/iconfont.css'

import { installFilter } from '@/service/filter'
import { installComponents } from '@/components'
installFilter(Vue)
installComponents(Vue)

import '@/permission'

import Explorer from '@/api/explorer'
Vue.prototype.$Api = {
  Explorer
}

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  render: h => h(App)
})
