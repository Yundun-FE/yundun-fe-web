<template>
  <a-checkbox
    v-model="val"
  >
    <slot />
  </a-checkbox>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'd-checkbox',

  props: {
    value: [Number, Array, Boolean]
  },

  data() {
    return {
      val: this.value
    }
  },

  watch: {
    val(val) {
      this.$emit('input', val)
    }
  }
})
</script>
