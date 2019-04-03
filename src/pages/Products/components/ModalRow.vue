<template>
  <ModalForm
    ref="Dialog"
    v-model="form"
    :rules="rules"
    :modify="modify"
    title-label="应用"
    @submit="handleSubmit"
  >
    <a-form-item
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      label="名称"
    >
      <a-input
        v-decorator="['name']"
        disabled
        placeholder="Name"
      />
    </a-form-item>
  </ModalForm>
</template>

<script>
import createDialog from '@/utils/create-dialog'
import FormRow from './FormRow'

export default {

}
</script>
