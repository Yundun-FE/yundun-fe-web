<template>
  <a-card>
    <div class="table-operator">
      <a-button
        type="primary"
        icon="plus"
        @click="handleCreate"
      >{{$t('du.toolbar.create')}}</a-button>
      <a-dropdown>
        <a-menu slot="overlay">
          <a-menu-item key="1">
          <a-icon type="delete" />{{$t('du.toolbar.delete')}}</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          {{$t('du.toolbar.bulkAction')}}
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>
    <s-table
      ref="Table"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :row-selection="options.rowSelection"
    >
      <span
        slot="action"
        slot-scope="text, record"
      >
        <ColumnAction>
          <a
            @click="handleEdit(record)"
          >{{$t('du.toolbar.edit')}}</a>
          <a
            @click="handleDelete(record)"
          >{{$t('du.toolbar.delete')}}</a>
        </ColumnAction>
      </span>
    </s-table>
    <DialogRow ref="DialogRow"  @init="handleRefresh"/>
  </a-card>
</template>

<script>
import STable from './table'
import DialogRow from './components/DialogRow'

export default {
  name: '',

  components: {
    STable, DialogRow
  },

  data() {
    return {
      queryParam: {},
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: 'CODE',
          dataIndex: 'code'
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return this.Fetch.get('/applications', Object.assign(parameter, this.queryParam))
          .then(res => res)
      },
      selectedRowKeys: [],
      selectedRows: [],

      options: {
        alert: { show: false, clear: () => { this.selectedRowKeys = [] } },
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
    tableOption () {
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
      this.$refs.DialogRow.handleOpen()
    },

    async handleDelete(row) {
      await this.Fetch.delete(`/applications/${row.id}`)
      this.handleRefresh()
    },

    handleEdit(row) {
      this.$refs.DialogRow.handleOpen(row)
    },

    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
