<style lang="scss">
.toolbar__progress {
  display: inline-block;
  width: 150px;
  margin-left: 8px;
}
</style>

<template>
  <page>
    <el-alert
      v-if="multipleSelection.length > 0"
      :closable="false"
      :title="`已选${ multipleSelection.length }个，预计耗时${ formatSeconds(buildTimes) }`"
      type="success"
    />
    <el-alert
      v-else
      :closable="false"
      :title="`共${ list.length }个应用`"
      type="success"
    />
    <DmConsole
      ref="DmConsole"
      :loading="loading"
      :data="list"
      :columns="columns"
      :actions="actions"
      :multiple-selection.sync="multipleSelection"
      @init="init"
      @action="handleAction"
    >
      <template slot="query">
        <el-form inline>
          <!-- TODO -->
          <el-form-item label="切换环境">
            <yd-form-radio-button
              v-model="info.id"
              :radios="selectEnv"
              @change="handleChangeEnv"
            />
          </el-form-item>
          <el-form-item label="应用类型">
            <yd-form-radio-button
              v-model="filters.type"
              :radios="MODULES_TYPE"
              default-label="全部"
              default-value=""
              @change="handleFilterList"
            />
          </el-form-item>
          <br>
          <el-form-item
            v-if="info.settings && info.settings.commands && info.settings.commands[0]"
            label="更新指令"
          >
            <el-input v-model="info.settings.commands[0].content" />
          </el-form-item>
          <el-form-item label="编译指令">
            <el-input v-model="buildCommand" />
          </el-form-item>
        </el-form>
      </template>
      <el-progress
        v-show="infoProgress.progress"
        slot="toolbar"
        :percentage="infoProgress.progress || 0"
        class="toolbar__progress"
      />
      <el-button
        slot="toolbar-right"
        size="medium"
        @click="handleOpenSettings"
      >配置</el-button>
    </DmConsole>
    <DialogSettingsBuilds
      ref="DialogSettingsBuilds"
      @init="init"
    />
  </page>
</template>

<script>
import { formatSeconds } from '@/utils/date'
import { labelView } from '@/utils/filter'
import { deepClone, listToObj } from '@/utils/util'
import consolePage from '@/mixins/consolePage'
import consoleCudr from '@/mixins/consoleCudr'
import createCudr from '@/utils/create-cudr'
import { MODULES_TYPE, ENV } from '@/utils/constants/label'
import DialogSettingsBuilds from './components/DialogSettingsBuilds'
import Lockr from 'lockr'
import { clearInterval } from 'timers'

export default {
  API_NAME: 'jobs',

  components: { DialogSettingsBuilds },

  mixins: [consolePage, consoleCudr],

  data() {
    return {
      formatSeconds,
      MODULES_TYPE,
      pageName: 'products-show-build',
      mode: 'Edit',
      id: this.$route.params.id,
      multipleSelection: [],
      filters: {
        type: ''
      },
      list: [],
      listRaw: [],
      info: {},
      selectEnv: [],
      infoProgress: {},
      interval: null
    }
  },

  computed: {
    buildCommand() {
      const list = this.multipleSelection.map(item => item.symbol)
      return `npm run build:group ${list.join(',')}`
    },
    buildTimes() {
      return 100 + this.multipleSelection.length * 30
    }
  },

  watch: {
    '$route'(val) {
      this.init()
    }
  },

  created() {
    const filters = Lockr.get('filters')
    this.filters = Object.assign(this.filters, filters)
  },

  methods: {
    async init() {
      const data = await this.Fetch.get(`/jobs/${this.id}`)
      data.id = this.id
      const list = data.settings.builds

      list.forEach(item => {
        item.type = item.symbol.replace(/\d/g, '')
        item.typeView = labelView(item.type, MODULES_TYPE)
      })
      this.list = list
      this.listRaw = list
      this.info = data
      this.dataFinish = true
      this.checkFinish()
      this.fetchMoreJobs()

      this.interval = setInterval(this.fetchProgress, 5000)
    },

    handleOpenSettings() {
      this.$refs.DialogSettingsBuilds.handleOpen(this.info)
    },
    // 多项目编译
    handleMultipleStart(list) {
      const params = { config: list.map(_ => _.symbol) }
      this.fetchStart(params)
    },
    // 单项目编译
    handleRowStart(scope) {
      const params = { config: [scope.row.symbol] }
      this.fetchStart(params)
    },

    handleFilterList() {
      Lockr.set('filters', this.filters)
      const { type } = this.filters
      this.list = type ? deepClone(this.listRaw.filter(_ => _.type === type)) : deepClone(this.listRaw)
    },
    // 发送编译
    async fetchStart(params) {
      try {
        await this.Fetch.post(`/jenkins/jobs/${this.info.name}/start`, params)
      } catch (e) {
        return
      }

      this.Notice('ACTION_SUCCESS')
    },

    handleChangeEnv(id) {
      this.id = id
      this.$router.push({
        path: `/products/${id}/build`
      })
    },
    // 编译进度
    async fetchProgress() {
      const data = await this.Fetch.get(`/progresses/${this.info.name}`)
      this.infoProgress = data
      if (!data.progress && this.interval) window.clearInterval(this.interval)
    },

    async fetchMoreJobs() {
      const { title } = this.info
      const data = await this.Fetch.get('/jobs', { title: this.info.title })

      const { list } = data
      list.forEach(_ => {
        _.label = labelView(_.env, ENV)
      })

      const envs = list.map(_ => _.env)
      const envList = deepClone(ENV)
      const envMap = listToObj(list, 'env')
      envList.forEach(item => {
        const dItem = envMap[item.value]
        item.show = envs.includes(item.value)
        item.value = dItem.id
      })
      this.selectEnv = envList.filter(_ => _.show)
    }
  }
}
</script>
