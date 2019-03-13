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
      this.beforeOpen()
      this.visible = true
    }
  }
}
