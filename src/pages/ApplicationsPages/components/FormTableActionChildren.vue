<template>
  <TableForm
    :data="data"
    :row="row"
    sort
  >
    <el-table-column
      label="名称"
      min-width="200"
    >
      <template slot-scope="scope">
        <d-input
          v-model="scope.row.label"
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
          size="small"
          default-value="默认"
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
          size="small"
        />
      </template>
    </el-table-column>
  </TableForm>
</template>

<script>

export default {
  props: {
    data: Array,
    env: String
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
