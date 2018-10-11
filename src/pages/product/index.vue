<style lang="postcss">
</style>
<template>
  <page>
    <div slot="header">
      <el-button size="small" type="primary" @click="handleClickAdd">新增</el-button>
    </div>

    <el-table :data="list">
      <el-table-column prop="title" label="标题" />
      <!-- <el-table-column prop="name" label="名称" /> -->
      <!-- <el-table-column prop="url" label="URL" /> -->
      <el-table-column prop="env" label="ENV" width="100" />
      <el-table-column align="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <router-link :to="`id/${scope.row.id}`">
            <el-button :disabled="!scope.row.setting" type="primary" size="mini">编译</el-button>
          </router-link>
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
