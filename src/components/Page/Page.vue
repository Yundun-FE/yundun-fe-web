<style lang="postcss">
.page {
  overflow: hidden;

  &-header {
    padding: 12px;
    border-bottom: 1px solid #EEE;
  }
}
</style>
<template>
  <div class="page">
    <!-- <el-alert
      title="成功提示的文案"
      type="success"/> -->
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
