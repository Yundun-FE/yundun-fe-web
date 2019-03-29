<template>
  <a-select
    v-model="val"
    :placeholder="placeholder"
    :disabled="disabled"
    :filterable="filterable"
    :multiple="multiple"
    :collapse-tags="collapseTags"
    @change="handleChange"
  >
    <a-select-option
      v-if="defaultValue"
      :label="defaultValue"
      value=""
    >{{ defaultValue }}</a-select-option>
    <a-select-option
      v-for="item in selects"
      :key="item.value"
      :disabled="item.disabled"
      :value="item.value"
      :label="item.label"
    >
      {{ item.label }}
    </a-select-option>
  </a-select>
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
