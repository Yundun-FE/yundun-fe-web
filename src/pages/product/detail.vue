<style lang="stylus">
.pageProductDetail {
  .page-header {
    justify-content: center;
    align-items: center;

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
      <el-button type="default" size="small" icon="el-icon-back" circle @click="$router.go(-1)"/>
      <el-button :loading="buildProgress !== 0" :disabled="total === 0" size="small" type="success" @click="startBuild">
        {{ buildProgress !== 0 ? '正在构建' : '开始构建' }}
      </el-button>
      <el-button v-if="buildProgress !== 0" size="small"><a :href="`http://172.16.100.40:8080/job/${name}/${infoStatus.number}/console`" target="_blank">编译进度</a></el-button>
      <!-- <el-dropdown split-button type="primary" size="small" @click="handleClickDetail">
        Jenins
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item>双皮奶</el-dropdown-item>
          <el-dropdown-item>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
      <p class="text--desc">
        已选{{ total }}个，预计耗时{{ buildTimes | formatSeconds }}
      </p>
    </div>
    <el-table ref="table" :data="list" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange">
      <el-table-column label="ID" width="80" prop="symbol" />
      <el-table-column label="名称" prop="title" />
      <el-table-column label="标识" width="200" prop="name" />
      <el-table-column label="类型" width="150" prop="type">
        <template slot-scope="scope">
          {{ TYPE_TEXT[scope.row.type] }}
        </template>
      </el-table-column>
      <el-table-column align="right" type="selection" width="55" />
      <!-- <el-table-column label="开关" width="80" align="right">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.open" @change="updateList" />
        </template>
      </el-table-column> -->
    </el-table>
  </page>
</template>

<script>
import Explorer from '@/api/explorer'
import Page from '@/components/Page/Page'
import configBuild from '@/assets/constant/config-build.json'
import { deepClone } from '@/utils/util'

const TYPE_TEXT = {
  'wp': '网页',
  'cp': '控制台',
  'pr': '感知图'
}

export default {
  components: { Page },

  data() {
    return {
      TYPE_TEXT,
      id: this.$route.params.id,
      list: [],
      form: {
        config: []
      },
      name: 'home-v5-frontend_node-tester',
      info: {},
      infoStatus: {
        progress: 0
      },
      listExecutor: [],
      interval: null
    }
  },

  computed: {
    buildProgress() {
      const { progress } = this.infoStatus
      console.log(progress)
      return progress || 0
    },
    buildTimes() {
      return 100 + this.total * 20
    },
    total() {
      return this.form.config.length
    }
  },

  async mounted() {
    await this.initInfo()
    this.init()
    this.initExecutorList()

    this.initStatus()
    this.interval = setInterval(this.initStatus, 10000)
  },

  methods: {
    handleSelectionChange(val) {
      this.form.config = val.map(item => item.symbol)
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.open) {
        return 'row-open'
      }
    },
    // 开始编译
    async startBuild() {
      const { name, form } = this
      await Explorer.jenkinsJobStart(name, form)
    },
    // 遍历历史列表
    async initExecutorList() {
      const listExecutor = await Explorer.jobExecutorList(this.info.name)
      const item = listExecutor[0]

      const { config } = item
      const listHistory = []
      this.list.forEach(item => {
        item.type = item.symbol.replace(/\d/g, '')

        if (config.includes(item.symbol)) {
          item.open = true
          listHistory.push(item)
        }
      })

      // 勾选
      listHistory.map(item => this.$refs.table.toggleRowSelection(item))
      this.listExecutor = listExecutor
    },
    // 读取编译状态
    async initStatus() {
      this.infoStatus = await Explorer.progressName(this.name)
    },
    // 项目详情
    async initInfo() {
      const data = await Explorer.jobId(this.id)
      this.info = data
    },
    // 初始化
    init() {
      const list = deepClone(configBuild)
      list.forEach(item => {
        item.open = false
      })
      this.list = list
    }
  }
}
</script>
