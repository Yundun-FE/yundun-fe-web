<style lang="less">
</style>

<template>
  <a-card>
    <div slot="title">
      邮箱
    </div>
    <p>您可以关联和修改您的邮件地址，并设置其中的一个为主邮箱。您的主邮箱将被用于登陆账户以及接收相关的邮件通知（例如，账户提醒和计费收据)。</p>

    <a-list/>

    <a-form>
      <a-form-item>
        <a-input placeholder="输入新邮箱"/>
        <a-button>添加</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
export default {
  props: {},

  data() {
    return {}
  },

  computed: {},

  methods: {}
}
</script>
