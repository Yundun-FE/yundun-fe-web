export default {
  props: {
    value: {
      type: Object,
      default: function() {
        return {}
      }
    },
    rules: {
      type: Object,
      default: function() {
        return {}
      }
    },
    formDefault: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },

  data() {
    return {
      form: this.value
    }
  },

  watch: {
    value(val) {
      this.form = val
    },

    rules() {
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate()
      })
    },

    form(val) {
      this.$emit('input', val)
    }
  },

  methods: {
    beforeSubmit() {},

    afterValidate() {},

    clearValidate() {
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate()
      })
    },

    handleSubmit() {
      this.beforeSubmit()
      this.$refs.form.validate(valid => {
        this.afterValidate(valid)
        if (!valid) return
        this.$emit('submit')
      })
    }
  }
}
