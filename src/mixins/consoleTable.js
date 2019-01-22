import { deepClone } from '@/utils'

export default {
  data() {
    return {}
  },

  computed: {},

  methods: {
    handleRowAdd(table, row) {
      table.push(deepClone(row))
    },

    handleRowDelete(table, index) {
      table.splice(index, 1)
    },

    handleTableReset(scope, key, row) {
      this.$set(scope, key, [deepClone(row)])
    }
  }
}
