import Fetch from '@/utils/fetch'

export default {
  data() {
    return {
      Fetch,
      columns: [],
      actions: {},
      loading: true,
      list: []
    }
  },

  created() {
    setTimeout(() => {
      this.initPageLayout()
    }, 50)
  },

  methods: {
    init(params) {
      this.fetchData(`/${this.apiName}`, params)
    },

    async initPageLayout() {
      const data = await Fetch.get(`/explorer/pages/${this.pageName}`)
      this.columns = data.content.columns
      this.actions = data.content.actions
    },

    // 读取数据
    async fetchData(url, params) {
      this.loading = true
      const { list, total } = await this.Fetch.get(url, params)
      this.$refs.DmConsole.updateTotal(total)

      setTimeout(() => {
        this.loading = false
      }, 300)

      this.list = list
    }
  }
}
