<template>
  <div>
    <head-bar></head-bar>
    <side-bar :items="items"></side-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import headBar from '../components/head/head'
import sideBar from '../components/sideBar/sideBar'
export default {
  name: 'menuBar',
  data() {
    return {
      items: [{
          id: 1,
          text: '菜谱列表',
          url: '/menu/menulist'
        }, {
          id: 2,
          text: '菜谱管理',
          url: '/menu/manage'
        },{
          id: 3,
          text: '新增菜谱',
          url: '/menu/add'
        }]
    }
  },
  components: {
    headBar,
    sideBar,
  }
}
</script>

<style>

</style>
