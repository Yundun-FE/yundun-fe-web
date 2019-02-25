<template>
  <el-input-number
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
    size: String,
    type: String
  }
})
</script>
