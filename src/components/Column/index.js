import ColumnActionButton from './ColumnActionButton'
// import ColumnStatus from './ColumnStatus'

const Column = {}

Column.install = Vue => {
  Vue.component(ColumnActionButton.name, ColumnActionButton)
  // Vue.component(ColumnStatus.name, ColumnStatus)
}

export default Column
