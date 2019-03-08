import '@babel/polyfill'
import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import router from '@/router'
import bootstrap from './core/bootstrap'
import i18n from '@/core/i18n'
import './core/use'

Vue.config.productionTip = false
import ElementUI from 'element-ui'

import VueAxios from '@/utils/request'

Vue.use(VueAxios, router)

Vue.use(ElementUI, {
  size: 'small',
  i18n: (key, value) => i18n.t(key, value)
})

// new Vue({
//   el: '#app',
//   // router,
//   i18n,
//   store,
//   created() {
//     bootstrap()
//   },
//   template: '<App/>',
//   render: h => h(App)
// })

new Vue({
  router,
  store,
  created() {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
