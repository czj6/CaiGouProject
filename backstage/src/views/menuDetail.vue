<template>
  <div>
    <head-bar title="菜谱详情"></head-bar>
    <div class="detail-container">
      <div class="introduce">
        <img src="../assets/test.jpg" alt="">
        <div>
          <p>
            <span class="font-bold">菜谱名称：</span> <input class="menu-name" type="text" v-model="menuName">
          </p>
          <p>
            <span class="font-bold">步骤表述：</span><br/>
            <textarea class="menu-process" name="" id="" cols="30" rows="10" v-model="process"></textarea>
          </p>
        </div>
      </div>
      <div class="material">
        <p>用料</p>
        <div class="material-box">
          <div class="material-item">
            <img src="../assets/test.jpg" alt="">
            <span>鸡肉</span>
            <span>500g</span>
          </div>
          <div class="material-item">
            <img src="../assets/test.jpg" alt="">
            <span>鸡肉</span>
            <span>500g</span>
          </div>
          <div class="material-item">
            <img src="../assets/test.jpg" alt="">
            <span>鸡肉</span>
            <span>500g</span>
          </div>
          <div class="material-item">
            <img src="../assets/test.jpg" alt="">
            <span>鸡肉</span>
            <span>500g</span>
          </div>
        </div>
      </div>
      <div class="btn-group">
        <div class="down">下架</div>
        <div class="update">修改</div>
      </div>
    </div>
  </div>
</template>
<script>
import headBar from '../components/head/head'
export default {
  name: 'menuDetail',
  components: {
    headBar
  },
  data() {
    return {
      menuName: '宫保鸡丁',
      process: '打的范德萨发顺丰2fdafdfd333333333333333333333333333333333'
    }
  }
}
</script>
<style scoped>
.detail-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: 60px;
  padding: 20px 50px;
}
.introduce {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.introduce img {
  width: 250px;
  height: 100%;
  margin-right: 200px;
}
.font-bold {
  font-size: 16px;
  font-weight: bold;
}

.menu-name {
  border: 1px solid #ddd;
  height: 30px;
  width: 200px;
  font-size: 14px;
  outline: none;
}

.menu-process {
  border: 1px solid #ddd;
  font-size: 13px;
  width: 282px;
  resize: none;
  outline: none;
  line-height: 20px;
  overflow-y: scroll;
}
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-thumb {
    background-color: skyblue;
    border-radius: 6px;
}

::-webkit-scrollbar-track {
    background-color: #ddd;
    border-radius: 6px;
}

.material-box {
  height: 250px;
  overflow-y: scroll;
}

.material-item{
  display: flex;
  align-items: center;
}
.material-item img{
  width: 100px;
  height: 100%;
  margin-right: 50px;
}
.material-item span:nth-child(3) {
  margin-left: 200px;
}

.btn-group {
  position: fixed;
  bottom: 30px;
  right: 50px;
  display: flex;
}
.down {
  width: 80px;
  height: 40px;
  color: #fff;
  font-weight: bold;
  font-size: 17px;
  background-color: #EB0707;
  text-align: center;
  line-height: 40px;
  border-radius: 8px;
  margin-right: 20px;
}
.update {
  width: 80px;
  height: 40px;
  color: #fff;
  font-weight: bold;
  font-size: 17px;
  background-color: #2379EB;
  text-align: center;
  line-height: 40px;
  border-radius: 8px;
}
</style>
