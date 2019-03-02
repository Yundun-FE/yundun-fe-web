<style lang="scss" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  line-height: 64px;
  background: #002140;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
}
.site-name {
  margin-left: 10px;
}
.sidebar-container {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  transition: width 0.28s;
  width: 200px !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  a {
    display: inline-block;
    width: 100%;
  }

  .ant-menu{
    i.iconfont {
      margin-right: 10px;
    }
  }
}
</style>

<template>
  <scroll-bar>
    <div class="logo">
      <!-- <img src="https://img.alicdn.com/tfs/TB13UQpnYGYBuNjy0FoXXciBFXa-242-134.png" width="40"> -->
      <span class="site-name">YUNDUN FE</span>
    </div>

    <a-menu
      :default-selected-keys="selectedKeys"
      :default-open-keys="openKeys"
      mode="inline"
      theme="dark"
    >
      <template v-for="(item, index) in asideMenuConfig">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          :index="index"
        >
          <router-link :to="item.path">
            <i
              v-if="item.icon"
              :class="item.icon"
            />
            <span v-if="item.name">{{ item.name }}</span>
          </router-link>
        </a-menu-item>

        <a-sub-menu
          v-else
          :key="item.path"
        >
          <span slot="title">
            <i
              v-if="item && item.icon"
              :class="item.icon"
            />
            <span
              v-if="item && item.name"
              slot="title"
            >{{ item.name }}</span>
          </span>
          <template
            v-for="(child, cIndex) in item.children"
            v-if="!child.hidden"
          >
            <a-menu-item
              :key="child.path"
              :index="cIndex"
            >
              <router-link
                :to="item.path + child.path"
              >
                {{ child.name }}
              </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </scroll-bar>
</template>

<script>
import ScrollBar from './ScrollBar'
import { asideMenuConfig } from '../../../menuConfig'

export default {
  name: 'SideBar',

  components: { ScrollBar },

  data() {
    return {
      asideMenuConfig,
      openKeys: [],
      selectedKeys: []
    }
  },

  watch: {
    $route: function() {
      this.updateMenu()
    }
  },

  created() {
    this.updateMenu()
  },

  methods: {
    updateMenu() {
      const routes = this.$route.matched.concat()
      this.selectedKeys = [routes[0].path]

      routes.forEach(item => {
        this.openKeys.push(item.path)
      })
    }
  }
}
</script>
