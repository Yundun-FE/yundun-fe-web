import { isDef } from '../utils'

export default {
  data() {
    return {
      visible: false
    }
  },

  methods: {
    handleClose() {
      this.visible = false
    },

    handleOpen(form) {
      this.visible = true
    }
  }
}
