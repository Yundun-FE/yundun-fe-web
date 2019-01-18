<script>
import create from 'common/utils/create-basic'

export default create({
  name: 'DmTable',

  render(createElement) {
    const columnsRender = [
      createElement('el-table-column', {
        props: {
          type: 'selection',
          width: 55
        }
      })
    ]

    this.columns.forEach(column => {
      columnsRender.push(
        createElement('el-table-column', {
          props: {
            prop: column.prop,
            label: column.label,
            minWidth: column.minWidth || '',
            width: column.width || '',
            align: column.align,
            headerAlign: column.headerAlign
          }
        })
      )
    })

    columnsRender.push(
      this.$slots.default
    )

    return createElement('el-table', {
      props: {
        'v-loading': this.loading,
        'data': this.data,
        'size': this.size
      }
    }, columnsRender)
  },

  props: {
    loading: Boolean,
    selection: Boolean,
    size: {
      type: String,
      default: 'medium'
    },
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
