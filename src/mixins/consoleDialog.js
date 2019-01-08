import Fetch from '@/utils/fetch'
import { deepClone } from '@/utils'

export default {
  data() {
    return {
      RULES: {},
      FORM: {},
      mode: '',
      form: {},
      open: false
    }
  },

  computed: {
    title() {
      const name = this.baseName
      return this.mode === 'EDIT' ? `修改${name}` : `新增${name}`
    }
  },

  methods: {
    async initRules(url) {
      const data = await Fetch.get(url, { resources: 'rules' })
      const { form, rules } = data
      form.assets = JSON.stringify(form.assets)
      this.FORM = form
      this.RULES = rules
    },

    handleClose() {
      this.open = false
    },

    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        const form = deepClone(this.form)
        form.assets = JSON.parse(form.assets)
        form._mode = this.mode
        this.$emit('submit', form)
      })
    }
  }
}
