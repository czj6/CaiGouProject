<template>
  <div>
    <head-bar></head-bar>
    <side-bar></side-bar>
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
  }
}
</script>

<style>

</style>
