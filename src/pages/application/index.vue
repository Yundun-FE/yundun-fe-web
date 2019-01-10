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
        v-for="(item ,index) in table"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
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

  created() {
    this.initTable('/applications')
  },

  methods: {
    async handleRowSubmit(form) {
      // try {
      //   form.settings = JSON.parse(form.settings)
      // } catch (e) {
      //   this.$message({
      //     type: 'warning',
      //     message: '格式错误'
      //   })
      //   return
      // }
      try {
        await this.updateApi('/applications', form)
      } catch (e) {
        return
      }
      this.$refs.DialogRow.handleClose()
      this.actionSuccess()
      this.init()
    },

    async handleDelete(id) {
      await this.Fetch.delete(`/applications/${id}`)
      this.actionSuccess()
      this.init()
    },

    handleEdit(form) {
      form.settings = JSON.stringify(form.settings)
      this.$refs.DialogRow.handleOpen(form, 'EDIT')
    },

    init(params) {
      this.updateList('/applications', params)
    }
  }
}
</script>
