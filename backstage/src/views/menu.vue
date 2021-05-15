<template>
  <div>
    <head-bar></head-bar>
    <side-bar></side-bar>
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
  components: {
    headBar,
    sideBar,
  }
}
</script>

<style>

</style>
