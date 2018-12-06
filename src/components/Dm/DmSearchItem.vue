<style lang="postcss">
.DmSearchItem {
  margin: 10px 0;
}
</style>

<template>
  <div :class="b()">
    <slot />
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'DmSearchItem'
})
</script>
