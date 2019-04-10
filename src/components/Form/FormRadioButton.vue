<template>
  <a-radio-group
    v-model="val"
    :size="size"
    :default-value="defaultValue"
    :button-style="buttonStyle"
    @change="handleChange"
  >
    <!-- <a-radio-button
      v-if="defaultLabel"
      :label="defaultValue"
      :key="defaultValue"
    >{{ defaultLabel }}</a-radio-button> -->
    <a-radio-button
      v-for="item in radios"
      :key="item.value"
      :disabled="item.disabled"
      :value="item.value"
    >{{ item.label }}</a-radio-button>
    <slot />
  </a-radio-group>
</template>

<script>
import create from '../../utils/create-basic'

export default create({
  name: 'yd-form-radio-button',

  props: {
    size: {
      type: String,
      default: 'default'
    },
    buttonStyle: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    },
    radios: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultLabel: String,
    defaultValue: {
      type: String,
      default: ''
    },
    value: [String, Number, Boolean]
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
    handleChange(e) {
      this.$emit('change', e.target.value)
    }
  }
})
</script>
