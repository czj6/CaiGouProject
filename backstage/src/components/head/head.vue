<template>
  <div class="head">
    <span style="cursor: pointer;" v-on:click="$emit('back')">{{title}}</span>
    <span style="cursor: pointer;" @click="quit">退出</span>
  </div>
</template>

<script>
import storage from '../../storage/storage'

export default {
  name: 'headBar',
  props: {
    title: {
      type: String,
      default: '商铺管理后台'
    }
  },
  methods: {
    quit() {
      storage.clear('token')
      this.$router.push({path: `/`})
    }
  }

}
</script>

<style>
.head{
  height: 60px;
  width: 100%;
  display: flex;
  top: 0;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  background-color: #2379EB;
  color: #fff;
  padding: 0 30px;

  box-sizing: border-box;
  z-index: 11;
  /* border-bottom: 1px solid #333; */
}
</style>
