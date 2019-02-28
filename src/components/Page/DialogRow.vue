<template>
  <DialogForm
    ref="Dialog"
    v-model="form"
    :rules="rules"
    :title-label="titleLabel"
    @submit="handleSubmit"
  >
    <slot/>
  </DialogForm>
</template>

<script>
import app from '@/mixins/app'
import consoleEdit from '@/mixins/consoleEdit'
import consoleDialog from '@/mixins/consoleDialog'

export default {
  mixins: [app, consoleEdit, consoleDialog],

  props: {
    apiName: String,
    titleLabel: String
  }
}
</script>
