<template>
  <div>
    <TableForm
      v-if="form.settings"
      :data="form.settings.commands"
      :row="row"
    >
      <el-table-column label="名称">
        <template slot-scope="scope">
          <d-input
            v-model="scope.row.name"
            placeholder="名称"
          />
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          <d-input
            v-model="scope.row.title"
            placeholder="备注"
          />
        </template>
      </el-table-column>
      <el-table-column label="内容">
        <template slot-scope="scope">
          <d-input
            v-model="scope.row.content"
            placeholder="内容"
          />
        </template>
      </el-table-column>
    </TableForm>
  </div>
</template>

<script>
export default {
  data() {
    return {
      row: {
        name: '',
        title: '',
        symbol: ''
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
