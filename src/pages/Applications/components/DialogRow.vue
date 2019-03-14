<template>
  <DialogForm
    ref="Dialog"
    v-model="form"
    :rules="rules"
    :modify="modify"
    title-label="应用"
    @submit="handleSubmit"
  >
    <FormRow />
  </DialogForm>
</template>

<script>
import createDialog from '@/utils/create-dialog'
import FormRow from './FormRow'

export default createDialog({
  apiName: 'applications',

  components: { FormRow }
})
</script>
