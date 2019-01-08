import Page from './Page/Page'
import Dialog from './Dialog/Dialog'
import DmConsole from './Dm/DmConsole'

export function installComponents(Vue) {
  Vue.component(Page.name, Page)
  Vue.component(Dialog.name, Dialog)
  Vue.component(DmConsole.name, DmConsole)
}
