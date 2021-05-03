<template>
  <div class="menuList">
    <container>
      <template v-slot:headSection>
        <div class="headSection">
          <span style="font-size: 16px; font-weight: bolder;">菜谱列表</span>
          <div class="search">
            <span>搜索</span>
            <input type="text" class="ipt">
          </div>
          <div class="cuisine">
            <span>菜系</span>
            <select name="" id="" class="sel">
              <option value="闽">闽菜</option>
              <option value="粤">粤菜</option>
              <option value="川">川菜</option>
            </select>
          </div>
        </div>
      </template>
      <template v-slot:contentBox>
        <div class="contentBox">
          <div class="item">
            <div class="item-img-box">
              <img src="../assets/test.jpg" alt="">
            </div>
            <div class="item-text">
              <p>宫保鸡丁</p>
              <p>材料：</p>
            </div>
            <div class="btn">已上架</div>
          </div>
          <div class="item">
            <div class="item-img-box">
              <img src="../assets/test.jpg" alt="">
            </div>
            <div class="item-text">
              <p>宫保鸡丁</p>
              <p>材料：</p>
            </div>
            <div class="btn">已上架</div>
          </div>
          <div class="item">
            <div class="item-img-box">
              <img src="../assets/test.jpg" alt="">
            </div>
            <div class="item-text">
              <p>宫保鸡丁</p>
              <p>材料：</p>
            </div>
            <div class="btn">已上架</div>
          </div>
        </div>
      </template>
      <template v-slot:footerSection>
        <div class="footerSection">
          <div class="defaultBtn">上一页</div>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
          <div class="defaultBtn">下一页</div>
        </div>
      </template>
    </container>
  </div>
</template>

<script>
import container from '../components/container/container'
import {Pagination} from 'element-ui'
export default {
  name: 'menuList',
  components: {
    container,
    [Pagination.name]: Pagination
  },
  mounted() {
    console.log(this.$route)
  },
  methods: {
    logMsg() {
      console.log(1);
    }
  },
}
</script>

<style scoped>
.container {
  padding: 40px 30px 20px 30px;
}
.menuList {
  height: 100%;
}
.ipt {
  width: 280px;
  border: 1px solid #666;
  outline: none;
  background-color: #fff;
  height: 30px;
  font-size: 20px;
  color: #000;
  padding: 0 10px;
}
.sel {
  width: 200px;
  height: 30px;
}

.headSection {
  display: flex;
  align-items: center;
}

.search, .cuisine {
  margin: 0 40px;
}

.search span, .cuisine span{
  font-size: 14px;
  font-weight: bold;
  margin: 0 10px;
}
.contentBox{
  height: 500px;
  width: 70%;
  border: 1px solid #666;
  margin-top: 10px;
  background-color: #eee;
}
.contentBox .item {
  height: 135px;
  background-color: #fff;
  margin: 20px 0;
  display: flex;
  align-items: center;
}
.contentBox .item .item-text {
  width: 535px;
  overflow: hidden;
}
.contentBox .item div {
  margin: 0 20px;
}
.item-img-box img{
  height: 100px;
}
.btn {
  background-color: #07EB31;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 7px;
  border-radius: 4px;
  color: #fff;
}

.defaultBtn {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4F97F7;
  border-radius: 17px;
  color: #fff;
  font-size: 16px;
}
.footerSection {
  width: 70%;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
