<style lang="postcss" scoped>
</style>

<template>
  <Dialog
    v-loading
    :class="b()"
    :title="title"
    :visible.sync="open"
    :close-on-click-modal="true"
    @submit="handleSubmit"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="RULES"
      label-width="120px"
    >
      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input
          v-model="form.name"
          style="width: 220px"
        />
      </el-form-item>
      <el-form-item
        label="网址"
        prop="website"
      >
        <el-input
          v-model="form.website"
          style="width: 220px"
        />
      </el-form-item>
      <el-form-item
        label="资源"
        prop="assets"
      >
        <el-input
          v-model="form.assets"
          type="textarea"
          rows="4"
          style="width: 320px"
        />
      </el-form-item>
      <el-form-item
        label="品牌ID"
        prop="brandId"
      >
        <el-input
          v-model="form.brandId"
          style="width: 220px"
        />
      </el-form-item>
      <el-form-item
        label="目录ID"
        prop="menuId"
      >
        <el-input
          v-model="form.menuId"
          style="width: 220px"
        />
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import create from '@/utils/create-basic'
import { deepClone } from '@/utils'
import Fetch from '@/utils/fetch'

const FORM = {}

export default create({
  name: 'DialogAdd',

  data() {
    return {
      RULES: {},
      FORM: {},
      open: false,
      mode: '',
      form: {}
    }
  },

  computed: {
    title() {
      const name = '代理商'
      return this.mode === 'EDIT' ? `修改${name}` : `新增${name}`
    }
  },

  methods: {
    async initRules() {
      const data = await Fetch.get('/agents', { resources: 'rules' })
      const { form, rules } = data
      form.assets = JSON.stringify(form.assets)
      this.FORM = form
      this.RULES = rules
    },

    async handleOpen(form = {}, mode) {
      this.mode = mode
      await this.initRules()
      this.form = Object.assign(deepClone(this.FORM), form)
      this.$refs.form && this.$refs.form.clearValidate()
      this.open = true
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
})
</script>
