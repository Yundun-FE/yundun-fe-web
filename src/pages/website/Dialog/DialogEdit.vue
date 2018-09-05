<style lang="postcss">
</style>
<template>
  <el-dialog :visible.sync="visible" :title="isEdit ? '编辑项目' : '新增项目'">
    <el-form label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="URL">
        <el-input v-model="form.url" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button :loading="loadingSubmit" type="primary" @click="handleSave">确 定</el-button>
    </span>
  </el-dialog>
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
        url: ''
      }
    }
  },

  methods: {
    async handleSave() {
      const { form, isEdit } = this

      const { title, url } = form
      const data = { title, url }

      this.loadingSubmit = true
      try {
        await isEdit ? this.$Api.Explorer.websiteUpdate(form.id, data) : this.$Api.Explorer.websiteCreate(data)
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
