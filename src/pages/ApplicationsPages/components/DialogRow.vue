<template>
  <DialogForm
    ref="Dialog"
    v-model="form"
    :rules="rules"
    title-label="页面"
    @submit="handleSubmit"
  >
    <FormBase />
  </DialogForm>
</template>

<script>
import createDialog from '@/utils/create-dialog'
import FormBase from './FormBase'

export default createDialog({
  components: { FormBase },

  API_NAME: 'applicationsPages',

  data() {
    return {
      bindForm: {
        appId: this.$route.params.appId
      }
    }
  }
})
</script>
