<template>
  <div>
    <el-form-item
      label="应用名称"
      prop="name"
    >
      <d-input
        v-model="form.name"
        style="width: 320px"
        placeholder="名称"
      />
    </el-form-item>
    <el-form-item
      label="CODE"
      prop="code"
    >
      <d-input
        v-model="form.code"
        style="width: 320px"
      />
    </el-form-item>
  </div>
</template>

<script>
export default {
  computed: {
    form() {
      return this.$parent.model
    }
  }
}
</script>
