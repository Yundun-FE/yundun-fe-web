export default {
  data() {
    return {
      list: [],
      loading: true,
      loadingData: true
    }
  },

  methods: {
    emit() {
      this.$refs.DmConsole.handleEmit()
    },

    init(params) {
      this.fetchData(`/${this.apiName}`, {
        ...params,
        ...this.$route.params,
        ...this.$route.query
      })
    },

    formatResponse(data) {
      return data
    },
    // 检查是否加载完成
    checkFinish() {
      if (this.dataFinish && !this.loadingLayout) {
        // this.$refs.DmConsole.handleShow()
        this.loading = false
      }
    },
    // 读取数据
    async fetchData(url, params) {
      this.loadingData = true
      const response = await this.Fetch.get(url, params)
      const { list, total } = this.formatResponse(response)
      this.$refs.DmConsole.updateTotal(total)

      this.list = list
      this.loadingData = false
      this.checkFinish()
    }
  }
}
