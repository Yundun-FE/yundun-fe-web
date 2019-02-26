<template>
  <el-dialog
    :visible="useVisible"
    :title="title"
    :class="b()"
    @close="handleClose"
  >
    <slot />
    <template slot="footer">
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'd-dialog',

  props: {
    title: [String, Number],
    visible: Boolean
  },

  data() {
    return {
      useVisible: false
    }
  },

  watch: {
    visible(val) {
      this.useVisible = val
    }
  },

  methods: {
    handleClose() {
      this.useVisible = false
      this.$emit('update:visible', false)
    }
  }

})
</script>
