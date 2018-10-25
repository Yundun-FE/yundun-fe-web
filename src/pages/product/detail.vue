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
      <el-button type="default" size="small" icon="el-icon-back" circle @click="$router.go(-1)" />
      <el-button :loading="buildProgress !== 0" :disabled="total === 0" size="small" type="success" @click="startBuild">
        {{ buildProgress !== 0 ? '正在构建' : '开始构建' }}
      </el-button>
      <el-button v-if="buildProgress !== 0" size="small"><a :href="`http://172.16.100.40:8080/job/${name}/${infoStatus.number}/console`" target="_blank">编译进度</a></el-button>
      <p class="text--desc">
        已选{{ total }}个<template v-if="total > 0">，预计耗时{{ buildTimes | formatSeconds }}</template>
      </p>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="编译" name="build">
        <el-table ref="table" :data="list" :row-class-name="tableRowClassName" @selection-change="handleSelectionChange">
          <el-table-column label="ID" sortable width="80" prop="symbol" />
          <el-table-column label="名称" prop="title">
            <template slot-scope="scope">
              {{ scope.row.title }}（{{ scope.row.name }}）
            </template>
          </el-table-column>
          <el-table-column :filters="filterTypeText" :filter-method="filterType" label="类型" width="150" prop="type" filter-placement="bottom-end">
            <template slot-scope="scope">
              {{ TYPE_TEXT[scope.row.type] }}
            </template>
          </el-table-column>
          <el-table-column align="right" type="selection" width="55" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="构建历史" name="history">
        <el-table :data="listExecutor">
          <el-table-column label="版本" prop="number" />
          <el-table-column label="时长" prop="duration" >
            <template slot-scope="scope">
              {{ scope.row.duration / 1000 | formatSeconds }}
            </template>
          </el-table-column>
          <el-table-column label="项目" prop="config" />
          <el-table-column label="状态" prop="status" width="100" >
            <template slot-scope="scope">
              <ColumnStatus :status="scope.row.status"/>
            </template>
          </el-table-column>
          <el-table-column label="时间" prop="created_at" >
            <template slot-scope="scope">
              {{ scope.row.created_at }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </page>
</template>

<script>
import Explorer from '@/api/explorer'
import Notice from '@/service/notice'
import Page from '@/components/Page/Page'
import ColumnStatus from '@/components/Column/ColumnStatus'
import { deepClone } from '@/utils/util'

const TYPE_TEXT = {
  'wp': '网页',
  'cp': '控制台',
  'pr': '感知图',
  'pp': '支付'
}

export default {
  components: { Page, ColumnStatus },

  data() {
    return {
      TYPE_TEXT,
      filterTypeText: [],
      activeName: this.$route.query.active || 'build',
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
      interval: null
    }
  },

  computed: {
    buildProgress() {
      const { progress } = this.infoStatus
      return progress || 0
    },
    // 编译耗时计算
    buildTimes() {
      return 30 + this.total * 20
    },

    total() {
      return this.form.config.length
    }
  },

  watch: {
    activeName(val) {
      this.$route.push({
        query: {
          active: val
        }
      })
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

      console.log(list.map(_ => _.symbol).join(','))

      this.list = list
    }
  }
}
</script>
