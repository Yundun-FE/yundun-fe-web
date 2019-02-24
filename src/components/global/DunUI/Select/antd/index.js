import Select from './Select'
import SelectOption from './SelectOption'

Select.install = Vue => {
  Vue.component(Select.name, Select)
  Vue.component(SelectOption.name, Select)
}

export default Select
