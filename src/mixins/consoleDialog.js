import Fetch from '@/utils/fetch'
import { deepClone, isDef } from '@/utils'
import { array2Obj } from '@/utils/array'

function formatForm(data) {
  const form = {}
  data.forEach(item => {
    form[item.prop] = isDef(item.default) ? item.default : ''
  })
  return form
}

function formatRules(data) {
  const rules = {}
  data.forEach(item => {
    if (item.rules) rules[item.prop] = item.rules
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
