// 控制台表单，用于读取表单配置和常规表单提交

import Fetch from '@/utils/fetch'
import Notice from '@/utils/notice'
import { deepClone, isDef } from '@/utils'

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
      loading: true,
      rules: {},
      form: {},
      FORM: {}
    }
  },

  created() {
    this.initForm()
  },

  methods: {
    initData() {},

    async init(id) {
      const data = await Fetch.get(`/${this.apiName}/${id}`)
      this.form = Object.assign(deepClone(this.FORM), data)
      this.initData()
    },
    // 读取默认表单和验证规则
    async initForm() {
      const data = await Fetch.get(`/${this.apiName}`, { resources: 'form' })
      this.FORM = formatForm(data)
      this.rules = formatRules(data)
      this.LAYOUT = data
    },

    async handleSubmit() {
      const form = deepClone(this.form)
      try {
        if (this.mode === 'Edit') {
          await Fetch.put(`/${this.apiName}/${form.id}`, form)
        } else {
          await Fetch.post(`/${this.apiName}`, form)
        }
      } catch (e) {
        return
      }
      Notice('ACTION_SUCCESS')
    }
  }
}
