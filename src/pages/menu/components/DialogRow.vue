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
          placeholder="名称"
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
      <el-form-item
        label="路径"
        prop="path"
      >
        <el-input
          v-model="form.path"
          style="width: 220px"
        />
      </el-form-item>
      <el-form-item>
        <el-table :data="form.children">
          <el-table-column/>
        </el-table>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import create from '@/utils/create-basic'
import { deepClone } from '@/utils'
import consoleDialog from '@/mixins/consoleDialog'

export default create({
  name: 'DialogAdd',

  mixins: [consoleDialog],

  data() {
    return {
      baseName: '目录'
    }
  },

  methods: {
    async handleOpen(form = {}, mode) {
      this.mode = mode
      await this.initRules('/menus')
      this.form = Object.assign(deepClone(this.FORM), form)
      this.$refs.form && this.$refs.form.clearValidate()
      this.open = true
    }
  }
})
</script>
