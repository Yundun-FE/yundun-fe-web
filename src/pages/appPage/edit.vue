<template>
  <page>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/appsPages' }">页面管理</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">编辑页面</a></el-breadcrumb-item>
    </el-breadcrumb>
    <DmEdit @submit="handleSubmit" @on-back="handleBack">
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
        <!-- <el-form-item label="代理商">
          <yd-form-radio-button
            v-model="agentsType"
            :radios="selectAgentsType"
            default-text="默认"
          />
        </el-form-item> -->
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
                  :disabled="disabledEdit"
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
            <el-table-column label="代理商">
              <template slot-scope="scope">
                <el-input
                  :rows="1"
                  v-model="scope.row.valueOem"
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
                  :disabled="disabledEdit"
                  type="text"
                  @click="handleRowDelete(form.words, scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            :disabled="disabledEdit"
            style="margin-top: 12px"
            @click="handleRowAdd(form.words, wordsRow)"
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
                  :disabled="disabledEdit"
                  v-model="scope.row.key"
                  placeholder="标识"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="备注"
              width="150"
            >
              <template slot-scope="scope">
                <el-input
                  :disabled="disabledEdit"
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
                <!-- <el-input
                  :rows="1"
                  v-model="scope.row.value"
                  style="width: 100px"
                  placeholder="内容"
                /> -->
              </template>
            </el-table-column>
            <el-table-column label="代理商">
              <template slot-scope="scope">
                <yd-form-radio-button
                  :radios="selectSettingsType"
                  v-model="scope.row.valueOem"
                />
                <!-- <el-input
                  :rows="1"
                  v-model="scope.row.value"
                  style="width: 100px"
                  placeholder="内容"
                /> -->
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="80"
            >
              <template slot-scope="scope">
                <el-button
                  :disabled="disabledEdit"
                  type="text"
                  @click="handleRowDelete(form.settings, scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            :disabled="disabledEdit"
            style="margin-top: 12px"
            @click="handleRowAdd(form.settings, settingsRow)"
          >新增配置</el-button>
        </el-form-item>
      </el-form>
    </DmEdit>
  </page>
</template>

<script>

import create from '@/utils/create-basic'
import { deepClone } from '@/utils'
import { formatLabel } from '@/utils/form'
import consoleTable from '@/mixins/consoleTable'
import consoleEdit from '@/mixins/consoleEdit'

export default create({
  name: 'DialogAdd',

  mixins: [consoleTable, consoleEdit],

  data() {
    return {
      id: '',
      apiName: 'appsPages',
      apps: [],
      agents: [],
      selectApps: [],
      selectAgents: [],
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

  created() {
    this.id = this.$route.params.id
    this.init(this.id)
  },

  methods: {
    handleBack() {
      this.$router.push({
        path: '/appsPages'
      })
    },

    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        const form = deepClone(this.form)
        form._mode = this.mode
        try {
          this.Fetch.put(`/${this.apiName}/${this.id}`, form)
        } catch (e) {
          return
        }
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      })
    },
    // 读取代理商列表
    async initAgentList() {
      const data = await this.Fetch.get('/agents')
      this.agents = data.list
      this.selectAgents = formatLabel(data.list, 'name', 'id')
    },
    // 读取应用列表
    async initAppList() {
      const data = await this.Fetch.get('/applications')
      this.apps = data.list
      this.selectApps = formatLabel(data.list, 'name', 'id')
    },

    initData() {
      this.initAppList()
      this.initAgentList()
      this.wordsRow = deepClone(this.FORM.words[0])
      this.settingsRow = deepClone(this.FORM.settings[0])
    }
  }
})
</script>
