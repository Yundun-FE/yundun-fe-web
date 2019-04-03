<template>
  <el-form-item label="其他配置">
    <TableForm
      v-if="form.settings"
      :data="form.settings.options"
      :row="row"
      sort
    >
      <el-table-column
        label="Name"
        prop="name"
        min-width="200"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.name"
            placeholder="Name"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="value"
        prop="remarks"
        min-width="200"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.value"
            placeholder="Value"
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
        value: ''
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
