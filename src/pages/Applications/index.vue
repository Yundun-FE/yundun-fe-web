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
        slot-scope="scope"
      >
        <a-dropdown-button @click="handleRowClick(scope)">
          查看详情
          <a-menu slot="overlay" @click="handleRowClick">
            <a-menu-item key="1"><a-icon type="user" />1st menu item</a-menu-item>
            <a-menu-item key="2"><a-icon type="user" />2nd menu item</a-menu-item>
            <a-menu-item key="3"><a-icon type="user" />3rd item</a-menu-item>
          </a-menu>
        </a-dropdown-button>
      </template>
    </ConsoleTable>
    <ModalForm
      ref="ModalRow"
      :fields="[ 'name', 'title', 'description', 'productId']"
      :fetch-update="fetchUpdate"
      :fetch-create="fetchCreate"
      title-label="应用"
      @submit-success="handleRefresh"
    >
      <template slot-scope="scope">
        <a-form-item
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
          label="项目"
        >
          <a-select
            v-decorator="['productId']"
            :options="selectsProducts"
          />
        </a-form-item>
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
      selectsProducts: [],
      queryParam: {},
      columns: [
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '别名',
          dataIndex: 'title'
        },
        {
          title: '所属项目',
          dataIndex: 'productName'
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
        return this.Fetch.get('/v2/jobs', Object.assign(parameter, this.queryParam))
          .then(res => res)
      }
    }
  },

  created() {
    this.init()
  },

  methods: {
    async init() {
      const productData = await this.Fetch.get('/v1/products')
      this.selectsProducts = productData.list.map(_ => {
        return {
          label: _.name,
          value: _.id
        }
      })
    },

    handleRowClick(row) {
      this.$router.push({
        path: `/develop/applications/${row.id}`
      })
    },

    async handleRowDelete(row) {
      await this.Fetch.delete(`/v2/jobs/${row.id}`)
      this.handleRefresh()
    },

    fetchUpdate(form) {
      return this.Fetch.put(`/v2/jobs/${form.id}`, form)
    },

    fetchCreate(form) {
      return this.Fetch.post(`/v2/jobs`, form)
    }
  }
}
</script>
