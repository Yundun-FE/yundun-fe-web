<template>
  <TableForm
    :data="form"
    :row="row"
    sort
  >
    <el-table-column
      label="名称"
      prop="name"
    />
    <el-table-column label="别名">
      <template slot-scope="scope">
        <el-input
          v-model="scope.row.alias"
          placeholder="别名"
        />
      </template>
    </el-table-column>

    <template slot="add-form">
      <yd-form-select
        :selects="selectApps"
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
      row: {
        name: '',
        alias: '',
        code: ''
      }
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
      const data = await this.Fetch.get('/applications')
      this.apps = data.list
      this.selectApps = formatLabel(data.list, 'name', 'id')
    }
  }
}
</script>
