export default {
  // props: {
  //   beforeOpen: Function
  // },

  methods: {
    handleClose() {
      this.$refs.Dialog.handleClose()
    },

    handleOpen(form) {
      if (form) {
        this.init(form.id)
      } else {
        this.handleReset()
      }
      this.$refs.Dialog.handleOpen(form)
    }
  }
}
