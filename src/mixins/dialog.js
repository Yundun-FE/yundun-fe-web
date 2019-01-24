export default {
  props: {

  },

  data() {
    return {
      visible: false
    }
  },

  methods: {
    handleClose() {
      this.visible = false
    },

    handleOpen(e) {
      console.log(e)
      this.visible = true
    }
  }
}
