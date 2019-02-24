<template>
  <div>
    <TableForm
      v-if="form.settings"
      :data="form.settings.builds"
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
      <el-table-column label="标题">
        <template slot-scope="scope">
          <d-input
            v-model="scope.row.title"
            placeholder="标题"
          />
        </template>
      </el-table-column>
      <el-table-column label="SYMBOL">
        <template slot-scope="scope">
          <d-input
            v-model="scope.row.symbol"
            placeholder="SYMBOL"
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
