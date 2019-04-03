import ConsoleTable from './ConsoleTable'

const Console = {}
Console.install = Vue => {
  Vue.component(ConsoleTable.name, ConsoleTable)
}

export default Console
