
<template>
  <a-select-option :value="value"/>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'd-select-option',

  props: {
    label: [String, Number],
    value: {
      required: true
    }
  }
})
</script>
