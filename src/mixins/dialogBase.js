export default {
  data() {
    return {
      visible: false
    }
  },

  methods: {
    beforeOpen() {},

    handleClose() {
      this.visible = false
    },

    handleOpen(form) {
      this.beforeOpen(form)
      this.visible = true
      this.afterOpen(form)
    }
  }
}
