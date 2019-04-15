import { deepClone } from '@/utils'

export default {
  methods: {
    handleClose() {
      this.$refs.Modal.handleClose()
    },

    handleOpen(form = {}) {
      form = deepClone(form)
      this.beforeOpen && this.beforeOpen(form)
      this.$refs.Modal.handleOpen(form)
      this.afterOpen && this.afterOpen(form)
    }
  }
}
