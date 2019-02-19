<template>
  <el-select
    v-model="val"
    :size="size"
    :multiple="multiple"
    :filterable="filterable"
    :allow-create="allowCreate"
    :default-first-option="defaultFirstOption"
    :placeholder="placeholder"
    :disabled="disabled"
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
    />
  </el-select>
</template>

<script>
import create from '../../utils/create-basic'

export default create({
  name: 'yd-form-select',

  props: {
    placeholder: String,
    disabled: Boolean,
    defaultText: String,
    multiple: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    defaultFirstOption: Boolean,
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
