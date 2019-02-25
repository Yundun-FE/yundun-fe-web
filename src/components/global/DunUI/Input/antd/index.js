import input from 'ant-design-vue/lib/input'
import Input from './Input'
import InputNumber from './InputNumber'

Input.install = Vue => {
  Vue.use(input)
  Vue.component(Input.name, Input)
  Vue.component(InputNumber.name, InputNumber)
}

export default Input
