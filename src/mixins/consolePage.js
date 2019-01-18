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

  created() {
    this.initTable(`/${this.apiName}`)
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
      this.loading = true
      const data = await this.Fetch.get(url, { resources: 'table' })
      this.table = data
    },
    // 读取数据
    async updateList(url, params) {
      this.loading = true
      const { list, total } = await this.Fetch.get(url, params)
      // this.$refs.DmConsole.updateTotal(total)

      setTimeout(() => {
        this.list = list
        this.loading = false
      }, 300)
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
