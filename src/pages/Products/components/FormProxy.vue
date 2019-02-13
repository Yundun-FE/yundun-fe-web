<template>
  <el-form-item label="代理配置">
    <TableForm
      v-if="form.settings"
      :data="form.settings.proxy"
      :row="row"
      sort
    >
      <el-table-column
        label="名称"
        prop="name"
        width="100"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.name"
            placeholder="名称"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="Url"
        prop="url"
        width="120"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.url"
            placeholder="Url"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="目标"
        prop="target"
        min-width="180"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.target"
            placeholder="目标"
          />
        </template>
      </el-table-column>
    </TableForm>
  </el-form-item>
</template>

<script>
import { formatLabel } from '@/utils/form'

export default {
  data() {
    return {
      row: {
        name: '',
        url: '',
        target: ''
      }
    }
  },

  computed: {
    form() {
      return this.$parent.model
    }
  }
}
</script>
