<style lang="stylus">
.page {
  padding: 24px;

  &-header {
    padding-bottom: 10px;
  }
}
</style>
<template>
  <div class="page">
    <div class="page-header">
      <slot name="header" />
    </div>
    <slot/>
  </div>
</template>

<script>
export default {

  components: {},
  props: {},

  data() {
    return {}
  },

  computed: {},

  methods: {}
}
</script>
