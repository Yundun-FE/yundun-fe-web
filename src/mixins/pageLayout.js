import Fetch from '../utils/fetch'

export default {
  data() {
    return {
      columns: [],
      actions: {},
      settings: {},
      layoutFinish: false
    }
  },

  mounted() {
    this.initPageLayout()
  },

  methods: {
    async initPageLayout() {
      let data = this.config
      try {
        data = await Fetch.get(`${this.FE_API}/explorer/pages/${this.pageName}`)
      } catch (e) {
        data = this.config
        console.log(data)
        console.warn(`${this.pageName} - 未同步此页面配置`)
      }

      this.columns = data.content.columns
      this.actions = data.content.actions
      this.layoutFinish = true
      this.checkFinish()
    }
  }
}
