<template>
  <page>
    <div slot="header">
      <el-button type="primary" size="small" @click="handleClickAdd">新增</el-button>
    </div>
    <el-table v-loading="loading" :data="list">
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="name" label="用户名" />
      <el-table-column prop="password" label="密码" />
      <el-table-column label="操作" align="right" width="80">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <ActionDelete @click="handleDelete(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <dialog-edit ref="dialogEdit" @init-list="init" />
  </page>
</template>

<script>
import Explorer from '@/api/explorer'
import Page from '@/components/Page/Page'
import ActionDelete from '@/components/Action/ActionDelete'
import DialogEdit from './Dialog/DialogEdit'
import Notice from '@/service/notice'

export default {
  components: { Page, DialogEdit, ActionDelete },

  data() {
    return {
      loading: true,
      list: [],
      total: 0
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      this.loading = true
      const { list, total } = await Explorer.accountList()
      Object.assign(this, {
        list, total
      })
      this.loading = false
    },

    handleEdit(form) {
      this.$refs.dialogEdit.open(form)
    },

    handleClickAdd() {
      this.$refs.dialogEdit.open()
    },

    async handleDelete(item) {
      try {
        await Explorer.accountDelete(item.id)
      } catch (e) {
        Notice('DELETE_ERROR', e)
        return
      }
      Notice('DELETE_SUCCESS')
      this.init()
    }
  }
}
</script>
