<style lang="postcss">
.Page {
  overflow: hidden;

  &--form {
  }

  /* .el-breadcrumb{
    margin-bottom: 20px;
  } */

  &-header {
    padding: 12px;
    border-bottom: 1px solid #eee;
  }

  .padding{
    padding: 20px 30px;
  }
}
</style>
<template>
  <div :class="b([type])">
    <HeaderBreadcrumb v-if="breadcrumb"/>
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
    breadcrumb: Boolean,
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
