<style lang="scss">
.ModalForm {
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
    <a-form
      ref="form"
      :form="form"
      @submit="handleSubmit"
    >
      <slot/>
    </a-form>
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
//  ----------------------------
//  i18n: true
//
import create from '../../utils/create-basic'
import dialogBase from '../../mixins/dialogBase'
import form from '../../mixins/form'

export default create({
  name: 'ModalForm',

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

  beforeCreate() {
  },

  methods: {
    // 重置提交 Loading
    resetSubmitLoading() {
      this.submitLoading = false
    },
    // hook: 打开前
    beforeOpen(form) {
      this.form = this.$form.createForm(this)

      this.resetSubmitLoading()
    },

    afterOpen(form) {
      const { name, title, jenkinsName } = form
      this.$nextTick(() => {
        this.form.setFieldsValue({ name, title, jenkinsName })
      })
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
