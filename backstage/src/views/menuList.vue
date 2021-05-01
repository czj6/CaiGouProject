<template>
  <div class="menuList">
    <head-bar></head-bar>
    <side-bar></side-bar>
    <container>
      <template v-slot:headSection>
        <div>
          <span>菜谱列表</span>
        </div>
      </template>
    </container>
  </div>
</template>

<script>
import headBar from '../components/head/head'
import sideBar from '../components/sideBar/sideBar'
import container from '../components/container/container'
export default {
  name: 'menuList',
  components: {
    headBar,
    sideBar,
    container
  },
  mounted() {
    console.log(this.$route)
  }
}
</script>

<style scoped>
.container {
  padding: 50px 0 0 30px;
}
.menuList {
  height: 100%;
}
</style>
