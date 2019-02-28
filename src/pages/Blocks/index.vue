<template>
  <page :loading="loading">
    <DmConsole
      ref="DmConsole"
      :data="list"
      :columns="columns"
      :actions="actions"
      :multiple-selection.sync="multipleSelection"
      class="padding"
      @init="init"
      @action="handleAction"
    />
    <!-- <DialogRow
      ref="DialogRow"
      @init="init"
    /> -->
  </page>
</template>

<script>
// import createCudr from '@/utils/create-cudr'
import createPage from '@/utils/create-page'
// import DialogRow from './components/DialogRow'

export default createPage({
  pageName: 'form',
  apiName: 'forms',

  options: {

  }
})
</script>
