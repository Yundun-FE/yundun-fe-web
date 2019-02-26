<template>
  <el-input
    v-model="useValue"
    :size="size"
    :type="type"
    :class="b()"
    @change="handleChange"
  />
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'd-input',

  props: {
    value: [String, Number],
    size: String,
    type: String
  },

  data() {
    return {
      useValue: this.value
    }
  },

  watch: {
    value(val) {
      this.useValue = val
    },

    useValue(val) {
      this.$emit('input', val)
    }
  },

  methods: {
    handleChange(val) {
      this.$emit('change', val)
    }
  }
})
</script>
