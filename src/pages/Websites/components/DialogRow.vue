<template>
  <DialogForm
    ref="Dialog"
    v-model="form"
    :rules="rules"
    title-label="账号"
    @submit="handleSubmit"
  >
    <el-form-item label="标题">
      <d-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="URL">
      <d-input v-model="form.url" />
    </el-form-item>
  </DialogForm>
</template>

<script>
import createDialog from '@/utils/create-dialog'

export default createDialog({
  API_NAME: 'websites'
})
</script>
