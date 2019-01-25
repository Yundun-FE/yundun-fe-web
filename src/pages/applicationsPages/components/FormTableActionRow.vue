<template>
  <div>
    <el-form-item
      v-if="form.content"
      label="行操作"
    >
      <TableForm
        :data="form.content.actions.row.list"
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
        <el-table-column
          label="子操作"
          min-width="500"
        >
          <template slot-scope="scope">
            <el-table
              v-if="scope.row.items"
              :data="scope.row.items"
              style="margin-bottom: 12px"
              border
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
              <el-table-column
                label="操作"
                width="80"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="handleActionRowChildDelete(form.content.actions.row.list[scope.$index].items, scope.$index)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              type="primary"
              @click="handleActionRowChildAdd(scope.row)"
            >新增</el-button>
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
