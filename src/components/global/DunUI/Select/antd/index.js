import select from 'ant-design-vue/lib/select'
import Select from './Select'
import SelectOption from './SelectOption'

Select.install = Vue => {
  Vue.use(select)
  Vue.component(Select.name, Select)
  Vue.component(SelectOption.name, Select)
}

export default Select
