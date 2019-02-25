<style lang="scss">
.d-button {
  &--text {
    border-color: transparent;
    color: $--color-primary;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
  }
}
</style>

<template>
  <a-button
    :class="b([type])"
    :type="useType"
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

const TYPE_MAP = {
  text: 'default'
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
    },

    useType() {
      return TYPE_MAP[this.type] ? TYPE_MAP[this.type] : this.type
    }
  },

  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
})
</script>
