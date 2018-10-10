<template>
  <el-dialog :visible.sync="visible" :title="edit ? '编辑项目' : '新增项目'">
    <el-form label-width="80px">
      <el-form-item label="绑定项目">
        <el-select v-model="form.jid" placeholder="请选择">
          <el-option v-for="item in listJob" :key="item.id" :label="`${item.title} - ${item.env}`" :value="item.id" />
        </el-select>
      </el-form-item>
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

const FORM_RAW = {
  title: '',
  name: '',
  password: '',
  jid: ''
}

export default {
  data() {
    return {
      visible: false,
      loadingSubmit: false,
      edit: false,
      form: deepClone(FORM_RAW),
      listJob: []
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      const { list } = await this.$Api.Explorer.jobList()
      this.listJob = list
    },

    async handleSave() {
      const { form, edit } = this

      const { title, name, password, jid } = form
      const data = { title, name, password, jid }

      this.loadingSubmit = true
      try {
        edit ? await this.$Api.Explorer.accountUpdate(form.id, data) : await this.$Api.Explorer.accountCreate(data)
      } catch (e) {
        this.loadingSubmit = false
        return
      }

      this.loadingSubmit = false
      this.visible = false
      this.$emit('init-list')
    },

    open(form) {
      this.form = form ? Object.assign(this.form, form) : deepClone(FORM_RAW)
      this.edit = !!form
      this.visible = true
    }
  }
}
</script>
