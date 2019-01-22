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
    }
  }
}
