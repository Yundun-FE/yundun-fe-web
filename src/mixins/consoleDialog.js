import { deepClone } from '../utils'
import { format } from 'url'

export default {
  data() {
    return {
      bindForm: {},
      formDefault: {},
      modify: false
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
      this.modify = !!form.id
      this.form = Object.assign(deepClone(this.formDefault), form)
      this.$refs.Dialog.handleOpen()
    }
  }
}
