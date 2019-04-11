<style lang="less">
</style>

<template>
  <div>
    <a-form>
      <a-form-item>
        <a-row>
          <a-col
            v-if="children"
            :span="8"
          >
            <a-input
              v-decorator="['name']"
              v-model="data.name"
              placeholder="NAME"
            />
          </a-col>
          <a-col :span="8">
            <a-input
              v-decorator="['title']"
              v-model="data.title"
              placeholder="名称"
            />
          </a-col>
          <a-col
            v-if="children"
            :span="8"
          >
            <a-input
              v-decorator="['alias']"
              placeholder="别名"
            />
          </a-col>
          <a-col :span="8">
            <a-input
              v-decorator="['icon']"
              placeholder="ICON"
            />
          </a-col>
        </a-row>
      </a-form-item>
      <template v-if="data.childrens">
        <a-form-item>
          <FormMenuItem
            v-for="(item, index) in data.childrens"
            :data="item"
            :key="index"
            children
          />
        </a-form-item>
        <a-form-item>
          <a-button @click="handleAdd">增加</a-button>
        </a-form-item>
      </template>
    </a-form>
  </div>
</template>

<script>
// import FormMenuItem from './FormMenuItem'

export default {
  name: 'FormMenuItem',
  // components: { FormMenuItem },

  props: {
    children: Boolean,
    data: Object
  },

  data() {
    return {}
  },

  computed: {},

  methods: {
    handleAdd() {

    }
  }
}
</script>
