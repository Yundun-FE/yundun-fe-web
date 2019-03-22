<template>
  <div>
    {{ remderColumns }}
    <DmTable
      :columns="remderColumns"
      selection
      style="margin-top: 12px"
      @header-click="handleCickHeader"
    />
    <el-form-item
      v-if="data.props"
      style="margin-top: 12px"
      label="表格配置"
    >
      <TableForm
        :data="data.props.columns"
        :row="row"
        sort
      >
        <el-table-column
          label="组件"
          size="small"
          prop="componentName"
          width="180"
        >
          <template slot-scope="scope">
            <yd-form-select
              :selects="LABEL.COLUMN_COMPONENT_NAME"
              v-model="scope.row.componentName"
              :disabled="env !== 'root'"
              filterable
              allow-create
              default-first-option
              default-value="默认"
              @change="value => handleChangeComponent(value, scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="名称"
          prop="props.label"
          width="150"
        >
          <template slot-scope="scope">
            <el-input
              :disabled="env !== 'root'"
              v-model="scope.row.props.label"
              size="small"
            />
          </template>
        </el-table-column>
        <el-table-column label="显示">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.show" />
          </template>
        </el-table-column>

        <el-table-column
          label="PROP (NAME)"
          width="150"
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
          min-width="200px"
          label="布局"
        >
          <template slot-scope="scope">
            <!-- <d-checkbox
              v-model="checked"
              style="margin-right: 10px"
            >自适应</d-checkbox> -->
            <el-input-number
              v-model="scope.row.props.width"
              :step="5"
              size="small"
              style="margin-right: 10px"
            />
            <el-input-number
              v-model="scope.row.props.minWidth"
              :step="5"
              size="small"
              style="margin-right: 10px"
            />

            <yd-form-select
              :selects="LABEL.ALIGN_TYPE"
              v-model="scope.row.props.align"
              style="width: 100px; margin-left: 8px;"
              size="small"
            />
          </template>
        </el-table-column>
      </TableForm>
    </el-form-item>
  </div>
</template>

<script>
import { isDef } from '@/utils'

export default {
  props: {
    data: Object,
    env: String
  },

  inject: ['dmEdit'],

  data() {
    return {
      row: {
        componentName: '',
        show: true,
        props: {
          prop: '',
          label: '',
          minWidth: 100
        }
      }
    }
  },

  computed: {
    remderColumns() {
      return this.form && this.form.props && this.form.props.columns
    }
  },

  methods: {
    handleChangeComponent(value, item) {
      if (value === 'ColumnAction') {
        item.props.label = '操作'
        item.props.minWidth = 200
        item.props.prop = 'ColumnAction'
      }
    },

    formatShow(val) {
      return isDef(val) ? val : true
    },

    handleCickHeader(val) {
      console.log(val)
    }
  }
}
</script>
