import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    FE_API: state => state.app.FE_API,
    // router: state => state.app.router,
    menus: state => state.app.menus,
    pageSkeleton: state => state.app.pageSkeleton,
    pageLoading: state => state.app.pageLoading
  }),

  methods: {
    ...mapMutations(['FINISH_PAGE_LOADING'])
  }
}
