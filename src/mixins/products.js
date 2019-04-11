import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  computed: {
    productsId: {
      get() {
        return this.$store.state.products.id
      },
      set(value) {
        this.SET_ID(value)
      }
    },
    ...mapState({
      productsData: state => state.products.data
    })
  },

  methods: {
    ...mapMutations({
      'PRODUCTS_SET_ID': 'products/SET_ID'
    }),
    ...mapActions({
      'productsSaveById': 'products/saveById',
      'productsGetById': 'products/getById' })
  }
}
