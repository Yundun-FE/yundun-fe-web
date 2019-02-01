<template>
  <div>
    <el-form-item
      v-if="data.props"
      label="表格配置"
    >
      <TableForm
        :data="data.props.columns"
        :row="row"
        sort
      >
        <el-table-column
          label="名称"
          prop="props.label"
        >
          <template slot-scope="scope">
            <!-- {{ scope.row.props.prop }} -->
            <!-- {{ settings[data.name].props.columns[scope.row.props.prop].props.label }} -->
            <el-input
              v-if="env === 'root'"
              v-model="scope.row.props.label"
              size="small"
            />
            <el-input
              v-else
              v-model="settings[data.name].props.columns[scope.row.props.prop].props.label"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="组件"
          size="small"
          prop="componentName"
        >
          <template slot-scope="scope">
            <yd-form-select
              :selects="LABEL.COLUMN_COMPONENT_NAME"
              v-model="scope.row.componentName"
              :disabled="env !== 'root'"
              size="small"
              default-text="默认"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="显示"
          width="80"
        >
          <template slot-scope="scope">
            <!-- <el-checkbox v-model="checked1">显示</el-checkbox> -->
          </template>
        </el-table-column>
        <el-table-column
          label="PROP"
          prop="props.prop"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.props.prop"
              :disabled="env !== 'root'"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column
          width="400px"
          label="布局"
        >
          <template slot-scope="scope">
            <!-- <el-checkbox
              v-model="checked"
              style="margin-right: 10px"
            >自适应</el-checkbox> -->
            <el-input-number
              :disabled="env !== 'root'"
              v-model="scope.row.props.width"
              size="small"
            />
            <el-input-number
              :disabled="env !== 'root'"
              v-model="scope.row.props.minWidth"
              size="small"
            />
          </template>
        </el-table-column>
      </TableForm>

      <!-- <RenderTable
        :columns="form.columns"
        border
        selection
        size="small"
        style="margin-top: 12px"
        @header-click="handleCickHeader"
      /> -->
    </el-form-item>
  </div>
</template>

<script>

export default {
  props: {
    data: Object,
    settings: Object,
    env: String
  },

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

  inject: ['dmEdit'],

  methods: {
    handleCickHeader(val) {
      console.log(val)
    }
  }
}
</script>
