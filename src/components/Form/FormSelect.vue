<template>
  <d-select
    v-model="val"
    :size="size"
    :placeholder="placeholder"
    :disabled="disabled"
    :filterable="filterable"
    @change="handleChange"
  >
    <d-select-option
      v-if="defaultValue"
      :size="size"
      :label="defaultValue"
      value=""
    >{{ defaultValue }}</d-select-option>
    <d-select-option
      v-for="item in selects"
      :size="size"
      :key="item.value"
      :disabled="item.disabled"
      :value="item.value"
      :label="item.label"
    >
      {{ item.label }}
    </d-select-option>
  </d-select>
</template>

<script>
import create from '../../utils/create-basic'

export default create({
  name: 'yd-form-select',

  props: {
    placeholder: String,
    disabled: Boolean,
    defaultValue: String,
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
