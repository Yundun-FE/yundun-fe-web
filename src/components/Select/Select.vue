<template>
  <el-select v-model="select" placeholder="请选择">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      select: this.value
    }
  },
  watch: {
    value(val) {
      this.select = val
    },
    select(val) {
      this.$emit('input', val)
    }
  }
}
</script>
