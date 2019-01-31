<template>
  <page breadcrumb>
    <HeaderTop :title="form.name"/>
    <DmEdit
      v-model="form"
      :rules="rules"
      back-button
      @submit="handleSubmit"
    >

      <el-tabs tab-position="left">
        <el-tab-pane label="基本资料">
          <!-- 基本资料 -->
          <div class="BlockForm">
            <FormRow />
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>

      <!-- NOTICE -->
      <!-- <div class="BlockForm">
        <FormTableNotice />
      </div> -->
      <!-- COLUMNS -->
      <div class="BlockForm">
        <FormTableColumn sort />
      </div>
      <!-- ACTION-ROW -->
      <!-- <div class="BlockForm">
        <FormTableActionRow sort />
      </div> -->
      <!-- 批量操作 -->
      <!-- <div class="BlockForm">
        <FormTableActionMultiple />
      </div> -->
      <!-- 操作 -->
      <!-- <div class="BlockForm">
        <FormTableActionToolbar />
      </div> -->
    </DmEdit>
  </page>
</template>

<script>
import { deepClone } from '@/utils'
import app from '@/mixins/app'
import consoleTable from '@/mixins/consoleTable'
import consoleEdit from '@/mixins/consoleEdit'
import { merge } from 'lodash/object'
import RenderTable from '@/components/Dm/RenderTable'
import FormRow from './components/FormRow'
import FormTableNotice from './components/FormTableNotice'
import FormTableColumn from './components/FormTableColumn'
import FormTableActionRow from './components/FormTableActionRow'
import FormTableActionToolbar from './components/FormTableActionToolbar'
import FormTableActionMultiple from './components/FormTableActionMultiple'

export default {
  components: { RenderTable, FormRow, FormTableNotice, FormTableColumn, FormTableActionRow, FormTableActionToolbar, FormTableActionMultiple },

  mixins: [app, consoleTable, consoleEdit],

  data() {
    return {
      id: '',
      API_NAME: 'applicationsPages'
    }
  },

  created() {
    this.id = this.$route.params.id || this.$route.params.pageId
    this.init(this.id)
  },

  methods: {
    initData() {
      const content = {
        columns: [
          {
            componentName: '',
            props: {
              prop: '',
              label: '',
              minWidth: 100
            }
          }
        ],
        notices: [
          {
            content: '',
            settings: {}
          }
        ],
        actions: {
          row: {
            list: [
              {
                label: '',
                type: '',
                command: ''
              }
            ]
          },
          multiple: {
            list: [
              {
                label: '',
                command: ''
              }
            ]
          },
          toolbar: {
            list: [
              {
                label: '',
                command: '',
                type: ''
              }
            ]
          },
          search: {
            label: '搜索',
            command: 'Search',
            align: 'right',
            key: ''
          }
        }
      }
      this.form.content = merge(content, this.form.content)
    }
  }
}
</script>
