<style lang="postcss" scoped>
.list {
  min-height: 500px;
}
</style>

<template>
  <page
    :loading="loading"
    class="page-dashboard"
  >
    <card-job
      v-for="item in list"
      :span="12"
      :key="item.id"
      :data="item"
      :progress="mapProgress[item.name]"
      @on-build="handleBuild"
      @on-edit="handleEdit(item)"
    />
  </page>
</template>

<script>
import Explorer from '@/api/explorer'
import Page from '@/components/Page/Page'
import CardJob from '@/components/Card/CardJob'
import Storage from '@/utils/storage'

export default {
  components: { Page, CardJob },

  data() {
    return {
      loading: true,
      list: [],
      mapProgress: {},
      total: 0,
      interval: null
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      this.loading = true

      let data
      try {
        data = await Explorer.jobList()
      } catch (e) {
        return
      }

      this.list = data.list
      this.total = data.total

      this.initProgress()
      clearInterval(this.interval)
      // this.interval = setInterval(this.initProgress, 10000)
      this.loading = false
    },

    async initProgressItem(name) {
      const data = await Explorer.progressName(name)
      this.$set(this.mapProgress, name, data)
    },

    async handleBuild(name) {
      this.$set(this.mapProgress, name, { progress: 1 })
      await Explorer.jobStart(name)
    },

    // 读取编译进度
    async initProgress() {
      const data = await Explorer.progressList()
      data.forEach(item => {
        const { name } = item
        this.$set(this.mapProgress, name, item)
      })
    },

    handleEdit(form, name = 'edit') {
      this.$refs[`dialog-${name}`].open(form)
    },

    handleClickAdd() {
      this.$refs['dialog-edit'].open()
    }
  }
}
</script>
