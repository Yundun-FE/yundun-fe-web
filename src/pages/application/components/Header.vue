<template>
  <div>
    <HeaderTop
      :title="info.name"
    >
      <template slot="info">
        {{ info.code }}
      </template>
      <slot/>
    </HeaderTop>
  </div>
</template>

<script>
export default {
  props: {},

  data() {
    return {
      id: '',
      info: {}
    }
  },

  computed: {},

  created() {
    this.id = this.$route.params.appId
    this.init()
  },

  methods: {
    async init() {
      this.info = await this.Fetch.get(`/applications/${this.id}`)
    }
  }
}
</script>
