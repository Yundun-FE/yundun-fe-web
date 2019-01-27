<template>
  <DialogForm
    ref="Dialog"
    v-model="form"
    :rules="rules"
    title-label="账号"
    @submit="handleSubmit"
  >
    <el-form-item label="标题">
      <el-input v-model="form.title"/>
    </el-form-item>
    <el-form-item label="账号">
      <el-input v-model="form.name"/>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password"/>
    </el-form-item>
  </DialogForm>
</template>

<script>
import createDialog from '@/utils/create-dialog'

export default createDialog({
  API_NAME: 'accounts'
})
</script>
