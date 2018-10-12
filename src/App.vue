<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Explorer from '@/api/explorer'
import Storage from '@/utils/storage'

export default {
  name: 'App',
  mounted() {
    this.initAccount()
  },
  methods: {
    async initAccount() {
      const data = await Explorer.accountList()
      if (!data) return

      Storage.set({
        testAccount: data.list
      })
    }
  }
}
</script>

<style lang="stylus">
body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  background: #eff2f7;

  .el-dialog {
    width: 100%;
    max-width: 600px;
  }
}

#app {
  margin: 0 auto;
  background: #fff;
}
</style>
