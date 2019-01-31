<template>
  <el-row :gutter="12">
    <el-col
      v-for="(item, index) in data"
      :span="6"
      :key="index"
      style="margin-bottom: 12px"
    >
      <el-card shadow="hover">
        <div
          slot="header"
          class="clearfix"
        >
          <span>{{ item.name }}</span>
        </div>
        <el-button type="primary">进入管理</el-button>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    data: Array
  }
}
</script>
