<template>
  <div>
    <el-table
      :data="data"
      border
    >
      <slot/>
      <el-table-column
        :width="actionWidth"
        prop="name"
        label="操作"
      >
        <template slot-scope="scope">
          <template v-if="sort">
            <el-button
              type="text"
              @click="handleRowUp(scope.$index)"
            >上移</el-button>
            <el-button
              type="text"
              @click="handleRowDown(scope.$index)"
            >下移</el-button>
          </template>
          <el-button
            type="text"
            @click="handleRowDelete(scope.$index)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 12px">
      <el-button
        type="primary"
        @click="handleRowAdd"
      >新增</el-button>
    </div>
  </div>
</template>

<script>
import create from 'common/utils/create-basic'
import formTable from '@/mixins/formTable'

export default create({
  name: 'TableForm',

  mixins: [formTable],

  props: {
    sort: Boolean,
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    row: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },

  computed: {
    actionWidth() {
      if (this.sort) {
        return '200px'
      } else {
        return '100px'
      }
    }
  }
})
</script>
