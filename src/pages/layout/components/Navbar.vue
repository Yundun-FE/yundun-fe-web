<template>
  <div
    height="45px"
    class="mHeader"
  >
    <div class="menu">
      <ul class="list-website">
        <li
          v-for="item in list"
          :key="item.id"
          class="list-website-item"
        >
          <a
            :href="item.url"
            target="_blank"
          >{{ item.title }}</a>
        </li>
      </ul>
    </div>
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
      const data = await Explorer.websiteList()
      if (!data) return

      this.list = data.list
    }
  }
}
</script>

<style lang="stylus">
@require '../../../styles/var.styl';

.mHeader {
  padding: 8px 0;
}

.menu {
  display: flex;
  overflow: hidden;

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
      line-height: 42px;
      height: 42px;
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

