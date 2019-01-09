import Fetch from '@/utils/fetch'

export default {
  data() {
    return {
      table: [],
      Fetch,
      loading: true,
      list: []
    }
  },

  methods: {
    async initTable(url) {
      const data = await this.Fetch.get(url, { resources: 'table' })
      this.table = data
    },

    async updateList(url, params) {
      this.loading = true
      const { list, total } = await this.Fetch.get(url, params)
      this.list = list
      this.$refs.DmConsole.updateTotal(total)
      this.loading = false
    },

    updateApi(url, form) {
      const mode = form._mode
      if (mode === 'EDIT') {
        return this.Fetch.put(`${url}/${form.id}`, form)
      } else {
        return this.Fetch.post(url, form)
      }
    },

    actionSuccess() {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
    }
  }
}
