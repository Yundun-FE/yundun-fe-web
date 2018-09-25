<style lang="postcss">
</style>
<template>
  <page>

    <div slot="header">
      <el-button size="small" type="primary">开始</el-button>
    </div>

    <el-table :data="list">
      <el-table-column label="ID" prop="symbol" />
      <el-table-column label="标识" prop="name" />
      <el-table-column label="名称" prop="title" />
      <el-table-column label="版本" prop="version" />
      <el-table-column label="开关" align="right">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.check" />
        </template>
      </el-table-column>
    </el-table>
  </page>
</template>

<script>
import Page from '@/components/Page/Page'
import configBuild from '@/assets/constant/config-build.json'
import { deepClone } from '@/utils/util'

export default {
  components: { Page },

  props: {},

  data() {
    return {
      list: []
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const list = deepClone(configBuild)
      list.forEach(item => {
        item.check = false
        item.version = '1.0.0'
      })
      this.list = list
    }
  }
}
</script>
