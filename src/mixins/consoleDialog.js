import { deepClone } from '../utils'

export default {
  data() {
    return {
      bindForm: {},
      formDefault: {}
    }
  },

  methods: {
    beforeOpen() {},

    handleClose() {
      this.$refs.Dialog.handleClose()
    },

    resetSubmitLoading() {
      this.$refs.Dialog.resetSubmitLoading()
    },

    handleOpen(form = {}) {
      this.beforeOpen()
      this.form = Object.assign(deepClone(this.formDefault), form)
      this.$refs.Dialog.handleOpen()
    }
  }
}
