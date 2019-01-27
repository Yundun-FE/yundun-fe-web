<template>
  <page>
    <HeaderDetail v-if="inMenu">
      <HeaderTab :data="pageMenus"/>
    </HeaderDetail>
    <router-view/>
  </page>
</template>

<script>
import HeaderDetail from './components/HeaderDetail'
import app from '@/mixins/app'

export default {
  components: { HeaderDetail },

  mixins: [app],

  data() {
    return {
      pageMenus: []
    }
  },

  computed: {
    inMenu() {
      const name = this.$route.name
      return this.pageMenus.map(_ => _.name).includes(name)
    }
  },

  created() {
    this.pageMenus = this.menus['products.id']
  }
}
</script>
