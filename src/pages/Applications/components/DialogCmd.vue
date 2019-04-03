<template>
  <d-dialog :visible.sync="visible" :title="isEdit ? '编辑项目' : '新增项目'">
    <el-form label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="URL">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item label="ENV">
        <el-input v-model="form.env" />
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <d-button @click="visible = false">取 消</d-button>
      <d-button :loading="loadingSubmit" type="primary" @click="handleSave">确 定</d-button>
    </span>
  </d-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      loadingSubmit: false,
      isEdit: false,
      form: {
        title: '',
        url: '',
        env: '',
        name: ''
      }
    }
  },

  methods: {
    async handleSave() {
      const { form, isEdit } = this
      const { title, url, env, name } = form
      const data = { title, url, env, name }

      this.loadingSubmit = true
      try {
        isEdit ? await this.$Api.Explorer.jobUpdate(form.id, data) : await this.$Api.Explorer.jobCreate(data)
      } catch (e) {
        this.loadingSubmit = false
        return
      }

      this.loadingSubmit = false
      this.visible = false
      this.$emit('init-list')
    },

    open(form) {
      this.isEdit = !!form
      Object.assign(this.form, form)
      this.visible = true
    }
  }
}
</script>
