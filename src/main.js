import Vue from 'vue'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'
import App from './App'
import Fetch from '@/utils/fetch'
import Notice from '@/utils/notice'
import * as LABEL from '@/utils/constants/label'
import { installFilter } from '@/utils/filter'
import { installComponents } from '@/components'

import skeleton from 'ant-design-vue/lib/skeleton'

Vue.use(skeleton)
import 'ant-design-vue/dist/antd.less'
import '@/components/global'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import '@/permission'

installFilter(Vue)
installComponents(Vue)

Vue.use(ElementUI, { size: 'small' })

import message from 'ant-design-vue/lib/message'

Vue.prototype.message = message
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
