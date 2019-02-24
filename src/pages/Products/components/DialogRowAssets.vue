<template>
  <DialogForm
    ref="Dialog"
    v-model="form"
    :rules="rules"
    :mode="mode"
    title-label="资源"
    @submit="handleSubmit"
  >
    <el-form-item label="宽度">
      <d-input v-model="form.width"/>
    </el-form-item>
    <el-form-item label="高度">
      <d-input v-model="form.height"/>
    </el-form-item>
    <el-form-item label="备注">
      <d-input v-model="form.remarks"/>
    </el-form-item>
    <el-form-item label="KEY">
      <d-input v-model="form.key"/>
    </el-form-item>
  </DialogForm>
</template>

<script>
import createDialog from '@/utils/create-dialog'

export default createDialog({})
</script>
