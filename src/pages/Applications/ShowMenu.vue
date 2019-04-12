<template>
  <page>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-card title="预览">
          {{ jobsData.menus }}
          <a-menu
            :default-selected-keys="['1']"
            style="width: 256px"
            mode="inline"
          >
            <a-sub-menu key="sub1">
              <span slot="title">
              <a-icon type="mail" /><span>Navigation One</span></span>
              <a-menu-item-group key="g1">
                <template slot="title">
                <a-icon type="qq" /><span>Item 1</span></template>
                <a-menu-item key="1">Option 1</a-menu-item>
                <a-menu-item key="2">Option 2</a-menu-item>
              </a-menu-item-group>
              <a-menu-item-group
                key="g2"
                title="Item 2"
              >
                <a-menu-item key="3">Option 3</a-menu-item>
                <a-menu-item key="4">Option 4</a-menu-item>
              </a-menu-item-group>
            </a-sub-menu>
            <a-sub-menu key="sub2">
              <span slot="title">
              <a-icon type="appstore" /><span>Navigation Two</span></span>
              <a-menu-item key="5">Option 5</a-menu-item>
              <a-menu-item key="6">Option 6</a-menu-item>
              <a-sub-menu
                key="sub3"
                title="Submenu"
              >
                <a-menu-item key="7">Option 7</a-menu-item>
                <a-menu-item key="8">Option 8</a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
            <a-sub-menu key="sub4">
              <span slot="title">
              <a-icon type="setting" /><span>Navigation Three</span></span>
              <a-menu-item key="9">Option 9</a-menu-item>
              <a-menu-item key="10">Option 10</a-menu-item>
              <a-menu-item key="11">Option 11</a-menu-item>
              <a-menu-item key="12">Option 12</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="目录管理">
          <FormMenus v-model="jobsData.menus" :data="jobsData.menus"/>
          <!-- <a-form>
            <a-form-item>
              <FormMenuItem
                v-for="(item, index) in jobsData.menus"
                :data="item"
                :key="index"
              />
            </a-form-item>

            <a-form-item>
              <a-button
                type="primary"
                @click="jobsSaveById"
              >保存</a-button>
            </a-form-item>
          </a-form> -->
          <NestedList/>
          <a-form-item>
            <a-button
              block
              @click="handleAdd"
            >增加</a-button>
          </a-form-item>
        </a-card>
      </a-col>
    </a-row>
  </page>
</template>

<script>
import jobsMixins from '@/mixins/jobs'
import FormMenuItem from './components/FormMenuItem'
import FormMenus from './components/FormMenus'
import NestedList from './components/nested-list-example/OuterList.vue'

export default {
  components: { FormMenuItem, FormMenus, NestedList },

  mixins: [jobsMixins],

  data() {
    return {
    }
  },

  methods: {
    handleAdd() {
      this.jobsData.menus.push({
        title: '',
        icon: '',
        childrens: [
          {
            name: '',
            title: '',
            alias: '',
            icon: ''
          }
        ]
      })
    }
  }
}
</script>
