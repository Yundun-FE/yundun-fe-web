<style lang="postcss">
.DmTable {
  position: relative;

  .el-table {
    thead {
      font-weight: bold;
      color: #606266;
    }

    &__empty-block {
      .el-button--text {
        font-size: 13px;
      }
    }
  }

  .btn-add {
    display: block;
    text-align: center;
    height: 48px;
    line-height: 48px;
    cursor: pointer;

    &.is-disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .yd-icon {
      font-size: 12px;
      margin-right: 4px;
    }

    &__title {
      color: var(--color-primary);
      font-size: 13px;
    }

    &__desc {
      color: #999;
      font-size: 12px;
    }

    &:hover {
      background: var(--color-primary-light-8);
    }

    &:active {
      background: rgb(250, 250, 250);
    }
  }
}
</style>

<template>
  <div :class="[b([type]), b({minHeight, addButton}), {'is-loading': loading}]">
    <slot />
    <yd-loading
      v-if="loading"
      :style="{top: headerHeight}"
      placement="top"
      opacity
    />
    <div v-if="addButton">
      <a
        :class="{'is-disabled': addButtonDisabled}"
        class="btn-add"
        @click="handleAddRow"
      >
        <span class="btn-add__title">
          <yd-icon name="el-icon-plus" />
          {{ addButtonText }}
        </span>
        <span class="btn-add__desc">
          <slot name="add-row-text" />
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import create from 'common/utils/create-basic'

export default create({
  name: 'DmTable',

  props: {
    type: {
      type: String,
      default: 'primary'
    },
    // 添加按钮设置
    addButton: Boolean,
    addButtonText: {
      type: String,
      default: '新增'
    },
    addButtonDisabled: Boolean,
    //
    animate: Boolean,
    loading: Boolean,
    minHeight: Boolean
  },

  methods: {
    handleAddRow() {
      this.$emit('add-row')
    }
  }
})
</script>
