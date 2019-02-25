<template>
  <DialogForm
    ref="Dialog"
    v-model="form"
    :rules="rules"
    title-label="快速导入"
    @submit="handleSubmit"
  >
    <d-input
      v-model="form.content"
      :rows="5"
      type="textarea"
    />
  </DialogForm>
</template>

<script>
import createDialog from '../../../../utils/create-dialog'
</script>
