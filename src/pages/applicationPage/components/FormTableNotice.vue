<template>
  <div>
    <el-form-item
      v-if="form.content"
      label="消息提示"
    >
      <TableForm
        :data="form.content.notices"
        :row="row"
        sort
      >
        <el-table-column label="内容">
          <template slot-scope="scope">
            <el-input
              :rows="3"
              v-model="scope.row.content"
              type="textarea"
              placeholder="内容"
            />
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
        content: '',
        settings: {}
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
