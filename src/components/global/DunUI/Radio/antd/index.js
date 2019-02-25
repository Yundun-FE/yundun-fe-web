import Radio from './Radio'
import RadioGroup from './RadioGroup'

Radio.install = Vue => {
  Vue.component(Radio.name, Radio)
  Vue.component(RadioGroup.name, RadioGroup)
}

export default Radio
