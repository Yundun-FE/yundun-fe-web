<template>
  <div>
    <el-form-item label="目录">
      <TableForm
        :data="form.menus"
        :row="row"
        sort
      >
        <el-table-column
          label="名称"
          min-width="100px"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.name"
              placeholder="名称"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="路径"
          min-width="150px"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.path"
              placeholder="路径"
            />
          </template>
        </el-table-column>
      </TableForm>
    </el-form-item>
  </div>
</template>

<script>
import formTable from '@/mixins/form-table'

export default {
  mixins: [formTable],

  data() {
    return {
      row: {
        name: '',
        path: '/'
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
