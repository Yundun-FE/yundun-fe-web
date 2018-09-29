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
      <el-button :disabled="total === 0" size="small" type="success" @click="startBuild">开始编译</el-button>
      <p class="text--desc">
        已选{{ total }}个
      </p>
    </div>
    <el-table :data="list" :row-class-name="tableRowClassName">
      <el-table-column label="ID" width="80" prop="symbol" />
      <el-table-column label="标识" width="200" prop="name" />
      <el-table-column label="名称" prop="title" />
      <el-table-column label="开关" width="80" align="right">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.open" @change="updateList" />
        </template>
      </el-table-column>
    </el-table>
  </page>
</template>

<script>
import Explorer from '@/api/explorer'
import Page from '@/components/Page/Page'
import configBuild from '@/assets/constant/config-build.json'
import { deepClone } from '@/utils/util'

export default {
  components: { Page },

  props: {},

  data() {
    return {
      id: this.$route.params.id,
      list: [],
      form: {
        config: []
      },
      name: 'home-v5-frontend_node-tester',
      info: {},
      listExecutor: []
    }
  },

  computed: {
    total() {
      const listOpen = this.list.filter(_ => _.open)
      return listOpen.length
    }
  },

  async mounted() {
    await this.initInfo()
    this.init()
    this.initExecutorList()
  },

  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.open) {
        return 'row-open'
      }
    },
    // 更新列表
    updateList() {
      const { list } = this
      const listOpen = list.filter(_ => _.open)

      const config = listOpen.map(_ => _.symbol)
      this.form.config = config
    },
    // 开始编译
    async startBuild() {
      const { name, form } = this
      const ret = await Explorer.jenkinsJobStart(name, form)
    },
    // 遍历历史列表
    async initExecutorList() {
      const listExecutor = await Explorer.jobExecutorList(this.info.name)
      const item = listExecutor[0]

      const { config } = item
      this.list.forEach(item => {
        if (config.includes(item.symbol)) {
          item.open = true
        }
      })

      this.listExecutor = listExecutor
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
