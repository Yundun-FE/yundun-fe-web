<template>
  <a-form>
    <slot/>
  </a-form>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'd-form'
})
</script>
