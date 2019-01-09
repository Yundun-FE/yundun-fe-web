import Fetch from '@/utils/fetch'
import { deepClone } from '@/utils'
import { array2Obj } from '@/utils/array'

function formatForm(data) {
  const form = {}
  Object.keys(data).forEach(key => {
    form[key] = data.default
  })
}

function formatRules(data) {
  const rules = {}
  Object.keys(data).forEach(key => {
    rules[key] = data.rules
  })
  return rules
}

export default {
  data() {
    return {
      RULES: {},
      FORM: {},
      LAYOUT: [],
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
    async initForm(url) {
      const data = await Fetch.get(url, { resources: 'form' })
      this.FORM = formatForm(data)
      this.RULES = formatRules(data)
      this.LAYOUT = data
    },

    async initRules(url) {
    },

    handleClose() {
      this.open = false
    },

    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        const form = deepClone(this.form)
        form._mode = this.mode
        this.$emit('submit', form)
      })
    }
  }
}
