import '@babel/polyfill'
import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import router from '@/router'
import bootstrap from '@/core/bootstrap'
import i18n from '@/core/i18n'
import MyIcon from '@/core/fonticon'
import '@/permission'

Vue.config.productionTip = false

import VueAxios from '@/utils/request'

Vue.use(VueAxios, router)

// Vue.use(ElementUI, {
//   size: 'small',
//   i18n: (key, value) => i18n.t(key, value)
// })

import './core/use'

new Vue({
  i18n,
  router,
  store,
  components: {
    MyIcon
  },
  created() {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
