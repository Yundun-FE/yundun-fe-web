import Button from './Button'

function install(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true

  const components = [
    Button
  ]

  components.forEach(Component => {
    Component.install(Vue)
  })
}

export default {
  install
}
