<template>
  <DialogForm
    ref="Dialog"
    v-model="form"
    :rules="rules"
    title-label="编辑配置"
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

  apiName: 'jobs'
})
</script>
