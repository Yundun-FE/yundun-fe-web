<template>
  <page>
    <DmConsole
      ref="DmConsole"
      :data="list"
      :loading-data="loadingData"
      :loading-layout="loadingLayout"
      :columns="columns"
      :actions-row="actionsRow"
      :actions-toolbar="actionsToolbar"
      :bind-params="bindParams"
      :multiple-selection.sync="multipleSelection"
      class="padding"
      @init="init"
      @action="handleAction"
    >
      <template slot="toolbar-right">
        <slot name="toolbar-right"/>
      </template>
    </DmConsole>
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
    pageRowName: String,
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
