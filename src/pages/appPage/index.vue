<template>
  <page>
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
    <DialogRow
      ref="DialogRow"
      @submit="handleRowSubmit"
    />
  </page>
</template>

<script>
import createCudr from '@/utils/create-cudr'
import DialogRow from './components/DialogRow'

export default createCudr({
  components: { DialogRow },
  pageName: 'application-page',
  apiName: 'appsPages',
  methods: {
    handleRowDeploy(scope) {
      console.log(scope)
      const id = scope.row.id
      this.Fetch.post(`/${this.apiName}/${id}/deploy`)
    }
  }
})
</script>
