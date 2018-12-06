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

  .el-alert {
    margin-top: 8px;
  }
}
</style>

<template>
  <page class="pageProductDetail">
    <div slot="header">
      <h2>
        {{ info.title }} {{ info.env }}
      </h2>
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
      </div>
      <el-input
        v-model="cmdBuild"
        size="small"
      />

      <!-- <el-radio-group
        v-model="radio5"
        size="small"
      >
        <el-radio-button v-for="(item, index) in" label="上海"/>
        <el-radio-button label="广州"/>
        <el-radio-button label="深圳"/>
      </el-radio-group> -->
      <FormRadioButton
        v-model="filters.type"
        :radios="FILTER_TYPE"
        default-text="全部"
        default-value=""
      />

      <el-alert
        v-if="total"
        :closable="false"
        :title="`已选${ total }个，预计耗时${ formatSeconds(buildTimes) }`"
        type="success"
      />
    </div>
    <!-- 列表 -->
    <!-- <el-row :gutter="12">
      <el-col
        v-for="(item, index) in list"
        :span="8"
        :key="index"
      >
        <el-card style="margin-bottom: 12px">
          <div
            slot="header"
            class="clearfix"
          >
            <span>{{ item.title || item.name }}</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
            >立即编译</el-button>
          </div>
          <el-checkbox v-model="item.open">选择</el-checkbox>
          {{ item.symbol }}
        </el-card>
      </el-col>
    </el-row> -->

    <el-table
      ref="table"
      :data="list"
      :row-class-name="tableRowClassName"
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
        :filters="filterTypeText"
        :filter-method="filterType"
        label="类型"
        width="150"
        prop="type"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          {{ TYPE_TEXT[scope.row.type] }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleStartBuild(scope.row)"
          >编译</el-button>
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
import { deepClone } from '@/utils/util'
import { formatSeconds } from '@/utils/date'
import FormRadioButton from '@/components/Form/FormRadioButton'

const FILTER_TYPE = [
  {
    label: '网页',
    value: 'wp'
  },
  {
    label: '控制台',
    value: 'cp'
  },
  {
    label: '感知图',
    value: 'pr'
  },
  {
    label: '支付',
    value: 'pp'
  }
]

const TYPE_TEXT = {
  'wp': '网页',
  'cp': '控制台',
  'pr': '感知图',
  'pp': '支付'
}

export default {
  components: { Page, ColumnStatus, FormRadioButton },

  data() {
    return {
      FILTER_TYPE,
      formatSeconds,
      TYPE_TEXT,
      filterTypeText: [],
      activeName: 'build',
      id: this.$route.params.id,
      list: [],
      form: {
        config: []
      },
      name: '',
      info: {},
      infoStatus: {
        progress: 0
      },
      listExecutor: [],
      interval: null,
      cmdBuild: '',
      filters: {
        type: ''
      }
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
    }
  },

  async mounted() {
    for (const k in TYPE_TEXT) {
      this.filterTypeText.push({
        text: TYPE_TEXT[k],
        value: k
      })
    }

    await this.initInfo()

    this.initExecutorList()
    this.initStatus()
    this.interval = setInterval(this.initStatus, 10000)
  },

  methods: {
    filterType(value, row) {
      return row.type === value
    },
    async handleStartBuild(row) {
      const form = {
        config: [row.symbol]
      }
      const { name } = this
      Explorer.jenkinsJobStart(name, form)
    },
    // 选择项目
    handleSelectionChange(val) {
      const list = val.map(item => item.symbol)
      this.cmdBuild = `npm run build:group ${list.join(',')}`
      this.form.config = list
    },

    tableRowClassName({ row, rowIndex }) {
      if (row.open) {
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
      this.listExecutor = listExecutor
    },
    // 读取编译状态
    async initStatus() {
      this.infoStatus = await Explorer.progressName(this.name)
    },
    // 项目详情
    async initInfo() {
      const data = await Explorer.jobId(this.id)

      const { setting } = data
      this.info = data
      this.name = data.name

      let list = []
      try {
        list = JSON.parse(setting)
      } catch (e) {
        this.list = []
      }

      list.forEach(item => {
        item.open = false
        item.type = item.symbol.replace(/\d/g, '')
      })
      this.list = list
    }
  }
}
</script>
