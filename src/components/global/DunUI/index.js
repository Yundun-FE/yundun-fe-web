import Button from './Button/antd'
import Dialog from './Dialog/antd'
import Input from './Input/element'

function install(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true

  const components = [
    Button,
    Dialog,
    Input
  ]

  components.forEach(Component => {
    Component.install(Vue)
  })
}

export default {
  install
}
