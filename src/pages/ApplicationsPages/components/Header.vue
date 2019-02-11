<template>
  <div>
    <HeaderTop
      :title="info.name"
    >
      <template slot="info">
        {{ info.code }}
      </template>
      <slot/>
      <template slot="action">
        <slot name="action"/>
      </template>
    </HeaderTop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      info: {}
    }
  },

  created() {
    this.id = this.$route.params.pageId || this.$route.params.id
    this.init()
  },

  methods: {
    async init() {
      this.info = await this.Fetch.get(`/applicationsPages/${this.id}`)
    }
  }
}
</script>
