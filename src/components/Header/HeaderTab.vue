<style lang="postcss">
</style>

<template>
  <div :class="b()">
    {{ data }}
  </div>
</template>

<script>
import create from 'common/utils/create-basic'

export default create({
  name: 'HeaderTab',

  components: {},

  props: {
    data: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {}
  },

  computed: {},

  methods: {}
})
</script>
