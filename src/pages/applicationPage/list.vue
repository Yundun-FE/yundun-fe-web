<template>
  <page :loading="loading">
    <DmConsole
      ref="DmConsole"
      :loading="loading"
      :data="list"
      :columns="columns"
      :actions="actions"
      :bind-params="bindParams"
      :multiple-selection.sync="multipleSelection"
      class="padding"
      @init="init"
      @action="handleAction"
    />
    <DialogRow
      ref="DialogRow"
      @submit="handleRowSubmit"
    />
  </page>
</template>

<script>
import createCudr from '@/utils/create-cudr'
import DialogRow from './components/DialogRow'
import AppPageHeader from './components/AppPageHeader'

export default createCudr({
  components: { DialogRow, AppPageHeader },

  pageName: 'application-page',
  API_NAME: 'appsPages',

  data() {
    return {
      bindParams: {
        appId: this.$route.params.appId
      }
    }
  },

  methods: {
    handleRowDeploy(scope) {
      const id = scope.row.id
      this.Fetch.post(`/${this.API_NAME}/${id}/deploy`)
    }
  }
})
</script>
