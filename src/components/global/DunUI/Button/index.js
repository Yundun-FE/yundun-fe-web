// import Button from './element/Button'
import Button from './antd/Button'

Button.install = Vue => {
  Vue.component(Button.name, Button)
}

export default Button
