import radio from 'ant-design-vue/lib/radio'
import Radio from './Radio'
import RadioGroup from './RadioGroup'

Radio.install = Vue => {
  Vue.use(radio)
  Vue.component(Radio.name, Radio)
  Vue.component(RadioGroup.name, RadioGroup)
}

export default Radio
