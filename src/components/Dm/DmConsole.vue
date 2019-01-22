<style lang="postcss">
.DmConsole {
  .el-table th {
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
    min-height: 500px;
    .el-table {
      min-height: 500px;
    }

    .el-loading-mask {
      top: 47px;

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
    <div :class="b('toolbar')">
      <template v-if="actions.toolbar">
        <el-button
          v-for="(item, index) in actions.toolbar.list"
          :key="index"
          :type="item.type"
          @click="handleAction(item.command)"
        >{{ item.label }}</el-button>
      </template>
      <!-- MULTIPLE -->
      <template v-if="actions.multiple">
        <el-button
          v-for="(item, index) in actions.multiple.list"
          :key="`multiple-${index}`"
          :type="item.type"
          :disabled="multipleSelection.length === 0"
          @click="handleAction({ command: item.command, mode: 'Multiple'})"
        >{{ item.label }}</el-button>
      </template>
      <slot name="toolbar" />
    </div>
    <div :class="b('core')">
      <!-- BODY -->
      <div :class="b('body')">
        <RenderTable
          v-loading="loading"
          v-if="columns && columns.length > 0"
          :data="data"
          :columns="columns"
          :selection="selection"
          :actions="actions"
          @action="handleAction"
          @selection-change="handleSelectionChange"
        >
          <slot />
        </RenderTable>
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
import RenderTable from './RenderTable'

export default create({
  name: 'DmConsole',

  components: { RenderTable },

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
    },
    actions: {
      type: Object,
      default: () => { }
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
    handleAction(e) {
      if (!e) return
      this.$emit('action', e)
    },

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
