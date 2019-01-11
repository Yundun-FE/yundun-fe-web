<template>
  <Dialog
    v-loading
    :class="b()"
    :title="title"
    :visible.sync="open"
    :close-on-click-modal="true"
    width="800px"
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
        label="备注"
        prop="remarks"
      >
        <el-input
          v-model="form.remarks"
          style="width: 220px"
        />
      </el-form-item>
      <el-form-item label="绑定应用">
        <yd-form-select
          v-model="form.appId"
          :selects="selectApps"
          filterable
        />
      </el-form-item>
      <!-- 文案配置 -->
      <el-form-item label="文案">
        <el-table
          :data="form.words"
          border
        >
          <el-table-column
            label="标识"
            width="150"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.key"
                placeholder="标识"
              />
            </template>
          </el-table-column>
          <el-table-column label="内容">
            <template slot-scope="scope">
              <el-input
                :rows="1"
                v-model="scope.row.value"
                type="textarea"
                placeholder="内容"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="80"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="form.words.splice(scope.$index, 1)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          style="margin-top: 12px"
          @click="addWordsRow"
        >新增文案</el-button>
      </el-form-item>
      <!-- 配置 -->
      <el-form-item label="配置">
        <el-table
          :data="form.settings"
          border
        >
          <el-table-column
            label="标识"
            width="150"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.key"
                placeholder="标识"
              />
            </template>
          </el-table-column>
          <el-table-column label="备注" width="150">
            <template slot-scope="scope">
              <el-input
                :rows="1"
                v-model="scope.row.remarks"
                placeholder="配置"
              />
            </template>
          </el-table-column>
          <el-table-column label="内容">
            <template slot-scope="scope">
              <yd-form-radio-button
                :radios="selectSettingsType"
                v-model="scope.row.value"
              />
              <el-input
                :rows="1"
                v-model="scope.row.value"
                style="width: 100px"
                placeholder="内容"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="80"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="form.settings.splice(scope.$index, 1)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          style="margin-top: 12px"
          @click="addSettingsRow"
        >新增配置</el-button>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import create from '@/utils/create-basic'
import Fetch from '@/utils/fetch'
import { deepClone } from '@/utils'
import { formatLabel } from '@/utils/form'
import consoleDialog from '@/mixins/consoleDialog'

export default create({
  name: 'DialogAdd',

  mixins: [consoleDialog],

  data() {
    return {
      apps: [],
      selectApps: [],
      baseName: '目录',
      wordsRow: {},
      settingsRow: {},
      selectSettingsType: [
        {
          label: '开启',
          value: true
        },
        {
          label: '关闭',
          value: false
        }
      ]
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

    addSettingsRow() {
      this.form.settings.push(deepClone(this.settingsRow))
    },

    addWordsRow() {
      this.form.words.push(deepClone(this.wordsRow))
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
      await this.initForm('/appsPages')
      this.wordsRow = deepClone(this.FORM.words[0])
      this.form = Object.assign(deepClone(this.FORM), form)
      this.$refs.form && this.$refs.form.clearValidate()
      this.open = true
    }
  }
})
</script>
