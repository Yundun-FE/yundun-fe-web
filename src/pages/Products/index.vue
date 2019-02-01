<template>
  <page :loading="loading">
    <DmConsole
      ref="DmConsole"
      :loading="loading"
      :data="list"
      :columns="columns"
      :actions-row="actionsRow"
      :actions-toolbar="actionsToolbar"
      :multiple-selection.sync="multipleSelection"
      @init="init"
      @action="handleAction"
    />
    <DialogRow
      ref="DialogRow"
      @init="init"
    />
  </page>
</template>

<script>
import createCudr from '@/utils/create-cudr'
import DialogRow from './components/DialogRow'
import config from './config'

export default createCudr({
  pageName: config.pageName,
  API_NAME: config.apiName,

  components: { DialogRow }
})
</script>
