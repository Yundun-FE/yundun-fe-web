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
      if (block) {
        const { columns, actionsRow, actionsToolbar } = block.props
        this.columns = columns
        this.actionsRow = actionsRow
        this.actionsToolbar = actionsToolbar
        this.loadingLayout = false
        this.checkFinish()
      } else {
        console.warn('not found block')
      }
    }
  }
}
