<style lang="postcss">
.DmSearch{
  padding: 5px 10px;
}
</style>

<template>
  <div :class="b()">
    <slot/>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'DmSearch'
})
</script>
