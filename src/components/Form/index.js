import Form from './Form'
import FormRadio from './FormRadio'
import FormRadioButton from './FormRadioButton'
import FormSelect from './FormSelect'
import FormCheckbox from './FormCheckbox'
import FormSearch from './FormSearch'
import FormUploadImg from './_FormUploadImg'

Form.install = Vue => {
  // Vue.component(Form.name, Form)
  Vue.component(FormRadio.name, FormRadio)
  Vue.component(FormRadioButton.name, FormRadioButton)
  Vue.component(FormSelect.name, FormSelect)
  Vue.component(FormCheckbox.name, FormCheckbox)
  Vue.component(FormSearch.name, FormSearch)
  Vue.component(FormUploadImg.name, FormUploadImg)
}

export default Form
