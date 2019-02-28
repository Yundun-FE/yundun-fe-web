<template>
  <page>
    <DmConsole
      ref="DmConsole"
      :data="list"
      :loading="loadingData"
      :loading-layout="loadingLayout"
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
      :api-name="apiName"
      @init="init"
    >
      <slot name="FormRow" />
    </DialogRow>
  </page>
</template>

<script>
import createPage from '@/utils/create-page'
import DialogRow from './DialogRow'

export default createPage({
  name: 'PageTable',

  components: { DialogRow },

  props: {
    pageName: String,
    apiName: String,
    bindParams: {
      type: Object,
      default: function() {
        return {}
      }
    }
  }
})
</script>
