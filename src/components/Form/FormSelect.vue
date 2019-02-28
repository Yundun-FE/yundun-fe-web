<template>
  <el-select
    v-model="val"
    :size="size"
    :placeholder="placeholder"
    :disabled="disabled"
    :filterable="filterable"
    :multiple="multiple"
    :collapse-tags="collapseTags"
    @change="handleChange"
  >
    <el-option
      v-if="defaultText"
      :size="size"
      :label="defaultText"
      value=""
    >{{ defaultText }}</el-option>
    <el-option
      v-for="item in selects"
      :size="size"
      :key="item.value"
      :disabled="item.disabled"
      :value="item.value"
      :label="item.label"
    >
      {{ item.label }}
    </el-option>
  </el-select>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'yd-form-select',

  props: {
    placeholder: String,
    disabled: Boolean,
    multiple: Boolean,
    collapseTags: Boolean,
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
    filterable: Boolean,
    value: [String, Number, Array]
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
