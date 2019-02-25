import button from 'ant-design-vue/lib/button'
import Button from './Button'

Button.install = Vue => {
  Vue.use(button)
  Vue.component(Button.name, Button)
}

export default Button
