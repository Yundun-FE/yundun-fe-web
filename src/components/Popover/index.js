import PopoverConfirm from './_PopoverConfirm'

const Popover = {}

Popover.install = Vue => {
  Vue.component(PopoverConfirm.name, PopoverConfirm)
}

export default Popover
