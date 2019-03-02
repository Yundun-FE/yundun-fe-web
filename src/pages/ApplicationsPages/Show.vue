<template>
  <page breadcrumb>
    <Header
      ref="Header"
      :title="form.name"
    >
      <template slot="action">
        <yd-form-radio
          v-model="form.env"
          :radios="selectEnv"
          border
          @change="handleChangeEnv"
        />
      </template>
    </Header>
    <DmEdit
      v-model="form"
      :rules="rules"
      fixed
      back-button
      @submit="handleSubmit"
    >
      <el-tabs>
        <el-tab-pane label="区块管理">
          <div
            v-for="(item, index) in form.content"
            :key="index"
            style="margin-top: 12px"
          >
            <!-- Block.DmConsole -->
            <template v-if="item.name === 'DmConsole'">
              <BlockDmConsole
                :env="form.env"
                :data="item"
                :settings="form.settings"
              />
            </template>
          </div>
          <el-dropdown @command="handleAddBlock">
            <d-button type="primary">
              添加区块<i class="el-icon-arrow-down el-icon--right" />
            </d-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in selectBlocks"
                :command="item.name"
                :key="index"
              >{{ item.title }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-tab-pane>
        <el-tab-pane label="基本资料">
          <!-- 基本资料 -->
          <el-form-item label="环境">
            <d-button @click="handleCreateEnv">新建环境</d-button>
          </el-form-item>
          <div class="BlockForm">
            <FormRow :data="form" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </DmEdit>
    <DialogEnv
      ref="DialogEnv"
      @init="initEnv"
    />
  </page>
</template>

<script>
import app from '@/mixins/app'
import consoleEdit from '@/mixins/consoleEdit'
import { deepClone } from '@/utils'
import { formatLabel } from '@/utils/form'
import { BLOCKS } from './blocks'
import BlockDmConsole from './components/BlockDmConsole'
import Header from './components/Header'
import FormRow from './components/FormRow'
import DialogEnv from './components/DialogEnv'
import { dataToObj } from '@/utils/blocks'

export default {
  components: { BlockDmConsole, Header, FormRow, DialogEnv },

  mixins: [app, consoleEdit],

  data() {
    return {
      id: '',
      apiName: 'applicationsPages',
      selectBlocks: BLOCKS,
      selectEnv: [],
      settings: {}
    }
  },

  async created() {
    this.form = this.$route.params
    this.id = this.$route.params.pageId || this.$route.params.id
  },

  methods: {
    afterInit() {
      this.initEnv()
    },
    // 新增区块
    handleAddBlock(name) {
      const item = BLOCKS.find(_ => _.name === name)
      item.blockName = item.name
      item.show = true

      this.form.content.push(item)
    },
    // 新建环境
    handleCreateEnv() {
      this.$refs.DialogEnv.handleOpen({
        code: this.form.code
      })
    },

    async initEnv() {
      const data = await this.Fetch.get('/applicationsPages', { code: this.form.code })
      const selectEnv = data.list.map(_ => {
        return {
          label: _.env,
          value: _.env
        }
      })
      // 如没有该 ENV 则临时创建
      const { env } = this.$route.query
      if (env && !selectEnv.map(_ => _.value).includes(env)) {
        selectEnv.push({
          label: env,
          value: env
        })
      }
      this.selectEnv = selectEnv
    },
    // 切换环境
    handleChangeEnv(env) {
      this.$router.push({
        path: '',
        query: {
          env
        },
        append: true
      })
    }
  }
}
</script>
