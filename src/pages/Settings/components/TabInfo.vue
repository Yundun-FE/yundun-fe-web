<style lang="less">
</style>

<template>
  <div>
    <a-card title="个人信息">

      <a-form>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="头像">
          <a-avatar :size="64" icon="user" />
          <!--  -->
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="手机号"
        >
          <!--  -->
          <a-input v-model="userInfo.phoneNumber" />
        </a-form-item>
      </a-form>

    </a-card>
  </div>
</template>

<script>
import userMixins from '@/mixins/user'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
}

export default {
  mixins: [userMixins],

  props: {},

  data() {
    return {
      formItemLayout,
      formTailLayout
    }
  },

  computed: {},

  methods: {}
}
</script>
