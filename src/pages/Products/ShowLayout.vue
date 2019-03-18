<template>
  <div class="search-content">

    <HeaderDetail>
      <HeaderTab :data="pageMenus" />
    </HeaderDetail>

    <!-- {{ getMenuTabs('products.id') }} -->
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
      info: {},
      tabs: {
        items: [
          {
            key: '1',
            title: '设置'
          },
          {
            key: '2',
            title: '项目'
          },
          {
            key: '3',
            title: '应用'
          }
        ],
        active: () => {
          switch (this.$route.name) {
            case '/list/search/article':
              return '1'
            case '/list/search/project':
              return '2'
            case '/list/search/application':
              return '3'
            default:
              return '1'
          }
        },
        callback: (key) => {
          switch (key) {
            case '1':
              this.$router.push({
                path: '../settings',
                append: true
              })
              break
            case '2':
              this.$router.push('/list/search/project')
              break
            case '3':
              this.$router.push('/list/search/application')
              break
            default:
              this.$router.push('/workplace')
          }
        }
      },
      search: false
    }
  },
  computed: {
    ...mapGetters({
      // tabs: 'getMenuTabs'
    })
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      console.log(4334)
      const { env } = this.$route.query
      const info = await this.Fetch.get(`/jobs/${this.$route.params.id}`, { env })
      console.log(info)
      this.info = info

      const data = await this.Fetch.get(`/jobs`, { code: info.name })
      this.selectEnv = data.map(_ => {
        return {
          label: _.env === 'root' ? 'PRIMARY' : _.title,
          value: _.env
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .search-head{
    background-color: #fff;
    margin: -25px -24px -24px;
    .search-input{
      text-align: center;
      margin-bottom: 16px;
    }
  }
  .search-content{
    margin-top: 48px;
  }
</style>
