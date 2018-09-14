<template>
  <div class="menu">
    <ul class="list-website">
      <li v-for="item in list" :key="item.id" class="list-website-item">
        <a :href="item.url" target="_blank">{{ item.title }}</a>
      </li>
    </ul>

    <el-dropdown class="menu-item menu-item--setting" trigger="click">
      <el-button type="primary" size="mini" icon="yundun-fe yicon-setting" circle/>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            主页
          </el-dropdown-item>
        </router-link>
        <router-link class="inlineBlock" to="/product/index">
          <el-dropdown-item>
            项目管理
          </el-dropdown-item>
        </router-link>
        <router-link class="inlineBlock" to="/cmd/index">
          <el-dropdown-item>
            指令管理
          </el-dropdown-item>
        </router-link>
        <router-link class="inlineBlock" to="/website/index">
          <el-dropdown-item>
            常用网站
          </el-dropdown-item>
        </router-link>
        <router-link class="inlineBlock" to="/account/index">
          <el-dropdown-item>
            账号管理
          </el-dropdown-item>
        </router-link>
        <router-link class="inlineBlock" to="/setting/index">
          <el-dropdown-item>
            设置
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
@require '../../../styles/var.styl';

.menu {
  display: flex;
  overflow: hidden;
  border-bottom: 1px solid #EEE;
  background: $color-primary;
  padding: 6px 0;

  &-item {
    padding: 0 12px;
  }

  .list-website {
    flex: 1;
  }
}

.list-website {
  &-item {
    display: inline-block;
    a {
      display: inline-block;
      line-height: 32px;
      height: 32px;
      padding: 0 12px;
      transition: 0.15s;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.9);

      &:hover {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
}
</style>

