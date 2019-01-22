<style lang="postcss">
.Page {
  overflow: hidden;
  padding: 20px 30px;

  &--form {
  }

  .el-breadcrumb{
    margin-bottom: 20px;
  }

  &-header {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }
}
</style>
<template>
  <div :class="b([type])">
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
import create from '@/utils/create-basic'

export default create({
  name: 'Page',
  components: {},
  props: {
    type: {
      type: String,
      default: ''
    }
  },

  data() {
    return {}
  },

  computed: {},

  methods: {}
})
</script>
