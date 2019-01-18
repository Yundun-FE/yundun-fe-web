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
        label="操作"
        align="right"
        width="220"
      >
        <template slot-scope="{ row }">
          <el-dropdown
            split-button
            trigger="click"
            size="medium"
            @click="handleEdit(row)"
            @command="handleRowCommand"
          >
            编辑
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{mode: 'Clone', row}">克隆</el-dropdown-item>
              <el-dropdown-item :command="{mode: 'Delete', row}">删除</el-dropdown-item>
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
import consoleCudr from '@/mixins/consoleCudr'
import DialogRow from './components/DialogRow'
import { deepClone } from '@/utils'

export default {
  components: { DialogRow },

  mixins: [consolePage, consoleCudr],

  data() {
    return {
      apiName: 'appsPages'
    }
  },

  methods: {
    handleRowClone(form) {
      form = deepClone(form)
      form.name = form.name + ' COPY'
      this.handleRowSubmit(form)
    }
  }
}
</script>
