import Button from './Button/antd'
import Dialog from './Dialog/antd'
import Input from './Input/antd'
import Select from './Select/antd'

function install(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true

  const components = [
    Button,
    Dialog,
    Input,
    Select
  ]

  components.forEach(Component => {
    Component.install(Vue)
  })
}

export default {
  install
}
