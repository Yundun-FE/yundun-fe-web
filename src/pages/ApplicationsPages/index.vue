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
      class="padding"
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

export default createCudr({
  components: { DialogRow },

  pageName: 'application-page',
  apiName: 'applicationsPages'
})
</script>
