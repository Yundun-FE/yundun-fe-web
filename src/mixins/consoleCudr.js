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
    multipleDisable() {
      return this.multipleSelection.length === 0
    }
  },

  created() {
    this.initTable(`/${this.apiName}`)
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    init(params) {
      this.updateList(`/${this.apiName}`, params)
    },

    handleEdit(form) {
      this.$refs.DialogRow.handleOpen(deepClone(form), 'EDIT')
    },

    handleUpdate(form) {
      return this.updateApi(`/${this.apiName}`, form)
    },

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

    handleRowCommand(scope) {
      const { mode, row } = scope
      this[`handleRow${mode}`](row)
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
    }
  }
}
