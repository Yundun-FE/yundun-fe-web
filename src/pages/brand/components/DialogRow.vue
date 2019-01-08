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
        label="CODE"
        prop="code"
      >
        <el-input
          v-model="form.code"
          style="width: 220px"
        />
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import create from '@/utils/create-basic'
import { deepClone } from '@/utils'
import consoleDialog from '@/mixins/consoleDialog'

const FORM = {}

export default create({
  name: 'DialogAdd',

  mixins: [consoleDialog],

  data() {
    return {
      baseName: '品牌'
    }
  },

  methods: {
    async handleOpen(form = {}, mode) {
      this.mode = mode
      await this.initRules('/brands')
      this.form = Object.assign(deepClone(this.FORM), form)
      this.$refs.form && this.$refs.form.clearValidate()
      this.open = true
    }
  }
})
</script>
