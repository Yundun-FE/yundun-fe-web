<template>
  <page>
    <div slot="header">
      <el-button @click="handleClickAdd">新增</el-button>
    </div>
    <el-row :gutter="12">
      <el-col v-for="item in list" :span="8" :key="item.id">
        <card-job :data="item" @on-edit="handleEdit(item)" />
      </el-col>
    </el-row>
    <dialog-add ref="dialogAdd" @init-list="init" />
  </page>
</template>

<script>
import Explorer from '@/api/explorer'
import Page from '@/components/Page/Page'
import CardJob from '@/components/Card/CardJob'
import DialogAdd from './Dialog/DialogAdd'

export default {
  components: { Page, CardJob, DialogAdd },
  props: {},

  data() {
    return {
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
      const { list, total } = await Explorer.jobList()
      Object.assign(this, {
        list, total
      })
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
