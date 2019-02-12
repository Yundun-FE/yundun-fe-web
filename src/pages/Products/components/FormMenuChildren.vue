<template>
  <TableForm
    :data="form"
    :row="row"
    sort
  >
    <!-- <el-table-column
      label="ID"
      prop="id"
      width="50"
    /> -->
    <!-- <el-table-column
      label="CODE"
      prop="code"
      width="70"
    /> -->
    <el-table-column
      label="名称"
      prop="name"
      min-width="80"
    />
    <el-table-column
      label="Index"
      min-width="60"
    >
      <template slot-scope="scope">
        <el-input
          v-model="scope.row.index"
          placeholder="Index"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="ICON"
      min-width="120"
    >
      <template slot-scope="scope">
        <el-input
          v-model="scope.row.icon"
          placeholder="Icon"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="别名"
      min-width="100"
    >
      <template slot-scope="scope">
        <el-input
          v-model="scope.row.alias"
          placeholder="别名"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="url"
      min-width="150"
    >
      <template slot-scope="scope">
        <el-input
          v-model="scope.row.url"
          placeholder="路径"
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
</template>

<script>
import { formatLabel } from '@/utils/form'

export default {
  props: {
    form: Array
  },

  data() {
    return {
      apps: [],
      selectApps: [],
      row: {}
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
      this.apps = data.list
      this.selectApps = formatLabel(data.list, 'name', 'id')
    }
  }
}
</script>
