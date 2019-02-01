<template>
  <page :loading="loading">
    <DmConsole
      ref="DmConsole"
      :data="list"
      :columns="columns"
      :actions-row="actionsRow"
      :actions-toolbar="actionsToolbar"
      :bind-params="bindParams"
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
// import createCudr from '@/utils/create-cudr'
import createPage from '@/utils/create-page'
import DialogRow from './components/DialogRow'

export default createPage({
  pageName: 'application',
  API_NAME: 'applications',
  options: {

  },

  components: { DialogRow },

  data() {
    return {
      bindParams: {
        type: ''
      }
    }
  },

  created() {
  }
})
</script>
