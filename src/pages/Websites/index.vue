<template>
  <page :loading="loading">
    <DmConsole
      ref="DmConsole"
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

export default createCudr({
  pageName: 'web',
  apiName: 'websites',

  components: { DialogRow }
})
</script>
