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
      mode: 'Create',
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
      if (id) this.mode = 'Edit'
      const data = await Fetch.get(`/${this.API_NAME}/${id}`)
      this.form = Object.assign(deepClone(this.FORM), data)
      this.initData()
    },
    // 读取默认表单和验证规则
    async initForm() {
      const data = await Fetch.get(`/${this.API_NAME}`, { resources: 'form' })
      this.FORM = formatForm(data)
      this.rules = formatRules(data)
    },

    handleReset() {
      this.form = deepClone(this.FORM)
    },

    async handleSubmit() {
      const form = deepClone(this.form)
      try {
        if (this.mode === 'Edit') {
          await Fetch.put(`/${this.API_NAME}/${form.id}`, form)
        } else {
          await Fetch.post(`/${this.API_NAME}`, form)
        }
      } catch (e) {
        return
      }
      Notice('ACTION_SUCCESS')
      if (this.$refs.Dialog) {
        this.$emit('init')
        this.$refs.Dialog.handleClose()
      }
    }
  }
}
