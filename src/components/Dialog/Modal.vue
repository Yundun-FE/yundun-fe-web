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
      submitLoading: false
    }
  },

  computed: {
    titleShow() {
      return this.title || (this.modify ? `${this.$t('du.toolbar.modify')}${this.titleLabel}` : `${this.$t('du.toolbar.create')}${this.titleLabel}`)
    }
  },

  methods: {
    startSubmitLoading() {
      this.submitLoading = true
    },
    // 重置提交 Loading
    resetSubmitLoading() {
      this.submitLoading = false
    },
    // hook: 打开前
    beforeOpen(form = {}) {
      this.modify = form && form.id
      this.resetSubmitLoading()
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
      setTimeout(() => {
        this.handleClose()
      }, 150)
    },

    async handleSubmit(e) {
      this.$emit('submit')
    }
  }
})
</script>
