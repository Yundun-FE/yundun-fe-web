<template>
  <a-card>
    <div class="table-operator">
      <a-button
        type="primary"
        icon="plus"
        @click="handleCreate"
      >{{ $t('du.toolbar.create') }}</a-button>
      <a-dropdown>
        <a-menu slot="overlay">
          <a-menu-item key="1">
          <a-icon type="delete" />{{ $t('du.toolbar.delete') }}</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          {{ $t('du.toolbar.bulkAction') }}
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <ConsoleTable
      ref="Table"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :row-selection="options.rowSelection"
    >
      <template
        slot="action"
        slot-scope="text, record"
      >
        <ColumnAction>
          <a @click="handleRowEdit(record)">{{ $t('du.toolbar.edit') }}</a>
          <PopoverConfirm @confirm="handleRowDelete(record)">
            <a>{{ $t('du.toolbar.delete') }}</a>
          </PopoverConfirm>
        </ColumnAction>
      </template>
    </ConsoleTable>

    <ModalForm
      ref="ModalRow"
      :fields="[ 'name', 'title', 'description']"
      :fetch-update="fetchUpdate"
      :fetch-create="fetchCreate"
      title-label="项目"
      @submit-success="handleRefresh"
    >
      <template slot-scope="scope">
        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="Name"
          help="唯一标识，不可修改"
        >
          <a-input
            v-decorator="['name']"
            placeholder="Name"
          />
        </a-form-item>
        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="别名"
        >
          <a-input
            v-decorator="['title']"
            placeholder="Title"
          />
        </a-form-item>
        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="简介"
        >
          <a-textarea
            v-decorator="['description']"
            placeholder="简介"
          />
        </a-form-item>
      </template>
    </ModalForm>
  </a-card>
</template>

<script>
import tableData from '@/mixins/tableData'

export default {
  mixins: [tableData],

  data() {
    return {
      queryParam: {},
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: 'Name',
          dataIndex: 'name'
        },
        {
          title: '别名',
          dataIndex: 'title'
        },
        {
          title: '创建时间',
          dataIndex: 'created_at'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return this.Fetch.get('/v1/products', Object.assign(parameter, this.queryParam))
          .then(res => res)
      }
    }
  },

  methods: {
    async handleRowDelete(row) {
      await this.Fetch.delete(`/v1/products/${row.id}`)
      this.handleRefresh()
    },

    fetchUpdate(form) {
      return this.Fetch.put(`/v1/products/${form.id}`, form)
    },

    fetchCreate(form) {
      return this.Fetch.post(`/v1/products`, form)
    }
  }
}
</script>
