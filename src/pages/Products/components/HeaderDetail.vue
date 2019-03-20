<template>
  <div>
    <HeaderTop :title="`${info.rootTitle ? info.rootTitle + ' - ' : ''}${info.title}`">
      <template slot="info">
        {{ info.name }}
      </template>
      <template slot="action">
        <a-form>
          <a-form-item label="切换环境">
            <yd-form-select
              v-model="info.env"
              :selects="selectEnv"
              border
              @change="handleChangeEnv"
            />
          </a-form-item>
        </a-form>
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
