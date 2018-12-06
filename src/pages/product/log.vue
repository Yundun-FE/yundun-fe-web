<style lang="stylus">
</style>
<template>
  <page>
    <div slot="header">
      <router-link :to="`../${id}`">
        <el-button
          size="small"
        >编译项目</el-button>
      </router-link>
    </div>

    <el-table
      v-loading="loading"
      :data="listExecutor"
    >
      <el-table-column
        label="版本"
        prop="number"
      />
      <el-table-column
        label="时长"
        prop="duration"
      >
        <template slot-scope="scope">
          {{ scope.row.duration / 1000 | formatSeconds }}
        </template>
      </el-table-column>
      <el-table-column
        label="项目"
        prop="config"
      />
      <el-table-column
        label="状态"
        prop="status"
        width="100"
      >
        <template slot-scope="scope">
          <ColumnStatus :status="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column
        label="时间"
        prop="created_at"
      >
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
    </el-table>
  </page>
</template>

<script>
import Explorer from '@/api/explorer'
import Page from '@/components/Page/Page'

export default {

  components: { Page },
  props: {},

  data() {
    return {
      loading: true,
      id: this.$route.params.id,
      name: this.$route.query.name,
      listExecutor: []
    }
  },

  computed: {},

  mounted() {
    this.initExecutorList()
  },

  methods: {

    // 遍历历史列表
    async initExecutorList() {
      this.loading = true
      const listExecutor = await Explorer.jobExecutorList(this.name)
      this.listExecutor = listExecutor
      this.loading = false
    }

  }
}
</script>
