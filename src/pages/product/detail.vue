<style lang="stylus">
.pageProductDetail {
  .page-header {
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

    .text--desc {
      float: right;
      font-size: 12px;
      color: #999;
    }
  }

  .row-open {
    background: rgb(250, 250, 250);
  }
}
</style>

<template>
  <page class="pageProductDetail">
    <div slot="header">
      <h2>
        {{ info.title }}
        <span class="pull-right">
          <FormRadioButton
            v-model="id"
            :radios="selectEnv"
            @change="handleEnvChange"
          />
        </span>
      </h2>
      <el-progress
        v-if="infoStatus.progress && infoStatus.progress>=0"
        :percentage="infoStatus.progress"
      />
      <!-- TOOLBAR -->
      <DmSearch>
        <DmSearchItem>
          <el-button
            type="default"
            size="small"
            icon="el-icon-back"
            circle
            @click="$router.go(-1)"
          />
          <el-button
            size="small"
            type="success"
            @click="startBuild"
          >
            {{ buildProgress !== 0 ? '正在构建' : '开始构建' }}
          </el-button>
          <el-button
            v-if="buildProgress !== 0"
            size="small"
          ><a
            :href="`http://172.16.100.40:8080/job/${name}/${infoStatus.number}/console`"
            target="_blank"
          >编译进度</a></el-button>
          <el-button
            size="small"
            @click="initExecutorList"
          >刷新</el-button>
          <div class="pull-right">
            <router-link :to="`${id}/log?name=${info.name}`">
              <el-button size="small">构建历史</el-button>
            </router-link>
            <el-tooltip
              :content="info.url"
              placement="top"
            >
              <el-button
                size="small"
                type="primary"
              ><a
                :href="info.url"
                target="_blank"
              >立即访问</a></el-button>
            </el-tooltip>
          </div>
        </DmSearchItem>
        <DmSearchItem>
          <el-input
            v-model="cmdBuild"
            size="small"
          />
        </DmSearchItem>
        <DmSearchItem>
          <FormRadioButton
            id="filter_type"
            v-model="filters.type"
            :radios="MODULES_TYPE"
            default-text="全部"
            default-value=""
          />
        </DmSearchItem>
      </DmSearch>
      <el-alert
        v-if="total"
        :closable="false"
        :title="`已选${ total }个，预计耗时${ formatSeconds(buildTimes) }`"
        type="success"
      />
    </div>
    <!-- 列表 -->
    <el-table
      ref="table"
      :data="listFilter"
      :row-class-name="tableRowClassName"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        align="right"
        type="selection"
        width="55"
      />
      <el-table-column
        label="ID"
        sortable
        width="80"
        prop="symbol"
      />
      <el-table-column
        label="名称"
        prop="title"
      >
        <template slot-scope="scope">
          {{ scope.row.title }}（{{ scope.row.name }}）
        </template>
      </el-table-column>
      <el-table-column
        label="类型"
        width="150"
        prop="type"
      >
        <template slot-scope="scope">
          {{ scope.row.type | labelView(MODULES_TYPE) }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleStartBuild(scope.row)"
          >编译</el-button>
          <el-button
            :type="scope.row.collection ? 'warning' : 'default'"
            size="small"
            icon="el-icon-star-off"
            circle
            @click="handleCollection(scope.row.symbol)"
          />
        </template>
      </el-table-column>
    </el-table>
  </page>
</template>

<script>
import Explorer from '@/api/explorer'
import Notice from '@/service/notice'
import Page from '@/components/Page/Page'
import ColumnStatus from '@/components/Column/ColumnStatus'
import { deepClone, listToObj } from '@/utils/util'
import { formatSeconds } from '@/utils/date'
import FormRadioButton from '@/components/Form/FormRadioButton'
import DmSearch from '@/components/Dm/DmSearch'
import DmSearchItem from '@/components/Dm/DmSearchItem'
import { MODULES_TYPE, ENV } from '@/constants/label'
import { labelView } from '@/service/filter'
import Lockr from 'lockr'

export default {
  components: { Page, ColumnStatus, FormRadioButton, DmSearch, DmSearchItem },

  data() {
    return {
      id: this.$route.params.id,
      ENV,
      MODULES_TYPE,
      formatSeconds,
      filterTypeText: [],
      activeName: 'build',
      selectEnv: [],
      list: [],
      form: {
        config: []
      },
      info: {},
      name: '',
      infoStatus: {
        progress: 0
      },
      interval: null,
      cmdBuild: '',
      filters: {
        type: ''
      },
      collection: new Set()
    }
  },

  computed: {
    buildProgress() {
      const { progress } = this.infoStatus
      return progress || 0
    },
    // 编译耗时计算
    buildTimes() {
      return 100 + this.total * 30
    },

    total() {
      return this.form.config.length
    },

    listFilter() {
      const { type } = this.filters
      const { list } = this
      Lockr.set('filters', this.filters)
      return type ? list.filter(_ => _.type === this.filters.type) : list
    }
  },

  created() {
    const filters = Lockr.get('filters')
    this.filters = Object.assign(this.filters, filters)
    this.collection = new Set(Lockr.get('collection'))
  },

  mounted() {
    this.init()
  },

  methods: {
    handleCollection(val) {
      const { collection } = this
      collection.has(val) ? collection.delete(val) : collection.add(val)
      this.initList()
      Lockr.set('collection', collection)
    },

    async init() {
      await this.getInfo()
      const { info } = this
      if (info.setting) {
        this.initExecutorList()
        this.initStatus()
        // this.interval = setInterval(this.initStatus, 10000)
      } else {
        if (info.cmds[0]) {
          this.cmdBuild = info.cmds[0].content
        }
        this.interval = null
      }
    },

    filterType(value, row) {
      return row.type === value
    },

    async handleStartBuild(row) {
      const form = {
        config: [row.symbol]
      }
      const { name } = this

      const ret = await Explorer.jenkinsJobStart(name, form)
      const { message } = ret
      if (!message) {
        this.$message({
          message: '开始编译',
          type: 'success'
        })
      }
    },
    // 选择项目
    handleSelectionChange(val) {
      const list = val.map(item => item.symbol)
      this.cmdBuild = `npm run build:group ${list.join(',')}`
      this.form.config = list
    },

    tableRowClassName({ row, rowIndex }) {
      if (row.open || row.collection) {
        return 'row-open'
      }
    },
    // 开始编译
    async startBuild() {
      this.infoStatus.progress = 1
      const { name, form } = this
      await Explorer.jenkinsJobStart(name, form)
    },
    // 遍历历史列表
    async initExecutorList() {
      const listExecutor = await Explorer.jobExecutorList(this.info.name)
      if (!listExecutor || !listExecutor[0]) return

      const item = listExecutor[0]
      if (!item) return

      const { config } = item
      const list = this.list

      list.forEach(item => {
        if (config.includes(item.symbol)) {
          this.$refs.table.toggleRowSelection(item, true)
          item.open = true
        }
      })
    },
    // 读取编译状态
    async initStatus() {
      this.infoStatus = await Explorer.progressName(this.name)
    },
    // 读取项目详情
    async getInfo() {
      const data = await Explorer.jobId(this.id)

      const { setting } = data
      this.info = data
      this.name = data.name

      if (setting) {
        let list = []
        try {
          list = JSON.parse(setting)
        } catch (e) {
          this.list = []
        }
        list.forEach(item => {
          item.open = false
          item.collection = false
          item.type = item.symbol.replace(/\d/g, '')
        })
        this.list = list
        this.initList()
      }

      this.getMoreInfo()
    },

    initList() {
      this.list.forEach(item => {
        item.collection = this.collection.has(item.symbol)
        // item.collection &&
        // this.$refs.table.setCurrentRow(item)
      })
    },

    // 切换环境
    handleEnvChange(val) {
      this.$router.push({
        path: `${val}`
      })
      this.init()
    },

    async getMoreInfo() {
      const { title } = this.info
      const data = await Explorer.jobList({ title })

      const { list } = data
      list.forEach(_ => {
        _.label = labelView(_.env, ENV)
      })

      const envs = list.map(_ => _.env)
      const envList = deepClone(ENV)
      const listMap = listToObj(list, 'env')
      envList.forEach(item => {
        const dItem = listMap[item.value]
        item.show = envs.includes(item.value)
        item.value = dItem.id
      })
      this.selectEnv = envList.filter(_ => _.show)
    }
  }
}
</script>
