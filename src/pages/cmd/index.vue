<template>
  <page>
    <div slot="header">
      <el-button @click="handleClickAdd">新增</el-button>
    </div>
    <el-table v-loading="loading" :data="list">
      <el-table-column
        prop="title"
        label="标题"
        width="180"/>
      <el-table-column
        prop="content"
        label="指令"/>
    </el-table>
    <dialog-add ref="dialogAdd" @init-list="init" />
  </page>
</template>

<script>
import Explorer from '@/api/explorer'
import Page from '@/components/Page/Page'
import DialogAdd from './Dialog/DialogAdd'

export default {
  components: { Page, DialogAdd },

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
      const { list, total } = await Explorer.cmdList()
      Object.assign(this, {
        list, total
      })
      this.loading = false
    },

    handleEdit(form) {
      this.$refs.dialogAdd.open(form)
    },
    handleClickAdd() {
      this.$refs.dialogAdd.open()
    }
  }
}
</script>
