<style lang="scss">
.DmTable{
  &--primary{
    th {
      color: #fff;
      background: $--color-primary !important;
    }
    td {
      padding: 12px 0;
    }
  }
}

</style>

<script>
import create from '../../utils/create-basic'

export default create({
  name: 'DmTable',

  render(createElement) {
    const columnsRender = []

    if (this.selection) {
      columnsRender.push(
        createElement('el-table-column', {
          props: {
            type: 'selection',
            width: 55
          }
        })
      )
    }

    this.columns.forEach(column => {
      const { props = {}, componentProps = {}} = column
      let { componentName } = column
      let scopedSlots = {}
      if (componentName) {
        const props = componentProps
        if (componentName === 'ColumnAction') componentName = 'ColumnActionButton'
        if (componentName === 'ColumnActionButton' && this.actionsRow) {
          props.list = this.actionsRow
          props.commandPrefix = 'Row'
          props.size = this.size
        }
        scopedSlots = {
          default: scope => createElement(componentName, {
            props: {
              scope,
              ...props
            },
            on: {
              'click': e => this.$emit('click', e),
              'action': e => this.$emit('action', e)
            }
          })
        }
      }

      if (column.tooptip) {
        props.renderHeader = this.renderHeader(column.props.label, column.tooltip)
      }

      columnsRender.push(
        createElement('el-table-column', {
          props,
          scopedSlots
        })
      )
    })

    columnsRender.push(
      this.$slots.default
    )

    return createElement('el-table', {
      class: [this.b([this.theme])],
      on: {
        'selection-change': val => this.$emit('selection-change', val),
        'header-click': val => this.$emit('header-click', val)
      },
      props: {
        showHeader: this.showHeader,
        border: this.border,
        data: this.data,
        size: this.size,
        emptyText: this.emptyText
      }
    }, columnsRender)
  },

  props: {
    theme: {
      type: String,
      default: 'primary'
    },
    selection: Boolean,
    showHeader: {
      type: Boolean,
      default: true
    },
    border: Boolean,
    actionsRow: {
      type: Array,
      default: function() {
        return []
      }
    },
    size: String,
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    emptyText: String,
    columns: {
      type: Array,
      default: function() {
        return []
      }
    }
  },

  methods: {
    // TODO
    renderHeader(h, { column, $index }, index) {
      return h('span', {}, [
        h('span', {}, '时间片段'),
        h('el-popover', { props: { placement: 'top-start', width: '200', trigger: 'hover', content: '领先/落后品类=单店平均单量-该品类城市店均单量' }}, [
          h('i', { slot: 'reference', class: 'el-icon-question' }, '')
        ])
      ])
    }
  }
})
</script>
