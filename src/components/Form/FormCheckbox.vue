<template>
  <d-checkbox-group v-model="val">
    <d-checkbox v-for="item in checks" :key="item.value" :disabled="item.disabled" :label="item.value">{{ item.label }}</d-checkbox>
  </d-checkbox-group>
</template>

<script>
import create from '../../utils/create-basic'

export default create({
  name: 'yd-form-checkbox',

  props: {
    size: {
      type: String,
      default: ''
    },
    checks: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: Array,
      default: () => []
    }
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
  }
})
</script>
