<template>
  <page>
    <DmConsole
      ref="DmConsole"
      :data="list"
      :loading="loading"
      @init="init"
    >
      <div slot="toolbar">
        <el-button
          type="primary"
          @click="$refs.DialogRow.handleOpen()"
        >新增</el-button>
      </div>
      <el-table-column
        prop="name"
        label="名称"
        min-width="180"
      />
      <el-table-column
        prop="version"
        label="版本"
        min-width="180"
      />
      <el-table-column
        label="操作"
        align="right"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            plain
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            plain
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </DmConsole>
    <DialogRow
      ref="DialogRow"
      @submit="handleRowSubmit"
    />
  </page>
</template>

<script>
import consolePage from '@/mixins/consolePage'
import DialogRow from './components/DialogRow'

export default {
  components: { DialogRow },

  mixins: [consolePage],

  methods: {
    async handleRowSubmit(form) {
      try {
        await this.updateApi('/brandsVersion', form)
      } catch (e) {
        return
      }
      this.$refs.DialogRow.handleClose()
      this.actionSuccess()
      this.init()
    },

    async handleDelete(id) {
      await this.Fetch.delete(`/brandsVersion/${id}`)
      this.actionSuccess()
      this.init()
    },

    handleEdit(form) {
      form.assets = JSON.stringify(form.assets)
      this.$refs.DialogRow.handleOpen(form, 'EDIT')
    },

    init(params) {
      this.updateList('/brandsVersion', params)
    }
  }
}
</script>
