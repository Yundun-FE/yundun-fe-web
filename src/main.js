import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, { locale, size: 'small' })

import 'normalize.css/normalize.css'
import '@/styles/index.css'
import '@/styles/iconfont/iconfont.css'

import { installFilter } from '@/service/filter'
import { installComponents } from '@/components'
installFilter(Vue)
installComponents(Vue)

// import '@/icons'
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
