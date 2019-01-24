<template>
  <div>
    <el-form-item
      label="名称"
      prop="name"
    >
      <el-input
        v-model="form.name"
        placeholder="名称"
        style="width: 220px"
      />
    </el-form-item>
    <el-form-item
      label="CODE"
      prop="code"
    >
      <el-input
        v-model="form.code"
        style="width: 220px"
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
