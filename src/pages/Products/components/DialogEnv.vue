<template>
  <DialogForm
    ref="Dialog"
    v-model="form"
    :rules="rules"
    title-label="环境"
    @submit="handleSubmit"
  >
    {{ form }}
    <el-form-item label="名称">
      <el-input v-model="form.name" disabled placeholder="标题"/>
    </el-form-item>
    <el-form-item label="标题">
      <el-input v-model="form.title" placeholder="标题"/>
    </el-form-item>
    <el-form-item label="环境">
      <el-input v-model="form.env" placeholder="ENV"/>
    </el-form-item>
  </DialogForm>
</template>

<script>
import createDialog from '@/utils/create-dialog'

export default createDialog({
  API_NAME: 'jobs'
})
</script>
