<template>
  <DialogForm
    ref="Dialog"
    v-model="form"
    :rules="rules"
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
  API_NAME: 'applications',

  components: { FormRow }
})
</script>
