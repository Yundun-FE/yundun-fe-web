<template>
  <a-button
    :type="type"
    :size="useSize"
    :loading="loading"
    @click="handleClick"
  >
    <slot />
  </a-button>
</template>

<script>
import create from '@/utils/create-basic'

const SIZE_MAP = {
  large: 'large',
  default: 'default',
  small: 'small',
  mini: 'small'
}
export default create({
  name: 'd-button',

  props: {
    type: String,
    size: {
      type: String,
      default: 'default'
    },
    loading: Boolean
  },

  computed: {
    useSize() {
      return SIZE_MAP[this.size]
    }
  },

  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
})
</script>
