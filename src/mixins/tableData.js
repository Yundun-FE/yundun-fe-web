export default {
  data() {
    return {
      selectedRowKeys: [],
      selectedRows: [],

      options: {
        alert: {
          show: false,
          clear: () => { this.selectedRowKeys = [] }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },

  created() {
    this.tableOption()
  },

  methods: {
    handleCreate() {
      this.$refs.ModalRow.handleOpen()
    },

    tableOption() {
      if (!this.optionAlertShow) {
        this.options = {
          alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },

    handleRefresh() {
      this.$refs.Table.refresh()
    },

    handleCreate() {
      this.$refs.ModalRow.handleOpen()
    },

    handleRowEdit(row) {
      this.$refs.ModalRow.handleOpen(row)
    },

    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
