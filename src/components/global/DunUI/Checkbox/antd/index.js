import checkbox from 'ant-design-vue/lib/checkbox'
import Checkbox from './Checkbox'

Checkbox.install = Vue => {
  Vue.use(checkbox)
  Vue.component(Checkbox.name, Checkbox)
}

export default Checkbox
