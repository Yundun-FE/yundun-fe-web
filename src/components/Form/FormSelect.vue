<template>
  <el-select v-model="val" :placeholder="placeholder" :disabled="disabled" @change="handleChange">
    <el-option v-if="defaultText" :label="defaultText" value="">{{ defaultText }}</el-option>
    <el-option v-for="item in selects" :key="item.value" :disabled="item.disabled" :value="item.value" :label="item.label"/>
  </el-select>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'yd-form-select',

  props: {
    placeholder: String,
    disabled: Boolean,
    defaultText: String,
    size: {
      type: String,
      default: ''
    },
    selects: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: [String, Number]
  },

  data() {
    return {
      val: this.value
    }
  },

  watch: {
    val(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.val = val
    }
  },

  methods: {
    handleChange(value) {
      this.$emit('change', value)
    }
  }
})
</script>
