<style lang="postcss">
.DmConsole {
  padding: 20px 30px;

  .el-table th{
    background: rgb(249, 251, 255);
  }

  &__toolbar {
    margin-bottom: 12px;
  }

  &__core {
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.1);
    /* box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2); */
  }

  &__body {
    .el-table {
      min-height: 500px;
    }

    .el-loading-mask {
      top: 42px;

      .el-loading-spinner {
        top: 30px;
        margin-top: 0px;
      }
    }
  }

  &__footer {
    overflow: hidden;
    padding: 12px;

    .el-pagination {
      float: right;
    }
  }
}
</style>

<template>
  <div :class="b()">
    <!-- TOOLBAR -->
    <div
      v-if="$slots.toolbar"
      :class="b('toolbar')"
    >
      <slot name="toolbar" />
    </div>
    <div :class="b('core')">
      <!-- BODY -->
      <div :class="b('body')">
        <DmTable
          v-loading="loading"
          v-if="columns && columns.length > 0"
          :data="data"
          :columns="columns"
          @selection-change="handleSelectionChange"
        >
          <slot/>
        </DmTable>
      </div>
      <!-- FOOTER -->
      <div :class="b('footer')">
        <el-pagination
          :current-page="page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="total"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'
import DmTable from './DmTable'

export default create({
  name: 'DmConsole',

  components: { DmTable },

  props: {
    createText: {
      type: String,
      default: '新增'
    },

    selection: Boolean,
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: true
    },
    multipleSelection: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 10
      // multipleSelection: [],
    }
  },

  mounted() {
    this.handleEmit()
  },

  methods: {
    handleSelectionChange(val) {
      this.$emit('update:multipleSelection', val)
    },

    updateTotal(total) {
      this.total = total
    },

    handleInit() {
      this.page = 1
      this.handleEmit()
    },

    handleEmit() {
      const { total, page, pageSize } = this
      const params = {
        total, page, pageSize
      }
      this.$emit('init', params)
    },

    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.page = 1
      this.handleEmit()
    },

    handleCurrentChange(page) {
      this.page = page
      this.handleEmit()
    }
  }
})
</script>
