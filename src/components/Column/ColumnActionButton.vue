<style lang="scss">
.ColumnActionButton{
  &__item{
    margin-right: 8px;

    &:last-child{
      margin-right: 0px;
    }
  }
}
</style>

<template>
  <span :class="b()">
    <span
      v-for="(item, index) in list"
      :class="b('item')"
      :key="index"
    >
      <el-dropdown
        v-if="item.items"
        :size="buttonSize"
        split-button
        trigger="click"
        @click="handleClick({command: item.command, scope, settings: item})"
        @command="handleClick"
      >
        {{ item.label }}
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in item.items"
            :key="index"
            :command="{command: item.command, scope, settings: item}"
          >{{ item.label }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        v-else
        :size="buttonSize"
        :type="item.type"
        :disabled="item.command.includes('Multiple') && multipleActionDisable"
        @click="handleClick({command: item.command, scope, settings: item})"
      >{{ item.label }}</el-button>
    </span>
  </span>
</template>

<script>
import create from '../../utils/create-basic'

export default create({
  name: 'ColumnActionButton',

  props: {
    size: String,
    commandPrefix: String,
    multipleActionDisable: Boolean,
    list: {
      type: Array,
      default: () => []
    },
    scope: {
      type: Object,
      default: () => { }
    }
  },

  computed: {
    buttonSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  },

  methods: {
    handleClick(e) {
      e.command = this.commandPrefix ? `${this.commandPrefix}.${e.command}` : e.command
      this.$emit('action', e)
    }
  }
})
</script>
