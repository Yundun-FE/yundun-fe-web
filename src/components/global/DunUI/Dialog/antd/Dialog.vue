<template>
  <a-modal
    :visible="visible"
    :class="b()"
  >
    <slot />
  </a-modal>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'd-dialog',

  props: {
    visible: Boolean
  }
})
</script>
