<template>
  <div>
    <head-bar title="菜谱详情"></head-bar>
    <div class="detail-container">
      <div class="introduce">
        <img :src="item.avatar" alt="">
        <div>
          <p>
            <span class="font-bold">菜谱名称：</span> <input class="menu-name" type="text" v-model="item.name">
          </p>
          <p>
            <span class="font-bold">步骤表述：</span><br/>
            <textarea class="menu-process" name="" id="" cols="30" rows="10" v-model="item.method"></textarea>
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
        <div v-if="item.status == 1" class="down" @click="changeStatus">下架</div>
        <div v-else class="down up-btn" @click="changeStatus">上架</div>
        <div class="update" @click="updateMsg">修改</div>
      </div>
    </div>
  </div>
</template>
<script>
import headBar from '../components/head/head'
import storage from '../storage/storage'
export default {
  name: 'menuDetail',
  components: {
    headBar
  },
  data() {
    return {
      item: {},
      menuName: '宫保鸡丁',
      process: '打的范德萨发顺丰2fdafdfd333333333333333333333333333333333'
    }
  },
  methods:{
    async updateMsg() {
      let res = await this.axios.post('http://localhost:8083/menu/updateMenu',this.item,{
        headers: {
          token: this.token
        }
      })
      if (res.data.code == 0) {
        this.$message.success("修改成功")
      }else {
        this.$message.error("修改失败")
      }
    },
    async changeStatus() {
      this.item.status = this.item.status == 1? 2: 1;
      await this.updateMsg()
    }
  },
  created() {
    this.item = this.$store.state.item;
    this.token = storage.getItem('token')
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
.up-btn{
  background-color: #07EB31;
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
