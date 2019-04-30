<style lang="less">
</style>

<template>
  <div>
    <a-card title="个人信息">

      <a-form>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="头像"
          help="支持 JPG, PNG 格式，文件小于 1M。"
        >
          <a-avatar
            :size="64"
            :src="userInfo.avatar"
            icon="user"
          />
          <div>
            <a-upload
              :headers="authHeaders()"
              name="file"
              action="api/v1/user/avatar"
              @change="handleChange"
            >
              <a-button type="primary">
                <a-icon type="upload" />选择图片
              </a-button>
            </a-upload>
          </div>
          <!--  -->
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="用户名"
        >
          <a-input
            v-model="userInfo.username"
            style="width: 280px"
            disabled
          >
            <a-icon
              slot="suffix"
              type="lock"
            />
          </a-input>
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="手机号"
        >
          <!--  -->
          <a-input
            v-model="userInfo.phoneNumber"
            style="width: 280px"
          />
          <a-button
            style="margin-left: 12px"
            type="primary"
          >修改</a-button>
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="更改密码"
        >
          <!--  -->
          <a-input
            :value="12345678"
            disabled
            type="password"
            style="width: 280px"
          >
            <a-icon
              slot="suffix"
              type="lock"
            />
          </a-input>
          <a-button style="margin-left: 12px">更改</a-button>
        </a-form-item>
      </a-form>

    </a-card>
  </div>
</template>

<script>
import userMixins from '@/mixins/user'
import { authHeaders } from '@/utils/auth'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

export default {
  mixins: [userMixins],

  props: {},

  data() {
    return {
      authHeaders,
      formItemLayout
    }
  },

  computed: {},

  methods: {}
}
</script>
