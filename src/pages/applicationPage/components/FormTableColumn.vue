<template>
  <div>
    <el-form-item
      v-if="form.content"
      label="表格配置"
    >
      <TableForm
        :data="form.content.columns"
        :row="row"
        sort
      >
        <el-table-column
          label="组件"
          prop="componentName"
        >
          <template slot-scope="scope">
            <yd-form-select
              :selects="LABEL.COLUMN_COMPONENT_NAME"
              v-model="scope.row.componentName"
              default-text="默认"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="PROP"
          prop="props.prop"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.props.prop" />
          </template>
        </el-table-column>
        <el-table-column
          label="宽度"
          prop="props.width"
        >
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.props.width" />
          </template>
        </el-table-column>
        <el-table-column
          label="最小宽度"
          prop="props.minWidth"
        >
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.props.minWidth" />
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
        componentName: '',
        props: {
          prop: '',
          label: '',
          minWidth: 100
        }
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
