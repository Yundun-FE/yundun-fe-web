<template>
  <a-card>
    <div class="table-operator">
      <a-button
        type="primary"
        icon="plus"
        @click="$router.push({ name: 'QueryListEdit' })"
      >新建</a-button>
      {{ selectedRowKeys }}
      <a-dropdown
        v-action:edit
        v-if="selectedRowKeys.length > 0"
      >
        <a-menu slot="overlay">
          <a-menu-item key="1">
          <a-icon type="delete" />删除</a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2">
          <a-icon type="lock" />锁定</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :row-selection="options.rowSelection"
      size="default"
      row-key="key"
    >
      <span
        slot="action"
        slot-scope="text, record"
      >
        <template>
          <el-button
            type="text"
            @click="handleEdit(record)"
          >编辑</el-button>
        </template>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import moment from 'moment'
import STable from './table'

export default {
  name: '',

  components: {
    STable
  },

  data() {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
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
          dataIndex: 'updated_at'
        },
        {
          table: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return this.Fetch.get('/applications', Object.assign(parameter, this.queryParam))
          .then(res => res)
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },

  methods: {
    handleEdit(record) {
      console.log(record)
      this.$emit('onEdit', record)
    }
  }
}
</script>
