<template>
  <div class="topline">
    <a  class="title">菜购超市后台</a>
    <a class="name">退出</a>
  </div>
</template>

<script>
export default {
    name:"topline"
}
</script>

<style>
    .topline{
        width: 100%;
        height : 70px;
        background: #2379EB;
        border: none;
        font-size:20px;
        
    }
    .title{
        position: relative;
        color: ivory;
        left:-650px;
        top:30%
    }
    .name{
        position: relative;
        color: ivory;
        left: 42%;
        top: 30%;
    }
</style>