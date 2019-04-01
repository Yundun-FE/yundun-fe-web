<template>
  <div>
    <HeaderDetail
      style="margin-bottom: 24px"
      @init="init"
    />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderDetail from './components/HeaderDetail'

export default {
  name: 'SearchLayout',

  components: { HeaderDetail },

  data() {
    return {
      pageMenus: [],
      selectEnv: [],
      info: {}
    }
  },

  created() {
    this.init()
  },

  methods: {
    async init() {
      console.log(this.$route.params.id)
      const info = await this.Fetch.get(`/api/v1/jobs/${this.$route.params.id}`)
      this.info = info

      const data = await this.Fetch.get(`/api/v1/jobs`, { name: info.name })
      this.selectEnv = data.list.map(_ => {
        return {
          label: _.env === 'root' ? 'PRIMARY' : _.title,
          value: _.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search-head {
  background-color: #fff;
  margin: -25px -24px -24px;
  .search-input {
    text-align: center;
    margin-bottom: 16px;
  }
}
.search-content {
  margin-top: 48px;
}
</style>
