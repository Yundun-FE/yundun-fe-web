<style lang="scss">
.DialogForm {
  .ant-modal-body {
    position: relative;

    .ant-skeleton {
      display: flex;
      position: absolute;
      padding: 16px;
      padding-top: 0px;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      z-index: 1;
      background: #fff;
    }
  }
}
</style>

<template>
  <a-modal
    :class="b()"
    :title="titleShow"
    :width="width"
    v-model="visible"
  >
    <a-skeleton
      v-if="loading"
      active
    />
    <div
      v-if="this.$slots.header"
      :class="b('header')"
    >
      <slot name="header" />
    </div>
    <el-form
      ref="form"
      :model="value"
      :rules="rules"
      :label-width="labelWidth"
    >
      <slot />
    </el-form>
    <div slot="footer">
      <a-button
        :loading="submitLoading"
        type="primary"
        @click="handleSubmit"
      >{{ $t('el.messagebox.confirm') }}</a-button>
      <a-button @click="handleClose">{{ $t('el.messagebox.cancel') }}</a-button>
    </div>
  </a-modal>
</template>

<script>
//
//  YUNDUN
//  ----------------------------
//  Name: DialogForm
//  i18n: true
//  Author：kongfanbo@yundun.com
//
import create from '../../utils/create-basic'
import dialogBase from '../../mixins/dialogBase'
import form from '../../mixins/form'

export default create({
  name: 'DialogForm',

  mixins: [dialogBase, form],

  props: {
    title: String,
    titleLabel: String,
    width: {
      type: [String, Number],
      default: 580
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    loading: Boolean,
    modify: Boolean
  },

  data() {
    return {
      submitLoading: false
    }
  },

  computed: {
    titleShow() {
      return this.title || this.modify ? `${this.$t('du.toolbar.modify')}${this.titleLabel}` : `${this.$t('du.toolbar.create')}${this.titleLabel}`
    }
  },

  methods: {
    // 重置提交 Loading
    resetSubmitLoading() {
      this.submitLoading = false
    },
    // hook: 打开前
    beforeOpen() {
      this.clearValidate()
      this.resetSubmitLoading()
    },
    // hook: 提交前
    beforeSubmit() {
      this.submitLoading = true
    },
    // hook: 验证后
    afterValidate(valid) {
      // 验证不通过
      if (!valid) this.resetSubmitLoading()
    }
  }
})
</script>
