<style lang="postcss">
.DmConsole {
  &__toolbar {
    margin-bottom: 12px;
  }

  &__core {
    background: #fff;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
  }

  &__body {
    margin-bottom: 12px;
    min-height: 500px;
  }

  &__footer {
    overflow: hidden;
    padding: 12px;
    border-top: 1px solid #eee;

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
        <el-table
          v-loading="loading"
          :data="data"
          size="medium"
        >
          <slot />
        </el-table>
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

export default create({
  name: 'DmConsole',

  props: {
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 10
    }
  },

  mounted() {
    this.handleEmit()
  },

  methods: {
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
