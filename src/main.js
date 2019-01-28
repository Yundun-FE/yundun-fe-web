import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'
import App from './App'
import Fetch from '@/utils/fetch'
import Notice from '@/utils/notice'
import * as LABEL from '@/utils/constants/label'

Vue.use(ElementUI)

// import 'normalize.css/normalize.css'
import '@/styles/index.css'
import '@/styles/iconfont/iconfont.css'

import { installFilter } from '@/utils/filter'
import { installComponents } from '@/components'
installFilter(Vue)
installComponents(Vue)

import '@/permission'

Vue.prototype.Fetch = Fetch
Vue.prototype.LABEL = LABEL
Vue.prototype.Notice = Notice

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  render: h => h(App)
})
