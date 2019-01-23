<template>
  <page>
    <div slot="header">
      <el-button id="btnAdd" size="small" type="primary" @click="handleClickAdd">新增</el-button>
    </div>
    <el-table :data="list">
      <el-table-column prop="title" label="名称" >
        <template slot-scope="scope">
          <router-link :to="`id/${scope.row.id}`">{{ scope.row.title }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="env" label="ENV" width="100" />
      <el-table-column align="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-tooltip :disabled="!!scope.row.setting" class="item" effect="dark" content="未进行编译配置" placement="top">
            <span style="margin-left:10px">
              <el-button :disabled="!scope.row.setting" type="primary" size="mini" @click="goBuild(scope.row)">编译</el-button>
            </span>
          </el-tooltip>
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

    goBuild(row) {
      this.$router.push({
        path: `id/${row.id}`
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
