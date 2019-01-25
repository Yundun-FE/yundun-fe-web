<template>
  <div>
    <HeaderTop
      :title="info.title"
    >
      <template slot="info">
        {{ info.name }}
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
    this.id = this.$route.params.id
    this.init()
  },

  methods: {
    async init() {
      this.info = await this.Fetch.get(`/jobs/${this.id}`)
    }
  }
}
</script>
