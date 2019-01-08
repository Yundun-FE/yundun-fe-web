<style lang="postcss">
.DmConsole {
  &__toolbar {
    margin-bottom: 12px;
  }
  &__body {
    margin-bottom: 12px;
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
    <!-- BODY -->
    <div :class="b('body')">
      <slot />
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
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'DmConsole',

  // props: {
  //   loading: Boolean
  // },

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
