import Fetch from '@/utils/fetch'

export default {
  data() {
    return {
      Fetch,
      loading: true,
      list: []
    }
  },

  methods: {
    async init(id) {
      const data = await Fetch.get(`/${this.apiName}/id`)
      console.log(data)
      // this.updateList(`/${this.apiName}`, params)
    }
  }
}
