<template>
  <PageTable
    ref="PageTable"
    :bind-params="bindParams"
    page-row-name="applicationPage__edit"
    page-name="application-page"
    api-name="applicationsPages"
  >
    <FormRow slot="FormRow" />

    <template slot="toolbar-right">
      <FormSearch
        v-model="bindParams.name"
        @submit="$refs.PageTable.emit()"
      />
    </template>
  </PageTable>
</template>

<script>
import FormRow from './components/FormRow'

export default {
  components: { FormRow },

  data() {
    return {
      bindParams: {
        name: ''
      }
    }
  }
}
</script>
