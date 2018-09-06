<style lang="stylus">
.page-dashboard {
  width: 320px;
}
</style>

<template>
  <page class="page-dashboard">
    <ds-menu/>
    <div class="list">
      <card-job v-for="item in list" :span="12" :key="item.id" :data="item" :progress="mapProgress[item.name]" @on-edit="handleEdit(item)" />
    </div>
  </page>
</template>

<script>
import Explorer from '@/api/explorer'
import Page from '@/components/Page/Page'
import CardJob from '@/components/Card/CardJob'
import DsMenu from '@/pages/layout/components/Menu'

export default {
  components: { Page, CardJob, DsMenu },
  props: {},

  data() {
    return {
      list: [],
      mapProgress: {},
      total: 0,
      interval: null
    }
  },

  computed: {},

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      const { list, total } = await Explorer.jobList()
      Object.assign(this, {
        list, total
      })

      this.initProgress()
      clearInterval(this.interval)
      this.interval = setInterval(this.initProgress, 10000)
    },

    async initProgress() {
      const listId = this.list.map(_ => _.name).filter(_ => _)

      const mapProgress = {}

      for (let i = 0; i < listId.length; i++) {
        const name = listId[i]
        mapProgress[name] = await Explorer.progressName(name)
      }

      this.mapProgress = mapProgress
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
