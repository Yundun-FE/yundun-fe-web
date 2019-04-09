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
    <slot/>
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

export default create({
  name: 'Modal',

  mixins: [dialogBase],

  props: {
    title: String,
    titleLabel: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: 580
    },
    loading: Boolean,
    fields: {
      type: Array,
      default: function() {
        return []
      }
    },
    fetchUpdate: Function,
    fetchCreate: Function,
    fetchSubmit: Function
  },

  data() {
    return {
      modify: false,
      submitLoading: false,
      form: '',
      formRaw: {}
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
    beforeOpen(form = {}) {
      this.form = this.$form.createForm(this)
      this.modify = form && form.id
      this.formRaw = form
      this.resetSubmitLoading()
    },

    afterOpen(form = {}) {
      const data = {}
      Object.keys(form).forEach(key => {
        if (this.fields.includes(key)) data[key] = form[key]
      })

      this.$nextTick(() => {
        this.form.setFieldsValue(data)
      })
    },
    // hook: 验证后
    afterValidate(valid) {
      // 验证不通过
      if (!valid) this.resetSubmitLoading()
    },

    async handleSubmitData(form, fn) {
      try {
        await fn(form)
      } catch (e) {
        return
      } finally {
        this.resetSubmitLoading()
      }
      this.$emit('submit-success')
      this.message.success('保存成功')
      setTimeout(() => {
        this.handleClose()
      }, 150)
    },

    async handleSubmit(e) {
      this.$emit('submit')
      // this.submitLoading = true
      // e.preventDefault()

      // try {
      //   await this.fetchSubmit()
      // } catch (e) {
      //   return
      // } finally {
      //   this.submitLoading = false
      // }
      // this.form.validateFields((err, values) => {
      //   if (!err) {
      //     const form = {
      //       ...this.formRaw, ...values
      //     }
      //     if (this.modify) {
      //       if (this.fetchUpdate) this.handleSubmitData(form, this.fetchUpdate)
      //     } else {
      //       if (this.fetchCreate) this.handleSubmitData(form, this.fetchCreate)
      //     }
      //   }
      // })
    }
  }
})
</script>
