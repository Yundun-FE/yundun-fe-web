<template>
  <div>
    <HeaderTop :title="info.title">
      <template slot="info">
        {{ info.name }}
      </template>
      <template slot="action">
        <yd-form-select
          v-model="info.env"
          :selects="selectEnv"
          @change="handleChangeEnv"
        />
      </template>
      <slot />
    </HeaderTop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: ''
    }
  },

  computed: {
    info() {
      return this.$parent.info
    },
    selectEnv() {
      return this.$parent.selectEnv
    }
  },

  created() {
    this.id = this.$route.params.id
  },

  methods: {
    handleChangeEnv(env) {
      this.$router.push({
        path: '',
        query: {
          env
        },
        append: true
      })
    }
  }
}
</script>
