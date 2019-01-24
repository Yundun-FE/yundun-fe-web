import { merge } from 'lodash/object'

export default {
  props: {
    beforeOpen: Function
  },

  data() {
    return {
      bindForm: {}
    }
  },

  methods: {
    handleClose() {
      this.$refs.Dialog.handleClose()
    },

    handleOpen(form) {
      if (form) {
        this.init(form.id)
      } else {
        Object.assign(this.FORM, this.bindForm)
        this.handleReset()
      }
      this.$refs.Dialog.handleOpen(form)
    }
  }
}
