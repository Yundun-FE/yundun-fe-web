<template>
  <li class="list-item">
    <h3>{{ list.value }}</h3>
    <SortableList v-model="list.items" class="shortList">
      <SortableItem v-for="(item, index) in list.items" :key="item.id" :index="index" :item="item" collection="lists" />
    </SortableList>
  </li>
</template>

<script>
import { ElementMixin } from 'vue-slicksort'

import SortableList from './SortableList.vue'
import SortableItem from './SortableItem.vue'

export default {
  components: {
    SortableItem,
    SortableList
  },
  mixins: [ElementMixin],

  props: ['list'],

  data() {
    return {
      // items: this.list.items.slice(0)
    }
  }
}
</script>
