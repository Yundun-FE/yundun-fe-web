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
        prop="website"
        label="网站"
        min-width="180"
      />
      <el-table-column
        label="操作"
        align="right"
        width="180"
      >
        <template slot-scope="scope">
          <ButtonAction
            split-button
            trigger="click"
            @click="handleEdit(scope.row)"
            @command="handleAction"
          >
            编辑
            <template slot="dropdown">
              <el-dropdown-item
                :command="{mode: 'delete', row: scope.row}"
                divided
              >删除</el-dropdown-item>
            </template>
          </ButtonAction>
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
import ButtonAction from '@/components/Button/ButtonAction'

export default {
  components: { DialogRow, ButtonAction },

  mixins: [consolePage],

  methods: {
    handleAction(scope) {
      const { mode, row } = scope
      if (mode === 'delete') {
        this.handleDelete(row.id)
      }
    },

    async handleRowSubmit(form) {
      try {
        await this.updateApi('/agents', form)
      } catch (e) {
        return
      }
      this.$refs.DialogRow.handleClose()
      this.actionSuccess()
      this.init()
    },

    async handleDelete(id) {
      await this.Fetch.delete(`/agents/${id}`)
      this.actionSuccess()
      this.init()
    },

    handleEdit(form) {
      this.$refs.DialogRow.handleOpen(form, 'EDIT')
    },

    init(params) {
      this.updateList('/agents', params)
    }
  }
}
</script>
