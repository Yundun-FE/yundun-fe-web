
<template>
  <a-select
    v-model="viewValue"
    :size="size"
  >
    <slot />
  </a-select>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'd-select',

  props: {
    size: String,
    value: [String, Number]
  },

  inject: {
    configProvider: { default: () => ({}) }
  },

  data() {
    return {
      viewValue: this.value
    }
  },

  watch: {
    value(val) {
      this.viewValue = val
    },

    viewValue(val) {
      this.$emit('input', val)
    }
  }
})
</script>
