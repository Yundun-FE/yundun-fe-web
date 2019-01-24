<template>
  <page>
    <Header v-if="inMenu">
      <HeaderTab :data="pageMenus"/>
    </Header>
    <router-view/>
  </page>
</template>

<script>
import Header from './components/Header'
import app from '@/mixins/app'

export default {
  components: { Header },

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

  watch: {
    $route(val) {
      // console.log(val)
    }
  },

  created() {
    this.pageMenus = this.menus['applications.appId']
  }
}
</script>
