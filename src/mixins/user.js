import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      userInfo: state => state.user.info
    })
  },

  methods: {
    ...mapMutations({
      // 'SET_': 'app/_SET'
    }),
    ...mapActions({
      // 'saveById': 'app/saveById'
    })
  }
}
