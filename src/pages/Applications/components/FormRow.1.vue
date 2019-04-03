<template>
  <div>
    <el-form-item label="项目名称">
      <el-col :span="12">
        <el-input
          id="form_title"
          v-model="form.title"
          placeholder="名称"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="命名">
      <el-col :span="12">
        <el-input
          id="form_name"
          v-model="form.name"
          placeholder="Product Name"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="URL">
      <el-col :span="12">
        <el-input
          id="form_url"
          v-model="form.url"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="ENV">
      <el-col :span="12">
        <el-input
          id="form_env"
          v-model="form.env"
          disabled
        />
      </el-col>
    </el-form-item>
  </div>
</template>

<script>
import app from '@/mixins/app'

export default {
  mixins: [app],

  computed: {
    form() {
      return this.$parent.model
    }
  }
}
</script>
