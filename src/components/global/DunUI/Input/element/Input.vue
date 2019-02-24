<template>
  <el-input
    :value="value"
    :size="size"
    :type="type"
    :class="b()"
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
  }
})
</script>
