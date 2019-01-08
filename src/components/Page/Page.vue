<style lang="stylus">
.page {

  // padding: 12px;
  &-header {
    padding: 12px;
    border-bottom: 1px solid #EEE;
  }
}
</style>
<template>
  <div class="page">
    <div
      v-if="$slots.header"
      class="page-header"
    >
      <slot name="header" />
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Page',
  components: {},
  props: {},

  data() {
    return {}
  },

  computed: {},

  methods: {}
}
</script>
