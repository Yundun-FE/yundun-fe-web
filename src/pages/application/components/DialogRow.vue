<template>
  <Dialog
    v-loading
    :class="b()"
    :title="title"
    :visible.sync="open"
    :close-on-click-modal="true"
    @submit="handleSubmit"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="RULES"
      label-width="120px"
    >
      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input
          v-model="form.name"
          placeholder="名称"
          style="width: 220px"
        />
      </el-form-item>
      <el-form-item
        label="CODE"
        prop="code"
      >
        <el-input
          v-model="form.code"
          style="width: 220px"
        />
      </el-form-item>
      <el-form-item
        v-if="form.menus"
        label="配置"
        prop="settings"
      >
        <!-- <el-input
          v-model="form"
          :rows="20"
          type="textarea"
        /> -->
        <el-table
          :data="form.menus"
          border
        >
          <el-table-column
            label="名称"
            min-width="100px"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.name"
                placeholder="名称"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="路径"
            min-width="150px"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.path"
                placeholder="路径"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="操作"
            align="right"
            width="100"
          >
            <template slot-scope="scope">
              <el-button @click="form.menus.splice(scope.$index, 1)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 16px">
          <el-button @click="addMenusRow(form.menus)">新增</el-button>
        </div>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import create from '@/utils/create-basic'
import { deepClone } from '@/utils'
import consoleDialog from '@/mixins/consoleDialog'

const MENU_ROW = {
  name: '',
  path: '/'
}

export default create({
  name: 'DialogAdd',

  mixins: [consoleDialog],

  data() {
    return {
      baseName: '应用'
    }
  },

  methods: {
    addMenusRow(list) {
      list.push(deepClone(MENU_ROW))
    },

    async handleOpen(form = {}, mode) {
      this.mode = mode
      await this.initForm('/applications')
      this.form = Object.assign(deepClone(this.FORM), form)
      this.$refs.form && this.$refs.form.clearValidate()
      this.open = true
    }
  }
})
</script>
