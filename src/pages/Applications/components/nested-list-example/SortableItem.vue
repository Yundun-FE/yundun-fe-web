<template>
  <li :style="{height: item.height + 'px'}" class="list-item" >
    <span v-handle v-if="showHandle" class="handle"/>
    {{ item.value }}
  </li>
</template>

<script>
import { ElementMixin, HandleDirective } from 'vue-slicksort'

export default {
  directives: { handle: HandleDirective },
  mixins: [ElementMixin],
  props: ['item', 'showHandle']
}
</script>
