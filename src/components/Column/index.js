import ColumnAction from './_ColumnAction'
import ColumnActionButton from './_ColumnActionButton'

const Column = {}

Column.install = Vue => {
  Vue.component(ColumnAction.name, ColumnAction)
  Vue.component(ColumnActionButton.name, ColumnActionButton)
}

export default Column
