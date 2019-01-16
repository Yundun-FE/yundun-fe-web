
<script>
import create from 'common/utils/create-basic'

export default create({
  name: 'DmTable',

  render(createElement) {
    const columnsRender = []

    this.columns.forEach(column => {
      columnsRender.push(
        createElement('el-table-column', {
          props: {
            prop: column.prop,
            label: column.label,
            minWidth: column.minWidth || '',
            width: column.width || ''
          }
        })
      )
    })

    return createElement('el-table', {
      props: {
        'v-loading': this.loading,
        'data': this.data
      }
    }, columnsRender)
  },

  props: {
    loading: Boolean,
    data: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    }
  }

})
</script>
