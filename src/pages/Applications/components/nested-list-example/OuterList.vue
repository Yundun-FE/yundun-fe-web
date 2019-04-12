<template>
  <div class="root">
    <SortableList v-model="lists" lock-axis="y">
      <InnerList v-for="(list, index) in lists" :key="list.id" :index="index" :list="list" collection="lists" />
    </SortableList>
  </div>
</template>

<script>
import createList from './createList'

import SortableList from './SortableList.vue'
import InnerList from './InnerList.vue'

export default {
  components: {
    SortableList,
    InnerList
  },
  data() {
    return {
      lists: createList(3, false, 'List')
        .map(li => {
          return Object.assign(li, {
            items: createList(3, false)
          })
        })
    }
  }
}
</script>
