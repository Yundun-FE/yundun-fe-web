<template>
  <div>
    <HeaderDetail
      v-if="inMenu"
      @init="init"
    >
      <HeaderTab :data="pageMenus" />
    </HeaderDetail>
    <router-view />
  </div>
</template>

<script>
import HeaderDetail from './components/HeaderDetail'
import app from '@/mixins/app'

export default {
  components: { HeaderDetail },

  mixins: [app],

  data() {
    return {
      pageMenus: [],
      selectEnv: [],
      info: {}
    }
  },

  computed: {
    inMenu() {
      const name = this.$route.name
      return this.pageMenus.map(_ => _.name).includes(name)
    }
  },

  watch: {
    '$route'(val) {
      this.init()
    }
  },

  created() {
    this.pageMenus = this.menus['products.id']
    this.init()
  },

  methods: {
    async init() {
      const { env } = this.$route.query
      const info = await this.Fetch.get(`/jobs/${this.$route.params.id}`, { env })
      this.info = info

      const data = await this.Fetch.get(`/explorer/jobs/${info.name}`)
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
