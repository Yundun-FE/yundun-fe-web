<template>
  <el-dialog :visible.sync="visible" :title="isEdit ? '编辑项目' : '新增项目'">
    <el-form label-width="80px">
      <el-form-item label="标题">
        <el-input id="form_title" v-model="form.title" />
      </el-form-item>
      <el-form-item label="URL">
        <el-input id="form_url" v-model="form.url" />
      </el-form-item>
      <el-form-item label="ENV">
        <Select id="form_env" v-model="form.env" :options="SELECT_ENV" />
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input id="form_name" v-model="form.name" />
      </el-form-item>
      <el-form-item label="编译配置">
        <el-input id="form_setting" :autosize="{minRows: 5}" v-model="form.setting" type="textarea" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button id="btn-cancel" @click="visible = false">取 消</el-button>
      <el-button id="btn-submit" :loading="loadingSubmit" type="primary" @click="handleSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Select from '@/components/Select/Select'
import { deepClone } from '@/utils'
import Notice from '@/utils/notice'

const SELECT_ENV = [
  {
    label: 'TEST',
    value: 'test'
  },
  {
    label: 'PRE',
    value: 'pre'
  },
  {
    label: 'TEST-ONLINE',
    value: 'test-online'
  },
  {
    label: 'PROD',
    value: 'prod'
  }
]

const FORM_RAW = {
  title: '',
  url: '',
  env: '',
  name: '',
  setting: ''
}

const FORM_KEYS = Object.keys(FORM_RAW)

export default {
  components: { Select },
  data() {
    return {
      SELECT_ENV,
      visible: false,
      loadingSubmit: false,
      isEdit: false,
      form: deepClone(FORM_RAW)
    }
  },

  methods: {
    async handleSave() {
      const { form, isEdit } = this

      const data = {}
      for (const k in form) {
        const item = form[k]
        if (FORM_KEYS.includes(k)) {
          data[k] = item
        }
      }

      this.loadingSubmit = true
      try {
        isEdit ? await this.$Api.Explorer.jobUpdate(form.id, data) : await this.$Api.Explorer.jobCreate(data)
      } catch (e) {
        this.loadingSubmit = false
        isEdit ? Notice('EDIT_ERROR', e) : Notice('CREATE_ERROR', e)
        return
      }

      this.loadingSubmit = false
      this.visible = false

      isEdit ? Notice('EDIT_SUCCESS') : Notice('CREATE_SUCCESS')
      this.$emit('init-list')
    },
    handleOpen(form) {
      this.isEdit = !!form
      Object.assign(this.form, form)
      this.visible = true
    }
  }
}
</script>
