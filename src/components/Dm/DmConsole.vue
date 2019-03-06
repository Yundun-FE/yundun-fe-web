<style lang="scss">
.DmConsole {
  min-height: 200px;
  display: flex;
  flex-flow: column;

  &__toolbar {
    width: 100%;
    height: 32px;
    margin-bottom: 12px;

    .skeleton {
      background: #ddd;
      width: 80px;
      height: 100%;
    }
  }

  &__core {
    display: flex;
    flex-flow: column;
    position: relative;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.1);

    &:before {
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      height: 40px;
      background: $--color-primary;
    }

    .el-loading-mask {
      top: 41px;
      bottom: 57px;
      background: #fff;
      z-index: 999;

      .el-loading-spinner {
        top: 16px;
        margin-top: 0px;
        font-size: 12px;
        color: #666;

        .el-icon-loading {
          font-size: 15px;
          margin-right: 6px;
        }
      }
    }
  }

  &__body {
    min-height: 500px;
    .el-table {
      min-height: 500px;
    }
  }

  &__footer {
    padding: 12px;

    .el-pagination {
      float: right;
    }
  }
}
</style>

<template>
  <div :class="b()">
    <div :class="b('query')">
      <slot name="query" />
    </div>
    <!-- 操作条 -->
    <div :class="b('toolbar')">
      <template v-if="loadingLayout && loadingData">
        <div class="skeleton" />
      </template>
      <ColumnActionButton
        v-else
        :multiple-action-disable="multipleSelection.length === 0"
        :list="actionsToolbar"
        @action="handleAction"
      />
      <slot name="toolbar" />
      <div class="pull-right">
        <slot name="toolbar-right" />
      </div>
    </div>
    <div :class="b('core')">
      <div
        v-if="loadingLayout && loadingData"
        class="el-loading-mask"
      >
        <div class="el-loading-spinner"><i class="el-icon-loading" />加载中</div>
      </div>
      <!-- BODY -->
      <div :class="b('body')">
        <DmTable
          v-if="columns && columns.length > 0"
          :columns="columns"
          :selection="tableSelection"
          :actions-row="actionsRow"
          :data="data"
          @action="handleAction"
          @selection-change="handleSelectionChange"
        />
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
import create from '../../utils/create-basic'
import DmTable from './DmTable'

export default create({
  name: 'DmConsole',

  components: { DmTable },

  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    bindParams: {
      type: Object,
      default: function() {
        return {}
      }
    },
    loading: {
      type: Boolean,
      default: true
    },
    loadingLayout: {
      type: Boolean,
      default: true
    },
    loadingData: {
      type: Boolean,
      default: true
    },
    multipleSelection: {
      type: Array,
      default: function() {
        return []
      }
    },
    selection: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: function() {
        return []
      }
    },
    actionsRow: {
      type: Array,
      default: function() {
        return []
      }
    },
    actionsToolbar: {
      type: Array,
      default: function() {
        return []
      }
    }
  },

  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 10,
      show: true
    }
  },

  computed: {
    // 是否显示多选框
    tableSelection() {
      let op = false
      if (this.selection) {
        op = true
      } else {
        this.actionsToolbar.forEach(item => {
          if (item.command.includes('Multiple')) op = true
        })
      }
      return op
    }
  },

  created() {
    this.handleEmit()
  },

  methods: {
    handleShow() {
      this.show = true
    },

    handleAction(e) {
      this.$emit('action', e)
    },

    handleSelectionChange(val) {
      this.$emit('update:multipleSelection', val)
    },

    updateTotal(total) {
      this.total = Number(total)
    },

    handleSearch() {
      this.handleInit()
    },

    handleInit() {
      this.page = 1
      this.handleEmit()
    },

    handleEmit() {
      const { total, page, pageSize } = this
      const params = {
        total, page, pageSize, ...this.bindParams, per_page: pageSize
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
