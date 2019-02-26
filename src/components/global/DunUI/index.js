import Button from './Button/element'
import Checkbox from './Checkbox/antd'
import Dialog from './Dialog/element'
import Input from './Input/element'
import Radio from './Radio/antd'
import Select from './Select/antd'

function install(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true

  const components = [
    Button,
    Checkbox,
    Dialog,
    Input,
    Radio,
    Select
  ]

  components.forEach(Component => {
    Component.install(Vue)
  })
}

export default {
  install
}
