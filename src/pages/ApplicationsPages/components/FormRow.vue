<template>
  <div>
    <el-form-item
      label="名称"
      prop="name"
    >
      <el-input
        v-if="form.rootName"
        v-model="form.rootName"
        disabled
        style="width: 220px"
      />
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
    <el-form-item label="类型">
      <yd-form-select
        :selects="LABEL.APP_PAGE_TYPE"
        v-model="form.type"
        style="width: 220px"
      />
    </el-form-item>
    <el-form-item
      label="备注"
      prop="remarks"
    >
      <el-input
        v-model="form.remarks"
        style="width: 220px"
      />
    </el-form-item>
  </div>
</template>

<script>
export default {
  inject: ['dmEdit'],

  computed: {
    form() {
      return this.dmEdit.form
    }
  }
}
</script>
