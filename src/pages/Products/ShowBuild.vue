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
      list: []
    }
  },

  methods: {
    async init() {
      const data = await this.Fetch.get(`/jobs/${this.id}`)
      this.list = data.settings.builds

      this.dataFinish = true
      this.checkFinish()
    },

    async handleMultipleStart(list) {
      const params = { config: list.map(_ => _.symbol) }
      await this.Fetch.post('/jenkins/jobs/home-v5-frontend_node-tester/start', params)
    },

    async handleRowStart(scope) {
      const params = { config: [scope.row.symbol] }
      await this.Fetch.post('/jenkins/jobs/home-v5-frontend_node-tester/start', params)
    },

    formatResponse(data) {
      console.log(data)
    }
  }
}
</script>
