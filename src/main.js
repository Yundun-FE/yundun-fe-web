import '@babel/polyfill'
import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import router from '@/router'
import bootstrap from '@/core/bootstrap'
import i18n from '@/core/i18n'
import '@/permission'
import './core/use'

Vue.config.productionTip = false

import VueAxios from '@/utils/request'
Vue.use(VueAxios, router)

new Vue({
  i18n,
  router,
  store,
  created() {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
