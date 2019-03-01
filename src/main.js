// core
import Vue from 'vue'
window.Vue = Vue
import appMixins from '@/mixins/app'
import App from '@/App'
import store from '@/store'
import router from '@/router'
import Fetch from '@/utils/fetch'
import Notice from '@/utils/notice'
import * as LABEL from '@/utils/constants/label'
import { installFilter } from '@/utils/filter'

Vue.mixin(appMixins)
installFilter(Vue)
installComponents(Vue)

Vue.prototype.Fetch = Fetch
Vue.prototype.LABEL = LABEL
Vue.prototype.Notice = Notice

// ui
import { installComponents } from '@/components'
import ElementUI from 'element-ui'
import message from 'ant-design-vue/lib/message'
import skeleton from 'ant-design-vue/lib/skeleton'

Vue.use(skeleton)
Vue.prototype.message = message

// css
import 'normalize.css/normalize.css'
import 'ant-design-vue/dist/antd.less'
import '@/components/global'
import '@/styles/index.scss'
import '@/permission'

// i18n
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
const iMessages = {
  en: {
    message: 'hello',
    ...enLocale
  },
  zh: {
    message: '你好',
    ...zhLocale
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages: iMessages
})

Vue.use(ElementUI, {
  size: 'small',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  i18n,
  store,
  template: '<App/>',
  render: h => h(App)
})
