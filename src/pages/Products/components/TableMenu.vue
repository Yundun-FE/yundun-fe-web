<template>
  <div>
    <div
      v-for="(item, index) in form.menus"
      :key="index"
    >
      <p>{{ item.name }}</p>
      <TableApplication :data="item.childrens"/>
    </div>
  </div>
</template>

<script>
import TableApplication from './TableApplication'

export default {
  components: { TableApplication },

  data() {
    return {
      row: {
        name: '',
        childrens: []
      }
    }
  },
  computed: {
    form() {
      return this.$parent.model
    }
  }
}
</script>
