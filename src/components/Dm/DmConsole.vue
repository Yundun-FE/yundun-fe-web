<style lang="postcss">
.DmConsole {
  &__toolbar {
    margin-bottom: 12px;
  }

  &__core {
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
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
          :loading="loading"
          :data="data"
          :columns="columns"
        />
        <!-- <el-table
          v-loading="loading"
          :data="data"
          size="medium"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            v-if="selection"
            type="selection"
            width="55"
          />
          <slot />
        </el-table> -->
      </div>
      <!-- FOOTER -->
      <div :class="b('footer')">
        <el-pagination
          :current-page="page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="total"
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
      // this.multipleSelection = val
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
