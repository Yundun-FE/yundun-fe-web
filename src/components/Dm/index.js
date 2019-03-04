import DmConsole from './DmConsole'
import DmEdit from './DmEdit'
import DmTable from './DmTable'

const Dm = {}

Dm.install = Vue => {
  Vue.component(DmConsole.name, DmConsole)
  Vue.component(DmEdit.name, DmEdit)
  Vue.component(DmTable.name, DmTable)
}

export default Dm
