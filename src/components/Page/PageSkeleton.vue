<style lang="scss">
.PageSkeleton {
  position: absolute;
  z-index: 1000;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  padding: 20px 30px;
  background: #f0f2f5;

  &__header {
    height: 32px;
    margin-bottom: 12px;

    .button {
      width: 80px;
      height: 32px;
      background: linear-gradient(90deg, #ccc 25%, #e6e6e6 37%, #ccc 63%);
      animation: ant-skeleton-loading 1.4s ease infinite;
      background-size: 400% 100%;
    }
  }

  .table {
    margin-top: 40px;
    padding: 0px;

    li {
      list-style: none;
      height: 48px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      // background: #EEE
    }
  }

  &__core {
    min-height: 558px;
    position: relative;
    background: #fff;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    &:before {
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      height: 40px;
      background: #ccc;
    }
  }
}
</style>
<template>
  <div :class="b()">
    <div
      v-if="type === 'table'"
      :class="b('table')"
    >
      <div :class="b('header')">
        <div class="button" />
      </div>
      <div :class="b('core')" />
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'PageSkeleton',

  props: {
    type: String
  }
})
</script>
