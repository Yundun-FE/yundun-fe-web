<template>
  <el-button
    :type="type"
    :size="size"
    :loading="loading"
    @click="handleClick"
  >
    <slot />
  </el-button>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'd-button',

  props: {
    type: String,
    size: String,
    loading: Boolean
  },

  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
})
</script>
