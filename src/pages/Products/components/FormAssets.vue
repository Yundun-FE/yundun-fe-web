<style lang="scss" scoped>
.assets-img{
  background: $--color-primary;
}
</style>

<template>
  <div v-if="form.settings">
    <el-alert
      v-show="form.env !== 'root'"
      size="small"
      type="warning"
      style="margin-bottom: 12px"
      title="如需新增配置，请切换至 PRIMARY"
    />
    <TableForm
      :data="form.settings.assets"
      :show-add-row="form.env === 'root'"
      custom-add-row
      edit-row
      sort
      @on-edit-row="handleEditRow"
      @add-row="handleAddRow"
    >
      <el-table-column
        label="KEY"
        prop="key"
        width="150"
      />
      <el-table-column
        label="备注"
        prop="remarks"
        width="150"
      />
      <el-table-column label="预览" min-width="500">
        <template slot-scope="scope">
          <img
            v-if="form.assets[scope.row.key]"
            :width="scope.row.width"
            :height="scope.row.height"
            :src="form.assets[scope.row.key]"
            class="assets-img"
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-upload
            :data="{token}"
            :on-success="res => handleUploadSuccess(res, scope.row.key)"
            action="https://upload.qiniup.com"
          >
            <d-button
              size="small"
            >点击上传</d-button>
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
    info() {
      return this.$parent.$parent.info
    },
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
