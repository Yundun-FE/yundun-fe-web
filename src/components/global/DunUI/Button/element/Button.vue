<template>
  <el-button
    :type="type"
    :size="size"
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
    size: String
  },

  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
})
</script>
