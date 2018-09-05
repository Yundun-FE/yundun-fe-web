<style lang="postcss">
</style>
<template>
  <page>
    <div slot="header">
      <el-button @click="handleClickAdd">新增</el-button>
    </div>
    <!-- <el-row :gutter="12">
      <el-col v-for="item in list" :span="8" :key="item.id">
        <card-job :data="item" @on-edit="handleEdit(item)" />
      </el-col>
    </el-row> -->

    <el-table :data="list">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="url" label="URL" />
      <el-table-column prop="env" label="ENV" width="100" />
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleEdit(scope.row, 'account')">账号</el-button>
          <el-button type="text" @click="handleEdit(scope.row, 'cmd')">指令</el-button>
        </template>
      </el-table-column>
    </el-table>
    <dialog-add ref="dialog-edit" @init-list="init" />
    <dialog-cmd ref="dialog-cmd" @init-list="init" />
    <dialog-account ref="dialog-account" @init-list="init" />
  </page>
</template>

<script>
import Explorer from '@/api/explorer'
import Page from '@/components/Page/Page'
import CardJob from '@/components/Card/CardJob'
import DialogAdd from './Dialog/DialogAdd'
import DialogCmd from './Dialog/DialogCmd'
import DialogAccount from './Dialog/DialogAccount'

export default {
  components: { Page, CardJob, DialogAdd, DialogCmd, DialogAccount },
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

    handleEdit(form, name = 'edit') {
      this.$refs[`dialog-${name}`].open(form)
    },

    handleClickAdd() {
      this.$refs['dialog-edit'].open()
    }
  }
}
</script>
