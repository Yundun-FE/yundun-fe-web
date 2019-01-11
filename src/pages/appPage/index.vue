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
        >创建新页面</el-button>
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
        width="220"
      >
        <template slot-scope="scope">
          <el-dropdown
            split-button
            trigger="click"
            @click="handleEdit(scope.row)"
            @command="handleAction"
          >
            编辑
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="{mode: 'delete', row: scope.row}"
                divided
              >删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
import { deepClone } from '@/utils'
import { formatLabel } from '@/utils/form'
import DialogRow from './components/DialogRow'

export default {
  components: { DialogRow },

  mixins: [consolePage],

  created() {
    this.initTable('/appsPages')
  },

  methods: {
    handleAction(scope) {
      const { mode, row } = scope
      if (mode === 'clone') {
        this.handleClone(row)
      } else if (mode === 'delete') {
        this.$confirm('您确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDelete(row.id)
        })
      }
    },

    handleClone(form) {
      form = deepClone(form)
      form.name = form.name + ' COPY'
      this.handleRowSubmit(form)
    },

    async handleRowSubmit(form) {
      try {
        await this.updateApi('/appsPages', form)
      } catch (e) {
        return
      }
      this.$refs.DialogRow.handleClose()
      this.actionSuccess()
      this.init()
    },

    async handleDelete(id) {
      await this.Fetch.delete(`/appsPages/${id}`)
      this.actionSuccess()
      this.init()
    },

    handleEdit(form) {
      this.$refs.DialogRow.handleOpen(deepClone(form), 'EDIT')
    },

    init(params) {
      this.updateList('/appsPages', params)
    }
  }
}
</script>
