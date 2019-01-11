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

      <el-form-item>
        <el-table :data="form.assets">
          <el-table-column
            label="KEY"
            prop="key"
          />
          <el-table-column label="预览">
            <template slot-scope="scope">
              <img
                v-if="scope.row.value"
                :src="scope.row.value"
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-upload
                :on-change="handleUpdate"
                :data="{token, key: scope.row.key}"
                :on-success="handleUploadSuccess"
                action="https://upload.qiniup.com"
              >
                <el-button
                  size="small"
                  type="primary"
                >点击上传</el-button>
              </el-upload>
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
import Fetch from '@/utils/fetch'

const FORM = {}

export default create({
  name: 'DialogAdd',

  mixins: [consoleDialog],

  data() {
    return {
      baseName: '代理商',
      token: '',
      urlBase: 'https://yundun-statics.yundun.com'
    }
  },

  methods: {
    handleUploadSuccess(response, file) {
      const { key, hash } = response
      this.form.assets.find(_ => _.key === key).value = `${this.urlBase}/${hash}`
    },

    handleUpdate(file) {
      // console.log(file)
    },

    async initToken() {
      const data = await Fetch.get('/upload/token')
      this.token = data.uploadToken
    },

    async handleOpen(form = {}, mode) {
      this.mode = mode
      await this.initForm('/agents')
      this.initToken()
      this.form = Object.assign(deepClone(this.FORM), form)
      this.$refs.form && this.$refs.form.clearValidate()
      this.open = true
    }
  }
})
</script>
