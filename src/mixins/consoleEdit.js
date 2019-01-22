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
      Fetch,
      loading: true,
      list: [],
      disabledEdit: false,
      RULES: {},
      form: {}
    }
  },

  methods: {
    async initForm(url) {
      const data = await Fetch.get(url, { resources: 'form' })
      this.FORM = formatForm(data)
      this.RULES = formatRules(data)
      this.LAYOUT = data
    },

    initData() {},

    async init(id) {
      this.initForm(`/${this.apiName}`)
      const data = await Fetch.get(`/${this.apiName}/${id}`)
      this.form = Object.assign(deepClone(this.FORM), data)
      this.$refs.form && this.$refs.form.clearValidate()

      this.initData()
      // this.updateList(`/${this.apiName}`, params)
    }
  }
}
