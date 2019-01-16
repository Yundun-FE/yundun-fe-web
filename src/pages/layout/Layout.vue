<template>
  <div class="app-wrapper">
    <el-container>
      <el-aside width="200px">
        <Sidebar />
      </el-aside>
      <el-container>
        <el-header>
          <navbar />
        </el-header>
        <el-main>
          <app-main />
        </el-main>
      </el-container>
    </el-container>

    <!-- <el-container>
      <el-aside width="200px">
        <Sidebar />
      </el-aside>
      <el-container>
        <navbar />
        <el-main>
          <app-main />
        </el-main>
      </el-container>
    </el-container> -->
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    path() {
      return this.$route.path
    }
  }
}
</script>

<style lang="stylus">
@require '../../styles/var.styl';

// @import "src/styles/mixin.scss";
.app-wrapper {
  position: relative;
  height: 100%;

  >.el-container {
    height: 100%;

    .el-scrollbar, .el-menu {
      height: 100%;
    }

    .el-scrollbar__view {
      height: 100%;
    }

    .el-scrollbar__wrap {
      overflow-x: hidden !important;
    }
  }

  .el-main {
    background: rgb(241, 243, 246);
  }

  &.is-home {
    margin: 0 auto;
  }

  .el-header {
    background: $color-primary;
  }

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
