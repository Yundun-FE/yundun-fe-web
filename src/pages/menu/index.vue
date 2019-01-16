<template>
  <page>
    <DmConsole
      ref="DmConsole"
      :data="list"
      :loading="loading"
      :multiple-selection.sync="multipleSelection"
      :columns="table"
      selection
      @init="init"
    >
      <div slot="toolbar">
        <template slot-scope="scope">
          <div>
            {{ scope }}
          </div>
        </template>
        <el-button
          type="primary"
          @click="$refs.DialogRow.handleOpen()"
        >创建新目录</el-button>
        <el-button
          :disabled="multipleDisable"
          @click="handleMultipleAction('Delete')"
        >删除</el-button>
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
        <template slot-scope="{ row }">
          <!-- <el-dropdown
            split-button
            trigger="click"
            @click="handleEdit(row)"
            @command="handleAction"
          >
            编辑
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{mode: 'Clone', row}">克隆</el-dropdown-item>
              <el-dropdown-item
                :command="{mode: 'Delete', row}"
                divided
              >删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->

          <el-dropdown
            split-button
            trigger="click"
            @click="handleEdit(row)"
            @command="handleAction"
          >
            编辑
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{mode: 'Clone', row}">克隆</el-dropdown-item>
              <el-dropdown-item
                :command="{mode: 'Delete', row}"
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
import DialogRow from './components/DialogRow'

export default {
  components: { DialogRow },

  mixins: [consolePage],

  data() {
    return {
      action: [
        {
          label: '编辑',
          command: 'Edit'
        },
        {
          label: '克隆',
          command: 'Edit'
        },
        {
          label: '删除',
          command: 'Delete'
        }
      ]
    }
  },

  created() {
    this.initTable('/menusVersion')
  },

  methods: {
    handleMultipleAction(action) {
      this.$confirm('确认执行?', '提示', {
        type: 'warning'
      }).then(() => {
        const ids = this.multipleSelection.map(_ => _.id).join(',')
        this.handleDelete(ids)
      })
    },

    handleAction(scope) {
      const { mode, row } = scope
      if (mode === 'Clone') {
        this.handleClone(row)
      } else if (mode === 'Delete') {
        this.confirmAction(this.handleDelete(row.id))
      }
    },

    handleClone(form) {
      form = deepClone(form)
      form.name = form.name + ' COPY'
      this.handleRowSubmit(form)
    },

    async handleRowSubmit(form) {
      try {
        await this.updateApi('/menusVersion', form)
      } catch (e) {
        return
      }
      this.$refs.DialogRow.handleClose()
      this.actionSuccess()
      this.init()
    },

    async handleDelete(id) {
      await this.Fetch.delete(`/menusVersion/${id}`)
      this.actionSuccess()
      this.init()
    },

    handleEdit(form) {
      this.$refs.DialogRow.handleOpen(deepClone(form), 'EDIT')
    },

    init(params) {
      this.updateList('/menusVersion', params)
    }
  }
}
</script>
