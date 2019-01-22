import Page from './Page/Page'
import Form from './Form'
import Column from './Column'
import Card from './Card'
import Dialog from './Dialog/Dialog'
import DmConsole from './Dm/DmConsole'
import DmEdit from './Dm/DmEdit'

function install(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true

  const components = [
    Form,
    Column,
    Card
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
  Vue.component(DmEdit.name, DmEdit)
}
