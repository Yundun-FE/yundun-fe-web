<style lang="scss">
</style>

<template>
  <a-card
    :class="b()"
    :title="title"
    :style="{'height': isNaN(height) ? height : `${height}px`}"
  >
    <a
      slot="extra"
      @click="handleSettings"
    >配置</a>
    <slot />
  </a-card>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'CardSettings',

  components: {},

  props: {
    title: String,
    height: [Number, String]
  },

  data() {
    return {}
  },

  computed: {},

  methods: {
    handleSettings() {
      this.$emit('edit')
    }
  }
})
</script>
