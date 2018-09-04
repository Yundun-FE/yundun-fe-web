<template>
  <el-dialog :visible.sync="visible" :title="edit ? '编辑项目' : '新增项目'">
    <el-form label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button :loading="loadingSubmit" type="primary" @click="handleSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { deepClone } from '@/utils/util'

const FORM = {
  title: '',
  name: '',
  password: ''
}

export default {
  data() {
    return {
      visible: false,
      loadingSubmit: false,
      edit: false,
      form: FORM
    }
  },

  methods: {
    async handleSave() {
      const { form, edit } = this

      const { title, name, password } = form
      const data = { title, name, password }

      this.loadingSubmit = true
      try {
        await edit ? this.$Api.Explorer.accountUpdate(form.id, data) : this.$Api.Explorer.accountCreate(data)
      } catch (e) {
        this.loadingSubmit = false
        return
      }

      this.loadingSubmit = false
      this.visible = false
      this.$emit('init-list')
    },
    open(form) {
      this.form = form ? Object.assign(this.form, form) : deepClone(FORM)
      this.edit = !!form
      this.visible = true
    }
  }
}
</script>
