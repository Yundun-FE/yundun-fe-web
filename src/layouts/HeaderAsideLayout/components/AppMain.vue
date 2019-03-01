<style lang="scss">
.app-main {
  position: relative;
}
</style>

<template>
  <section class="app-main">
    <PageSkeleton
      v-if="pageLoading && pageSkeleton"
      :type="pageSkeleton"
    />
    <router-view />
  </section>
</template>

<script>
import PageSkeleton from '@/components/Page/PageSkeleton'

export default {
  name: 'AppMain',

  components: { PageSkeleton }
}
</script>
