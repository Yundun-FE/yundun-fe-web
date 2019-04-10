import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  computed: {
    id: {
      get() {
        return this.$store.state.jobs.id
      },
      set(value) {
        this.SET_ID(value)
      }
    },
    jobsId: {
      get() {
        return this.$store.state.jobs.id
      },
      set(value) {
        this.SET_ID(value)
      }
    },
    ...mapState({
      jobsData: state => state.jobs.data,
      selectEnv: state => state.jobs.selectEnv
    })
  },

  methods: {
    ...mapMutations({
      'SET_ID': 'jobs/SET_ID'
    }),
    ...mapActions({
      'saveById': 'jobs/saveById',
      'getByName': 'jobs/getByName',
      'getById': 'jobs/getById' })
  }
}
