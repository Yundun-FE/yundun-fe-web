<style lang="scss">
.ColumnAction {
  margin: 0 -8px;

  a{
    color: $--color-primary;
  }
  .no-line {
    &:after {
      display: none;
    }
  }
  > * {
    border-radius: 0px !important;
    padding: 0px 8px !important;
    padding-right: 6px !important;
    position: relative;

    &:not(:first-child) {
      &:after {
        position: absolute;
        content: "";
        top: 50%;
        height: 10px;
        width: 1px;
        left: 0px;
        margin-top: -5px;
        background: #ccc;
      }
    }
    &:last-child {
      padding-right: 0px;
    }
  }

  .el-button + .el-button {
    margin-left: 0px;
  }

  .el-button + .el-button {
    margin-left: 0px;
  }
}
</style>
<template>
  <div class="ColumnAction">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ColumnAction'
}
</script>
