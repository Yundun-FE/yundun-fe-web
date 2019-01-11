<template>
  <Dialog
    v-loading
    :class="b()"
    :title="title"
    :visible.sync="open"
    :close-on-click-modal="true"
    width="780px"
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
        label="版本"
        prop="version"
      >
        <el-input
          v-model="form.version"
          placeholder="版本"
          style="width: 220px"
        />
      </el-form-item>
      <el-form-item>
        <el-table :data="form.data">
          <el-table-column
            label="是否启用"
            align="left"
            width="100"
          >
            <template slot-scope="scope">
              <el-switch v-model="scope.row.enable" />
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            min-width="180"
          />
          <el-table-column
            prop="alias"
            label="别名"
            min-width="180"
          >
            <template slot-scope="scope">
              <el-input
                :disabled="!scope.row.enable"
                v-model="scope.row.alias"
                placeholder="别名"
              />
            </template>
          </el-table-column>
        </el-table>
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
      await this.initRules('/brandsVersion')
      this.form = Object.assign(deepClone(this.FORM), form)
      this.$refs.form && this.$refs.form.clearValidate()
      this.open = true
    }
  }
})
</script>
