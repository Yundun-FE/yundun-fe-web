<template>
  <el-input-number
    v-model="val"
    :step="step"
    :size="size"
    :type="type"
    :class="b()"
  />
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'd-input-number',

  props: {
    value: [String, Number],
    size: String,
    step: [String, Number],
    type: String
  },

  data() {
    return {
      val: this.value
    }
  },

  watch: {
    val(val) {
      this.$emit('input', val)
    }
  }
})
</script>
