<template>
  <div class="head">
    <span>{{title}}</span>
    <span>退出</span>
  </div>
</template>

<script>
export default {
  name: 'headBar',
  props: {
    title: {
      type: String,
      default: '商铺管理后台'
    }
  }
}
</script>

<style>
.head{
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2379EB;
  color: #fff;
  padding: 0 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #333;
}
</style>
