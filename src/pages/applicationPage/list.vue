<template>
  <page :loading="loading">
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
      @init="init"
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
  API_NAME: 'appsPages'
})
</script>
