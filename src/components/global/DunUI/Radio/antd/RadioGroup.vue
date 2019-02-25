<template>
  <a-radio-group
    v-model="value"
    :size="size"
  >
    <slot />
  </a-radio-group>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'd-radio-group',

  props: {
    size: String,
    value: [String, Number],
    defaultValue: String,
    options: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
})
</script>
