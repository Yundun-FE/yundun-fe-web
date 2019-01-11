import Page from './Page/Page'
import Form from './Form'
import Dialog from './Dialog/Dialog'
import DmConsole from './Dm/DmConsole'

function install(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true

  const components = [
    Form
  ]

  components.forEach(Component => {
    Component.install(Vue)
  })
}
export function installComponents(Vue) {
  Vue.use(install)
  Vue.component(Page.name, Page)
  Vue.component(Dialog.name, Dialog)
  Vue.component(DmConsole.name, DmConsole)
}
