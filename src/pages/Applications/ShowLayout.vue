<template>
  <div>
    <HeaderDetail style="margin-bottom: 24px" />
    <router-view />
  </div>
</template>

<script>
import jobsMixins from '@/mixins/jobs'
import HeaderDetail from './components/HeaderDetail'

export default {
  name: 'ShowLayout',

  components: { HeaderDetail },

  mixins: [jobsMixins],

  watch: {
    $route(val) {
      this.init()
    }
  },

  created() {
    this.getByName('console-v5-web')
    this.init()
  },

  methods: {
    init() {
      const id = this.$route.params.id
      this.SET_ID(id)
      this.getById()
    }
  }
}
</script>
