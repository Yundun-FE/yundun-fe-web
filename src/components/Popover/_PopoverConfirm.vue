<template>
  <a-popconfirm
    :title="title"
    :ok-text="okText"
    :cancel-text="cancelText"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <slot/>
  </a-popconfirm>
</template>

<script>
export default {
  name: 'PopoverConfirm',

  props: {
    title: {
      type: String,
      default() {
        return this.$t('du.message.confirmAction')
      }
    },
    okText: {
      type: String,
      default() {
        return this.$t('du.dialog.ok')
      }
    },
    cancelText: {
      type: String,
      default() {
        return this.$t('du.dialog.cancel')
      }
    }
  },

  methods: {
    handleConfirm() {
      this.$emit('confirm')
    },

    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>
