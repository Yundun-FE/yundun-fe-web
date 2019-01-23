<style lang="postcss">
.HeaderBreadcrumb{
  background: #FFF;
  margin-left: -30px;
  margin-right: -30px;
  margin-top: -20px;
  padding: 20px;
}
</style>

<template>
  <div :class="b()">
    <el-breadcrumb
      class="app-breadcrumb"
      separator="/"
    >
      <transition-group name="breadcrumb">
        <el-breadcrumb-item
          v-for="(item,index) in levelList"
          v-if="item.meta.title"
          :key="item.path"
        >
          <span
            v-if="item.redirect===&quot;noredirect&quot;||index==levelList.length-1"
            class="no-redirect"
          >{{ item.meta.title }}</span>
          <router-link
            v-else
            :to="formatUrl(item.redirect || item.path)"
          >{{ item.meta.title }}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'HeaderBreadcrumb',

  props: {
    breadcrumb: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      levelList: []
    }
  },

  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },

  methods: {
    formatUrl(url) {
      const { params } = this.$route
      Object.keys(params).forEach(key => {
        url = url.replace(`:${key}`, params[key])
      })
      return url
    },

    getBreadcrumb() {
      const matched = this.$route.matched.filter(item => item.name)
      this.levelList = matched
    }
  }

})
</script>
