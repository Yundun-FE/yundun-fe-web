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
              <BlockDmConsole :data="item"/>
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane label="基本资料">
          <!-- 基本资料 -->
          <div class="BlockForm">
            <FormRow :data="form"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </DmEdit>
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

export default {
  components: { BlockDmConsole, FormRow },

  mixins: [app, consoleEdit],

  data() {
    return {
      id: '',
      API_NAME: 'applicationsPages',
      selectBlocks: []
    }
  },

  async created() {
    this.id = this.$route.params.id || this.$route.params.pageId
    this.initBlocks()
  },

  methods: {
    initBlocks() {
      this.selectBlocks = formatLabel(BLOCKS, 'title', 'name')
    },

    afterInit() {
      const { form } = this
      if (form.type === 1) {
        const block = {
          title: 'DmConsole',
          name: 'DmConsole',
          props: {
            columns: form.content.columns,
            actionsRow: form.content.actions.row.list,
            actionsToolbar: form.content.actions.toolbar.list.concat(form.content.actions.multiple.list)
          }
        }
        form.blocks = [block]
      }
    },

    handleAddBlock(name) {
      const item = BLOCKS.find(_ => _.name === name)
      this.form.blocks.push(item)
    }
  }
}
</script>
