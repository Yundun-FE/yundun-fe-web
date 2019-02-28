<template>
  <PageTable
    ref="PageTable"
    page-name="fe-job"
    api-name="jobs"
  >
    <FormRow slot="FormRow"/>
  </PageTable>
</template>

<script>
import FormRow from './components/FormRow'

export default {
  components: { FormRow }
}
</script>
