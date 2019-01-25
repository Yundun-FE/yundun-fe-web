<template>
  <div v-if="form.settings">
    <TableForm
      :data="form.settings.assets"
      custom-add-row
      edit-row
      @on-edit-row="handleEditRow"
      @add-row="handleAddRow"
    >
      <el-table-column
        label="KEY"
        prop="key"
      />
      <el-table-column
        label="备注"
        prop="remarks"
      />
      <el-table-column label="预览">
        <template slot-scope="scope">
          <img
            v-if="form.assets[scope.row.key]"
            :width="scope.row.width"
            :height="scope.row.height"
            :src="form.assets[scope.row.key]"
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-upload
            :data="{token}"
            :on-success="res => handleUploadSuccess(res, scope.row.key)"
            action="https://upload.qiniup.com"
          >
            <el-button
              size="small"
              type="primary"
            >点击上传</el-button>
          </el-upload>
        </template>
      </el-table-column>
    </TableForm>
    <DialogRowAssets
      ref="DialogRowAssets"
      :handle-create-submit="handleCreateSubmit"
      :handle-edit-submit="handleEditSubmit"
    />
  </div>
</template>

<script>
import app from '@/mixins/app'
import DialogRowAssets from './DialogRowAssets'

export default {
  components: { DialogRowAssets },

  mixins: [app],

  data() {
    return {
      BASE_URL: 'https://yundun-statics.yundun.com',
      token: ''
    }
  },

  computed: {
    form() {
      return this.$parent.model
    }
  },

  created() {
    this.initToken()
  },

  methods: {
    handleAddRow() {
      this.$refs.DialogRowAssets.handleOpen()
    },

    handleEditRow(scope) {
      const form = {
        ...scope.row,
        id: scope.$index
      }
      console.log(form)
      this.$refs.DialogRowAssets.handleOpen(form)
    },

    handleUploadSuccess(response, key) {
      const { hash } = response
      this.form.assets[key] = `${this.BASE_URL}/${hash}`
    },

    async handleCreateSubmit(form) {
      this.form.settings.assets.push(form)
    },

    handleEditSubmit(form) {
      this.$set(this.form.settings.assets, form.id, form)
    },

    async initToken() {
      const data = await this.Fetch.get('/upload/token')
      this.token = data.uploadToken
    }
  }
}
</script>
