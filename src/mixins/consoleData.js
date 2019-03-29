export default {
  data() {
    return {
      loading: false,
      multipleSelection: [],
      bindParams: {},
      list: []
    }
  },

  computed: {
    multipleActionDisable() {
      return this.multipleSelection.length === 0
    }
  },

  created() {
    this.fetchList()
  },

  methods: {
    handleSearch() {
      this.$refs.DmData.initPage()
    },
    // 删除
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    formatResponse(response) {
      return response
    },

    async fetchList(params = {}) {
      params = {
        ...this.bindParams,
        ...params
      }
      const [API_METHOD, API_INDEX] = this.apiUri.split(' ')
      this.loading = true
      try {
        const response = await this.Fetch[API_METHOD](API_INDEX, params)
        console.log(response)
        const { list, total } = response
        this.list = list
        this.total = total
      } finally {
        this.loading = false
      }
    }
  }
}
