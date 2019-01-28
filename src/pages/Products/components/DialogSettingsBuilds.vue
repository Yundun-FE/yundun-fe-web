<template>
  <DialogForm
    ref="Dialog"
    v-model="form"
    :rules="rules"
    title-label="应用"
    @submit="handleSubmit"
  >
    <FormTableBuild />
  </DialogForm>
</template>

<script>
import createDialog from '@/utils/create-dialog'
import FormTableBuild from './FormTableBuild'

export default createDialog({
  components: { FormTableBuild },

  API_NAME: 'jobs'
})
</script>
