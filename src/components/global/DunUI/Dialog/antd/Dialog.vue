<template>
  <a-modal
    :visible="useVisible"
    :title="title"
    :class="b()"
    @cancel="handleCancel"
  >
    <slot />
    <template slot="footer">
      <slot name="footer" />
    </template>
  </a-modal>
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
    handleCancel() {
      this.useVisible = false
      this.$emit('update:visible', false)
    }
  }

})
</script>
