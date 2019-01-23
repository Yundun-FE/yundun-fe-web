<template>
  <page breadcrumb>
    <DmEdit
      class="padding"
      @submit="handleSubmit"
      @on-back="handleBack"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="RULES"
        label-width="120px"
      >
        <div class="BlockForm">
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
          <el-form-item label="类型">
            <yd-form-select
              :selects="LABEL.APP_PAGE_TYPE"
              v-model="form.type"
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
        </div>
        <!-- 文案配置 -->
        <!-- <el-form-item label="文案">
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
        </el-form-item> -->
        <!-- 消息配置 -->
        <div class="BlockForm">
          <el-form-item
            v-if="form.content"
            label="消息提示"
          >
            <el-table
              :data="form.content.notices"
              border
            >
              <el-table-column label="内容">
                <template slot-scope="scope">
                  <el-input
                    :rows="3"
                    v-model="scope.row.content"
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
                    @click="handleRowDelete(form.content.notices, scope.$index)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button
              type="primary"
              style="margin-top: 12px"
              @click="handleRowAdd(form.content.notices, noticeRow)"
            >新增</el-button>
          </el-form-item>
        </div>
        <!-- 配置 -->
        <!-- <el-form-item label="配置">
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
              </template>
            </el-table-column>
            <el-table-column label="代理商">
              <template slot-scope="scope">
                <yd-form-radio-button
                  :radios="selectSettingsType"
                  v-model="scope.row.valueOem"
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
        </el-form-item> -->
        <!-- COLUMNS -->
        <el-form-item
          v-if="form.content"
          label="表格栏目"
        >
          <el-table
            :data="form.content.columns"
            border
          >
            <el-table-column
              label="名称"
              prop="props.label"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.props.label" />
              </template>
            </el-table-column>
            <el-table-column
              label="组件"
              prop="componentName"
            >
              <template slot-scope="scope">
                <yd-form-select
                  :selects="LABEL.COLUMN_COMPONENT_NAME"
                  v-model="scope.row.componentName"
                  default-text="默认"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="PROP"
              prop="props.prop"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.props.prop" />
              </template>
            </el-table-column>
            <el-table-column
              label="宽度"
              prop="props.width"
            >
              <template slot-scope="scope">
                <!-- <yd-form-radio border v-model=""></yd-form-radio> -->
                <el-input-number v-model="scope.row.props.width"/>
              </template>
            </el-table-column>
            <el-table-column
              label="最小宽度"
              prop="props.minWidth"
            >
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.props.minWidth"/>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="140"
            >
              <template slot-scope="scope">
                <el-button
                  :disabled="disabledEdit"
                  type="text"
                  @click="handleRowUp(form.content.columns, scope.$index)"
                >上移</el-button>
                <el-button
                  :disabled="disabledEdit"
                  type="text"
                  @click="handleRowDown(form.content.columns, scope.$index)"
                >下移</el-button>
                <el-button
                  :disabled="disabledEdit"
                  type="text"
                  @click="handleRowDelete(form.content.columns, scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            style="margin-top: 12px"
            type="primary"
            @click="handleRowAdd(form.content.columns, columnsRow)"
          >新增</el-button>
          <RenderTable
            :columns="form.content.columns"
            style="margin-top: 12px"
            border
          />
        </el-form-item>
        <!-- ACTION-ROW -->
        <el-form-item
          v-if="form.content"
          label="行操作"
        >
          <el-table
            :data="form.content.actions.row.list"
            border
          >
            <el-table-column
              label="名称"
              min-width="200"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.label" />
              </template>
            </el-table-column>
            <el-table-column
              label="类型"
              width="150"
            >
              <template slot-scope="scope">
                <yd-form-select
                  :selects="LABEL.BUTTON_TYPE"
                  v-model="scope.row.type"
                  default-text="默认"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="命令"
              width="150"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.command" />
              </template>
            </el-table-column>
            <el-table-column
              label="子操作"
              min-width="500"
            >
              <template slot-scope="scope">
                <el-table
                  v-if="scope.row.items"
                  :data="scope.row.items"
                  style="margin-bottom: 12px"
                  border
                >
                  <el-table-column
                    label="名称"
                    min-width="200"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.label" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="类型"
                    width="150"
                  >
                    <template slot-scope="scope">
                      <yd-form-select
                        :selects="LABEL.BUTTON_TYPE"
                        v-model="scope.row.type"
                        default-text="默认"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="命令"
                    width="150"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.command" />
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作"
                    width="80"
                  >
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="handleActionRowChildDelete(form.content.actions.row.list[scope.$index].items, scope.$index)"
                      >删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-button @click="handleActionRowChildAdd(scope.row)">新增</el-button>
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
                  @click="handleRowDelete(form.content.actions.row.list, scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            style="margin-top: 12px"
            type="primary"
            @click="handleRowAdd(form.content.actions.row.list, actionRowRow)"
          >新增</el-button>
        </el-form-item>
        <!-- 批量操作 -->
        <el-form-item
          v-if="form.content"
          label="批量操作"
        >
          <el-table
            :data="form.content.actions.multiple.list"
            border
          >
            <el-table-column
              label="名称"
              min-width="200"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.label" />
              </template>
            </el-table-column>
            <el-table-column
              label="类型"
              width="150"
            >
              <template slot-scope="scope">
                <yd-form-select
                  :selects="LABEL.BUTTON_TYPE"
                  v-model="scope.row.type"
                  default-text="默认"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="命令"
              width="200"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.command" />
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
                  @click="handleRowDelete(form.content.actions.multiple.list, scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            style="margin-top: 12px"
            type="primary"
            @click="handleRowAdd(form.content.actions.multiple.list, actionMultipleRow)"
          >新增</el-button>

        </el-form-item>
        <!-- 操作 -->
        <el-form-item
          v-if="form.content"
          label="操作"
        >
          <el-table
            :data="form.content.actions.toolbar.list"
            border
          >
            <el-table-column
              label="名称"
              min-width="200"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.label" />
              </template>
            </el-table-column>
            <el-table-column
              label="类型"
              width="150"
            >
              <template slot-scope="scope">
                <yd-form-select
                  :selects="LABEL.BUTTON_TYPE"
                  v-model="scope.row.type"
                  default-text="默认"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="命令"
              width="200"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.command" />
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
                  @click="handleRowDelete(form.content.actions.toolbar.list, scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button
            style="margin-top: 12px"
            type="primary"
            @click="handleRowAdd(form.content.actions.toolbar.list, actionToolbarRow)"
          >新增</el-button>
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
import * as LABEL from '@/utils/constants/label'
import { merge } from 'lodash/object'
import RenderTable from '@/components/Dm/RenderTable'

export default create({
  name: 'DialogAdd',

  components: { RenderTable },

  mixins: [consoleTable, consoleEdit],

  data() {
    return {
      LABEL,
      loading: true,
      id: '',
      mode: '',
      apiName: 'appsPages',
      apps: [],
      agents: [],
      selectApps: [],
      selectAgents: [],
      wordsRow: {},
      settingsRow: {},
      columnsRow: {},
      actionRowRow: {},
      noticeRow: {},
      actionToolbarRow: {},
      actionMultipleRow: {},
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
    this.id = this.$route.params.id || this.$route.params.pageId
    this.mode = this.id ? 'Edit' : 'Create'
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
      const data = await this.Fetch.get('/applications', { pageSize: 100 })
      this.apps = data.list
      this.selectApps = formatLabel(data.list, 'name', 'id')
    },

    handleActionRowChildDelete(row, index) {
      const { items } = row
      if (items.length === 0) {
        row.items = ''
      } else {
        this.handleRowDelete(items, index)
      }
    },
    handleActionRowChildAdd(scope) {
      if (!scope.items) this.$set(scope, 'items', [])
      this.handleRowAdd(scope.items, this.actionRowRow)
    },

    initData() {
      this.initAppList()
      this.initAgentList()
      this.wordsRow = deepClone(this.FORM.words[0])
      this.settingsRow = deepClone(this.FORM.settings[0])

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
      this.actionRowRow = deepClone(content.actions.row.list[0])
      this.actionToolbarRow = deepClone(content.actions.toolbar.list[0])
      this.actionMultipleRow = deepClone(content.actions.multiple.list[0])
      this.columnsRow = deepClone(content.columns[0])
      this.noticeRow = deepClone(content.notices[0])

      this.form.content = merge(content, this.form.content)
    }
  }
})
</script>
