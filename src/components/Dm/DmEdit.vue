<style lang="postcss">
.DmEdit {

  .BlockForm {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  /* padding: 30px; */
}
</style>

<template>
  <div :class="b()">
    <Card
      theme="action"
      title="编辑页面"
    >
      <slot />
      <div slot="footer">
        <el-button @click="handleBack">返回</el-button>
        <div class="pull-right">
          <el-button
            type="primary"
            @click="handleSubmit"
          >保存</el-button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import create from 'common/utils/create-basic'

export default create({
  name: 'DmEdit',

  components: {},

  props: {},

  data() {
    return {}
  },

  computed: {},

  methods: {
    handleBack() {
      this.$emit('on-back')
    },

    handleSubmit() {
      this.$emit('submit')
    }
  }
})
</script>
