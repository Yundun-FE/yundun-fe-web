<style lang="scss">
.app-main {
  position: relative;
}
</style>

<template>
  <section class="app-main">
    <!-- <PageSkeleton
      v-if="pageLoading && pageSkeleton"
      :type="pageSkeleton"
    /> -->
    <transition name="page-transition">
      <RouteView/>
    </transition>
  </section>
</template>

<script>
import RouteView from '../RouteView'
import PageSkeleton from '@/components/Page/PageSkeleton'

export default {
  name: 'AppMain',

  components: { PageSkeleton, RouteView }
}
</script>
