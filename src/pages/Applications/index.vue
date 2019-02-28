<template>
  <PageTable
    ref="PageTable"
    page-name="application"
    api-name="applications"
  >
    <FormRow slot="FormRow"/>
  </PageTable>
</template>

<script>
import FormRow from './components/FormRow'

export default {
  components: { FormRow },

  methods: {
    init() {
      this.$refs.PageTable.init()
    }
  }
}
</script>
