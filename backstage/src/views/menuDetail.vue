<template>
  <div>
    <head-bar title="菜谱详情"></head-bar>
    <div class="detail-container">
      <div class="main-container">
        <h1 class="detail-title" contenteditable="true">{{item.name}}</h1>
        <div class="detail-img-wrap">
          <img :src="item.avatar" alt="" class="detail-img">
        </div>
        <div class="detail-material">
          <h4>食材用料</h4>
          <div class="material-wrap">
            <div class="material-item" v-for="item in foodList" :key="item.id">
              {{item.ingredient}} {{item.weight}}
            </div>

          </div>
        </div>
        <div class="detail-process">
          <h4>{{item.name}}的做法</h4>
          <div class="process-wrap">
            <div class="process-item" v-for="item in process" :key="item.index">
              <img :src="item.imgUrl" alt="" class="process-item-img left">
              <p class="process-item-text">{{item.text}}</p>
            </div>

          </div>
        </div>

      </div>
      <div class="btn-group">
        <div class="down up-btn" v-if="item.status==2" @click="changeStatus">上架</div>
        <div class="down" v-if="item.status==1" @click="changeStatus">下架</div>
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
      id: '',
      menuName: '宫保鸡丁',
      process: [],
      foodList: []
    }
  },
  methods:{
    async updateMsg() {
      let res = await this.axios.post('/api/menu/updateMenu',this.item,{
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
  async created() {
    this.item = this.$store.state.item;
    this.token = storage.getItem('token')
    this.id = this.$route.params.id
    var arr = this.item.method.split('\n')
    arr.pop()
    for (let i = 0; i < arr.length; i+=3) {
      let obj = {
        text: arr[i]+","+arr[i+2],
        imgUrl: arr[i+1]
      }
      this.process.push(obj)
    }
    let res = await this.axios.get('/api/menu/findMenuByIdDetail',{
      params: {
        id: this.id
      },
      headers: {
        token: this.token
      }
    })
    this.foodList = res.data.data.foodList;
  }
}
</script>
<style scoped>
.detail-container {
  padding: 15px 50px;
  padding-top: 65px;
  background-color: #EEECE9;
}
.main-container {
  margin: 0 auto;
  background-color: #fff;
  width: 600px;
  border: 1px solid transparent;

  padding: 10px 20px;
}
.detail-title {
  text-align: center;
}
.detail-img-wrap {
  text-align: center;
  padding-bottom: 30px;
  border-bottom: 1px solid #ddd;
}
.detail-img {
  width: 100%;
  height: auto;
}
.material-wrap {
  display: flex;
  flex-wrap: wrap;
}
.material-item {
  width: 50%;
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  box-sizing: border-box;

  border: 1px solid #ddd;
}

.detail-process {
  margin-top: 60px;
}

.process-item {
  height: 200px;
  padding: 10px 0;
  border-bottom: 1px dotted #ddd;
  overflow: hidden;
}
.process-item:hover {
  background-color: #FFF8D8;
}
.process-item p {
  margin: 0;
  overflow: hidden;
  font-size: 15px;
  line-height: 24px;
}
.process-item img {
  height: 200px;
  width: 250px;
}
.left {
  float: left;
  margin-right: 30px;
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
  cursor: pointer;
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
