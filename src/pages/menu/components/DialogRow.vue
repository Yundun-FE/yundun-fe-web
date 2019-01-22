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
        label="版本"
        prop="version"
      >
        <el-input
          v-model="form.version"
          style="width: 220px"
        />
      </el-form-item>
      <el-form-item
        label="备注"
        prop="remarks"
      >
        <el-input
          v-model="form.remarks"
          style="width: 220px"
        />
      </el-form-item>

      <el-form-item label="目录">
        <el-card
          v-for="(item, index) in form.menus"
          :key="index"
          style="margin-bottom: 16px"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <el-input
              v-model="item.name"
              style="width: 180px"
            />
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="deleteMenusRow(index)"
            >删除目录</el-button>
          </div>
          <!-- 子菜单 - 应用 -->
          <el-table
            :data="item.childrens"
            :show-header="false"
          >
            <el-table-column
              prop="name"
              label="名称"
              width="100"
            />
            <el-table-column
              prop="code"
              label="CODE"
              width="100"
            />
            <el-table-column
              label="别名"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.alias"
                  placeholder="别名"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="操作"
              align="right"
              width="80"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="item.childrens.splice(scope.$index, 1)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div>
            <el-dropdown
              trigger="click"
              @command="addChildrensRow"
            >
              <el-button style="margin-top: 16px">
                添加应用<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(app, index) in apps"
                  :command="{list: item.childrens, item: app}"
                  :key="index"
                >{{ app.name }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-card>
        <el-button
          type="primary"
          @click="addMenusRow"
        >新增目录</el-button>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import create from '@/utils/create-basic'
import { deepClone } from '@/utils'
import { formatLabel } from '@/utils/form'
import consoleDialog from '@/mixins/consoleDialog'
import consoleEdit from '@/mixins/consoleEdit'
import Fetch from '@/utils/fetch'

const MENU_ROW = {
  name: '',
  childrens: []
}

export default create({
  name: 'DialogAdd',

  mixins: [consoleDialog, consoleEdit],

  data() {
    return {
      apps: [],
      selectApps: [],
      baseName: '目录'
    }
  },

  methods: {
    deleteChildrensRow(list, index) {
      list.splice(index, 1)
    },

    addChildrensRow(scope) {
      const { list, item } = scope
      const { name, id } = item
      list.push({ name, id })
    },

    addMenusRow() {
      this.form.menus.push(deepClone(MENU_ROW))
    },

    deleteMenusRow(index) {
      this.form.menus.splice(index, 1)
    },

    async initAppList() {
      const data = await Fetch.get('/applications')
      this.apps = data.list
      this.selectApps = formatLabel(data.list, 'name', 'id')
    },

    async handleOpen(form = {}, mode) {
      this.mode = mode
      this.initAppList()
      await this.initForm('/menusVersion')
      this.form = Object.assign(deepClone(this.FORM), form)
      this.$refs.form && this.$refs.form.clearValidate()
      this.open = true
    }
  }
})
</script>
