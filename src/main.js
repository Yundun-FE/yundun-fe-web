import Vue from 'vue'
import ElementUI from 'element-ui'
import Antd from 'ant-design-vue'
import router from './router'
import store from './store'
import App from './App'
import Fetch from '@/utils/fetch'
import Notice from '@/utils/notice'
import * as LABEL from '@/utils/constants/label'
import { installFilter } from '@/utils/filter'
import { installComponents } from '@/components'

import 'ant-design-vue/dist/antd.css'
import '@/components/global'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import '@/permission'

installFilter(Vue)
installComponents(Vue)

Vue.use(ElementUI)
Vue.use(Antd)
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
