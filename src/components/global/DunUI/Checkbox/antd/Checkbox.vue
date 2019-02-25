<template>
  <a-checkbox
    v-model="value"
  >
    <slot />
  </a-checkbox>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'd-checkbox',

  props: {
    value: [String, Number]
  }
})
</script>
