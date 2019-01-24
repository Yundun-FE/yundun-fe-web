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

    handleOpen() {
      this.visible = true
    }
  }
}
