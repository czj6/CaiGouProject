<template>
  <div class="sideBar">
    <side-bar-item v-for="item in items" @changeStyle="onChangeStyle(item.id)" :key="item.id" :text="item.text" :url="item.url" v-bind:class="[defaultActive==item.id? 'sideBarItemv' : '']"></side-bar-item>
  </div>
</template>
<script>
import sideBarItem from '../sideBarItem/sideBarItem.vue'
export default {
  name: 'sideBar',
  components: {
    sideBarItem
  },
  props: {
    items: {
      type: Array,
      default: function () {
        return [{
          id: 1,
          text: '菜谱列表',
          url: '/menu/menulist'
        }, {
          id: 2,
          text: '菜谱管理',
          url: '/menu/manage'
        }]
      }
    }
  },
  data (){
    return {
      defaultActive: 1
    }
  },
  methods: {
    onChangeStyle(id) {
      this.defaultActive = id
    }
  },
  created() {
    let path = this.$route.path
    for (const item of this.items) {
      if (path == item.url) {
        this.defaultActive = item.id
      }
    }
  }
}
</script>

<style>
.sideBar {
  width: 200px;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: 60px;
  border-right: 1px solid #333;
}
.sideBarItemv{
  background-color: #2379EB !important;
  color: #fff !important;
}
</style>
