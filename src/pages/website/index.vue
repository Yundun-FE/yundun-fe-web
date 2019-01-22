<template>
  <page>
    <div slot="header">
      <el-button type="primary" size="small" @click="handleClickAdd">新增</el-button>
    </div>
    <el-table v-loading="loading" :data="list">
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="url" label="网址" />
      <el-table-column align="right" label="操作" width="120">
        <template slot-scope="scope">
          <ActionDelete @click="handleDelete(scope.row)"/>
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
import Notice from '@/utils/notice'

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
      const { list, total } = await Explorer.websiteList()
      Object.assign(this, {
        list, total
      })
      this.loading = false
    },

    async handleDelete(item) {
      try {
        await Explorer.websiteDelete(item.id)
      } catch (e) {
        Notice('DELETE_ERROR', e)
        return
      }
      Notice('DELETE_SUCCESS')
      this.init()
    },

    handleClickAdd() {
      this.$refs.dialogEdit.open()
    }
  }
}
</script>
