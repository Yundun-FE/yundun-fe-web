<template>
  <div :style="!$route.meta.pageHeader ? 'margin: -24px -24px 0px;' : null">
    <!-- pageHeader , route meta hideHeader:true on hide -->
    <page-header
      v-if="!$route.meta.pageHeader"
      :title="title"
      :logo="logo"
      :avatar="avatar"
    >
      <slot
        slot="action"
        name="action"
      />
      <slot
        slot="content"
        name="headerContent"
      />
      <div
        v-if="!this.$slots.headerContent && desc"
        slot="content"
      >
        <p style="font-size: 14px;color: rgba(0,0,0,.65)">{{ desc }}</p>
        <div class="link">
          <template v-for="(link, index) in linkList">
            <a
              :key="index"
              :href="link.href"
            >
              <a-icon :type="link.icon" />
              <span>{{ link.title }}</span>
            </a>
          </template>
        </div>
      </div>
      <slot
        slot="extra"
        name="extra"
      />
      <!-- <div slot="pageMenu">
        <div
          v-if="search"
          class="page-menu-search"
        >
          <a-input-search
            style="width: 80%; max-width: 522px;"
            placeholder="请输入..."
            size="large"
            enter-button="搜索"
          />
        </div>
        <div
          v-if="tabs && tabs.items"
          class="page-menu-tabs"
        >
          <a-tabs
            :tab-bar-style="{margin: 0}"
            :active-key="tabs.active()"
            @change="tabs.callback"
          >
            <a-tab-pane
              v-for="item in tabs.items"
              :tab="item.title"
              :key="item.key"
            />
          </a-tabs>
        </div>
      </div> -->
    </page-header>
    <div class="content">
      <div :class="['page-header-index-wide']">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from './PageHeader'

export default {
  name: 'LayoutContent',
  components: {
    PageHeader
  },
  // ['desc', 'logo', 'title', 'avatar', 'linkList', 'extraImage']
  props: {
    desc: {
      type: String,
      default: null
    },
    logo: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    avatar: {
      type: String,
      default: null
    },
    linkList: {
      type: Array,
      default: null
    },
    extraImage: {
      type: String,
      default: null
    },
    search: {
      type: Boolean,
      default: false
    },
    tabs: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.content {
  margin: 24px 24px 0;

  .link {
    margin-top: 16px;

    &:not(:empty) {
      margin-bottom: 16px;
    }
    a {
      margin-right: 32px;
      height: 24px;
      line-height: 24px;
      display: inline-block;

      i {
        font-size: 24px;
        margin-right: 8px;
        vertical-align: middle;
      }
      span {
        height: 24px;
        line-height: 24px;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}
.page-menu-search {
  text-align: center;
  margin-bottom: 16px;
}
.page-menu-tabs {
  margin-top: 48px;
}
</style>
