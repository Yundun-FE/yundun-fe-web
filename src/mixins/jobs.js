import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'

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
    }),
    ...mapGetters({
      jobsSelectChildrens: 'jobs/selectChildrens'
    })
  },

  methods: {
    ...mapMutations({
      'SET_ID': 'jobs/SET_ID',
      'JOBS_UPDATE_MENUS': 'jobs/UPDATE_MENUS'
    }),
    ...mapActions({
      'jobsSaveById': 'jobs/saveById',
      'getByName': 'jobs/getByName',
      'jobsGetById': 'jobs/getById' })
  }
}
