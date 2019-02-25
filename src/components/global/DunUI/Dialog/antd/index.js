import modal from 'ant-design-vue/lib/modal'
import Dialog from './Dialog'

Dialog.install = Vue => {
  Vue.use(modal)
  Vue.component(Dialog.name, Dialog)
}

export default Dialog
