<template>
  <page breadcrumb>
    <HeaderTop :title="form.name" />
    <DmEdit
      v-model="form"
      :rules="rules"
      back-button
      @submit="handleSubmit"
    >
      <el-tabs>
        <el-tab-pane label="区块管理">
          <el-dropdown @command="handleAddBlock">
            <el-button type="primary">
              添加区块<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item, index) in selectBlocks"
                :command="item.value"
                :key="index"
              >{{ item.label }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div
            v-for="(item, index) in form.blocks"
            :key="index"
            style="margin-top: 12px"
          >
            <template v-if="item.name === 'DmConsole'">
              <BlockDmConsole :data="item" />
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane label="基本资料">
          <!-- 基本资料 -->
          <el-form-item label="环境">
            <el-button
              type="primary"
              @click="handleCreateEnv"
            >新建环境</el-button>
          </el-form-item>
          <div class="BlockForm">
            <FormRow :data="form" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </DmEdit>
    <DialogEnv ref="DialogEnv" />
  </page>
</template>

<script>
import { deepClone } from '@/utils'
import app from '@/mixins/app'
import consoleEdit from '@/mixins/consoleEdit'
import { BLOCKS } from './blocks'
import { formatLabel } from '@/utils/form'
import BlockDmConsole from './components/BlockDmConsole'
import FormRow from './components/FormRow'
import DialogEnv from './components/DialogEnv'

export default {
  components: { BlockDmConsole, FormRow, DialogEnv },

  mixins: [app, consoleEdit],

  data() {
    return {
      id: '',
      API_NAME: 'applicationsPages',
      selectBlocks: []
    }
  },

  async created() {
    console.log(this.$route.params)
    this.id = this.$route.params.pageId || this.$route.params.id
    this.initBlocks()
  },

  methods: {
    initBlocks() {
      this.selectBlocks = formatLabel(BLOCKS, 'title', 'name')
    },

    handleAddBlock(name) {
      const item = BLOCKS.find(_ => _.name === name)
      this.form.blocks.push(item)
    },

    handleCreateEnv() {
      this.$refs.DialogEnv.handleOpen({
        code: this.form.code
      })
    },

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
