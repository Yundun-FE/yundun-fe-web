<style lang="scss">
.DmEdit {
  min-height: 300px;
  margin-bottom: 16px;

  .Card--action {
  }

  .BlockForm {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  &--fixed {
    margin-bottom: 50px;

    .Card__footer{
      position: fixed;
      bottom: 0px;
      right: 0px;
      left: 200px;
      z-index: 100;
      border-top: 1px solid #EEE;
      background: #FFF;
      padding: 12px 30px;
    }
  }
}
</style>

<template>
  <div :class="b({ fixed })">
    <Card
      :title="title"
      theme="action"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
      >
        <slot />
      </el-form>
      <div slot="footer">
        <d-button
          v-if="backButton"
          @click="handleBack"
        >返回</d-button>
        <div class="pull-right">
          <d-button
            type="primary"
            @click="handleSubmit"
          >保存</d-button>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import create from '../../utils/create-basic'
import form from '../../mixins/form'

export default create({
  name: 'DmEdit',

  mixins: [form],

  props: {
    backButton: Boolean,
    title: '',
    fixed: Boolean
  },

  provide() {
    return {
      dmEdit: this
    }
  },

  methods: {
    handleBack() {
      this.$router.push({
        path: '..'
      })
    }
  }
})
</script>
