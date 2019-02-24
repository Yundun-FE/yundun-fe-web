<template>
  <div>
    <el-form-item label="目录">
      <TableForm
        :data="form.menus"
        :row="row"
        sort
      >
        <el-table-column label="名称">
          <template slot-scope="scope">
            <d-input
              v-model="scope.row.name"
              placeholder="名称"
            />
          </template>
        </el-table-column>
        <el-table-column min-width="200" label="子项目">
          <template slot-scope="scope">
            <FormMenuChildren :form="scope.row.childrens" />
          </template>
        </el-table-column>
      </TableForm>
    </el-form-item>
  </div>
</template>

<script>
import FormMenuChildren from './FormMenuChildren'

export default {
  components: { FormMenuChildren },

  data() {
    return {
      row: {
        name: '',
        childrens: []
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
