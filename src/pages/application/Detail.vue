<template>
  <page>
    <template v-if="$route.name === 'applications__pages'">
      <Header />
      <HeaderTab/>
    </template>
    <router-view/>
  </page>
</template>

<script>
import Header from './components/Header'

export default {
  components: { Header },

  watch: {
    $route(val) {
      console.log(val)
    }
  }

}
</script>
