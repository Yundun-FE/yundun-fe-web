export default {
  methods: {
    handleClose() {
      this.$refs.Modal.handleClose()
    },

    handleOpen(form) {
      console.log(this.$refs)
      this.beforeOpen && this.beforeOpen(form)
      this.$refs.Modal.handleOpen(form)
      this.afterOpen && this.afterOpen(form)
    }
  }
}
