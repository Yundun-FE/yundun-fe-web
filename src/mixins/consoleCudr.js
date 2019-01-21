import {
  deepClone
} from '@/utils'

export default {
  data() {
    return {
      multipleSelection: []
    }
  },

  computed: {
    multipleActionDisable() {
      return this.multipleSelection.length === 0
    }
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    init(params) {
      this.updateList(`/${this.apiName}`, params)
    },

    handleRowEdit(scope) {
      this.$refs.DialogRow.handleOpen(deepClone(scope.row), 'EDIT')
    },

    handleUpdate(form) {
      return this.updateApi(`/${this.apiName}`, form)
    },

    handleMultipleAction(e) {
      const { command } = e
      this.$confirm('确认执行?', '提示', {
        type: 'warning'
      }).then(() => {
        if (command === 'Delete') {
          const ids = this.multipleSelection.map(_ => _.id).join(',')
          this.handleDelete(ids)
        }
      })
    },

    handleCreate() {
      this.$refs.DialogRow.handleOpen()
    },

    handleRowAction(e) {
      console.log(e)
      const { command, scope } = e
      this[`handleRow${command}`](scope)
    },

    handleRowDelete(row) {
      this.handleDelete(row.id)
    },

    async handleDelete(id) {
      // this.$confirm('确认执行?', '提示', {
      //   type: 'warning'
      // }).then(async() => {
      await this.Fetch.delete(`/${this.apiName}/${id}`)
      this.actionSuccess()
      this.init()
      // })
    },

    async handleRowSubmit(form) {
      try {
        await this.handleUpdate(form)
      } catch (e) {
        return
      }
      this.$refs.DialogRow.handleClose()
      this.actionSuccess()
      this.init()
    },

    handleRowClone(scope) {
      const form = deepClone(scope.row)
      form.name = form.name + ' COPY'
      this.handleRowSubmit(form)
    }
  }
}
