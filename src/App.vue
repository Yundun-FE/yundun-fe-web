<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Explorer from '@/api/explorer'
import Lockr from 'lockr'
import Storage from '@/utils/storage'

export default {
  name: 'App',
  mounted() {
    this.initAccount()
  },
  methods: {
    async initAccount() {
      const { list } = await Explorer.accountList()
      Storage.set({
        testAccount: list
      })
    }
  }
}
</script>

<style lang="postcss">
body {
  height: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  background: #eff2f7;
}

#app {
  margin: 0 auto;
  background: #fff;
}

</style>
