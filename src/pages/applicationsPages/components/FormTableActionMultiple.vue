<template>
  <div>
    <el-form-item
      v-if="form.content"
      label="批量操作"
    >
      <TableForm
        :data="form.content.actions.multiple.list"
        :row="row"
        sort
      >
        <el-table-column
          label="名称"
          min-width="200"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.label" />
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
              default-text="默认"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="命令"
          width="150"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.command" />
          </template>
        </el-table-column>
      </TableForm>
    </el-form-item>
  </div>
</template>

<script>
import formTable from '@/mixins/formTable'

export default {
  mixins: [formTable],

  data() {
    return {
      row: {
        label: '',
        type: '',
        command: ''
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
