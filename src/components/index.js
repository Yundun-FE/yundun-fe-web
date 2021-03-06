import Page from './Page'
import Form from './Form'
import Column from './Column'
import Console from './Console'
import Popover from './Popover'
import Dm from './Dm'
import Card from './Card'
import Dialog from './Dialog'
import Table from './Table'
import Header from './Header'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

function install(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true

  const components = [
    Page,
    Form,
    Dialog,
    Column,
    Console,
    Popover,
    Dm,
    Card,
    Header,
    Table
  ]

  components.forEach(Component => {
    Component.install(Vue)
  })
}
export function installComponents(Vue) {
  Vue.component('VuePerfectScrollbar', VuePerfectScrollbar)
  Vue.use(install)
}
