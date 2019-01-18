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
    handleMultipleAction(action) {
      this.$confirm('确认执行?', '提示', {
        type: 'warning'
      }).then(() => {
        if (action === 'Delete') {
          const ids = this.multipleSelection.map(_ => _.id).join(',')
          this.handleDelete(ids)
        }
      })
    },

    confirmAction(fn) {
      return this.$confirm('确认执行?', '提示', {
        type: 'warning'
      }).then(() => {
        fn()
      })
    },

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
