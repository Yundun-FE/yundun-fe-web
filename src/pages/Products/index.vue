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
        slot-scope="row"
      >
        <a-button @click="Jump.productsId(row.id)">查看详情</a-button>
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
    <ModalMenus ref="ModalMenus" :fetch-submit="handleSubmitMenus"/>
  </a-card>
</template>

<script>
import tableData from '@/mixins/tableData'
import ModalMenus from './components/ModalMenus'
import productsMixins from '@/mixins/products'

export default {
  components: { ModalMenus },

  mixins: [tableData, productsMixins],

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
    handleSubmitMenus() {
      return this.productsSaveById()
    },

    async handleRowDelete(row) {
      await this.Fetch.delete(`/v1/products/${row.id}`)
      this.handleRefresh()
    },

    handleOpenMenus(row) {
      this.PRODUCTS_SET_ID(row.id)
      this.productsGetById()
      this.$refs.ModalMenus.handleOpen()
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
