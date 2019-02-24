<template>
  <el-form-item label="绑定应用">
    <TableForm
      v-if="form.settings"
      :data="form.settings.apps"
      :row="row"
      sort
    >
      <el-table-column
        label="ID"
        prop="id"
        width="50"
      />
      <el-table-column
        label="CODE"
        prop="code"
        width="70"
      />
      <el-table-column
        label="名称"
        prop="name"
        min-width="180"
      />
      <el-table-column
        label="别名"
        min-width="180"
      >
        <template slot-scope="scope">
          <d-input
            v-model="scope.row.alias"
            placeholder="别名"
          />
        </template>
      </el-table-column>
      <template slot="add-form">
        <yd-form-select
          :selects="selectApps"
          size="small"
          @change="handleChangeApp"
        />
      </template>
    </TableForm>
  </el-form-item>
</template>

<script>
import { formatLabel } from '@/utils/form'

export default {
  data() {
    return {
      apps: [],
      selectApps: [],
      row: {}
    }
  },

  computed: {
    form() {
      return this.$parent.model
    }
  },

  created() {
    this.initAppList()
  },

  methods: {
    handleChangeApp(id) {
      this.row = this.apps.find(_ => _.id === id)
    },

    async initAppList() {
      const data = await this.Fetch.get('/applications', { pageSize: 100 })
      this.apps = data.list || []
      this.selectApps = formatLabel(data.list, 'name', 'id')
    }
  }
}
</script>
