<template>
  <div>
    <head-bar title="采购超市后台"></head-bar>
    <side-bar :items="items"></side-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import headBar from '../components/head/head'
import sideBar from '../components/sideBar/sideBar'
export default {
  name: 'menuBar',
  components: {
    headBar,
    sideBar,
  },
  data() {
    return {
      items: [
        {
          id: 1,
          text: '订单列表',
          url: '/supermarket/orderlist'
        },
        {
          id: 2,
          text: '统计营业额',
          url: '/supermarket/statistics'
        }
      ]
    }
  }
}
</script>

<style>

</style>
