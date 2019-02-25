<template>
  <a-input
    :size="size"
    :type="type"
    :disabled="disabled"
    :class="b()"
  />
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'd-input',

  props: {
    size: String,
    type: String,
    disabled: Boolean
  }
})
</script>
