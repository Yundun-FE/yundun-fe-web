<template>
  <div class="menu" mode="horizontal">
    <!-- <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" /> -->
    <!-- <breadcrumb /> -->
    <!-- {{ list }} -->
    <!-- <el-menu-item v-for="item in list" :key="item.id" >{{ item.title }}</el-menu-item> -->
    <ul class="list-website">
      <li v-for="item in list" :key="item.id" class="list-website-item">
        <a :href="item.url" target="_blank">{{ item.title }}</a>
      </li>
    </ul>

    <el-dropdown class="menu-item menu-item--setting" trigger="click">
      <el-button size="mini" icon="yundun-fe yicon-setting" circle/>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            Home
          </el-dropdown-item>
        </router-link>
        <router-link class="inlineBlock" to="/product/index">
          <el-dropdown-item>
            Product
          </el-dropdown-item>
        </router-link>
        <router-link class="inlineBlock" to="/cmd/index">
          <el-dropdown-item>
            CMD
          </el-dropdown-item>
        </router-link>
        <router-link class="inlineBlock" to="/website/index">
          <el-dropdown-item>
            Website
          </el-dropdown-item>
        </router-link>
        <router-link class="inlineBlock" to="/account/index">
          <el-dropdown-item>
            Account
          </el-dropdown-item>
        </router-link>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Explorer from '@/api/explorer'

export default {
  data() {
    return {
      list: []
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    async init() {
      const { list, total } = await Explorer.websiteList()
      this.list = list
    }
  }
}
</script>

<style lang="stylus">
.menu {
  display: flex;
  overflow: hidden;
  border-bottom: 1px solid #EEE;

  &-item {
    height: 60px;
    line-height: 60px;
    padding: 0 12px;
  }

  .list-website {
    flex: 1;
  }
}

.list-website {
  &-item {
    display: inline-block;
    margin-right: 10px;

    a {
      display: inline-block;
      line-height: 60px;
      height: 60px;
      padding: 0 12px;
      font-size: 14px;
    }

    &:hover {
      color: #409EFF;
    }
  }
}
</style>

