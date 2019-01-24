<template>
  <page
    :loading="loading"
  >
    <DmConsole
      ref="DmConsole"
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
      @init="init"
    />
  </page>
</template>

<script>
import createCudr from '@/utils/create-cudr'
import DialogRow from './components/DialogRow'

export default createCudr({
  pageName: 'application',
  API_NAME: 'applications',

  components: { DialogRow },

  data() {
    return {
      bindParams: {
        type: ''
      }
    }
  }
})
</script>
