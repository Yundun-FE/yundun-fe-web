import Fetch from '../utils/fetch'

export default {
  data() {
    return {
      columns: [],
      actionsRow: [],
      actionsToolbar: [],
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
        data = await Fetch.get(`/explorer/pages/${this.pageName}`)
      } catch (e) {
        data = this.config
        console.warn(`${this.pageName} - 未同步此页面配置`)
      }

      this.columns = data.blocks.DmConsole.props.columns
      this.actionsRow = data.blocks.DmConsole.props.actionsRow
      this.actionsToolbar = data.blocks.DmConsole.props.actionsToolbar
      this.layoutFinish = true
      this.checkFinish()
    }
  }
}
