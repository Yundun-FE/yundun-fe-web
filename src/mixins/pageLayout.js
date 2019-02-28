export default {
  data() {
    return {
      columns: [],
      actionsRow: [],
      actionsToolbar: [],
      loadingLayout: true
    }
  },

  created() {
    this.initPageLayout()
  },

  methods: {
    async initPageLayout() {
      const data = await this.Fetch.get(`/explorer/pages/${this.pageName}`)
      const block = data.content.find(_ => _.blockName === 'DmConsole')

      this.columns = block.props.columns
      this.actionsRow = block.props.actionsRow
      this.actionsToolbar = block.props.actionsToolbar
      this.loadingLayout = false
      this.checkFinish()
    }
  }
}
