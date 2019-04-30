<style lang="less">
</style>

<template>
  <div>
    <a-tabs tab-position="left" default-active-key="info">
      <a-tab-pane key="account" tab="账户信息">账户信息</a-tab-pane>
      <a-tab-pane key="info" tab="个人信息"><TabInfo/></a-tab-pane>
      <a-tab-pane key="email" tab="邮箱"><TabEmail/></a-tab-pane>
      <a-tab-pane key="organization" tab="我的组织">我的组织</a-tab-pane>
      <!-- <a-tab-pane key="loginSetting" tab="登陆设置">登陆设置</a-tab-pane> -->
      <a-tab-pane key="notice" tab="通知">通知</a-tab-pane>
      <a-tab-pane key="api" tab="API">API</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import TabInfo from './components/TabInfo'
import TabEmail from './components/TabEmail'

export default {
  components: { TabInfo, TabEmail },

  props: {},

  data() {
    return {}
  },

  computed: {},

  methods: {}
}
</script>
