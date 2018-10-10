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
      <el-button :loading="loadingSubmit" type="primary" @click="handleSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { deepClone } from '@/utils'
import Notice from '@/service/notice'

const FORM_RAW = {
  title: '',
  url: ''
}

export default {
  data() {
    return {
      visible: false,
      loadingSubmit: false,
      isEdit: false,
      form: deepClone(FORM_RAW)
    }
  },

  methods: {
    async handleSubmit() {
      const { form, isEdit } = this
      const { title, url } = form
      const data = { title, url }

      this.loadingSubmit = true
      try {
        isEdit ? await this.$Api.Explorer.websiteUpdate(form.id, data) : await this.$Api.Explorer.websiteCreate(data)
      } catch (e) {
        Notice('CREATE_ERROR', e)
        this.loadingSubmit = false
        return
      }

      this.loadingSubmit = false
      this.visible = false
      Notice('CREATE_SUCCESS')
      this.$emit('init-list')
    },

    open(formData) {
      this.isEdit = !!formData
      this.visible = true
      this.form = formData || deepClone(FORM_RAW)
    }
  }
}
</script>
