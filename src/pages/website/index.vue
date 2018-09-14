<template>
  <page>
    <div slot="header">
      <el-button type="primary" size="small" @click="handleClickAdd">新增</el-button>
    </div>
    <el-table v-loading="loading" :data="list">
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="url" label="网址" />
    </el-table>
    <dialog-edit ref="dialogEdit" @init-list="init" />
  </page>
</template>

<script>
import Explorer from '@/api/explorer'
import Page from '@/components/Page/Page'
import DialogEdit from './Dialog/DialogEdit'

export default {
  components: { Page, DialogEdit },

  props: {},

  data() {
    return {
      loading: true,
      list: [],
      total: 0
    }
  },

  computed: {},

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

    handleEdit(form) {
      this.$refs.dialogEdit.open(form)
    },
    handleClickAdd() {
      this.$refs.dialogEdit.open()
    }
  }
}
</script>
