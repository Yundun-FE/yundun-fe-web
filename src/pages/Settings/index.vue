<style lang="scss">
.page--setting {
  padding: 12px;
}
</style>

<template>
  <page class="page--setting">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="消息开关">
        <el-switch v-model="form.noticeSwitch.progress" />
      </el-form-item>
      <el-form-item label="服务器地址">
        <el-input v-model="form.serverIp" />
      </el-form-item>
      <el-form-item>
        <d-button type="primary" @click="onSubmit">保存</d-button>
      </el-form-item>
    </el-form>
  </page>
</template>

<script>
import Page from '@/components/Page/Page'
import Storage from '@/utils/storage'

export default {
  components: { Page },
  props: {},

  data() {
    return {
      form: {
        serverIp: '',
        username: '',
        noticeSwitch: {
          progress: true
        }
      }
    }
  },

  async mounted() {
    const setting = await Storage.get('setting')
    Object.assign(this.form, setting)
  },

  methods: {
    async onSubmit() {
      Storage.set({ 'setting': this.form })
    }
  }
}
</script>
