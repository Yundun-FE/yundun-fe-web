<template>
  <page>
    <!-- <DmEdit
      :loading="loading"
      v-model="form"
      :rules="rules"
      @submit="handleSubmit"
    >
      <FormTableBuild/>
    </DmEdit> -->
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
// import consoleEdit from '@/mixins/consoleEdit'
import consolePage from '@/mixins/consolePage'
import consoleCudr from '@/mixins/consoleCudr'
// import FormTableBuild from './components/FormTableBuild'
import createCudr from '@/utils/create-cudr'
import DialogSettingsBuilds from './components/DialogSettingsBuilds'

export default {
  API_NAME: 'jobs',
  components: { DialogSettingsBuilds },

  mixins: [consolePage, consoleCudr],

  data() {
    return {
      pageName: 'products-show-build',
      mode: 'Edit',
      id: this.$route.params.id,
      multipleSelection: [],
      list: [],
      into: {}
    }
  },

  methods: {
    handleOpenSettings() {
      this.$refs.DialogSettingsBuilds.handleOpen(this.info)
    },

    async init() {
      const data = await this.Fetch.get(`/jobs/${this.id}`)
      data.id = this.id
      this.list = data.settings.builds
      this.info = data

      this.dataFinish = true
      this.checkFinish()
    },

    handleMultipleStart(list) {
      const params = { config: list.map(_ => _.symbol) }
      this.fetchStart(params)
    },

    handleRowStart(scope) {
      const params = { config: [scope.row.symbol] }
      this.fetchStart(params)
    },

    async fetchStart(params) {
      try {
        await this.Fetch.post(`/jenkins/jobs/${this.info.name}/start`, params)
      } catch (e) {
        return
      }
      this.Notice('ACTION_SUCCESS')
    },

    formatResponse(data) {
      console.log(data)
    }
  }
}
</script>
