<template>
  <TableForm
    :data="data"
    :row="row"
    :row-template="rowTemplate"
    sort
  >
    <el-table-column
      label="名称"
      min-width="200"
    >
      <template slot-scope="scope">
        <d-input
          v-model="scope.row.label"
          :disabled="env !== 'root'"
          size="small"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="类型"
      width="150"
    >
      <template slot-scope="scope">
        <yd-form-select
          :selects="LABEL.BUTTON_TYPE"
          v-model="scope.row.type"
          :disabled="env !== 'root'"
          size="small"
          default-text="默认"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="命令"
      width="150"
    >
      <template slot-scope="scope">
        <d-input
          v-model="scope.row.command"
          :disabled="env !== 'root'"
          size="small"
        />
      </template>
    </el-table-column>
    <el-table-column
      label="子操作"
      min-width="500"
    >
      <template slot-scope="scope">
        <FormTableActionChildren :data="scope.row.items"/>
      </template>
    </el-table-column>
  </TableForm>
</template>

<script>
import FormTableActionChildren from './FormTableActionChildren'

export default {
  components: { FormTableActionChildren },

  props: {
    data: Array,
    env: String,
    rowTemplate: Array
  },

  data() {
    return {
      row: {
        label: '',
        type: '',
        command: ''
      }
    }
  }
}
</script>
