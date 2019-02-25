<template>
  <a-radio
    :value="value"
  >
    <slot />
  </a-radio>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'd-radio',

  props: {
    value: [String, Number]
  }
})
</script>
